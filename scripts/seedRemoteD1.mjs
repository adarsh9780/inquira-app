import { spawnSync } from 'node:child_process'
import { loadLocalEnvFile } from './loadLocalEnv.mjs'

loadLocalEnvFile()

const databaseName = process.env.CLOUDFLARE_D1_DATABASE_NAME?.trim()
if (!databaseName) {
  throw new Error('Missing required environment variable: CLOUDFLARE_D1_DATABASE_NAME')
}

const result = spawnSync(
  'npx',
  ['wrangler', 'd1', 'execute', databaseName, '--remote', '--file', '.output/content-seed.sql', '--yes'],
  {
    env: process.env,
    shell: process.platform === 'win32',
    stdio: 'inherit'
  }
)

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
