# Inquira Public Site

Nuxt 4 application for the public Inquira landing page and documentation.

## Local Development

Use Node.js 24 LTS. If you use `nvm`, run:

```bash
nvm use
```

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
3. Create the Nuxt Studio media R2 bucket, defaulting to `inquira-public-media`, and bind it as `BLOB`.
4. Serve Studio media from `https://media.inquiraai.com`.
5. Reserve the public Worker name, for example `inquira-public`. The Worker itself is created on the first deploy.
6. Reserve the custom domains you want the Worker to own, such as `inquiraai.com` and `www.inquiraai.com`.
7. Reserve `app.inquiraai.com` for future account and billing features.

About the D1 binding name: `DB` is the name your Worker uses to find the database at runtime. Think of it like a variable name injected by Cloudflare. This repo is wired to look for that exact name in the Worker config and Nuxt Content setup, so if you rename the binding to something else, the app will build but the docs queries will not find the database.

About the Studio media binding name: `BLOB` is the R2 binding Nuxt Studio uses for uploaded screenshots, videos, and GIFs. Keep large media in that bucket rather than committing it to Git.

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
- `CLOUDFLARE_R2_MEDIA_BUCKET_NAME=inquira-public-media`
- `CLOUDFLARE_ACCOUNT_ID=<cloudflare account id>`
- `STUDIO_MEDIA_PUBLIC_URL=https://media.inquiraai.com`
- `STUDIO_GITHUB_CLIENT_ID=<github oauth client id>`
- `STUDIO_GITHUB_CLIENT_SECRET=<github oauth client secret>`
- `STUDIO_GITHUB_MODERATORS=adarshmaurya7@gmail.com`

The landing page download buttons read `latest.json` from Cloudflare R2 so new desktop releases show up automatically without editing this repo.

Important: this repository consumes `latest.json`, but it does not publish that file. A website deploy from `master` updates the site and docs, while download targets only change when the separate release process updates the R2 manifest.

## Nuxt Studio

Nuxt Studio is enabled at `/_studio` for direct content editing. It is intentionally not linked in the public navigation.

Studio uses GitHub OAuth and publishes directly to `adarsh9780/inquira-app#master`. Create a GitHub OAuth app with this callback URL:

```text
https://inquiraai.com/__nuxt_studio/auth/github
```

Set the OAuth credentials as GitHub Actions secrets for production builds and as Cloudflare Worker secrets for runtime authentication:

```bash
npx wrangler secret put STUDIO_GITHUB_CLIENT_ID
npx wrangler secret put STUDIO_GITHUB_CLIENT_SECRET
npx wrangler secret put STUDIO_GITHUB_MODERATORS
```

Use `STUDIO_GITHUB_MODERATORS=adarshmaurya7@gmail.com` unless you intentionally want to grant another GitHub account editor access.

For local deploy checks, copy `.env.example` to `.env` and fill in your Cloudflare identifiers. The Wrangler config generator loads `.env` automatically, while still letting shell-exported variables override local file values.

Generate a local Wrangler config with:

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
- `STUDIO_GITHUB_CLIENT_ID`
- `STUDIO_GITHUB_CLIENT_SECRET`

Set these GitHub repository variables:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_WORKER_NAME`
- `CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS`
- `CLOUDFLARE_D1_DATABASE_NAME`
- `CLOUDFLARE_D1_DATABASE_ID`
- `CLOUDFLARE_R2_MEDIA_BUCKET_NAME`
- `NUXT_PUBLIC_SHOW_PRICING`
- `NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL`
- `STUDIO_MEDIA_PUBLIC_URL`
- `STUDIO_GITHUB_MODERATORS`
- `SUPABASE_URL`
- `SUPABASE_KEY`

Every push to `master` runs the deploy workflow, rebuilds the Worker, regenerates the Nuxt Content SQL dump, seeds D1, deploys the Worker, and then runs a smoke check against the homepage, `/docs`, and the configured download manifest URL.
