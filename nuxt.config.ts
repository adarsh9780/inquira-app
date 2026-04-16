// https://nuxt.com/docs/api/configuration/nuxt-config
const cloudflareD1Binding = process.env.NUXT_CLOUDFLARE_D1_BINDING || ''
const isCloudflareWorkerBuild =
  process.env.NITRO_PRESET === 'cloudflare_module' || cloudflareD1Binding.length > 0

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Inquira-CE',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'theme-color', content: '#0f172a', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { name: 'application-name', content: 'Inquira-CE' },
        { name: 'apple-mobile-web-app-title', content: 'Inquira-CE' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/inquira-mark.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/brand/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/brand/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/brand/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
  nitro: {
    preset: isCloudflareWorkerBuild ? 'cloudflare_module' : undefined,
    prerender: {
      autoSubfolderIndex: false
    },
    cloudflare: {
      nodeCompat: true
    }
  },
  content: {
    ...(cloudflareD1Binding
      ? {
          database: {
            type: 'd1',
            bindingName: cloudflareD1Binding
          }
        }
      : {}),
    build: {
      markdown: {
        highlight: {
          theme: 'github-light'
        }
      }
    }
  },
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  runtimeConfig: {
    public: {
      showPricing: process.env.NUXT_PUBLIC_SHOW_PRICING || 'false',
      downloadsManifestUrl: process.env.NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL || 'https://downloads.inquiraai.com/latest.json',
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  }
})
