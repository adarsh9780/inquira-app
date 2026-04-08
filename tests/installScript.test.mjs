import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

test('public install script prompts from the terminal, bootstraps temporary gum, and documents upgrades and uninstalls', () => {
  const script = readFileSync(resolve(root, 'public/install.sh'), 'utf8')

  assert.match(script, /trap cleanup EXIT/)
  assert.match(script, /https:\/\/github\.com\/charmbracelet\/gum\/releases\/download/)
  assert.match(script, /rm -rf "\$\{TMP_DIR\}"/)
  assert.match(script, /read -r -p "\$\{question\} \[y\/N\] " reply < \/dev\/tty/)
  assert.match(script, /"\$GUM_BIN" confirm "\$question" < \/dev\/tty > \/dev\/tty/)
  assert.match(script, /Do you want to run xattr -dr com\.apple\.quarantine on \$\{APP_NAME\}\?/)
  assert.match(script, /brew upgrade --cask \$\{CASK_NAME\}/)
  assert.match(script, /brew uninstall --cask \$\{CASK_NAME\}/)
})
