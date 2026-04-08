<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="lg:grid lg:grid-cols-[200px_1fr_140px] lg:gap-16 py-10">
      <aside class="lg:sticky lg:top-20 lg:h-fit lg:self-start">
        <nav class="pr-6">
          <DocsSearch />

          <div class="mb-6">
            <NuxtLink to="/docs" class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Getting Started
            </NuxtLink>
            <ul class="ml-5 space-y-1.5 border-l border-gray-200 pl-3">
              <li>
                <NuxtLink 
                  to="/docs" 
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path === '/docs' ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Welcome
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/docs/getting-started/installation"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('getting-started') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Getting Data In
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/docs/getting-started/distribution"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('distribution') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Desktop Distribution
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="mb-6">
            <NuxtLink to="/docs/features/workspace" class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Features
            </NuxtLink>
            <ul class="ml-5 space-y-1.5 border-l border-gray-200 pl-3">
              <li>
                <NuxtLink 
                  to="/docs/features/workspace"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('workspace') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Workspace
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/docs/editions"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('editions') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Editions
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="mb-6">
            <NuxtLink to="/docs/architecture" class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Reference
            </NuxtLink>
            <ul class="ml-5 space-y-1.5 border-l border-gray-200 pl-3">
              <li>
                <NuxtLink 
                  to="/docs/architecture"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('architecture') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Architecture
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/docs/development"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('development') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Development
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/docs/auth-strategy"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('auth') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Auth Strategy
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/docs/contributing"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('contributing') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Contributing
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/docs/roadmap"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('roadmap') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Roadmap
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <NuxtLink to="/docs/legal/privacy" class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Legal
            </NuxtLink>
            <ul class="ml-5 space-y-1.5 border-l border-gray-200 pl-3">
              <li>
                <NuxtLink 
                  to="/docs/legal/privacy"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('privacy') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Privacy
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/docs/legal/terms"
                  class="block text-sm py-0.5 transition-colors"
                  :class="$route.path.includes('terms') ? 'text-orange-500 font-medium' : 'text-gray-500'"
                >
                  Terms
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <main class="lg:min-w-0">
        <article class="prose prose-slate max-w-none">
          <ContentRenderer :value="doc" />
        </article>

        <nav class="mt-12 flex items-center justify-between border-t border-gray-100 pt-6">
          <NuxtLink 
            v-if="prev"
            :to="prev.path"
            class="flex items-center gap-1.5 text-sm text-gray-500 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ prev.title }}
          </NuxtLink>
          <div v-else></div>
          
          <NuxtLink 
            v-if="next"
            :to="next.path"
            class="flex items-center gap-1.5 text-sm text-gray-500 transition-colors"
          >
            {{ next.title }}
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </nav>
      </main>

      <aside class="hidden xl:block">
        <div class="sticky top-20">
          <div class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            On This Page
          </div>
          <nav v-if="toc.length" class="ml-5 space-y-1.5 border-l border-gray-200 pl-3">
            <a 
              v-for="item in toc" 
              :key="item.id"
              :href="'#' + item.id"
              class="block text-sm text-gray-500 py-0.5"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()

const { data: doc } = await useAsyncData(route.path, () => 
  queryCollection('docs').path(route.path).first()
)

if (!doc.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found'
  })
}

const { data: allDocs } = await useAsyncData('all-docs', () => 
  queryCollection('docs').all()
)

const currentIndex = computed(() => 
  allDocs.value?.findIndex(d => d.path === route.path) ?? -1
)

const prev = computed(() => {
  if (currentIndex.value <= 0) return null
  return allDocs.value?.[currentIndex.value - 1] ?? null
})

const next = computed(() => {
  if (!allDocs.value || currentIndex.value >= allDocs.value.length - 1) return null
  return allDocs.value?.[currentIndex.value + 1] ?? null
})

const toc = computed(() => {
  if (!doc.value?.body?.toc?.links) return []
  return doc.value.body.toc.links
})

const copiedId = ref<string | null>(null)

const addCopyButtons = () => {
  const preElements = document.querySelectorAll('article pre')
  preElements.forEach((pre, index) => {
    if (pre.querySelector('.copy-btn')) return
    
    const code = pre.querySelector('code')
    if (!code) return
    
    const id = `code-${index}`
    pre.id = id
    pre.style.position = 'relative'
    
    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`
    btn.title = 'Copy code'
    btn.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.375rem; border-radius: 0.375rem; background: #e2e8f0; border: none; cursor: pointer; opacity: 0; transition: opacity 0.2s;'
    
    btn.addEventListener('click', async () => {
      const text = code.textContent || ''
      await navigator.clipboard.writeText(text)
      copiedId.value = id
      btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
      btn.style.background = '#10b981'
      btn.style.color = 'white'
      setTimeout(() => {
        copiedId.value = null
        btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`
        btn.style.background = '#e2e8f0'
        btn.style.color = 'currentColor'
      }, 2000)
    })
    
    pre.appendChild(btn)
    
    pre.addEventListener('mouseenter', () => {
      btn.style.opacity = '1'
    })
    pre.addEventListener('mouseleave', () => {
      btn.style.opacity = '0'
    })
  })
}

onMounted(async () => {
  await nextTick()
  addCopyButtons()
})
</script>

<style>
.prose {
  --tw-prose-body: #334155;
  --tw-prose-headings: #0f172a;
  --tw-prose-lead: #475569;
  --tw-prose-links: #ea580c;
  --tw-prose-bold: #0f172a;
  --tw-prose-counters: #64748b;
  --tw-prose-bullets: #cbd5e1;
  --tw-prose-hr: #e2e8f0;
  --tw-prose-quotes: #334155;
  --tw-prose-quote-borders: #f97316;
  --tw-prose-captions: #64748b;
  --tw-prose-code: #0f172a;
  --tw-prose-pre-code: #1e293b;
  --tw-prose-pre-bg: #f1f5f9;
  --tw-prose-th-borders: #e2e8f0;
  --tw-prose-td-borders: #f1f5f9;
}

.prose ::selection,
.prose *::selection {
  background: linear-gradient(135deg, #3b82f6, #f97316);
  color: white;
}

.prose h1 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin-bottom: 0.75rem;
}

.prose h2 {
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin-top: 2rem;
  margin-bottom: 0.625rem;
  padding-top: 0;
}

.prose h3 {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prose p {
  font-size: 0.9375rem;
  line-height: 1.75;
  margin-bottom: 0.875rem;
}

.prose ul {
  font-size: 0.9375rem;
  line-height: 1.7;
  margin-bottom: 0.875rem;
}

.prose li {
  margin-bottom: 0.375rem;
}

.prose li > p {
  margin-bottom: 0.375rem;
}

.prose a {
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}

.prose code {
  font-size: 0.8125rem;
  background: #f1f5f9;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-weight: 400;
}

.prose pre {
  font-size: 0.8125rem;
  line-height: 1.6;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.prose pre code {
  background: transparent;
  padding: 0;
}

.prose table {
  font-size: 0.875rem;
  margin: 1.25rem 0;
}

.prose th {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.prose td {
  font-size: 0.875rem;
  padding: 0.625rem 0.75rem;
}

.prose blockquote {
  font-size: 0.9375rem;
  font-style: normal;
  margin: 1rem 0;
}

.prose hr {
  margin: 2rem 0;
  border-color: #e2e8f0;
}

.prose > h2:first-child,
.prose > h2:first-of-type {
  margin-top: 0;
}
</style>
