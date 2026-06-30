<template>
  <ProductDemoFrame active-area="settings" workspace="IPL ANALYSIS" :status="saved ? 'Active provider saved' : 'Connected'">
    <div class="flex h-full min-h-[520px] items-center justify-center bg-[#f3eee6] p-4">
      <section class="grid h-[88%] w-full max-w-4xl overflow-hidden rounded-lg border border-[#ded2c3] bg-[#fffaf3] shadow-xl md:grid-cols-[170px_minmax(0,1fr)]">
        <aside class="hidden border-r border-[#e3d9cc] bg-[#f5eee4] p-4 md:block">
          <div
            v-for="item in settingsItems"
            :key="item"
            class="mb-2 rounded-md px-3 py-2 text-sm"
            :class="item === 'LLM & API Keys' ? 'border border-[#dfb991] bg-[#f6e3d5] font-semibold text-[#202632]' : 'text-[#777167]'"
          >
            {{ item }}
          </div>
        </aside>

        <div class="flex min-w-0 flex-col">
          <header class="flex items-start justify-between border-b border-[#e3d9cc] px-5 py-4">
            <div>
              <h3 class="text-base font-semibold text-[#202632]">LLM & API Keys</h3>
              <p class="text-xs text-[#5f6874]">Configure model providers, search credentials, and LLM preferences.</p>
            </div>
            <button type="button" class="text-xl leading-none text-[#777167]">x</button>
          </header>

          <div class="min-h-0 flex-1 overflow-hidden p-5">
            <div class="mb-4 text-xs font-semibold uppercase tracking-wide text-[#777167]">Select Provider</div>
            <div class="grid gap-3 md:grid-cols-3">
              <button
                v-for="provider in providers"
                :key="provider.name"
                type="button"
                class="rounded-lg border px-4 py-4 text-left transition"
                :class="selectedProvider === provider.name ? 'border-[#c06b3e] bg-[#f3e5d8]' : 'border-[#e1d7ca] bg-[#f8f0e5] hover:border-[#d4b79d]'"
                @click="selectedProvider = provider.name"
              >
                <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-[#e1d7ca] bg-[#fffdf8] text-lg font-semibold text-[#8b7664]">
                  {{ provider.short }}
                </div>
                <div class="text-sm font-semibold text-[#303540]">{{ provider.name }}</div>
                <p class="mt-1 text-xs leading-5 text-[#777167]">{{ provider.description }}</p>
              </button>
            </div>

            <section class="mt-5 rounded-lg border border-[#e1d7ca] bg-[#f8f0e5] p-4">
              <div class="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#e1d7ca] pb-3">
                <h4 class="text-sm font-semibold uppercase tracking-wide text-[#777167]">API Credentials</h4>
                <Transition name="status-badge" mode="out-in">
                  <span
                    v-if="saved"
                    key="saved"
                    class="rounded-full border border-[#a7d8ad] bg-[#dff4df] px-3 py-1 text-sm font-medium text-[#30965f]"
                  >
                    Active & Saved
                  </span>
                  <span
                    v-else
                    key="unsaved"
                    class="rounded-full border border-[#e3c1a7] bg-[#fff7ed] px-3 py-1 text-sm font-medium text-[#9b4d27]"
                  >
                    Needs verification
                  </span>
                </Transition>
              </div>

              <label for="demo-api-key" class="text-sm text-[#777167]">{{ selectedProvider }} API key</label>
              <div class="mt-2 flex items-center gap-2 rounded-md border border-[#e1d7ca] bg-[#fffdf8] px-3 py-2">
                <input
                  id="demo-api-key"
                  v-model="fakeApiKey"
                  type="password"
                  class="min-w-0 flex-1 bg-transparent text-sm tracking-[0.18em] text-[#303540] outline-none"
                  autocomplete="off"
                >
                <span class="text-xs text-[#91887e]">hidden</span>
              </div>

              <div class="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="rounded-md border border-[#d4b79d] bg-[#fffdf8] px-4 py-2 text-sm font-semibold text-[#303540] transition hover:border-[#c06b3e]"
                  @click="saveKey"
                >
                  Verify & save key
                </button>
                <button
                  type="button"
                  class="rounded-md border border-[#f3b3a7] bg-[#ffe6df] px-4 py-2 text-sm font-semibold text-[#d04b34] transition hover:bg-[#ffd8cf]"
                  @click="saved = false"
                >
                  Delete saved key
                </button>
              </div>

              <p class="mt-4 text-sm text-[#777167]">
                Need an API key?
                <span class="font-medium text-[#c06b3e]">Create OpenRouter API key -></span>
              </p>
            </section>

            <section class="mt-5 rounded-lg border border-[#e1d7ca] bg-[#fffdf8] p-4">
              <div class="flex items-start gap-3">
                <span class="mt-1 flex h-2.5 w-2.5 rounded-full bg-[#22c55e]"></span>
                <div>
                  <h4 class="text-sm font-semibold text-[#303540]">Stored locally for this desktop app</h4>
                  <p class="mt-1 text-sm leading-6 text-[#777167]">This homepage demo never sends or stores a real key. The production app keeps provider credentials on your machine.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  </ProductDemoFrame>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})

const settingsItems = ['LLM & API Keys', 'Workspace', 'Appearance', 'Account']
const providers = [
  {
    name: 'OpenAI',
    short: '$',
    description: 'Industry-standard flagship models.'
  },
  {
    name: 'OpenRouter',
    short: '+',
    description: 'Unified hub for Claude, Gemini, Llama, and more.'
  },
  {
    name: 'Ollama (local)',
    short: '::',
    description: 'Run open-source models offline on your machine.'
  }
]

const selectedProvider = ref('OpenRouter')
const fakeApiKey = ref('demo-openrouter-key-local-only')
const saved = ref(false)
const prefersReducedMotion = ref(false)
let timer: ReturnType<typeof window.setTimeout> | null = null

function clearTimer() {
  if (timer) {
    window.clearTimeout(timer)
    timer = null
  }
}

function saveKey() {
  clearTimer()
  saved.value = true
}

function runDemo() {
  clearTimer()
  selectedProvider.value = 'OpenRouter'
  saved.value = prefersReducedMotion.value
  if (!prefersReducedMotion.value) {
    timer = window.setTimeout(saveKey, 1000)
  }
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (props.active) {
    runDemo()
  }
})

onBeforeUnmount(clearTimer)

watch(() => props.active, (isActive) => {
  if (isActive) {
    runDemo()
  } else {
    clearTimer()
  }
})
</script>

<style scoped>
.status-badge-enter-active,
.status-badge-leave-active {
  transition: opacity var(--motion-normal) var(--ease-standard), transform var(--motion-normal) var(--ease-standard);
}

.status-badge-enter-from,
.status-badge-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
