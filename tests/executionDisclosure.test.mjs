import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

test('public docs clearly disclose the local unsandboxed execution boundary', () => {
  const paths = [
    'content/docs/architecture.md',
    'content/docs/legal/terms.md',
    'content/docs/legal/privacy.md',
    'content/docs/welcome.md',
    'content/docs/features/workspace.md',
  ]

  for (const relative of paths) {
    const text = readFileSync(resolve(root, relative), 'utf8').toLowerCase()
    assert.match(
      text,
      /not\s+(?:an operating-system\s+)?sandboxed|not\s+operating-system\s+sandboxes/,
    )
    assert.match(text, /user\s+permissions/)
  }

  const architecture = readFileSync(resolve(root, 'content/docs/architecture.md'), 'utf8')
  assert.doesNotMatch(architecture, /secure sandboxed execution|sandboxed Jupyter/)
})
