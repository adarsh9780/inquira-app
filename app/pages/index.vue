<template>
  <div id="top" class="min-h-screen bg-background text-text-primary font-sans antialiased">
    <AppNavbar />

    <!-- Skip target -->
    <div id="main-content" tabindex="-1"></div>

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] bg-gradient-to-b from-secondary-100/50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12">
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div class="text-center lg:text-left">
             <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-badge-border bg-badge-bg px-3 py-1 text-xs font-medium text-badge-text">
               <span class="relative flex h-2 w-2">
                 <span class="inline-flex h-2 w-2 rounded-full bg-secondary-500"></span>
               </span>
               Privacy-First AI
             </div>

            <h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Local AI Data Analysis<br />
              <span class="bg-gradient-to-r from-secondary-600 to-primary-500 bg-clip-text text-transparent">On Your Machine</span>
            </h1>

            <p class="mx-auto mb-8 max-w-lg text-lg text-text-secondary lg:mx-0">
              Ask questions about your data in natural language. Inquira generates Python scripts, executes them locally, and keeps workspace data on your machine by default.
            </p>

            <div class="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a href="#download" class="btn btn-primary w-full rounded-lg px-6 py-3 text-base font-medium sm:w-auto active:scale-[0.98]">
                Download Free
              </a>
              <NuxtLink to="/docs" class="btn btn-secondary w-full rounded-lg px-6 py-3 text-base font-medium sm:w-auto active:scale-[0.98]">
                Read Docs
              </NuxtLink>
            </div>

            <div class="mt-12 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-8 lg:justify-start lg:gap-12">
              <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-text-primary">100%</div>
                <div class="text-sm text-text-muted">Local Processing</div>
              </div>
              <div class="hidden h-8 w-px bg-border md:block"></div>
              <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-text-primary">0</div>
                <div class="text-sm text-text-muted">Cloud Dependencies</div>
              </div>
              <div class="hidden h-8 w-px bg-border md:block"></div>
              <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-text-primary">DuckDB</div>
                <div class="text-sm text-text-muted">Powered Engine</div>
              </div>
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <svg class="h-40 w-40 sm:h-64 sm:w-64 lg:h-80 lg:w-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:var(--color-secondary-500);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:var(--color-primary-500);stop-opacity:1" />
                </linearGradient>
                <filter id="hero-glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect x="18" y="18" width="164" height="164" fill="var(--color-neutral-900)" rx="34" />
              <g transform="translate(100, 100)" filter="url(#hero-glow)">
                <circle r="24" fill="url(#hero-grad)" />
                <g>
                  <circle cx="70" cy="0" r="12" fill="var(--color-secondary-500)" opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                  </circle>
                  <line x1="24" y1="0" x2="58" y2="0" stroke="url(#hero-grad)" stroke-width="4">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                  </line>
                </g>
                <g transform="rotate(120)">
                  <circle cx="70" cy="0" r="12" fill="var(--color-primary-500)" opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
                  </circle>
                  <line x1="24" y1="0" x2="58" y2="0" stroke="url(#hero-grad)" stroke-width="4">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
                  </line>
                </g>
                <g transform="rotate(240)">
                  <circle cx="70" cy="0" r="12" fill="var(--color-primary-400)" opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
                  </circle>
                  <line x1="24" y1="0" x2="58" y2="0" stroke="url(#hero-grad)" stroke-width="4">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
                  </line>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="bg-background-muted py-20 lg:py-32">
      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-secondary-600">Core Features</div>
          <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">
            Everything You Need for Local AI Analysis
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-text-secondary">
            A local-first desktop application that keeps workspace data on your machine by default.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Feature cards with primary gradient icons -->
          <div v-for="(feature, index) in features" :key="index"
            class="rounded-2xl border border-border bg-surface p-6 transition-all hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-500 to-primary-500">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="feature.icon"></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold text-text-primary">{{ feature.title }}</h3>
            <p class="text-text-secondary">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-20 lg:py-32">
      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-secondary-600">How It Works</div>
          <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">
            Four Steps to AI-Powered Insights
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-text-secondary">
            Set up your workspace, connect a model, add data, and start analyzing in minutes.
          </p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 top-16 h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-secondary-200 via-primary-200 to-secondary-200 hidden lg:block"></div>
          <div class="grid gap-12 lg:grid-cols-4">
            <div v-for="step in howItWorks" :key="step.number" class="text-center">
              <div class="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-primary-500 text-xl font-bold text-white shadow-lg"
                :class="`shadow-${step.shadowColor}-500/25`">
                {{ step.number }}
              </div>
              <h3 class="mb-2 text-xl font-semibold text-text-primary">{{ step.title }}</h3>
              <p class="text-text-secondary">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section v-if="showPricing" id="pricing" class="bg-background-muted py-20 lg:py-32">
      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-secondary-600">Pricing</div>
          <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">
            Three Editions, One Mission
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-text-secondary">
            From individual users to enterprise teams, there's an Inquira edition for everyone.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <!-- Pricing cards -->
          <div v-for="plan in pricingPlans" :key="plan.name"
            class="rounded-2xl border border-border bg-surface p-8"
            :class="plan.popular ? 'border-2 border-secondary-500 shadow-xl shadow-secondary-500/10 relative' : ''">
            <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-secondary-600 to-primary-500 px-4 py-1 text-xs font-medium text-white">
              Most Popular
            </div>
            <h3 class="mb-2 text-xl font-semibold text-text-primary">{{ plan.name }}</h3>
            <p class="mb-6 text-text-secondary">{{ plan.description }}</p>
            <ul class="mb-8 space-y-3">
              <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-center gap-3 text-sm text-text-secondary">
                <svg class="h-5 w-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <a :href="plan.ctaLink"
              class="btn block w-full rounded-lg text-center text-sm font-medium"
              :class="plan.popular ? 'btn-primary' : 'btn-secondary'">
              {{ plan.cta }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Download CTA -->
    <section id="download" class="relative overflow-hidden py-20 lg:py-32">
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-secondary-100/50 to-primary-100/30 rounded-full blur-3xl"></div>
      </div>

      <div class="mx-auto max-w-[var(--content-max-width)] px-6 sm:px-8 lg:px-12 text-center">
        <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">
          Download Inquira Today
        </h2>
        <p class="mx-auto mb-6 max-w-2xl text-lg text-text-secondary">
          Available for macOS and Windows. Your data stays on your machine.
        </p>

        <div class="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-8 shadow-lg">
          <div class="mb-4 text-left">
            <label for="email-signup" class="block text-sm font-medium text-text-secondary mb-1">
              Email for product updates <span class="text-text-muted">(optional)</span>
            </label>
            <input
              id="email-signup"
              v-model="email"
              type="email"
              placeholder="you@company.com"
              class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder-text-muted transition-colors focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
            />
            <p class="mt-1.5 text-xs text-text-muted text-left">
              Enter your email to receive product updates. Download will proceed regardless.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              class="group flex min-h-[172px] flex-col rounded-xl border border-border bg-surface px-6 py-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              @click="openMacInstallDialog"
            >
                <div class="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-badge-bg text-text-primary transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.37 12.44c.02 2.46 2.16 3.28 2.18 3.29-.02.06-.34 1.17-1.12 2.32-.67 1-1.37 2-2.46 2.02-1.07.02-1.42-.64-2.65-.64-1.24 0-1.62.62-2.62.66-1.04.04-1.83-1.05-2.5-2.04-1.37-1.98-2.42-5.59-1.01-8.03.7-1.2 1.95-1.96 3.3-1.98 1.03-.02 2 .69 2.65.69.65 0 1.87-.85 3.16-.73.54.02 2.06.22 3.04 1.66-.08.05-1.82 1.06-1.8 2.78Zm-2.13-5.07c.56-.68.94-1.64.84-2.58-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.57-.86 2.5.91.07 1.83-.46 2.39-1.14Z"/>
                </svg>
              </div>
              <div class="text-base font-semibold text-text-primary transition-colors group-hover:text-primary-600">
                Download for macOS
              </div>
              <p class="mt-1 text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                Opens the guided installer instructions with the shell command.
              </p>
            </button>

            <button
              type="button"
              class="group flex min-h-[172px] flex-col items-start justify-center gap-3 rounded-xl border border-border bg-surface px-6 py-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              @click="handleWindowsDownload"
            >
                <div class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-badge-bg text-text-primary transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 5.5L10.5 4.4v7.1H3V5.5Zm8.5-1.22L21 3v8.5h-9.5V4.28ZM3 12.5h7.5v7.1L3 18.5v-6Zm8.5 0H21V21l-9.5-1.33V12.5Z"/>
                </svg>
              </div>
              <div class="text-base font-semibold text-text-primary transition-colors group-hover:text-primary-600">
                Download for Windows
              </div>
              <p class="text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                Direct installer download.
              </p>
            </button>
          </div>

          <p class="mt-4 text-xs text-text-muted">
            macOS uses a guided shell installer for now because the app is not yet signed and notarized.
          </p>

          <p class="mt-4 text-xs text-text-muted">
            <a href="https://github.com/adarsh9780/inquira-ce" target="_blank" class="underline hover:text-text-secondary">View source on GitHub</a>
          </p>
          <p class="mt-2 text-xs text-text-muted">
            <NuxtLink to="/docs/getting-started/distribution" class="underline hover:text-text-primary">
              Read how desktop distribution works
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Mac Install Dialog -->
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
            <div class="app-popup-surface w-full max-w-[var(--popup-max-width)] overflow-hidden rounded-2xl border shadow-2xl">
              <div class="border-b border-border px-6 py-5">
                <p class="text-sm font-medium uppercase tracking-[0.18em] text-primary-600">
                  macOS Install
                </p>
              </div>

              <div class="space-y-5 px-6 py-6 text-left">
                <div>
                  <p class="text-sm font-medium text-text-primary">
                    What the script does
                  </p>
                  <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary marker:text-text-muted">
                    <li>Installs Homebrew if your Mac does not already have it.</li>
                    <li>Installs Inquira through Homebrew and, if you approve, gives macOS the manual permission it needs to run the app without Apple's paid developer ID.</li>
                    <li>Leaves future upgrades to Homebrew with `brew upgrade --cask inquira`.</li>
                  </ul>
                </div>

                <div>
                  <p class="mb-3 text-sm font-medium text-text-primary">
                    Run this command in Terminal
                  </p>
                   <div class="relative rounded-xl bg-terminal-bg px-4 py-4 pr-14 font-mono text-sm text-terminal-text">
                     <button
                       type="button"
                       class="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                       :aria-label="macInstallCopied ? 'macOS install command copied' : 'Copy macOS install command'"
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

                 <div class="rounded-xl border border-border bg-code-bg px-4 py-4">
                   <p class="text-sm font-medium text-text-primary">
                     Future notarization plan
                   </p>
                   <p class="mt-2 text-sm text-text-secondary">
                     We plan to move to proper signed and notarized macOS distribution once the project has sustainable support to cover Apple's developer program costs responsibly. Until then, we are keeping the source public and the install flow explicit.
                   </p>
                   <p class="mt-3 text-sm text-text-secondary">
                     <NuxtLink to="/docs/getting-started/distribution#why-apple-gatekeeping-makes-this-harder" class="underline hover:text-text-primary">
                       Read why Apple's gatekeeping makes this harder for independent developers
                     </NuxtLink>
                   </p>
                 </div>

                 <div class="flex flex-col gap-3 border-t border-border pt-2 sm:flex-row sm:items-center sm:justify-between">
                   <NuxtLink to="/docs/getting-started/distribution" class="text-sm font-medium text-text-secondary underline hover:text-text-primary">
                     Read the full distribution note
                   </NuxtLink>
                   <button
                     type="button"
                      class="inline-flex items-center justify-center rounded-lg bg-terminal-bg px-4 py-2.5 text-sm font-medium text-terminal-text transition-colors hover:bg-terminal-hover-bg active:scale-[0.98]"
                     @click="handleMacInstallCopy"
                   >
                     {{ macInstallCopied ? 'Copied install command' : 'Copy install command' }}
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </section>

    <!-- Footer -->
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

// Feature data for reusable cards
const features = [
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
    title: 'Autonomous AI-Assisted Analysis',
    description: 'Translate natural language prompts into Python workflows. The AI independently executes them and returns answers, charts, and insights.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />',
    title: 'Local Python Execution',
    description: 'Bundled Jupyter kernel runs locally with your user permissions and is not sandboxed. Supports Ollama-hosted local models and BYOK access to 100+ providers through OpenRouter.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />',
    title: 'Seamless Local Data Handling',
    description: 'Connect to Excel, CSV, JSON, and Parquet files. Dynamically converted into fast DuckDB workspaces for analyzing data of any size.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />',
    title: 'Integrated Code Editor',
    description: 'Full control with a built-in editor, data-aware autocomplete, and slash commands for quick standard code patterns. Custom commands are planned next.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
    title: 'Interactive Visualization',
    description: 'Explore Plotly charts instantly. AG Grid with streaming backend handles up to 2000 rows at a time for massive datasets.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
    title: 'Flawless Resume & Persistence',
    description: 'Intermediate variables, artifacts, and results are saved continuously. Close the app and resume exactly where you left off.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />',
    title: 'Power-User Controls',
    description: 'Built-in terminal access for extra control, package installs, and debugging when you want to step beyond the chat interface.',
  },
]

