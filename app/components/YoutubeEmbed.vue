<template>
  <figure class="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
    <div class="relative aspect-video overflow-hidden bg-neutral-950">
      <iframe
        v-if="isLoaded && id"
        class="h-full w-full"
        :src="embedUrl"
        :title="title || 'YouTube video'"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <button
        v-else
        type="button"
        class="group relative h-full w-full overflow-hidden text-left"
        :aria-label="title ? `Play ${title}` : 'Play video'"
        @click="isLoaded = true"
      >
        <img
          v-if="thumbnailUrl"
          class="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
          :src="thumbnailUrl"
          :alt="title || 'YouTube video thumbnail'"
          loading="lazy"
        >
        <div
          v-else
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-primary-500)_0,transparent_32%),linear-gradient(135deg,var(--color-neutral-950),var(--color-neutral-900))]"
        ></div>
        <div class="absolute inset-0 bg-black/35"></div>
        <span class="absolute inset-0 flex items-center justify-center">
          <span class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-950 shadow-xl transition-transform duration-200 group-hover:scale-105">
            <svg class="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.55.83l10.29-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </span>
      </button>
    </div>
    <figcaption v-if="caption" class="border-t border-border px-4 py-3 text-sm text-text-secondary">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string
  title?: string
  caption?: string
  thumbnail?: string
}>(), {
  id: '',
  title: '',
  caption: '',
  thumbnail: ''
})

const isLoaded = ref(false)
const embedUrl = computed(() => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(props.id)}?rel=0&autoplay=1`)
const thumbnailUrl = computed(() => props.thumbnail || (props.id ? `https://i.ytimg.com/vi/${encodeURIComponent(props.id)}/hqdefault.jpg` : ''))
</script>
