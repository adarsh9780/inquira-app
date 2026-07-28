import test from 'node:test'
import assert from 'node:assert/strict'

import {
  fallbackDownloadManifest,
  getDownloadUrl,
  isPricingEnabled,
  normalizeDownloadManifest,
} from '../app/utils/publicDownloads.js'

test('normalizeDownloadManifest falls back to public distribution guidance when manifest is missing', () => {
  const manifest = normalizeDownloadManifest(null)
  assert.equal(manifest.version, 'latest')
  assert.match(manifest.macosArm64Url, /inquiraai\.com\/docs\/getting-started\/distribution$/)
  assert.match(manifest.windowsX64Url, /inquiraai\.com\/docs\/getting-started\/distribution$/)
})

test('normalizeDownloadManifest preserves public R2 URLs from latest.json', () => {
  const manifest = normalizeDownloadManifest({
    version: '0.5.27',
    macos_arm64_url: 'https://downloads.inquiraai.com/v0.5.27/Inquira_0.5.27_aarch64.dmg',
    windows_x64_url: 'https://downloads.inquiraai.com/v0.5.27/Inquira_0.5.27_x64-setup.exe',
    published_at: '2026-04-03T00:00:00Z',
    release_notes_url: 'https://github.com/adarsh9780/inquira-ee/releases/tag/v0.5.27',
  })
  assert.equal(manifest.version, '0.5.27')
  assert.match(manifest.macosArm64Url, /downloads\.inquiraai\.com\/v0\.5\.27/)
  assert.match(manifest.windowsX64Url, /downloads\.inquiraai\.com\/v0\.5\.27/)
  assert.equal(getDownloadUrl(manifest, 'macOS'), manifest.macosArm64Url)
  assert.equal(getDownloadUrl(manifest, 'Windows'), manifest.windowsX64Url)
})

test('isPricingEnabled only enables pricing for explicit true values', () => {
  assert.equal(isPricingEnabled(true), true)
  assert.equal(isPricingEnabled('true'), true)
  assert.equal(isPricingEnabled(false), false)
  assert.equal(isPricingEnabled('false'), false)
  assert.equal(isPricingEnabled(undefined), false)
  assert.deepEqual(fallbackDownloadManifest().version, 'latest')
})
