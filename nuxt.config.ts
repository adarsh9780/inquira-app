// https://nuxt.com/docs/api/configuration/nuxt-config
const cloudflareD1Binding = process.env.NUXT_CLOUDFLARE_D1_BINDING || ''
const isCloudflareWorkerBuild =
  process.env.NITRO_PRESET === 'cloudflare_module' || cloudflareD1Binding.length > 0

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
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
