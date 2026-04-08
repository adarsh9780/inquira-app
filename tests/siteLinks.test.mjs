import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

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
  assert.match(editionsDoc, /\]\(\/#pricing\)/)
})

test('public site links to an honest distribution doc and the doc explains the unsigned installer tradeoff', () => {
  const homePage = readFileSync(resolve(root, 'app/pages/index.vue'), 'utf8')
  const navBar = readFileSync(resolve(root, 'app/components/AppNavbar.vue'), 'utf8')
  const welcomeDoc = readFileSync(resolve(root, 'content/docs/welcome.md'), 'utf8')
  const distributionDoc = readFileSync(resolve(root, 'content/docs/getting-started/distribution.md'), 'utf8')
  const installerScript = readFileSync(resolve(root, 'public/install.sh'), 'utf8')

  assert.match(homePage, /id="top"/)
  assert.match(homePage, /href="\/#top" class="flex items-center gap-3"/)
  assert.match(navBar, /href="\/#top" class="flex items-center gap-3"/)
  assert.match(homePage, /\/docs\/getting-started\/distribution/)
  assert.match(homePage, /Download for macOS/)
  assert.match(homePage, /curl -fsSL https:\/\/inquiraai\.com\/install\.sh \| bash/)
  assert.match(homePage, /What the script does/)
  assert.match(homePage, /Installs Inquira through Homebrew and, if you approve, gives macOS the manual permission it needs to run the app without Apple’s paid developer ID\./)
  assert.match(homePage, /event\.key === 'Escape'/)
  assert.doesNotMatch(homePage, /Guided shell installer/)
  assert.match(homePage, /Download for Windows/)
  assert.match(welcomeDoc, /\/docs\/getting-started\/distribution/)
  assert.match(distributionDoc, /single developer/i)
  assert.match(distributionDoc, /limited funds/i)
  assert.match(distributionDoc, /build from source/i)
  assert.match(distributionDoc, /paid developer program/i)
  assert.match(distributionDoc, /paid distribution gate/i)
  assert.match(homePage, /why-apple-gatekeeping-makes-this-harder/)
  assert.match(distributionDoc, /curl -fsSL https:\/\/inquiraai\.com\/install\.sh \| bash/)
  assert.match(installerScript, /brew tap "\$\{TAP_NAME\}"/)
  assert.match(installerScript, /xattr -dr com\.apple\.quarantine/)
  assert.match(installerScript, /Do you want to run xattr -dr/)
})

test('landing and docs highlight the expanded model, editor, and power-user feature set', () => {
  const homePage = readFileSync(resolve(root, 'app/pages/index.vue'), 'utf8')
  const welcomeDoc = readFileSync(resolve(root, 'content/docs/welcome.md'), 'utf8')

  assert.match(homePage, /Ollama-hosted local models/)
  assert.match(homePage, /100\+ providers through OpenRouter/)
  assert.match(homePage, /data-aware autocomplete/)
  assert.match(homePage, /slash commands/)
  assert.match(homePage, /Power-User Controls/)
  assert.match(homePage, /Built-in terminal access/)

  assert.match(welcomeDoc, /supports Ollama-hosted local models/)
  assert.match(welcomeDoc, /100\+ providers through BYOK via OpenRouter/)
  assert.match(welcomeDoc, /data-aware autocomplete suggestions/)
  assert.match(welcomeDoc, /built-in `\/` commands/)
  assert.match(welcomeDoc, /define their own commands/)
  assert.match(welcomeDoc, /extra control, manual execution, and debugging/)
})

test('how it works section follows the workspace-to-analysis onboarding flow', () => {
  const homePage = readFileSync(resolve(root, 'app/pages/index.vue'), 'utf8')

  assert.match(homePage, /Four Steps to AI-Powered Insights/)
  assert.match(homePage, /Create a Workspace/)
  assert.match(homePage, /Add an API Key/)
  assert.match(homePage, /Add Datasets/)
  assert.match(homePage, /Analyze Your Data/)
  assert.match(homePage, /Connect the model provider you want to use/)
})
