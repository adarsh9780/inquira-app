import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'

const root = resolve(import.meta.dirname, '..')

function readText(path) {
  return readFileSync(resolve(root, path), 'utf8')
}

function readLandingContent() {
  return parse(readText('content/landing/home.yml'))
}

test('landing content is a Nuxt Content data collection with interactive demos and editable videos', () => {
  const contentConfig = readText('content.config.ts')
  const landing = readLandingContent()
  const demoTypes = landing.features.primaryDemos.map((demo) => demo.demoType)

  assert.match(contentConfig, /landing: defineCollection/)
  assert.match(contentConfig, /source: 'landing\/home\.yml'/)
  assert.match(contentConfig, /type: 'data'/)
  assert.match(contentConfig, /primaryDemos/)
  assert.match(contentConfig, /secondaryVideos/)
  assert.match(contentConfig, /videoSchema/)
  assert.match(contentConfig, /'ask-answer'/)
  assert.match(contentConfig, /'create-workspace'/)
  assert.match(contentConfig, /'add-api-key'/)

  assert.equal(landing.features.primaryDemos.length, 3)
  assert.deepEqual(demoTypes, ['ask-answer', 'create-workspace', 'add-api-key'])

  for (const demo of landing.features.primaryDemos) {
    assert.ok(demo.id)
    assert.ok(demo.title)
    assert.ok(demo.summary)
    assert.ok(demo.icon)
    assert.ok(demo.demoType)
  }

  assert.equal(landing.features.secondaryVideos.length, 5)
  for (const feature of landing.features.secondaryVideos) {
    assert.ok(feature.id)
    assert.ok(feature.title)
    assert.ok(feature.summary)
    assert.ok(feature.icon)
    assert.deepEqual(Object.keys(feature.video).sort(), ['alt', 'poster', 'src'])
    assert.equal(feature.video.src, '')
    assert.equal(feature.video.poster, '')
    assert.match(feature.video.alt, /Inquira/)
  }
})

test('homepage renders from the landing collection and interactive showcase', () => {
  const homePage = readText('app/pages/index.vue')
  const showcase = readText('app/components/FeatureInteractiveShowcase.vue')

  assert.match(homePage, /queryCollection\('landing'\)\.first\(\)/)
  assert.match(homePage, /<FeatureInteractiveShowcase/)
  assert.match(homePage, /home\.features\.primaryDemos/)
  assert.match(homePage, /home\.features\.secondaryVideos/)
  assert.doesNotMatch(homePage, /const features = \[/)
  assert.doesNotMatch(homePage, /const howItWorks = \[/)
  assert.doesNotMatch(homePage, /const pricingPlans = \[/)

  assert.match(showcase, /IntersectionObserver/)
  assert.match(showcase, /activeDemoId/)
  assert.match(showcase, /scrollIntoView/)
  assert.match(showcase, /secondaryVideos/)
  assert.match(showcase, /AppVideo/)
})

test('interactive demos are code-owned and safe for homepage playback', () => {
  const frame = readText('app/components/ProductDemoFrame.vue')
  const askAnswer = readText('app/components/AskAnswerDemo.vue')
  const workspace = readText('app/components/WorkspaceCreateDemo.vue')
  const apiKey = readText('app/components/ApiKeyDemo.vue')

  assert.match(frame, /activeArea/)
  assert.match(frame, /Inquira v0\.5\.35/)
  assert.match(askAnswer, /resultView/)
  assert.match(askAnswer, /'chart'/)
  assert.match(askAnswer, /'table'/)
  assert.match(askAnswer, /'output'/)
  assert.match(askAnswer, /prefers-reduced-motion/)

  assert.match(workspace, /Create workspace/)
  assert.match(workspace, /prefers-reduced-motion/)

  assert.match(apiKey, /demo-openrouter-key-local-only/)
  assert.match(apiKey, /type="password"/)
  assert.match(apiKey, /Active & Saved/)
  assert.match(apiKey, /prefers-reduced-motion/)
  assert.doesNotMatch(apiKey, /sk-[A-Za-z0-9]{12,}/)
})

test('docs media components support R2 videos and YouTube embeds', () => {
  const appVideo = readText('app/components/AppVideo.vue')
  const youtubeEmbed = readText('app/components/YoutubeEmbed.vue')

  for (const prop of ['src', 'poster', 'caption', 'autoplay', 'loop', 'controls']) {
    assert.match(appVideo, new RegExp(`${prop}\\?:`))
  }

  assert.match(appVideo, /prefers-reduced-motion/)
  assert.match(appVideo, /shouldShowControls/)
  assert.match(appVideo, /Video placeholder/)
  assert.match(youtubeEmbed, /youtube-nocookie\.com/)
  assert.match(youtubeEmbed, /isLoaded/)
})
