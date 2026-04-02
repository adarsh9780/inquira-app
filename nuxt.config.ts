// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-light'
        }
      }
    }
  },
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      showPricing: false,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  }
})