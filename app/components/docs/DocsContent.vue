<template>
  <div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 py-10">
    <div class="lg:flex lg:gap-12">
      <!-- Sidebar -->
      <aside class="hidden lg:block lg:w-[240px] lg:shrink-0">
        <nav id="docs-sidebar-menu" aria-label="Documentation navigation">
          <div class="lg:sticky lg:top-20">
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

      <!-- Main + TOC area -->
      <div class="min-w-0 flex-1">
        <div class="xl:flex xl:gap-12">
          <!-- Main Content -->
          <main id="main-content" class="min-w-0 max-w-none xl:max-w-[720px] xl:flex-1">
            <!-- Breadcrumbs -->
            <DocsBreadcrumb />

            <article class="prose prose-slate max-w-none">
              <slot name="content" />
            </article>

            <!-- Prev/Next Navigation -->
            <nav class="mt-12 flex items-center justify-between border-t border-border pt-6">
              <NuxtLink
                v-if="prev"
                :to="prev.path"
                class="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary-500 transition-colors active:scale-[0.98]"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                {{ prev.title }}
              </NuxtLink>
              <div v-else class="flex-1"></div>

              <NuxtLink
                v-if="next"
                :to="next.path"
                class="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary-500 transition-colors active:scale-[0.98]"
              >
                {{ next.title }}
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
              <div v-else class="flex-1"></div>
            </nav>
          </main>

          <!-- TOC (only on xl+ screens) -->
          <aside class="hidden xl:block xl:w-[180px] xl:shrink-0">
            <div class="sticky top-20">
              <div class="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                On This Page
              </div>
              <nav v-if="toc.length" class="ml-5 space-y-1.5 border-l border-border pl-3">
                <a
                  v-for="item in toc"
                  :key="item.id"
                  :href="'#' + item.id"
                  class="block text-sm text-text-muted hover:text-primary-500 py-0.5 transition-colors"
                >
                  {{ item.text }}
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCodeCopy } from '~/composables/useCodeCopy'
import DocsBreadcrumb from './DocsBreadcrumb.vue'

const route = useRoute()

const props = defineProps<{
  doc: any
  allDocs: any[]
  currentPath: string
}>()

// Initialize code copy functionality
useCodeCopy()

// Scroll to top when route changes
watch(() => route.path, () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

// Computed: prev and next navigation
const currentIndex = computed(() =>
  props.allDocs.findIndex(d => d.path === props.currentPath) ?? -1
)

const prev = computed(() => {
  if (currentIndex.value <= 0) return null
  return props.allDocs[currentIndex.value - 1] ?? null
})

const next = computed(() => {
  if (!props.allDocs || currentIndex.value >= props.allDocs.length - 1) return null
  return props.allDocs[currentIndex.value + 1] ?? null
})

// TOC from current doc
const toc = computed(() => {
  if (!props.doc?.body?.toc?.links) return []
  return props.doc.body.toc.links
})

// Sidebar navigation links
const gettingStartedLinks = computed(() => [
  { label: 'Welcome', to: '/docs' },
  { label: 'Getting Data In', to: '/docs/getting-started/installation' },
  { label: 'Desktop Distribution', to: '/docs/getting-started/distribution' },
])

const featuresLinks = computed(() => [
  { label: 'Workspace', to: '/docs/features/workspace' },
  { label: 'Editions', to: '/docs/editions' },
])

const referenceLinks = computed(() => [
  { label: 'Architecture', to: '/docs/architecture' },
  { label: 'Development', to: '/docs/development' },
  { label: 'Auth Strategy', to: '/docs/auth-strategy' },
  { label: 'Contributing', to: '/docs/contributing' },
  { label: 'Roadmap', to: '/docs/roadmap' },
])

const legalLinks = computed(() => [
  { label: 'Privacy', to: '/docs/legal/privacy' },
  { label: 'Terms', to: '/docs/legal/terms' },
])

const isActiveLink = (path: string): boolean => {
  if (path === '/docs') {
    return route.path === '/docs'
  }
  return route.path.startsWith(path)
}
</script>
