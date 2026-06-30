<template>
  <section id="features" class="bg-background-muted py-20 lg:py-32">
    <div class="mx-auto max-w-[1320px] px-6 sm:px-8 lg:px-12">
      <div class="mb-14 text-center">
        <div class="mb-4 text-sm font-medium uppercase tracking-wider text-secondary-600">{{ eyebrow }}</div>
        <h2 class="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {{ title }}
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-text-secondary">
          {{ description }}
        </p>
      </div>

      <div class="hidden gap-10 lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside class="relative">
          <div class="sticky top-28 space-y-3">
            <button
              v-for="(demo, index) in primaryDemos"
              :key="demo.id"
              type="button"
              class="group grid w-full grid-cols-[42px_1fr] gap-4 rounded-lg border px-4 py-4 text-left transition-all duration-200"
              :class="activeDemo.id === demo.id
                ? 'border-primary-500 bg-surface text-text-primary shadow-sm'
                : 'border-transparent text-text-secondary hover:border-border hover:bg-surface/70'"
              @click="scrollToDemo(index)"
            >
              <span
                class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary-500 to-primary-500 text-white"
                aria-hidden="true"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="iconPath(demo.icon)"></svg>
              </span>
              <span>
                <span class="block text-sm font-semibold text-text-primary">{{ demo.title }}</span>
                <span class="mt-1 block text-sm leading-6 text-text-secondary">{{ demo.summary }}</span>
              </span>
            </button>
          </div>
        </aside>

        <div class="relative">
          <div class="relative" :style="{ minHeight: `${Math.max(primaryDemos.length, 1) * 76}vh` }">
            <div class="sticky top-24">
              <component
                :is="activeDemoComponent"
                :key="activeDemo.id"
                active
              />
            </div>

            <div class="pointer-events-none absolute inset-x-0 top-0 flex flex-col">
              <div
                v-for="(demo, index) in primaryDemos"
                :key="`sentinel-${demo.id}`"
                :ref="(el) => setDemoRef(el, index)"
                class="h-[76vh]"
                :data-demo-id="demo.id"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-10 lg:hidden">
        <article
          v-for="(demo, index) in primaryDemos"
          :key="demo.id"
          :ref="(el) => setMobileDemoRef(el, index)"
          class="space-y-4"
          :data-demo-id="demo.id"
        >
          <component
            :is="demoComponent(demo.demoType)"
            :active="activeDemo.id === demo.id"
          />
          <div>
            <h3 class="text-xl font-semibold text-text-primary">{{ demo.title }}</h3>
            <p class="mt-2 text-text-secondary">{{ demo.summary }}</p>
          </div>
        </article>
      </div>

      <div v-if="secondaryVideos.length" class="mt-20 border-t border-border pt-14">
        <div class="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div class="mb-2 text-sm font-medium uppercase tracking-wider text-secondary-600">More Workflows</div>
            <h3 class="text-2xl font-bold tracking-tight text-text-primary">Short demos for deeper features</h3>
          </div>
          <p class="max-w-xl text-sm leading-6 text-text-secondary">
            These slots are ready for Nuxt Studio uploads from R2, so product clips can be added without changing Vue code.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <article
            v-for="feature in secondaryVideos"
            :key="feature.id"
            class="min-w-0 overflow-hidden rounded-lg border border-border bg-surface"
          >
            <AppVideo
              :src="feature.video?.src || ''"
              :poster="feature.video?.poster || ''"
              :alt="feature.video?.alt || feature.title"
              :title="feature.title"
              controls
            />
            <div class="p-4">
              <h4 class="text-sm font-semibold text-text-primary">{{ feature.title }}</h4>
              <p class="mt-2 line-clamp-4 text-sm leading-6 text-text-secondary">{{ feature.summary }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import AskAnswerDemo from '~/components/AskAnswerDemo.vue'
import ApiKeyDemo from '~/components/ApiKeyDemo.vue'
import WorkspaceCreateDemo from '~/components/WorkspaceCreateDemo.vue'

type DemoType = 'ask-answer' | 'create-workspace' | 'add-api-key'

type PrimaryDemo = {
  id: string
  title: string
  summary: string
  icon: string
  demoType: DemoType
}

type FeatureVideo = {
  src?: string
  poster?: string
  alt?: string
}

type SecondaryVideo = {
  id: string
  title: string
  summary: string
  icon: string
  video?: FeatureVideo
}

const props = defineProps<{
  eyebrow: string
  title: string
  description: string
  primaryDemos: PrimaryDemo[]
  secondaryVideos: SecondaryVideo[]
}>()

const demoRefs = ref<HTMLElement[]>([])
const mobileDemoRefs = ref<HTMLElement[]>([])
const activeDemoId = ref(props.primaryDemos[0]?.id || '')
let observer: IntersectionObserver | null = null

const fallbackDemo: PrimaryDemo = {
  id: 'ask-answer',
  title: 'Ask a question, get usable outputs',
  summary: '',
  icon: 'message',
  demoType: 'ask-answer'
}

const demoComponentMap = {
  'ask-answer': AskAnswerDemo,
  'create-workspace': WorkspaceCreateDemo,
  'add-api-key': ApiKeyDemo
}

const iconPaths: Record<string, string> = {
  idea: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
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

const activeDemo = computed(() =>
  props.primaryDemos.find((demo) => demo.id === activeDemoId.value) || props.primaryDemos[0] || fallbackDemo
)

const activeDemoComponent = computed(() => demoComponent(activeDemo.value.demoType))

function demoComponent(demoType: DemoType) {
  return demoComponentMap[demoType] || AskAnswerDemo
}

function iconPath(icon: string) {
  return iconPaths[icon] || iconPaths.idea
}

function setDemoRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    demoRefs.value[index] = el
  }
}

function setMobileDemoRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    mobileDemoRefs.value[index] = el
  }
}

function scrollToDemo(index: number) {
  const demo = props.primaryDemos[index]
  if (demo) {
    activeDemoId.value = demo.id
  }
  demoRefs.value[index]?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
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
    rootMargin: '-35% 0px -45% 0px',
    threshold: [0.2, 0.5, 0.8]
  })

  for (const el of [...demoRefs.value, ...mobileDemoRefs.value]) {
    observer.observe(el)
  }
}

onMounted(() => {
  nextTick(observeDemoSections)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

watch(() => props.primaryDemos, () => {
  activeDemoId.value = props.primaryDemos[0]?.id || ''
  nextTick(observeDemoSections)
})
</script>
