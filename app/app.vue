<template>
  <div>
    <!-- Skip to content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
    >
      Skip to content
    </a>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <FloatingNav />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    'data-style-theme': 'glass'
  }
})

onMounted(() => {
  if (typeof window === 'undefined') return
  document.documentElement.setAttribute('data-style-theme', 'glass')
})
</script>
