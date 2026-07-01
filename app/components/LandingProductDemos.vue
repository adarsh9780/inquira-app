<template>
  <section id="features" class="relative overflow-hidden bg-[linear-gradient(180deg,#f8f8f9_0%,#eef0f3_48%,#f8f8f9_100%)] pt-[calc(var(--navbar-height)+2rem)] pb-20 lg:pt-[calc(var(--navbar-height)+3rem)] lg:pb-28">
    <div class="mx-auto max-w-[1600px] px-5 sm:px-8 2xl:px-10">
      <article
        v-if="firstDemo"
        :ref="(el) => setDemoSectionRef(el, 0)"
        class="grid min-h-[calc(100svh-var(--navbar-height))] items-center gap-10 py-6 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] lg:py-10 xl:gap-14"
        :data-demo-id="firstDemo.id"
      >
        <div class="max-w-[620px] lg:max-w-none">
          <p class="mb-5 text-sm font-semibold uppercase text-secondary-600">
            {{ hero.badge }}
          </p>
          <h1 class="max-w-[12ch] text-5xl font-bold leading-[1.04] text-text-primary sm:text-6xl">
            {{ hero.title }}
            <span class="block text-primary-600">{{ hero.highlight }}</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            {{ hero.description }}
          </p>
          <p class="mt-4 max-w-xl text-base leading-7 text-text-secondary">
            {{ firstDemo.summary }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              v-for="(cta, index) in hero.ctas"
              :key="cta.href"
              :href="cta.href"
              class="btn w-full rounded-lg px-6 py-3 text-base font-medium sm:w-auto active:scale-[0.98]"
              :class="index === 0 ? 'btn-primary' : 'btn-secondary'"
            >
              {{ cta.label }}
            </a>
          </div>

          <dl class="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-border pt-6">
            <div v-for="stat in hero.stats" :key="`${stat.value}-${stat.label}`">
              <dt class="text-xs uppercase text-text-muted">{{ stat.label }}</dt>
              <dd class="mt-1 text-xl font-semibold text-text-primary">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="min-w-0 lg:-mr-4 2xl:-mr-12">
          <component
            :is="demoComponent(firstDemo.demoType)"
            :active="activeDemoId === firstDemo.id"
            class="landing-demo-frame"
          />
        </div>
      </article>

      <article
        v-for="(demo, index) in supportDemos"
        :key="demo.id"
        :ref="(el) => setDemoSectionRef(el, index + 1)"
        class="grid items-center gap-10 border-t border-border py-16 lg:grid-cols-[minmax(260px,380px)_minmax(0,1fr)] lg:py-24 xl:gap-14"
        :data-demo-id="demo.id"
      >
        <div class="max-w-xl">
          <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-secondary-500 to-primary-500 text-white shadow-lg shadow-primary-500/15" aria-hidden="true">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="iconPath(demo.icon)"></svg>
          </div>
          <p class="mb-3 text-sm font-semibold uppercase text-secondary-600">
            {{ demo.eyebrow }}
          </p>
          <h2 class="text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
            {{ demo.title }}
          </h2>
          <p class="mt-5 text-lg leading-8 text-text-secondary">
            {{ demo.summary }}
          </p>
        </div>

        <div class="min-w-0 lg:-mr-4 2xl:-mr-12">
          <component
            :is="demoComponent(demo.demoType)"
            :active="activeDemoId === demo.id"
            class="landing-demo-frame"
          />
        </div>
      </article>

      <section v-if="secondaryFeatures.length" class="border-t border-border pt-16 lg:pt-20">
        <div class="grid gap-8 lg:grid-cols-[minmax(260px,380px)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p class="mb-3 text-sm font-semibold uppercase text-secondary-600">{{ eyebrow }}</p>
            <h2 class="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
              {{ title }}
            </h2>
            <p class="mt-5 text-base leading-7 text-text-secondary">
              {{ description }}
            </p>
          </div>

          <div class="grid gap-8 md:grid-cols-2">
            <article
              v-for="feature in secondaryFeatures"
              :key="feature.id"
              class="min-w-0 border-t border-border pt-5"
            >
              <AppVideo
                v-if="hasVideo(feature)"
                :src="feature.media.video.src"
                :poster="feature.media.video.poster"
                :alt="feature.media.video.alt"
                :title="feature.title"
                controls
              />
              <figure
                v-else
                class="overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
              >
                <div class="relative aspect-video overflow-hidden bg-neutral-950">
                  <img
                    :src="feature.media.image.src"
                    :alt="feature.media.image.alt"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  >
                </div>
              </figure>

              <h3 class="mt-4 text-base font-semibold text-text-primary">{{ feature.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-text-secondary">{{ feature.summary }}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component, ComponentPublicInstance } from 'vue'
import AskAnswerDemo from '~/components/AskAnswerDemo.vue'
import ApiKeyDemo from '~/components/ApiKeyDemo.vue'
import WorkspaceCreateDemo from '~/components/WorkspaceCreateDemo.vue'

type DemoType = 'ask-answer' | 'create-workspace' | 'add-api-key'

type Link = {
  label: string
  href: string
}

type HeroContent = {
  badge: string
  title: string
  highlight: string
  description: string
  ctas: Link[]
  stats: Array<{
    value: string
    label: string
  }>
}

type VideoMedia = {
  src: string
  poster: string
  alt: string
}

type ImageMedia = {
  src: string
  alt: string
}

type FeatureMedia = {
  video: VideoMedia
  image: ImageMedia
}

type ProductDemo = {
  id: string
  eyebrow: string
  title: string
  summary: string
  icon: string
  demoType: DemoType
  media: FeatureMedia
}

type SecondaryFeature = {
  id: string
  title: string
  summary: string
  icon: string
  media: FeatureMedia
}

const props = defineProps<{
  hero: HeroContent
  eyebrow: string
  title: string
  description: string
  productDemos: ProductDemo[]
  secondaryFeatures: SecondaryFeature[]
}>()

const demoSectionRefs = ref<HTMLElement[]>([])
const activeDemoId = ref(props.productDemos[0]?.id || '')
let observer: IntersectionObserver | null = null

const firstDemo = computed(() => props.productDemos[0])
const supportDemos = computed(() => props.productDemos.slice(1))

const demoComponentMap: Record<DemoType, Component> = {
  'ask-answer': AskAnswerDemo,
  'create-workspace': WorkspaceCreateDemo,
  'add-api-key': ApiKeyDemo
}

const iconPaths: Record<string, string> = {
  code: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4 4 4-4 4M6 16l-4-4 4-4" />',
  database: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />',
  editor: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />',
  chart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z" />',
  clock: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
  terminal: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 9 3 3-3 3m5 0h3M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />',
  message: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h8m-8 4h5m8-2a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A8.96 8.96 0 0 1 21 12Z" />',
  workspace: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />',
  key: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 7.5a4.25 4.25 0 1 1-2.4 7.76L9 19.6H6.5v-2.5H4v-2.5l4.74-4.74A4.25 4.25 0 0 1 15.75 7.5Z" />'
}

function demoComponent(demoType: DemoType) {
  return demoComponentMap[demoType] || AskAnswerDemo
}

function iconPath(icon: string) {
  return iconPaths[icon] || iconPaths.message
}

function hasVideo(feature: SecondaryFeature) {
  return Boolean(feature.media.video.src.trim())
}

function setDemoSectionRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    demoSectionRefs.value[index] = el
  }
}

function observeDemoSections() {
  observer?.disconnect()
  observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

    const demoId = visible?.target.getAttribute('data-demo-id')
    if (demoId) {
      activeDemoId.value = demoId
    }
  }, {
    root: null,
    rootMargin: '-28% 0px -42% 0px',
    threshold: [0.2, 0.45, 0.7]
  })

  for (const section of demoSectionRefs.value) {
    if (section) {
      observer.observe(section)
    }
  }
}

onMounted(() => {
  nextTick(observeDemoSections)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

watch(() => props.productDemos, () => {
  activeDemoId.value = props.productDemos[0]?.id || ''
  demoSectionRefs.value = []
  nextTick(observeDemoSections)
})
</script>