// How It Works data
const howItWorks = [
  { number: 1, title: 'Create a Workspace', description: 'Start with a fresh workspace for your project so your files, chats, and analysis stay organized together.', shadowColor: 'blue' },
  { number: 2, title: 'Add an API Key', description: 'Connect the model provider you want to use by adding your API key, or point Inquira at your local setup.', shadowColor: 'orange' },
  { number: 3, title: 'Add Datasets', description: 'Import CSV, Excel, JSON, or Parquet files and let Inquira prepare them inside a fast local DuckDB workspace.', shadowColor: 'orange' },
  { number: 4, title: 'Analyze Your Data', description: 'Ask questions in plain English and watch Inquira generate code, run the analysis locally, and return results.', shadowColor: 'orange' },
]

// Pricing data
const pricingPlans = [
  {
    name: 'Free',
    description: 'Core desktop experience for individuals.',
    features: [
      'No forced login for basic usage',
      'Single-workspace experience',
      'Local DuckDB engine',
      'AI code generation',
      'Interactive visualizations',
    ],
    cta: 'Download Free',
    ctaLink: '#download',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Advanced workflows for power users.',
    features: [
      'Everything in Free',
      'RAG support',
      'Multiple workspaces',
      'Priority support',
      'Advanced visualization themes',
    ],
    cta: 'Get Pro',
    ctaLink: '#download',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Pro plus organizational integration.',
    features: [
      'Everything in Pro',
      'Data connectors',
      'MCP support',
      'Team collaboration',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    ctaLink: 'mailto:enterprise@inquiraai.com',
    popular: false,
  },
]
</script>

<style>
/* Selection gradient uses design tokens via CSS variables */
::selection {
  background: linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500));
  color: white;
}

::-moz-selection {
  background: linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500));
  color: white;
}

/* Dialog transitions */
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
