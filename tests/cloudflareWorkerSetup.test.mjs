import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

test('package scripts include the standalone worker build and deploy flow', () => {
  const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
  assert.equal(packageJson.scripts['build:worker'], 'NUXT_CLOUDFLARE_D1_BINDING=DB NITRO_PRESET=cloudflare_module nuxt build')
  assert.equal(packageJson.scripts['brand:icons'], 'node scripts/generateBrandIcons.mjs')
  assert.equal(packageJson.scripts['content:seed:sql'], 'node scripts/writeContentSeedSql.mjs')
  assert.equal(packageJson.scripts['verify:deployment'], 'node scripts/verifyDeployment.mjs')
  assert.match(packageJson.dependencies['@nuxthub/core'], /^\^0\.10\./)
  assert.match(packageJson.dependencies['nuxt-studio'], /^\^1\.7\./)
  assert.equal(packageJson.optionalDependencies['@oxc-parser/binding-linux-x64-gnu'], '^0.137.0')
  assert.match(packageJson.scripts['deploy:worker'], /npm run content:seed:sql/)
  assert.match(packageJson.scripts['deploy:worker'], /node scripts\/seedRemoteD1\.mjs/)
  assert.match(packageJson.scripts['deploy:worker'], /node scripts\/runWithLocalEnv\.mjs npx wrangler deploy/)
  assert.match(packageJson.scripts['deploy:worker'], /npm run wrangler:config/)
  assert.match(packageJson.scripts['preview:worker'], /node scripts\/runWithLocalEnv\.mjs npx wrangler dev/)
})

