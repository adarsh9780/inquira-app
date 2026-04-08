<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
    <div class="mx-auto max-w-6xl px-6">
      <div class="flex h-16 items-center justify-between">
        <a href="/#top" class="flex items-center gap-3">
          <AppLogo />
        </a>

        <div class="hidden items-center gap-8 md:flex">
          <a href="/#features" class="text-sm font-medium text-gray-600 transition-colors">Features</a>
          <a href="/#how-it-works" class="text-sm font-medium text-gray-600 transition-colors">How It Works</a>
          <a v-if="showPricing" href="/#pricing" class="text-sm font-medium text-gray-600 transition-colors">Pricing</a>
          <a href="/docs" class="text-sm font-medium text-gray-900 transition-colors">Docs</a>
        </div>

        <div class="flex items-center gap-3">
          <a href="https://github.com/adarsh9780/inquira-ce" target="_blank" class="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors sm:block">GitHub</a>
          <a href="/#download" class="btn rounded-lg px-4 py-2 text-sm font-medium">Download</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { isPricingEnabled } from '~/utils/publicDownloads.js'

const config = useRuntimeConfig()
const showPricing = computed(() => isPricingEnabled(config.public.showPricing))
</script>
