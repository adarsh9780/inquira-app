<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
    <div class="mx-auto max-w-6xl px-6">
      <div class="flex h-16 items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="h-8 w-8">
            <defs>
              <linearGradient id="nav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect x="18" y="18" width="164" height="164" fill="#0f172a" rx="34" />
            <g transform="translate(100, 100)">
              <circle r="20" fill="url(#nav-grad)" />
              <g>
                <circle cx="60" cy="0" r="10" fill="#3b82f6" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                </circle>
                <line x1="20" y1="0" x2="50" y2="0" stroke="url(#nav-grad)" stroke-width="4">
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                </line>
              </g>
              <g transform="rotate(120)">
                <circle cx="60" cy="0" r="10" fill="#f97316" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
                </circle>
                <line x1="20" y1="0" x2="50" y2="0" stroke="url(#nav-grad)" stroke-width="4">
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                </line>
              </g>
              <g transform="rotate(240)">
                <circle cx="60" cy="0" r="10" fill="#fb923c" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
                </circle>
                <line x1="20" y1="0" x2="50" y2="0" stroke="url(#nav-grad)" stroke-width="4">
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
                </line>
              </g>
            </g>
          </svg>
          <span class="font-sans text-lg font-semibold">Inquira</span>
        </NuxtLink>

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