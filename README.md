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

## Make Shortcuts

If you prefer `make`, this repository now includes a small wrapper `Makefile` for the main automation steps:

```bash
make test
make build-worker
make deploy-worker
make verify-deployment
```

## Cloudflare Workers

This app is prepared for a standalone Cloudflare Worker deployment backed by static assets and a D1 database for Nuxt Content.

## Brand Assets

The canonical public-site logo assets live under `public/brand/`.

- `public/brand/inquira-mark.svg` is the shared source mark.
- `public/brand/icon-1024.png` is the master raster export for future desktop packaging and splash screens.
- `public/brand/inquira-mark.icns` and `public/brand/macos.iconset/` are generated for future macOS packaging.

Regenerate the browser and desktop icon set with:

```bash
npm run brand:icons
```

Create these resources in Cloudflare:

1. Create the D1 database for docs/content and use binding name `DB`.
2. Keep the R2 bucket that serves `downloads.inquiraai.com`.
3. Reserve the public Worker name, for example `inquira-public`. The Worker itself is created on the first deploy.
4. Reserve the custom domains you want the Worker to own, such as `inquiraai.com` and `www.inquiraai.com`.
5. Reserve `app.inquiraai.com` for future account and billing features.

About the D1 binding name: `DB` is the name your Worker uses to find the database at runtime. Think of it like a variable name injected by Cloudflare. This repo is wired to look for that exact name in the Worker config and Nuxt Content setup, so if you rename the binding to something else, the app will build but the docs queries will not find the database.

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

Important: this repository consumes `latest.json`, but it does not publish that file. A website deploy from `master` updates the site and docs, while download targets only change when the separate release process updates the R2 manifest.

Generate a local Wrangler config after exporting the Cloudflare identifiers:

```bash
npm run wrangler:config
```

Build or deploy the standalone Worker with:

```bash
npm run build:worker
npm run content:seed:sql
npm run deploy:worker
```

Nuxt Content generates compressed SQL dumps during the Worker build. Before a deploy goes live, the D1 database must be seeded from those dumps so `/docs` and other content routes do not 404 on an empty database.

## GitHub Actions Deploy

The repository includes a Worker deployment workflow at
`.github/workflows/deploy-worker.yml`.

Set these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`

Set these GitHub repository variables:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_WORKER_NAME`
- `CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS`
- `CLOUDFLARE_D1_DATABASE_NAME`
- `CLOUDFLARE_D1_DATABASE_ID`
- `NUXT_PUBLIC_SHOW_PRICING`
- `NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL`
- `SUPABASE_URL`
- `SUPABASE_KEY`

Every push to `master` runs the deploy workflow, rebuilds the Worker, regenerates the Nuxt Content SQL dump, seeds D1, deploys the Worker, and then runs a smoke check against the homepage, `/docs`, and the configured download manifest URL.
