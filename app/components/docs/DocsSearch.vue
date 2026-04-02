<template>
  <div class="mb-6 relative">
    <div 
      class="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      @click="openSearch"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <span class="flex-1">Search docs...</span>
      <kbd class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-gray-400 bg-gray-200 border border-gray-300 rounded">
        <span class="text-xs">⌘</span>K
      </kbd>
    </div>

    <Teleport to="body">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="closeSearch"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeSearch"></div>
        <div class="relative mx-auto mt-[10vh] w-full max-w-2xl">
          <div class="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            <div class="flex items-center gap-3 px-4 border-b border-gray-100">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref="searchInput"
                v-model="query"
                type="text"
                placeholder="Search docs..."
                class="flex-1 py-4 text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none text-base"
                @keydown.escape="closeSearch"
                @keydown.down.prevent="navigateResults(1)"
                @keydown.up.prevent="navigateResults(-1)"
                @keydown.enter.prevent="selectResult"
              />
              <button 
                class="px-2 py-1 text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors"
                @click="closeSearch"
              >
                ESC
              </button>
            </div>

            <div v-if="query && searchResults.length === 0" class="px-4 py-8 text-center text-gray-500">
              No results found for "{{ query }}"
            </div>

            <div v-else-if="searchResults.length > 0" class="max-h-[60vh] overflow-y-auto py-2">
              <div v-for="(group, pageIndex) in groupedResults" :key="group.path">
                <div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                  {{ group.title }}
                </div>
                <button
                  v-for="(result, idx) in group.sections"
                  :key="result.id"
                  class="w-full text-left flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-b-0"
                  :class="{ 'bg-orange-50': selectedIndex === getGlobalIndex(pageIndex, idx) }"
                  @click="navigateToResult(result.id)"
                  @mouseenter="selectedIndex = getGlobalIndex(pageIndex, idx)"
                >
                  <span class="text-sm font-medium text-gray-900">{{ result.title }}</span>
                  <span v-if="result.content" class="text-xs text-gray-500 mt-1 line-clamp-2">{{ result.content }}</span>
                </button>
              </div>
            </div>

            <div v-else class="px-4 py-6 text-center">
              <p class="text-sm text-gray-500 mb-2">Search across all documentation</p>
              <p class="text-xs text-gray-400">Supports fuzzy matching and section-level results</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js'

const isOpen = ref(false)
const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

const { data: searchSections } = await useAsyncData('docs-search-sections', () => 
  queryCollectionSearchSections('docs')
)

const fuse = computed(() => {
  if (!searchSections.value) return null
  return new Fuse(searchSections.value, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'content', weight: 0.3 },
      { name: 'description', weight: 0.2 }
    ],
    includeMatches: true,
    includeScore: true,
    threshold: 0.4,
    minMatchCharLength: 2
  })
})

const searchResults = computed(() => {
  if (!query.value.trim() || !fuse.value) return []
  return fuse.value.search(query.value).slice(0, 20)
})

const groupedResults = computed(() => {
  const groups: Record<string, { path: string; title: string; sections: any[] }> = {}
  
  for (const result of searchResults.value) {
    const section = result.item
    const path = section.id.split('#')[0]
    
    if (!groups[path]) {
      groups[path] = {
        path,
        title: section.title || getPageTitle(path),
        sections: []
      }
    }
    
    groups[path].sections.push({
      id: section.id,
      title: section.title,
      content: section.content?.slice(0, 150)
    })
  }
  
  return Object.values(groups)
})

const getPageTitle = (path: string): string => {
  const parts = path.split('/')
  return parts[parts.length - 1]?.replace(/-/g, ' ') || path
}

const getGlobalIndex = (pageIndex: number, sectionIndex: number): number => {
  let index = 0
  for (let i = 0; i < pageIndex; i++) {
    index += groupedResults.value[i].sections.length
  }
  return index + sectionIndex
}

watch(query, () => {
  selectedIndex.value = 0
})

const openSearch = () => {
  isOpen.value = true
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const closeSearch = () => {
  isOpen.value = false
  query.value = ''
  selectedIndex.value = 0
}

const navigateResults = (direction: number) => {
  const total = searchResults.value.length
  if (total === 0) return
  selectedIndex.value = (selectedIndex.value + direction + total) % total
}

const navigateToResult = (id: string) => {
  const [path, hash] = id.split('#')
  const url = hash ? `${path}#${hash}` : path
  navigateTo(url)
  closeSearch()
}

const selectResult = () => {
  if (searchResults.value.length === 0) return
  const section = searchResults.value[selectedIndex.value]?.item
  if (section) {
    navigateToResult(section.id)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>