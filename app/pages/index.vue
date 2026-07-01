<template>
  <div id="top" class="min-h-screen bg-background text-text-primary font-sans antialiased">
    <AppNavbar />

    <div id="main-content" tabindex="-1"></div>

    <LandingProductDemos
      :hero="home.hero"
      :eyebrow="home.features.eyebrow"
      :title="home.features.title"
      :description="home.features.description"
      :product-demos="home.features.productDemos"
      :secondary-features="home.features.secondaryFeatures"
    />

    <section id="how-it-works" class="py-20 lg:py-32">
      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-secondary-600">{{ home.howItWorks.eyebrow }}</div>
          <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">
            {{ home.howItWorks.title }}
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-text-secondary">
            {{ home.howItWorks.description }}
          </p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 top-16 h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-secondary-200 via-primary-200 to-secondary-200 hidden lg:block"></div>
          <div class="grid gap-12 lg:grid-cols-4">
            <div v-for="step in home.howItWorks.steps" :key="step.number" class="text-center">
              <div
                class="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-primary-500 text-xl font-bold text-white shadow-lg"
                :class="`shadow-${step.shadowColor}-500/25`"
              >
                {{ step.number }}
              </div>
              <h3 class="mb-2 text-xl font-semibold text-text-primary">{{ step.title }}</h3>
              <p class="text-text-secondary">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="showPricing" id="pricing" class="bg-background-muted py-20 lg:py-32">
      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-secondary-600">{{ home.pricing.eyebrow }}</div>
          <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">
            {{ home.pricing.title }}
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-text-secondary">
            {{ home.pricing.description }}
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <div
            v-for="plan in home.pricing.plans"
            :key="plan.name"
            class="rounded-lg border border-border bg-surface p-8"
            :class="plan.popular ? 'border-2 border-secondary-500 shadow-xl shadow-secondary-500/10 relative' : ''"
          >
            <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-secondary-600 to-primary-500 px-4 py-1 text-xs font-medium text-white">
              {{ home.pricing.popularLabel }}
            </div>
            <h3 class="mb-2 text-xl font-semibold text-text-primary">{{ plan.name }}</h3>
            <p class="mb-6 text-text-secondary">{{ plan.description }}</p>
            <ul class="mb-8 space-y-3">
              <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-3 text-sm text-text-secondary">
                <svg class="h-5 w-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <a
              :href="plan.cta.href"
              class="btn block w-full rounded-lg text-center text-sm font-medium"
              :class="plan.popular ? 'btn-primary' : 'btn-secondary'"
            >
              {{ plan.cta.label }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="download" class="relative overflow-hidden py-20 lg:py-32">
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-secondary-100/50 to-primary-100/30 rounded-full blur-3xl"></div>
      </div>

      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12 text-center">
        <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">
          {{ home.download.title }}
        </h2>
        <p class="mx-auto mb-6 max-w-2xl text-lg text-text-secondary">
          {{ home.download.description }}
        </p>

        <div class="mx-auto max-w-2xl rounded-lg border border-border bg-surface p-8 shadow-lg">
          <div class="mb-4 text-left">
            <label for="email-signup" class="block text-sm font-medium text-text-secondary mb-1">
              {{ home.download.email.label }} <span class="text-text-muted">{{ home.download.email.optionalLabel }}</span>
            </label>
            <input
              id="email-signup"
              v-model="email"
              type="email"
              :placeholder="home.download.email.placeholder"
              class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder-text-muted transition-colors focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
            >
            <p class="mt-1.5 text-xs text-text-muted text-left">
              {{ home.download.email.helper }}
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              class="group flex min-h-[172px] flex-col rounded-lg border border-border bg-surface px-6 py-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              @click="openMacInstallDialog"
            >
              <div class="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-badge-bg text-text-primary transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.37 12.44c.02 2.46 2.16 3.28 2.18 3.29-.02.06-.34 1.17-1.12 2.32-.67 1-1.37 2-2.46 2.02-1.07.02-1.42-.64-2.65-.64-1.24 0-1.62.62-2.62.66-1.04.04-1.83-1.05-2.5-2.04-1.37-1.98-2.42-5.59-1.01-8.03.7-1.2 1.95-1.96 3.3-1.98 1.03-.02 2 .69 2.65.69.65 0 1.87-.85 3.16-.73.54.02 2.06.22 3.04 1.66-.08.05-1.82 1.06-1.8 2.78Zm-2.13-5.07c.56-.68.94-1.64.84-2.58-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.57-.86 2.5.91.07 1.83-.46 2.39-1.14Z" />
                </svg>
              </div>
              <div class="text-base font-semibold text-text-primary transition-colors group-hover:text-primary-600">
                {{ home.download.mac.title }}
              </div>
              <p class="mt-1 text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                {{ home.download.mac.description }}
              </p>
            </button>

            <button
              type="button"
              class="group flex min-h-[172px] flex-col items-start justify-center gap-3 rounded-lg border border-border bg-surface px-6 py-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              @click="handleWindowsDownload"
            >
              <div class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-badge-bg text-text-primary transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 5.5L10.5 4.4v7.1H3V5.5Zm8.5-1.22L21 3v8.5h-9.5V4.28ZM3 12.5h7.5v7.1L3 18.5v-6Zm8.5 0H21V21l-9.5-1.33V12.5Z" />
                </svg>
              </div>
              <div class="text-base font-semibold text-text-primary transition-colors group-hover:text-primary-600">
                {{ home.download.windows.title }}
              </div>
              <p class="text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                {{ home.download.windows.description }}
              </p>
            </button>
          </div>

          <p class="mt-4 text-xs text-text-muted">
            {{ home.download.note }}
          </p>

          <p class="mt-4 text-xs text-text-muted">
            <a :href="home.download.sourceLink.href" target="_blank" rel="noopener noreferrer" class="underline hover:text-text-secondary">{{ home.download.sourceLink.label }}</a>
          </p>
          <p class="mt-2 text-xs text-text-muted">
            <NuxtLink :to="home.download.distributionLink.href" class="underline hover:text-text-primary">
              {{ home.download.distributionLink.label }}
            </NuxtLink>
          </p>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="overlay">
          <div
            v-if="isMacInstallDialogOpen"
            class="app-overlay-surface fixed inset-0 z-50"
            @click="closeMacInstallDialog"
          ></div>
        </Transition>
        <Transition name="popup">
          <div
            v-if="isMacInstallDialogOpen"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-6 py-10"
            @click.self="closeMacInstallDialog"
          >
            <div class="app-popup-surface w-full max-w-[var(--popup-max-width)] overflow-hidden rounded-lg border shadow-2xl">
              <div class="border-b border-border px-6 py-5">
                <p class="text-sm font-medium uppercase tracking-[0.18em] text-primary-600">
                  {{ home.download.dialog.eyebrow }}
                </p>
              </div>

              <div class="space-y-5 px-6 py-6 text-left">
                <div>
                  <p class="text-sm font-medium text-text-primary">
                    {{ home.download.dialog.stepsTitle }}
                  </p>
                  <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary marker:text-text-muted">
                    <li v-for="step in home.download.dialog.steps" :key="step">{{ step }}</li>
                  </ul>
                </div>

                <div>
                  <p class="mb-3 text-sm font-medium text-text-primary">
                    {{ home.download.dialog.commandTitle }}
                  </p>
                  <div class="relative rounded-lg bg-terminal-bg px-4 py-4 pr-14 font-mono text-sm text-terminal-text">
                    <button
                      type="button"
                      class="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                      :aria-label="macInstallCopied ? home.download.dialog.copiedButtonLabel : home.download.dialog.copyButtonLabel"
                      @click="handleMacInstallCopy"
                    >
                      <svg v-if="!macInstallCopied" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </button>
                    <span class="block leading-relaxed">
                      {{ macInstallCommand }}
                    </span>
                  </div>
                </div>

                <div class="rounded-lg border border-border bg-code-bg px-4 py-4">
                  <p class="text-sm font-medium text-text-primary">
                    {{ home.download.dialog.futurePlanTitle }}
                  </p>
                  <p class="mt-2 text-sm text-text-secondary">
                    {{ home.download.dialog.futurePlanBody }}
                  </p>
                  <p class="mt-3 text-sm text-text-secondary">
                    <NuxtLink :to="home.download.dialog.futurePlanLink.href" class="underline hover:text-text-primary">
                      {{ home.download.dialog.futurePlanLink.label }}
                    </NuxtLink>
                  </p>
                </div>

                <div class="flex flex-col gap-3 border-t border-border pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <NuxtLink :to="home.download.dialog.fullNoteLink.href" class="text-sm font-medium text-text-secondary underline hover:text-text-primary">
                    {{ home.download.dialog.fullNoteLink.label }}
                  </NuxtLink>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-lg bg-terminal-bg px-4 py-2.5 text-sm font-medium text-terminal-text transition-colors hover:bg-terminal-hover-bg active:scale-[0.98]"
                    @click="handleMacInstallCopy"
                  >
                    {{ macInstallCopied ? home.download.dialog.copiedButtonLabel : home.download.dialog.copyButtonLabel }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </section>

    <footer class="border-t border-border bg-surface py-12">
      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12">
        <div class="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="/#top" class="flex items-center gap-3">
              <AppLogo />
            </a>
            <p class="mt-4 text-sm text-text-secondary">Privacy-first, local AI data analysis. Workspace data stays local by default.</p>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-text-primary">Documentation</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/docs" class="text-sm text-text-secondary hover:text-text-primary">Overview</NuxtLink></li>
              <li><NuxtLink to="/docs/architecture" class="text-sm text-text-secondary hover:text-text-primary">Architecture</NuxtLink></li>
              <li><NuxtLink to="/docs/getting-started/installation" class="text-sm text-text-secondary hover:text-text-primary">Getting Started</NuxtLink></li>
              <li><NuxtLink to="/docs/roadmap" class="text-sm text-text-secondary hover:text-text-primary">Roadmap</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-text-primary">Community</h4>
            <ul class="space-y-2">
              <li><a href="https://github.com/adarsh9780/inquira-ce" target="_blank" class="text-sm text-text-secondary hover:text-text-primary">GitHub</a></li>
              <li><a href="https://github.com/adarsh9780/inquira-ce/issues" target="_blank" class="text-sm text-text-secondary hover:text-text-primary">Issues</a></li>
              <li><a href="https://github.com/adarsh9780/inquira-ce/discussions" target="_blank" class="text-sm text-text-secondary hover:text-text-primary">Discussions</a></li>
            </ul>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-text-primary">Legal</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/docs/legal/privacy" class="text-sm text-text-secondary hover:text-text-primary">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/docs/legal/terms" class="text-sm text-text-secondary hover:text-text-primary">Terms of Service</NuxtLink></li>
              <li><NuxtLink to="/docs/contributing" class="text-sm text-text-secondary hover:text-text-primary">Contributing</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 border-t border-border pt-8 text-center">
          <p class="text-sm text-text-muted">Copyright © 2026 Inquira CE (Alpha).</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { getDownloadUrl, isPricingEnabled, normalizeDownloadManifest } from '~/utils/publicDownloads.js'

const { data: landingHome } = await useAsyncData('landing-home', () =>
  queryCollection('landing').first()
)

if (!landingHome.value) {
  throw createError({
    statusCode: 404,
    message: 'Landing content not found'
  })
}

const home = computed(() => landingHome.value!)

const config = useRuntimeConfig()
const showPricing = computed(() => isPricingEnabled(config.public.showPricing))
const downloadsManifestUrl = computed(() =>
  String(config.public.downloadsManifestUrl || 'https://downloads.inquiraai.com/latest.json')
)

const { data: publicDownloadManifest } = await useAsyncData(
  'public-download-manifest',
  async () => {
    try {
      const manifest = await $fetch(downloadsManifestUrl.value)
      return normalizeDownloadManifest(manifest)
    } catch (error) {
      console.error('Could not load public download manifest:', error)
      return normalizeDownloadManifest(null)
    }
  },
)

const downloadManifest = computed(() =>
  publicDownloadManifest.value ?? normalizeDownloadManifest(null)
)

const { saveEmail, download } = useEmailSignup()

const email = ref('')
const DOWNLOAD_SOURCE = 'inquira-acc-landing-page'
const macInstallCommand = 'curl -fsSL https://inquiraai.com/install.sh | bash'
const macInstallCopied = ref(false)
const isMacInstallDialogOpen = ref(false)

const openMacInstallDialog = () => {
  isMacInstallDialogOpen.value = true
}

const closeMacInstallDialog = () => {
  isMacInstallDialogOpen.value = false
}

const handleMacInstallDialogKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMacInstallDialogOpen.value) {
    closeMacInstallDialog()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleMacInstallDialogKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleMacInstallDialogKeydown)
})

async function saveOptionalEmail(platform: 'macOS' | 'Windows') {
  if (email.value) {
    await saveEmail({
      email: email.value,
      platform,
      source: DOWNLOAD_SOURCE,
      version: downloadManifest.value.version,
    })
  }
}

async function handleMacInstallCopy() {
  await saveOptionalEmail('macOS')
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(macInstallCommand)
  }
  macInstallCopied.value = true
  window.setTimeout(() => {
    macInstallCopied.value = false
  }, 2000)
}

async function handleWindowsDownload() {
  await saveOptionalEmail('Windows')
  const downloadUrl = getDownloadUrl(downloadManifest.value, 'Windows')
  download(downloadUrl)
}
</script>

<style>
::selection {
  background: linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500));
  color: white;
}

::-moz-selection {
  background: linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500));
  color: white;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity var(--motion-normal) var(--ease-standard);
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.popup-enter-active {
  transition: all var(--motion-normal) var(--ease-emphasized);
}

.popup-leave-active {
  transition: all var(--motion-fast) var(--ease-standard);
}

.popup-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}

.popup-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.99);
}
</style>
