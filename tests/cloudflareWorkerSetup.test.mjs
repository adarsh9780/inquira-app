import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

test('package scripts include the standalone worker build and deploy flow', () => {
  const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
  assert.equal(packageJson.scripts['build:worker'], 'NUXT_CLOUDFLARE_D1_BINDING=DB NITRO_PRESET=cloudflare_module nuxt build')
  assert.equal(packageJson.scripts['brand:icons'], 'node scripts/generateBrandIcons.mjs')
  assert.equal(packageJson.scripts['content:seed:sql'], 'node scripts/writeContentSeedSql.mjs')
  assert.match(packageJson.scripts['deploy:worker'], /npm run content:seed:sql/)
  assert.match(packageJson.scripts['deploy:worker'], /wrangler d1 execute/)
  assert.match(packageJson.scripts['deploy:worker'], /npm run wrangler:config/)
  assert.match(packageJson.scripts['preview:worker'], /wrangler dev/)
})

test('nuxt config switches content to D1 for Cloudflare worker builds', () => {
  const nuxtConfig = readFileSync(resolve(root, 'nuxt.config.ts'), 'utf8')
  assert.match(nuxtConfig, /preset: isCloudflareWorkerBuild \? 'cloudflare_module' : undefined/)
  assert.match(nuxtConfig, /type: 'd1'/)
  assert.match(nuxtConfig, /bindingName: cloudflareD1Binding/)
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
  assert.match(script, /\[vars\]/)
})

test('content seed generator expands Nuxt Content dumps into executable SQL', () => {
  const script = readFileSync(resolve(root, 'scripts/writeContentSeedSql.mjs'), 'utf8')
  assert.match(script, /decompressSQLDump/)
  assert.match(script, /dump\\\..\+\\\.sql/)
  assert.match(script, /content-seed\.sql/)
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
  assert.match(workflow, /Generate D1 content seed SQL/)
  assert.match(workflow, /Seed D1 content/)
  assert.match(workflow, /wrangler d1 execute/)
  assert.match(workflow, /npm run build:worker/)
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
  assert.match(appLogo, /\/brand\/inquira-mark\.svg/)
  assert.match(manifest, /"name": "Inquira-CE"/)
  assert.match(manifest, /android-chrome-512x512\.png/)
})
