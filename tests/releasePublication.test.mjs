import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

test('manual R2 publication targets Inquira Go and publishes latest.json last', () => {
  const source = readFileSync(resolve(root, 'scripts/uploadPublicDownloadsToR2.mjs'), 'utf8')

  assert.match(source, /product: 'inquira-go'/)
  assert.match(source, /github\.com\/adarsh9780\/inquira-go/)
  assert.match(source, /public latest pointer continues to reference the previous complete release/)

  const macOSPayload = source.indexOf('`${versionPrefix}/${macosName}`')
  const windowsPayload = source.indexOf('`${versionPrefix}/${windowsName}`')
  const versionManifest = source.indexOf('`${versionPrefix}/manifest.json`')
  const latestManifest = source.lastIndexOf("{ relativePath: 'latest.json'")

  assert.ok(macOSPayload >= 0)
  assert.ok(windowsPayload > macOSPayload)
  assert.ok(versionManifest > windowsPayload)
  assert.ok(latestManifest > versionManifest)
})