test('nuxt config switches content to D1 for Cloudflare worker builds', () => {
  const nuxtConfig = readFileSync(resolve(root, 'nuxt.config.ts'), 'utf8')
  assert.match(nuxtConfig, /'@nuxthub\/core'/)
  assert.match(nuxtConfig, /'nuxt-studio'/)
  assert.match(nuxtConfig, /preset: isCloudflareWorkerBuild \? 'cloudflare_module' : 'node_server'/)
  assert.match(nuxtConfig, /type: 'd1'/)
  assert.match(nuxtConfig, /bindingName: cloudflareD1Binding/)
  assert.match(nuxtConfig, /route: '\/_studio'/)
  assert.match(nuxtConfig, /owner: 'adarsh9780'/)
  assert.match(nuxtConfig, /repo: 'inquira-app'/)
  assert.match(nuxtConfig, /branch: 'master'/)
  assert.match(nuxtConfig, /private: false/)
  assert.match(nuxtConfig, /binding: 'BLOB'/)
  assert.match(nuxtConfig, /dir: '\.data\/studio-media'/)
  assert.match(nuxtConfig, /publicUrl: studioMediaPublicUrl/)
  assert.match(nuxtConfig, /nodeCompat: true/)
  assert.match(nuxtConfig, /title: 'Inquira-CE'/)
  assert.match(nuxtConfig, /application-name', content: 'Inquira-CE'/)
  assert.match(nuxtConfig, /apple-touch-icon/)
  assert.match(nuxtConfig, /site\.webmanifest/)
})

test('wrangler config generator writes the worker, custom domains, assets, and D1 settings', () => {
  const script = readFileSync(resolve(root, 'scripts/writeWranglerConfig.mjs'), 'utf8')
  assert.match(script, /main = "\.output\/server\/index\.mjs"/)
  assert.match(script, /CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS/)
  assert.match(script, /\[\[routes\]\]/)
  assert.match(script, /custom_domain = true/)
  assert.match(script, /\[assets\]/)
  assert.match(script, /\[\[d1_databases\]\]/)
  assert.match(script, /binding = "DB"/)
  assert.match(script, /\[\[r2_buckets\]\]/)
  assert.match(script, /binding = "BLOB"/)
  assert.match(script, /CLOUDFLARE_R2_MEDIA_BUCKET_NAME/)
  assert.match(script, /STUDIO_MEDIA_PUBLIC_URL/)
  assert.match(script, /import \{ loadLocalEnvFile \} from '\.\/loadLocalEnv\.mjs'/)
  assert.match(script, /loadLocalEnvFile\(\)/)
  assert.match(script, /\[vars\]/)
})

test('local env loader supports .env files without overriding shell variables', () => {
  const script = readFileSync(resolve(root, 'scripts/loadLocalEnv.mjs'), 'utf8')
  assert.match(script, /readFileSync\(envPath, 'utf8'\)/)
  assert.match(script, /process\.env\[name\] !== undefined/)
  assert.match(script, /trimmed\.startsWith\('#'\)/)
})

test('wrangler config generator loads local .env without overriding shell variables', () => {
  const tempDir = mkdtempSync(resolve(tmpdir(), 'inquira-wrangler-'))
  writeFileSync(
    resolve(tempDir, '.env'),
    [
      'CLOUDFLARE_WORKER_NAME=env-worker',
      'CLOUDFLARE_D1_DATABASE_NAME=env-content',
      'CLOUDFLARE_D1_DATABASE_ID=00000000-0000-0000-0000-000000000000',
      'CLOUDFLARE_ACCOUNT_ID=00000000000000000000000000000000',
      'CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS=example.com,www.example.com',
      'CLOUDFLARE_R2_MEDIA_BUCKET_NAME=env-media',
      'STUDIO_MEDIA_PUBLIC_URL=https://media.example.com',
      'SUPABASE_URL=https://supabase.example.com # local comment',
      'SUPABASE_KEY="quoted-key"',
      ''
    ].join('\n'),
    'utf8'
  )

  try {
    execFileSync(process.execPath, [resolve(root, 'scripts/writeWranglerConfig.mjs')], {
      cwd: tempDir,
      env: {
        PATH: process.env.PATH,
        CLOUDFLARE_WORKER_NAME: 'shell-worker'
      },
      stdio: 'pipe'
    })

    const wranglerConfig = readFileSync(resolve(tempDir, 'wrangler.toml'), 'utf8')
    assert.match(wranglerConfig, /name = "shell-worker"/)
    assert.doesNotMatch(wranglerConfig, /name = "env-worker"/)
    assert.match(wranglerConfig, /database_name = "env-content"/)
    assert.match(wranglerConfig, /binding = "BLOB"/)
    assert.match(wranglerConfig, /bucket_name = "env-media"/)
    assert.match(wranglerConfig, /STUDIO_MEDIA_PUBLIC_URL = "https:\/\/media\.example\.com"/)
    assert.match(wranglerConfig, /SUPABASE_URL = "https:\/\/supabase\.example\.com"/)
    assert.match(wranglerConfig, /SUPABASE_KEY = "quoted-key"/)
  } finally {
    rmSync(tempDir, { recursive: true, force: true })
  }
})

test('local Wrangler helper scripts load .env before invoking Wrangler', () => {
  const seedRemoteD1 = readFileSync(resolve(root, 'scripts/seedRemoteD1.mjs'), 'utf8')
  const runWithLocalEnv = readFileSync(resolve(root, 'scripts/runWithLocalEnv.mjs'), 'utf8')

  assert.match(seedRemoteD1, /loadLocalEnvFile\(\)/)
  assert.match(seedRemoteD1, /CLOUDFLARE_D1_DATABASE_NAME/)
  assert.match(seedRemoteD1, /'wrangler', 'd1', 'execute'/)
  assert.match(runWithLocalEnv, /loadLocalEnvFile\(\)/)
  assert.match(runWithLocalEnv, /spawnSync\(command, args/)
})

test('content seed generator expands Nuxt Content dumps into executable SQL', () => {
  const script = readFileSync(resolve(root, 'scripts/writeContentSeedSql.mjs'), 'utf8')
  assert.match(script, /decompressSQLDump/)
  assert.match(script, /makeContentStatementsIdempotent/)
  assert.match(script, /dump\\\..\+\\\.sql/)
  assert.match(script, /content-seed\.sql/)
  assert.match(script, /INSERT OR REPLACE INTO/)
})

test('lockfile includes the Linux oxc-parser binding required by GitHub Actions runners', () => {
  const lockfile = readFileSync(resolve(root, 'package-lock.json'), 'utf8')
  assert.match(lockfile, /node_modules\/@oxc-parser\/binding-linux-x64-gnu/)
})

test('brand icon generator creates browser and desktop assets from the shared SVG', () => {
  const script = readFileSync(resolve(root, 'scripts/generateBrandIcons.mjs'), 'utf8')
  assert.match(script, /qlmanage/)
  assert.match(script, /sips/)
  assert.match(script, /iconutil/)
  assert.match(script, /macos\.iconset/)
  assert.match(script, /inquira-mark\.icns/)
})

test('deploy workflow uses wrangler action against the master branch', () => {
  const workflow = readFileSync(resolve(root, '.github/workflows/deploy-worker.yml'), 'utf8')
  assert.match(workflow, /branches: \["master"\]/)
  assert.match(workflow, /cloudflare\/wrangler-action@v3/)
  assert.match(workflow, /CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS/)
  assert.match(workflow, /CLOUDFLARE_R2_MEDIA_BUCKET_NAME/)
  assert.match(workflow, /STUDIO_MEDIA_PUBLIC_URL/)
  assert.match(workflow, /STUDIO_GITHUB_CLIENT_ID/)
  assert.match(workflow, /STUDIO_GITHUB_CLIENT_SECRET/)
  assert.match(workflow, /STUDIO_GITHUB_MODERATORS/)
  assert.match(workflow, /CLOUDFLARE_ACCOUNT_ID: \$\{\{ vars\.CLOUDFLARE_ACCOUNT_ID \}\}/)
  assert.doesNotMatch(workflow, /CLOUDFLARE_ACCOUNT_ID: \$\{\{ secrets\.CLOUDFLARE_ACCOUNT_ID \}\}/)
  assert.match(workflow, /accountId: \$\{\{ vars\.CLOUDFLARE_ACCOUNT_ID \}\}/)
  assert.match(workflow, /Generate D1 content seed SQL/)
  assert.match(workflow, /Seed D1 content/)
  assert.match(workflow, /wrangler d1 execute/)
  assert.match(workflow, /npm run build:worker/)
  assert.match(workflow, /npm run verify:deployment/)
  assert.match(workflow, /npm run wrangler:config/)
})

test('gitignore keeps the generated wrangler config local', () => {
  const gitignore = readFileSync(resolve(root, '.gitignore'), 'utf8')
  assert.match(gitignore, /wrangler\.toml/)
})

test('brand assets are available for web icons and future desktop packaging', () => {
  const markSvg = readFileSync(resolve(root, 'public/brand/inquira-mark.svg'), 'utf8')
  const appLogo = readFileSync(resolve(root, 'app/components/AppLogo.vue'), 'utf8')
  const manifest = readFileSync(resolve(root, 'public/site.webmanifest'), 'utf8')

  assert.match(markSvg, /Inquira logo mark/)
  assert.match(appLogo, /animateTransform/)
  assert.match(appLogo, /useId\(\)/)
  assert.match(manifest, /"name": "Inquira-CE"/)
  assert.match(manifest, /android-chrome-512x512\.png/)
})

test('studio and media environment variables are documented', () => {
  const readme = readFileSync(resolve(root, 'README.md'), 'utf8')
  const envExample = readFileSync(resolve(root, '.env.example'), 'utf8')

  for (const source of [readme, envExample]) {
    assert.match(source, /CLOUDFLARE_R2_MEDIA_BUCKET_NAME/)
    assert.match(source, /STUDIO_MEDIA_PUBLIC_URL/)
    assert.match(source, /STUDIO_GITHUB_CLIENT_ID/)
    assert.match(source, /STUDIO_GITHUB_CLIENT_SECRET/)
    assert.match(source, /STUDIO_GITHUB_MODERATORS/)
  }

  assert.match(readme, /https:\/\/inquiraai\.com\/__nuxt_studio\/auth\/github/)
  assert.match(readme, /\/_studio/)
})
