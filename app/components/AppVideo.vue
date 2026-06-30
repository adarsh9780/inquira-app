<template>
  <figure class="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
    <div class="relative aspect-video overflow-hidden bg-neutral-950">
      <video
        v-if="hasSource"
        ref="videoElement"
        class="h-full w-full object-cover"
        :src="src"
        :poster="poster || undefined"
        :autoplay="shouldAutoplay"
        :muted="shouldMute"
        :loop="loop"
        :controls="shouldShowControls"
        playsinline
        preload="metadata"
        :aria-label="alt || title || caption || 'Inquira product video'"
      />
      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top_left,var(--color-primary-500)_0,transparent_32%),linear-gradient(135deg,var(--color-neutral-950),var(--color-neutral-900))] px-6 text-center text-white"
      >
        <div class="flex h-14 w-14 items-center justify-center rounded-lg border border-white/15 bg-white/10">
          <svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.55.83l10.29-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14Z" />
          </svg>
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Video placeholder</p>
          <p class="mt-2 text-lg font-semibold">{{ title || 'Feature demo' }}</p>
        </div>
      </div>
    </div>
    <figcaption v-if="caption" class="border-t border-border px-4 py-3 text-sm text-text-secondary">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  poster?: string
  alt?: string
  title?: string
  caption?: string
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  muted?: boolean
}>(), {
  src: '',
  poster: '',
  alt: '',
  title: '',
  caption: '',
  autoplay: false,
  loop: false,
  controls: false,
  muted: true
})

const videoElement = ref<HTMLVideoElement | null>(null)
const prefersReducedMotion = ref(false)

const hasSource = computed(() => Boolean(props.src?.trim()))
const shouldAutoplay = computed(() => props.autoplay && !prefersReducedMotion.value)
const shouldShowControls = computed(() => props.controls || prefersReducedMotion.value || !shouldAutoplay.value)
const shouldMute = computed(() => props.muted || shouldAutoplay.value)

function syncPlayback() {
  const video = videoElement.value
  if (!video || !hasSource.value) {
    return
  }

  if (!shouldAutoplay.value) {
    video.pause()
    video.currentTime = 0
    return
  }

  video.muted = shouldMute.value
  video.play().catch(() => {
    // Browser autoplay policies can still block playback in some contexts.
  })
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  syncPlayback()
})

watch([shouldAutoplay, () => props.src], () => {
  nextTick(syncPlayback)
})
</script>
