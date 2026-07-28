import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

test('public install script downloads verifies and installs the current Inquira Go DMG', () => {
  const script = readFileSync(resolve(root, 'public/install.sh'), 'utf8')

  assert.match(script, /trap cleanup EXIT/)
  assert.match(script, /https:\/\/downloads\.inquiraai\.com\/latest\.json/)
  assert.match(script, /manifest_value macos_arm64_url/)
  assert.match(script, /manifest_value macos_arm64_sha256/)
  assert.match(script, /shasum -a 256/)
  assert.match(script, /hdiutil attach/)
  assert.match(script, /ditto "\$SOURCE_APP" "\$APP_PATH"/)
  assert.match(script, /rm -rf "\$\{TMP_DIR\}"/)
  assert.match(script, /read -r -p "\$\{question\} \[y\/N\] " reply < \/dev\/tty/)
  assert.match(script, /Remove the quarantine attribute from \$\{APP_NAME\}\?/)
  assert.match(script, /Rerun this installer command/)
  assert.match(script, /sudo rm -rf "\$\{APP_PATH\}"/)
  assert.doesNotMatch(script, /brew install/)
})
