import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'

const root = resolve(import.meta.dirname, '..')

function readText(path) {
  return readFileSync(resolve(root, path), 'utf8')
}

function readLandingContent() {
  return parse(readText('content/landing/home.yml'))
}

test('landing content is a Nuxt Content data collection with wide product demos and editable media', () => {
  const contentConfig = readText('content.config.ts')
  const landing = readLandingContent()
  const demoTypes = landing.features.productDemos.map((demo) => demo.demoType)

  assert.match(contentConfig, /landing: defineCollection/)
  assert.match(contentConfig, /source: 'landing\/home\.yml'/)
  assert.match(contentConfig, /type: 'data'/)
  assert.match(contentConfig, /productDemos/)
  assert.match(contentConfig, /secondaryFeatures/)
  assert.match(contentConfig, /videoSchema/)
  assert.match(contentConfig, /imageSchema/)
  assert.match(contentConfig, /mediaSchema/)
  assert.match(contentConfig, /'ask-answer'/)
  assert.match(contentConfig, /'create-workspace'/)
  assert.match(contentConfig, /'add-api-key'/)

  assert.equal(landing.features.productDemos.length, 3)
  assert.deepEqual(demoTypes, ['ask-answer', 'create-workspace', 'add-api-key'])

  for (const demo of landing.features.productDemos) {
    assert.ok(demo.id)
    assert.ok(demo.eyebrow)
    assert.ok(demo.title)
    assert.ok(demo.summary)
    assert.ok(demo.icon)
    assert.ok(demo.demoType)
    assert.deepEqual(Object.keys(demo.media).sort(), ['image', 'video'])
    assert.deepEqual(Object.keys(demo.media.video).sort(), ['alt', 'poster', 'src'])
    assert.deepEqual(Object.keys(demo.media.image).sort(), ['alt', 'src'])
    assert.match(demo.media.image.src, /^\/media\/landing\/.+\.webp$/)
  }

  assert.equal(landing.features.secondaryFeatures.length, 5)
  for (const feature of landing.features.secondaryFeatures) {
    assert.ok(feature.id)
    assert.ok(feature.title)
    assert.ok(feature.summary)
    assert.ok(feature.icon)
    assert.deepEqual(Object.keys(feature.media).sort(), ['image', 'video'])
    assert.deepEqual(Object.keys(feature.media.video).sort(), ['alt', 'poster', 'src'])
    assert.deepEqual(Object.keys(feature.media.image).sort(), ['alt', 'src'])
    assert.equal(feature.media.video.src, '')
    assert.match(feature.media.video.poster, /^\/media\/landing\/.+\.webp$/)
    assert.match(feature.media.video.alt, /Inquira/)
    assert.match(feature.media.image.src, /^\/media\/landing\/.+\.webp$/)
  }
})

test('homepage renders from the landing collection and wide product demo sections', () => {
  const homePage = readText('app/pages/index.vue')
  const productDemos = readText('app/components/LandingProductDemos.vue')

  assert.match(homePage, /queryCollection\('landing'\)\.first\(\)/)
  assert.match(homePage, /<LandingProductDemos/)
  assert.match(homePage, /home\.features\.productDemos/)
  assert.match(homePage, /home\.features\.secondaryFeatures/)
  assert.doesNotMatch(homePage, /<FeatureInteractiveShowcase/)
  assert.doesNotMatch(homePage, /const features = \[/)
  assert.doesNotMatch(homePage, /const howItWorks = \[/)
  assert.doesNotMatch(homePage, /const pricingPlans = \[/)

  assert.equal(existsSync(resolve(root, 'app/components/FeatureInteractiveShowcase.vue')), false)
  assert.match(productDemos, /min-h-\[calc\(100svh-var\(--navbar-height\)\)\]/)
  assert.match(productDemos, /activeDemoId/)
  assert.match(productDemos, /productDemos/)
  assert.match(productDemos, /secondaryFeatures/)
  assert.match(productDemos, /AppVideo/)
  assert.match(productDemos, /feature\.media\.image\.src/)
  assert.doesNotMatch(productDemos, /scrollToDemo/)
  assert.doesNotMatch(productDemos, /scrollIntoView/)
})

test('interactive demos are code-owned and safe for homepage playback', () => {
  const frame = readText('app/components/ProductDemoFrame.vue')
  const askAnswer = readText('app/components/AskAnswerDemo.vue')
  const workspace = readText('app/components/WorkspaceCreateDemo.vue')
  const apiKey = readText('app/components/ApiKeyDemo.vue')
  const idleSurface = readText('app/components/AppIdleDemoSurface.vue')

  assert.match(frame, /activeArea/)
  assert.match(frame, /demo-cursor/)
  assert.match(frame, /Inquira v0\.5\.35/)
  assert.match(askAnswer, /typedQuestion/)
  assert.match(askAnswer, /typing-caret/)
  assert.match(askAnswer, /Local context: IPL ANALYSIS/)
  assert.match(askAnswer, /resultView/)
  assert.match(askAnswer, /'chart'/)
  assert.match(askAnswer, /'table'/)
  assert.match(askAnswer, /'output'/)
  assert.match(askAnswer, /'empty'/)
  assert.match(askAnswer, /prefers-reduced-motion/)

  assert.match(workspace, /settingsOpen/)
  assert.match(workspace, /demoCursor/)
  assert.match(workspace, /AppIdleDemoSurface/)
  assert.match(workspace, /Create workspace/)
  assert.match(workspace, /Revenue Review/)
  assert.match(workspace, /prefers-reduced-motion/)
  assert.doesNotMatch(workspace, /Open Settings to/)

  assert.match(apiKey, /settingsOpen/)
  assert.match(apiKey, /demoCursor/)
  assert.match(apiKey, /AppIdleDemoSurface/)
  assert.match(apiKey, /demo-openrouter-key-local-only/)
  assert.match(apiKey, /type="password"/)
  assert.match(apiKey, /Active & Saved/)
  assert.match(apiKey, /prefers-reduced-motion/)
  assert.doesNotMatch(apiKey, /sk-[A-Za-z0-9]{12,}/)
  assert.doesNotMatch(apiKey, /Open Settings to/)

  assert.match(idleSurface, /Ask about this local workspace/)
  assert.match(idleSurface, /No provider selected/)
  assert.match(idleSurface, /Local workspace context/)
})

test('landing media fallbacks are optimized local assets', () => {
  const landing = readLandingContent()
  const mediaPaths = [
    ...landing.features.productDemos.map((feature) => feature.media.image.src),
    ...landing.features.secondaryFeatures.map((feature) => feature.media.image.src),
    ...landing.features.productDemos.map((feature) => feature.media.video.poster),
    ...landing.features.secondaryFeatures.map((feature) => feature.media.video.poster)
  ]

  for (const mediaPath of mediaPaths) {
    assert.match(mediaPath, /^\/media\/landing\/.+\.webp$/)
    assert.equal(existsSync(resolve(root, `public${mediaPath}`)), true)
  }
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
