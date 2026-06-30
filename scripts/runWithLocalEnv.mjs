import { spawnSync } from 'node:child_process'
import { loadLocalEnvFile } from './loadLocalEnv.mjs'

loadLocalEnvFile()

const [command, ...args] = process.argv.slice(2)
if (!command) {
  throw new Error('Missing command to run')
}

const result = spawnSync(command, args, {
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit'
})

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
