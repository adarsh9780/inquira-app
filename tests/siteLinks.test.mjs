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
