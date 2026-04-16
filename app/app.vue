<template>
  <div>
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
    'data-style-theme': 'classic'
  }
})

onMounted(() => {
  if (typeof window === 'undefined') return

  const savedStyleTheme = localStorage.getItem('style-theme')
  if (savedStyleTheme === 'classic' || savedStyleTheme === 'glass') {
    document.documentElement.setAttribute('data-style-theme', savedStyleTheme)
  }
})
</script>
