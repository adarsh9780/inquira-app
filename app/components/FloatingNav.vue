<template>
   <!-- Floating Action Button -->
   <button
     type="button"
     class="fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg active:scale-95 transition-transform hover:bg-primary-600 app-fab-motion lg:hidden"
     :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
     aria-controls="floating-nav-drawer"
     @click="isOpen = !isOpen"
   >
    <svg v-if="!isOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Overlay -->
  <div
    v-if="isOpen"
    class="app-overlay-surface fixed inset-0 z-40"
    @click="isOpen = false"
  ></div>

  <!-- Drawer -->
  <div
    v-if="isOpen"
    id="floating-nav-drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
    class="app-sidebar-surface fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] mx-auto w-full max-w-lg overflow-y-auto rounded-t-3xl border-t shadow-2xl"
  >
    <!-- Header with Tabs -->
    <div class="sticky top-0 flex items-center justify-between bg-surface border-b border-border px-2">
      <div class="flex gap-1">
        <button
          type="button"
          class="flex-1 min-w-[100px] py-4 text-sm font-semibold transition-colors border-b-2 focus:outline-none"
          :class="activeTab === 'home' ? 'border-primary-500 text-primary-500' : 'border-transparent text-text-muted hover:text-text-primary'"
          @click="activeTab = 'home'"
        >
          Home
        </button>
        <button
          type="button"
          class="flex-1 min-w-[100px] py-4 text-sm font-semibold transition-colors border-b-2 focus:outline-none"
          :class="activeTab === 'docs' ? 'border-primary-500 text-primary-500' : 'border-transparent text-text-muted hover:text-text-primary'"
          @click="activeTab = 'docs'"
        >
          Documentation
        </button>
      </div>
      <button
        type="button"
         class="touch-target ml-2 flex shrink-0 items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500"
        aria-label="Close menu"
        @click="isOpen = false"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="p-4">
      <!-- Home Tab Content -->
      <div v-if="activeTab === 'home'" class="space-y-1">
        <NuxtLink
          v-for="item in homeLinks"
          :key="item.href"
          :to="item.href"
          class="block rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98]"
          @click="isOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Docs Tab Content -->
      <div v-else class="space-y-1">
        <NuxtLink
          v-for="item in docsLinks"
          :key="item.to"
          :to="item.to"
          class="block rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98]"
          :class="isActiveDocLink(item.to) ? 'bg-selected-bg text-primary-600 font-medium' : ''"
          @click="isOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router/auto'
import { useRuntimeConfig } from '#app'

const route = useRoute()
const config = useRuntimeConfig()
const showPricing = computed(() => config.public.showPricing === 'true')

const isOpen = ref(false)

// Close on Escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Lock body scroll when open
watch(isOpen, (open) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

// Determine default tab based on current route
const isDocsRoute = computed(() => route.path.startsWith('/docs'))
const activeTab = ref(isDocsRoute.value ? 'docs' : 'home')

// When drawer opens, ensure tab matches current route
watch(isOpen, (open) => {
  if (open) {
    activeTab.value = isDocsRoute.value ? 'docs' : 'home'
  }
})

// Optional: switch tab while open if route changes (e.g., clicking within same tab)
watch(() => route.path, () => {
  if (isOpen.value) {
    activeTab.value = route.path.startsWith('/docs') ? 'docs' : 'home'
  }
})

// Home navigation links
const homeLinks = computed(() => {
  const links = [
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Download', href: '/#download' },
  ]
  if (showPricing.value) {
    links.splice(2, 0, { label: 'Pricing', href: '/#pricing' })
  }
  return links
})

// Docs navigation links (flattened from DocsSidebar)
const docsLinks = computed(() => [
  { label: 'Welcome', to: '/docs' },
  { label: 'Getting Data In', to: '/docs/getting-started/installation' },
  { label: 'Desktop Distribution', to: '/docs/getting-started/distribution' },
  { label: 'Workspace', to: '/docs/features/workspace' },
  { label: 'Editions', to: '/docs/editions' },
  { label: 'Architecture', to: '/docs/architecture' },
  { label: 'Development', to: '/docs/development' },
  { label: 'Auth Strategy', to: '/docs/auth-strategy' },
  { label: 'Contributing', to: '/docs/contributing' },
  { label: 'Roadmap', to: '/docs/roadmap' },
  { label: 'Privacy Policy', to: '/docs/legal/privacy' },
  { label: 'Terms of Service', to: '/docs/legal/terms' },
])

const isActiveDocLink = (path: string): boolean => {
  if (path === '/docs') {
    return route.path === '/docs'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
/* Smooth transitions */
button,
.nav-link {
  transition: all var(--motion-fast) var(--ease-standard);
}

.app-fab-motion {
  transition:
    transform var(--motion-fast) var(--ease-standard),
    background-color var(--motion-fast) var(--ease-standard);
}
</style>
