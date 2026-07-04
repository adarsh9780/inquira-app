import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'

const root = resolve(import.meta.dirname, '..')

function readLandingContent() {
  return parse(readFileSync(resolve(root, 'content/landing/home.yml'), 'utf8'))
}

test('legacy landing HTML does not point docs at the retired docs subdomain or stale slugs', () => {
  const html = readFileSync(resolve(root, 'index.html'), 'utf8')

  assert.doesNotMatch(html, /docs\.inquiraai\.com/)
  assert.doesNotMatch(html, /getting_data_in/)
  assert.doesNotMatch(html, /privacy-policy/)
  assert.doesNotMatch(html, /terms-of-service/)
})

test('docs content links do not point at missing top-level routes', () => {
  const welcomeDoc = readFileSync(resolve(root, 'content/docs/welcome.md'), 'utf8')
  const editionsDoc = readFileSync(resolve(root, 'content/docs/editions.md'), 'utf8')

  assert.doesNotMatch(welcomeDoc, /\]\(\/download\)/)
  assert.doesNotMatch(editionsDoc, /\]\(\/pricing\)/)
  assert.match(welcomeDoc, /\]\(\/#download\)/)
  assert.match(editionsDoc, /homepage may hide pricing/)
})

test('public site links to an honest distribution doc and the doc explains the unsigned installer tradeoff', () => {
  const homePage = readFileSync(resolve(root, 'app/pages/index.vue'), 'utf8')
  const landing = readLandingContent()
  const navBar = readFileSync(resolve(root, 'app/components/AppNavbar.vue'), 'utf8')
  const welcomeDoc = readFileSync(resolve(root, 'content/docs/welcome.md'), 'utf8')
  const distributionDoc = readFileSync(resolve(root, 'content/docs/getting-started/distribution.md'), 'utf8')
  const installerScript = readFileSync(resolve(root, 'public/install.sh'), 'utf8')

  assert.match(homePage, /id="top"/)
  assert.match(homePage, /href="\/#top" class="flex items-center gap-3"/)
  assert.match(navBar, /href="\/#top" class="flex items-center gap-3"/)
  assert.equal(landing.download.distributionLink.href, '/docs/getting-started/distribution')
  assert.equal(landing.download.mac.title, 'Download for macOS')
  assert.match(homePage, /curl -fsSL https:\/\/inquiraai\.com\/install\.sh \| bash/)
  assert.equal(landing.download.dialog.stepsTitle, 'What the script does')
  assert.match(landing.download.dialog.steps.join('\n'), /Installs Inquira through Homebrew and, if you approve, gives macOS the manual permission it needs to run the app without Apple['’]s paid developer ID\./)
  assert.match(homePage, /event\.key === 'Escape'/)
  assert.doesNotMatch(homePage, /Guided shell installer/)
  assert.equal(landing.download.windows.title, 'Download for Windows')
  assert.match(welcomeDoc, /\/docs\/getting-started\/distribution/)
  assert.match(distributionDoc, /single developer/i)
  assert.match(distributionDoc, /limited funds/i)
  assert.match(distributionDoc, /build from source/i)
  assert.match(distributionDoc, /paid developer program/i)
  assert.match(distributionDoc, /paid distribution gate/i)
  assert.match(landing.download.dialog.futurePlanLink.href, /why-apple-gatekeeping-makes-this-harder/)
  assert.match(distributionDoc, /curl -fsSL https:\/\/inquiraai\.com\/install\.sh \| bash/)
  assert.match(installerScript, /brew tap "\$\{TAP_NAME\}"/)
  assert.match(installerScript, /xattr -dr com\.apple\.quarantine/)
  assert.match(installerScript, /Do you want to run xattr -dr/)
})

test('landing and docs highlight editable local Python workflows', () => {
  const landing = readLandingContent()
  const welcomeDoc = readFileSync(resolve(root, 'content/docs/welcome.md'), 'utf8')
  const workspaceDoc = readFileSync(resolve(root, 'content/docs/features/workspace.md'), 'utf8')
  const landingFeatures = [
    ...landing.features.productDemos,
    ...landing.features.secondaryFeatures
  ]
  const landingFeatureCopy = landingFeatures.map((feature) => feature.summary).join('\n')
  const landingCopy = [
    landing.hero.badge,
    landing.hero.title,
    landing.hero.highlight,
    landing.hero.description,
    landing.features.title,
    landing.features.description,
    landingFeatureCopy,
  ].join('\n')

  assert.match(landing.hero.description, /Python you can read, edit, and rerun/)
  assert.match(landingCopy, /reviewable Python/)
  assert.match(landingCopy, /saved artifacts/)
  assert.match(landingFeatureCopy, /data-aware autocomplete/)
  assert.match(landingFeatureCopy, /Compare agent code with your edits/)
  assert.match(landingFeatureCopy, /sync table names/)
  assert.match(landingFeatureCopy, /export \.py files/)
  assert.match(landingFeatures.map((feature) => feature.title).join('\n'), /Power-User Controls/)
  assert.match(landingFeatureCopy, /built-in workspace terminal/)
  assert.doesNotMatch(landingCopy, /0\s*Cloud Dependencies/)

  assert.match(welcomeDoc, /not a black-box data chatbot/)
  assert.match(welcomeDoc, /inspectable Python workflow/)
  assert.match(welcomeDoc, /agent-generated and user-edited code/)
  assert.match(welcomeDoc, /OpenRouter, direct provider keys, or local Ollama setups/)
  assert.match(workspaceDoc, /Switch between agent and edited versions/)
  assert.match(workspaceDoc, /Run selected snippets/)
})

test('how it works section follows the inspect-edit-run onboarding flow', () => {
  const landing = readLandingContent()
  const flowText = [
    landing.howItWorks.title,
    landing.howItWorks.description,
    ...landing.howItWorks.steps.flatMap((step) => [step.title, step.description])
  ].join('\n')

  assert.match(flowText, /Four Steps to Reproducible Local Analysis/)
  assert.match(flowText, /Create a Workspace/)
  assert.match(flowText, /Add an API Key/)
  assert.match(flowText, /Add Datasets/)
  assert.match(flowText, /Ask, Edit, and Run/)
  assert.match(flowText, /Connect the model provider you want to use/)
  assert.match(flowText, /inspect the generated Python/)
  assert.match(flowText, /rerun locally/)
})

test('docs navigation labels the first-run guide as installation', () => {
  const floatingNav = readFileSync(resolve(root, 'app/components/FloatingNav.vue'), 'utf8')
  const docsContent = readFileSync(resolve(root, 'app/components/docs/DocsContent.vue'), 'utf8')
  const docsSidebar = readFileSync(resolve(root, 'app/components/docs/DocsSidebar.vue'), 'utf8')
  const installationDoc = readFileSync(resolve(root, 'content/docs/getting-started/installation.md'), 'utf8')

  for (const source of [floatingNav, docsContent, docsSidebar]) {
    assert.match(source, /label: 'Installation'/)
    assert.doesNotMatch(source, /label: 'Getting Data In'/)
  }
  assert.match(installationDoc, /title: Installation and First Run/)
  assert.match(installationDoc, /inspect-edit-rerun loop/)
})
