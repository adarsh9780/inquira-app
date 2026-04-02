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

## Cloudflare Pages

This app is prepared for Cloudflare Pages with Nuxt Content. Use the following settings in the Cloudflare dashboard:

- Framework preset: `None`
- Build command: `npm run build:cloudflare`
- Build output directory: `dist`
- Root directory: `/`
- Production branch: `main` or your chosen release branch

Cloudflare Pages also needs a D1 binding named `DB` for `@nuxt/content` to work in the Cloudflare runtime.
Enable the `nodejs_compat` compatibility flag as well; the included `wrangler.toml` captures that repo-side setting.

Recommended environment variables:

- `NUXT_PUBLIC_SHOW_PRICING=false`
- `NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL=https://downloads.inquiraai.com/latest.json`
- `SUPABASE_URL=<your project url>`
- `SUPABASE_KEY=<your anon key>`

The landing page download buttons read `latest.json` from Cloudflare R2 so new desktop releases show up automatically without editing this repo.
