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
  const welcomeDoc = readFileSync(resolve(root, 'content/docs/welcome.md'), 'utf8')
  const distributionDoc = readFileSync(resolve(root, 'content/docs/getting-started/distribution.md'), 'utf8')

  assert.match(homePage, /\/docs\/getting-started\/distribution/)
  assert.match(welcomeDoc, /\/docs\/getting-started\/distribution/)
  assert.match(distributionDoc, /single developer/i)
  assert.match(distributionDoc, /limited funds/i)
  assert.match(distributionDoc, /build from source/i)
  assert.match(distributionDoc, /Apple Developer Program/i)
})
