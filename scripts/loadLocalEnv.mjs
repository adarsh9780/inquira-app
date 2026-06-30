import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function parseEnvValue(rawValue) {
  const value = rawValue.trim()
  const quote = value[0]

  if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
    const unquoted = value.slice(1, -1)
    return quote === '"'
      ? unquoted.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
      : unquoted
  }

  return value.replace(/\s+#.*$/, '').trim()
}

export function loadLocalEnvFile(cwd = process.cwd()) {
  const envPath = resolve(cwd, '.env')
  if (!existsSync(envPath)) {
    return
  }

  const envFile = readFileSync(envPath, 'utf8')
  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const normalized = trimmed.startsWith('export ') ? trimmed.slice('export '.length).trimStart() : trimmed
    const separatorIndex = normalized.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const name = normalized.slice(0, separatorIndex).trim()
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) || process.env[name] !== undefined) {
      continue
    }

    process.env[name] = parseEnvValue(normalized.slice(separatorIndex + 1))
  }
}
