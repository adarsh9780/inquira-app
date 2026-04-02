# Inquira Public Site

Nuxt 4 application for the public Inquira landing page and documentation.

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```

## Standard Build

```bash
npm run build
```

## Cloudflare Workers

This app is prepared for a standalone Cloudflare Worker deployment backed by static assets and a D1 database for Nuxt Content.

Create these resources in Cloudflare:

1. Create the D1 database for docs/content and use binding name `DB`.
2. Keep the R2 bucket that serves `downloads.inquiraai.com`.
3. Reserve the public Worker name, for example `inquira-public`. The Worker itself is created on the first deploy.
4. Reserve the custom domains you want the Worker to own, such as `inquiraai.com` and `www.inquiraai.com`.
5. Reserve `app.inquiraai.com` for future account and billing features.

Recommended environment variables:

- `NUXT_PUBLIC_SHOW_PRICING=false`
- `NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL=https://downloads.inquiraai.com/latest.json`
- `NUXT_CLOUDFLARE_D1_BINDING=DB`
- `SUPABASE_URL=<your project url>`
- `SUPABASE_KEY=<your anon key>`
- `CLOUDFLARE_WORKER_NAME=<worker name>`
- `CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS=inquiraai.com,www.inquiraai.com`
- `CLOUDFLARE_D1_DATABASE_NAME=<d1 database name>`
- `CLOUDFLARE_D1_DATABASE_ID=<d1 database id>`
- `CLOUDFLARE_ACCOUNT_ID=<cloudflare account id>`

The landing page download buttons read `latest.json` from Cloudflare R2 so new desktop releases show up automatically without editing this repo.

Generate a local Wrangler config after exporting the Cloudflare identifiers:

```bash
npm run wrangler:config
```

Build or deploy the standalone Worker with:

```bash
npm run build:worker
npm run deploy:worker
```

## GitHub Actions Deploy

The repository includes a Worker deployment workflow at
`.github/workflows/deploy-worker.yml`.

Set these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Set these GitHub repository variables:

- `CLOUDFLARE_WORKER_NAME`
- `CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS`
- `CLOUDFLARE_D1_DATABASE_NAME`
- `CLOUDFLARE_D1_DATABASE_ID`
- `NUXT_PUBLIC_SHOW_PRICING`
- `NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL`
- `SUPABASE_URL`
- `SUPABASE_KEY`
