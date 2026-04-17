<template>
  <nav aria-label="Breadcrumb" class="mb-6 flex items-center gap-1.5 text-sm text-text-muted">
    <NuxtLink to="/docs" class="hover:text-primary-500 transition-colors">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span class="sr-only">Docs</span>
    </NuxtLink>

    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <svg class="h-3 w-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>

      <NuxtLink
        v-if="index < breadcrumbs.length - 1"
        :to="crumb.to"
        class="hover:text-primary-500 transition-colors"
      >
        {{ crumb.label }}
      </NuxtLink>
      <span v-else class="text-text-primary font-medium" aria-current="page">
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

interface Breadcrumb {
  label: string
  to: string
}

// Build breadcrumbs from the route path
// Skip the leading '/docs' and split remaining segments
const pathParts = computed(() => {
  const path = route.path
  if (!path.startsWith('/docs')) return []
  const withoutDocs = path.slice(6) // remove '/docs'
  if (!withoutDocs) return []
  return withoutDocs.split('/').filter(Boolean)
})

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const crumbs: Breadcrumb[] = []
  const parts = pathParts.value

  if (parts.length === 0) return crumbs

  let accumulatedPath = '/docs'
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    accumulatedPath += `/${part}`

    // Create human-readable label
    const label = part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    crumbs.push({
      label,
      to: accumulatedPath
    })
  }

  return crumbs
})
</script>
