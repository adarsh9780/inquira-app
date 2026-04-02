import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

function requireEnv(name) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function optionalEnv(name) {
  const value = process.env[name]?.trim()
  return value || ''
}

function quote(value) {
  return JSON.stringify(value)
}

function optionalListEnv(name) {
  return optionalEnv(name)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

function buildWranglerConfig() {
  const workerName = requireEnv('CLOUDFLARE_WORKER_NAME')
  const databaseName = requireEnv('CLOUDFLARE_D1_DATABASE_NAME')
  const databaseId = requireEnv('CLOUDFLARE_D1_DATABASE_ID')
  const accountId = optionalEnv('CLOUDFLARE_ACCOUNT_ID')
  const customDomainPatterns = optionalListEnv('CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS')
  const showPricing = optionalEnv('NUXT_PUBLIC_SHOW_PRICING') || 'false'
  const downloadsManifestUrl =
    optionalEnv('NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL') || 'https://downloads.inquiraai.com/latest.json'
  const supabaseUrl = optionalEnv('SUPABASE_URL')
  const supabaseKey = optionalEnv('SUPABASE_KEY')

  const lines = [
    `name = ${quote(workerName)}`,
    'main = ".output/server/index.mjs"',
    'compatibility_date = "2025-07-15"',
    'compatibility_flags = ["nodejs_compat"]',
    'workers_dev = true',
    'preview_urls = true',
  ]

  if (accountId) {
    lines.push(`account_id = ${quote(accountId)}`)
  }

  for (const pattern of customDomainPatterns) {
    lines.push('', '[[routes]]', `pattern = ${quote(pattern)}`, 'custom_domain = true')
  }

  lines.push(
    '',
    '[assets]',
    'directory = ".output/public"',
    '',
    '[observability]',
    'enabled = true',
    '',
    '[[d1_databases]]',
    'binding = "DB"',
    `database_name = ${quote(databaseName)}`,
    `database_id = ${quote(databaseId)}`,
    '',
    '[vars]',
    `NUXT_PUBLIC_SHOW_PRICING = ${quote(showPricing)}`,
    `NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL = ${quote(downloadsManifestUrl)}`,
  )

  if (supabaseUrl) {
    lines.push(`SUPABASE_URL = ${quote(supabaseUrl)}`)
  }
  if (supabaseKey) {
    lines.push(`SUPABASE_KEY = ${quote(supabaseKey)}`)
  }

  lines.push('')
  return `${lines.join('\n')}`
}

const target = resolve(process.cwd(), 'wrangler.toml')
writeFileSync(target, buildWranglerConfig(), 'utf8')
console.log(`Generated ${target}`)
