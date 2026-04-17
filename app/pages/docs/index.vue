<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="lg:grid lg:grid-cols-[200px_1fr_140px] lg:gap-16 py-10">
      <!-- Sidebar -->
      <DocsSidebar />

      <!-- Main Content -->
      <main class="lg:min-w-0">
        <article class="prose prose-slate max-w-none">
          <ContentRenderer :value="doc" />
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

      <!-- TOC (only on large screens) -->
      <aside class="hidden xl:block">
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
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const { data: doc } = await useAsyncData('welcome-doc', () =>
  queryCollection('docs').path('/docs/welcome').first()
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
  allDocs.value?.findIndex(d => d.path === '/docs/welcome') ?? -1
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
    btn.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; min-width: 44px; min-height: 44px; padding: 0.5rem; border-radius: 0.375rem; background: var(--color-neutral-200); border: none; cursor: pointer; opacity: 0; transition: opacity var(--duration-fast); display: flex; align-items: center; justify-content: center;'

    btn.addEventListener('click', async () => {
      const text = code.textContent || ''
      await navigator.clipboard.writeText(text)
      copiedId.value = id
      btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
      btn.style.background = 'var(--color-primary-500)'
      btn.style.color = 'white'
      setTimeout(() => {
        copiedId.value = null
        btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`
        btn.style.background = 'var(--color-neutral-200)'
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
