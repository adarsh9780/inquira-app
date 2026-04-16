<template>
  <aside class="lg:sticky lg:top-20 lg:h-fit lg:self-start">
    <!-- Mobile Toggle Button -->
    <button
      type="button"
      class="lg:hidden touch-target mb-4 flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-left shadow-sm"
      @click="isExpanded = !isExpanded"
      :aria-expanded="isExpanded"
      aria-controles="docs-sidebar-menu"
    >
      <span class="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Documentation
      </span>
      <svg
        class="h-5 w-5 text-text-secondary transition-transform duration-200"
        :class="{ 'rotate-180': isExpanded }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>

    <!-- Sidebar Menu -->
    <nav
      id="docs-sidebar-menu"
      class="overflow-hidden transition-all duration-300"
      :class="isExpanded ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 lg:max-h-full lg:opacity-100'"
      aria-label="Documentation navigation"
    >
      <div class="pr-6">
        <DocsSearch class="mb-6" />

        <!-- Getting Started -->
        <div class="mb-6">
          <NuxtLink to="/docs" class="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2 hover:text-primary-500">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Getting Started
          </NuxtLink>
          <ul class="ml-5 space-y-1.5 border-l border-border pl-3">
            <li v-for="item in gettingStartedLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="block text-sm py-0.5 transition-colors"
                :class="isActiveLink(item.to) ? 'text-primary-500 font-medium' : 'text-text-muted hover:text-text-primary'"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Features -->
        <div class="mb-6">
          <NuxtLink to="/docs/features/workspace" class="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2 hover:text-primary-500">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Features
          </NuxtLink>
          <ul class="ml-5 space-y-1.5 border-l border-border pl-3">
            <li v-for="item in featuresLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="block text-sm py-0.5 transition-colors"
                :class="isActiveLink(item.to) ? 'text-primary-500 font-medium' : 'text-text-muted hover:text-text-primary'"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Reference -->
        <div class="mb-6">
          <NuxtLink to="/docs/architecture" class="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2 hover:text-primary-500">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Reference
          </NuxtLink>
          <ul class="ml-5 space-y-1.5 border-l border-border pl-3">
            <li v-for="item in referenceLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="block text-sm py-0.5 transition-colors"
                :class="isActiveLink(item.to) ? 'text-primary-500 font-medium' : 'text-text-muted hover:text-text-primary'"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="mb-6">
          <NuxtLink to="/docs/legal/privacy" class="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2 hover:text-primary-500">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Legal
          </NuxtLink>
          <ul class="ml-5 space-y-1.5 border-l border-border pl-3">
            <li v-for="item in legalLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="block text-sm py-0.5 transition-colors"
                :class="isActiveLink(item.to) ? 'text-primary-500 font-medium' : 'text-text-muted hover:text-text-primary'"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const isExpanded = ref(true) // Open by default on desktop

interface NavItem {
  label: string
  to: string
}

const gettingStartedLinks = computed<NavItem[]>(() => [
  { label: 'Welcome', to: '/docs' },
  { label: 'Getting Data In', to: '/docs/getting-started/installation' },
  { label: 'Desktop Distribution', to: '/docs/getting-started/distribution' },
])

const featuresLinks = computed<NavItem[]>(() => [
  { label: 'Workspace', to: '/docs/features/workspace' },
  { label: 'Editions', to: '/docs/editions' },
])

const referenceLinks = computed<NavItem[]>(() => [
  { label: 'Architecture', to: '/docs/architecture' },
  { label: 'Development', to: '/docs/development' },
  { label: 'Auth Strategy', to: '/docs/auth-strategy' },
  { label: 'Contributing', to: '/docs/contributing' },
  { label: 'Roadmap', to: '/docs/roadmap' },
])

const legalLinks = computed<NavItem[]>(() => [
  { label: 'Privacy', to: '/docs/legal/privacy' },
  { label: 'Terms', to: '/docs/legal/terms' },
])

// Check if current route matches a link
const isActiveLink = (path: string): boolean => {
  if (path === '/docs') {
    return route.path === '/docs'
  }
  return route.path.startsWith(path)
}

// Expand sidebar by default on desktop (>= 1024px)
onMounted(() => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1024) {
      isExpanded.value = true
    }
    // Listen for resize
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})

const handleResize = () => {
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
    isExpanded.value = true
  }
}
</script>
