<template>
  <ProductDemoFrame active-area="chat" workspace="IPL ANALYSIS" status="TEST Ready">
    <div class="grid h-full min-h-[520px] grid-rows-[auto_minmax(0,1fr)]">
      <div class="flex h-14 items-center justify-between border-b border-[#e3d9cc] px-4 text-sm">
        <div class="flex items-center gap-5">
          <button
            v-for="tab in leftTabs"
            :key="tab"
            type="button"
            class="border-b-2 py-4 font-medium transition-colors"
            :class="tab === 'Chat' ? 'border-[#c06b3e] text-[#202632]' : 'border-transparent text-[#777167]'"
          >
            {{ tab }}
          </button>
        </div>
        <button
          type="button"
          class="rounded-full border border-[#e1d7ca] bg-[#f8f0e5] px-3 py-1.5 text-xs font-medium text-[#6b5444] transition hover:border-[#c06b3e] hover:text-[#9b4d27]"
          @click="runDemo"
        >
          Replay
        </button>
      </div>

      <div class="grid min-h-0 md:grid-cols-[42%_58%]">
        <section class="flex min-h-0 flex-col border-r border-[#e3d9cc] bg-[#fffaf3]">
          <div class="min-h-0 flex-1 overflow-hidden p-4 md:p-5">
            <div class="rounded-2xl border border-[#dfcdbb] bg-[#f3e5d8] px-4 py-3 text-sm font-medium text-[#2f3440]">
              create a bar graph for the above table
            </div>
            <p class="mt-2 text-xs text-[#938b80]">{{ phase === 'answer' ? '3 minutes ago' : 'Just now' }}</p>

            <div class="mt-6 space-y-4">
              <div
                v-for="(item, index) in statusItems"
                :key="item.label"
                class="rounded-lg border border-[#e2d8ca] bg-[#f8f0e5] px-4 py-3 transition-all duration-300"
                :class="visibleStatusIndex >= index ? 'opacity-100' : 'translate-y-2 opacity-35'"
              >
                <div class="flex items-center justify-between gap-3">
                  <span class="text-xs font-semibold uppercase tracking-wide text-[#a46a45]">{{ item.label }}</span>
                  <span class="text-xs text-[#91887e]">{{ item.time }}</span>
                </div>
                <p class="mt-2 text-sm leading-6 text-[#3f4651]">{{ item.body }}</p>
              </div>
            </div>

            <Transition name="demo-fade">
              <div v-if="phase === 'answer'" class="mt-6">
                <div class="mb-5 flex items-center gap-3">
                  <div class="h-px flex-1 bg-[#e3d9cc]"></div>
                  <span class="text-xs font-semibold uppercase tracking-[0.18em] text-[#c06b3e]">Final Response</span>
                  <div class="h-px flex-1 bg-[#e3d9cc]"></div>
                </div>
                <div class="space-y-4 text-sm leading-6 text-[#343b45]">
                  <div>
                    <h3 class="font-semibold text-[#202632]">Answer</h3>
                    <p class="mt-2">The top run-scorers are led by V Kohli, S Dhawan, and DA Warner. The generated table and chart are saved as local artifacts.</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-[#202632]">Key Findings</h3>
                    <p class="mt-2"><strong>Top performers:</strong> V Kohli and S Dhawan form the leading tier, with a clear gap before the rest of the table.</p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <div class="border-t border-[#e3d9cc] p-4">
            <div class="rounded-xl border border-[#e1d7ca] bg-[#fffdf8] p-3">
              <div class="mb-4 text-sm text-[#a19a90]">How can I help you today?</div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-xl text-[#777167]">+</span>
                <span class="min-w-0 flex-1 rounded-full border border-[#e1d7ca] bg-[#f8f0e5] px-3 py-1 text-center text-xs text-[#4d5561]">Gemini 3.1 Flash Lite Preview</span>
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#172033] text-xs text-white">mic</span>
              </div>
            </div>
          </div>
        </section>

        <section class="flex min-h-0 flex-col bg-[#fffaf3]">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3d9cc] px-4 py-3">
            <div class="flex items-center gap-2">
              <button
                v-for="view in resultViews"
                :key="view.id"
                type="button"
                class="rounded-md px-3 py-1.5 text-sm font-medium transition"
                :class="resultView === view.id ? 'bg-[#f1dfcf] text-[#9b4d27]' : 'text-[#777167] hover:bg-[#f8f0e5]'"
                @click="resultView = view.id"
              >
                {{ view.label }}
              </button>
            </div>
            <span class="rounded-full border border-[#e1d7ca] bg-[#f8f0e5] px-3 py-1 text-xs text-[#777167]">Top Batsmen</span>
          </div>

          <div class="min-h-0 flex-1 overflow-hidden p-4 md:p-5">
            <Transition name="demo-fade" mode="out-in">
              <div v-if="resultView === 'chart'" key="chart" class="h-full rounded-lg border border-[#e1d7ca] bg-[#fbf4eb] p-4">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-[#303540]">Top 10 Batsmen by Total Runs</h3>
                  <span class="text-xs text-[#91887e]">Chart artifact saved</span>
                </div>
                <div class="flex h-[330px] items-end gap-2 border-l border-b border-[#e4d8ca] px-2 pb-2">
                  <div
                    v-for="bar in bars"
                    :key="bar.name"
                    class="flex min-w-0 flex-1 flex-col items-center gap-2"
                  >
                    <div
                      class="w-full rounded-t-sm bg-[#ba6a3c] transition-all duration-700"
                      :style="{ height: chartHeight(bar.value) }"
                    ></div>
                    <span class="max-w-full truncate text-[10px] text-[#777167]">{{ bar.name }}</span>
                  </div>
                </div>
              </div>

              <div v-else-if="resultView === 'table'" key="table" class="h-full rounded-lg border border-[#e1d7ca] bg-[#fffdf8]">
                <div class="border-b border-[#e1d7ca] px-4 py-3">
                  <h3 class="text-sm font-semibold text-[#303540]">Top Batsmen</h3>
                  <p class="text-xs text-[#91887e]">10 rows, 2 columns</p>
                </div>
                <div class="overflow-hidden">
                  <table class="w-full text-left text-sm">
                    <thead class="bg-[#f8f0e5] text-xs uppercase tracking-wide text-[#777167]">
                      <tr>
                        <th class="px-4 py-2 font-semibold">Batter</th>
                        <th class="px-4 py-2 font-semibold">Total Runs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in rows" :key="row.batter" class="border-t border-[#eadfd1]">
                        <td class="px-4 py-2 text-[#303540]">{{ row.batter }}</td>
                        <td class="px-4 py-2 font-mono text-[#303540]">{{ row.runs }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div v-else key="output" class="space-y-3">
                <div
                  v-for="artifact in artifacts"
                  :key="artifact.name"
                  class="rounded-lg border border-[#e1d7ca] bg-[#fbf4eb] px-4 py-3"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <div class="text-xs font-semibold uppercase tracking-wide text-[#6fb982]">{{ artifact.type }}</div>
                      <div class="mt-1 text-sm font-semibold text-[#303540]">{{ artifact.name }}</div>
                    </div>
                    <span class="text-xs text-[#91887e]">{{ artifact.meta }}</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </section>
      </div>
    </div>
  </ProductDemoFrame>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})

type Phase = 'context' | 'python' | 'quality' | 'answer'
type ResultView = 'chart' | 'table' | 'output'

const leftTabs = ['Code', 'Chat', 'Tree']
const resultViews: { id: ResultView, label: string }[] = [
  { id: 'table', label: 'Table' },
  { id: 'chart', label: 'Chart' },
  { id: 'output', label: 'Output' }
]

const statusItems = [
  {
    label: 'Searching data context',
    body: 'I have the table name and will search for relevant columns to calculate top batters.',
    time: '1s'
  },
  {
    label: 'Running generated Python',
    body: "I have executable code, so I'm running it now and will inspect the result next.",
    time: '5s'
  },
  {
    label: 'Checking result quality',
    body: "I have the runtime output, so I'm checking whether it is useful enough to return.",
    time: '2s'
  }
]

const bars = [
  { name: 'V Kohli', value: 7122 },
  { name: 'S Dhawan', value: 6573 },
  { name: 'DA Warner', value: 6310 },
  { name: 'RG Sharma', value: 6165 },
  { name: 'SK Raina', value: 5512 },
  { name: 'MS Dhoni', value: 5082 },
  { name: 'AB de Villiers', value: 5001 },
  { name: 'RV Uthappa', value: 4941 },
  { name: 'CH Gayle', value: 4875 },
  { name: 'KD Karthik', value: 4408 }
]

const rows = bars.map((bar) => ({
  batter: bar.name,
  runs: bar.value
}))

const artifacts = [
  { type: 'Table', name: 'top_batsmen', meta: '10 rows, 2 columns' },
  { type: 'Chart', name: 'fig', meta: 'Plotly bar chart' },
  { type: 'Scalar', name: 'result', meta: 'quality checked' }
]

const phase = ref<Phase>('answer')
const resultView = ref<ResultView>('chart')
const prefersReducedMotion = ref(false)
const timers: ReturnType<typeof window.setTimeout>[] = []

const visibleStatusIndex = computed(() => {
  const indexes: Record<Phase, number> = {
    context: 0,
    python: 1,
    quality: 2,
    answer: 2
  }
  return indexes[phase.value]
})

function clearTimers() {
  while (timers.length) {
    const timer = timers.pop()
    if (timer) {
      window.clearTimeout(timer)
    }
  }
}

function runDemo() {
  clearTimers()
  if (prefersReducedMotion.value) {
    phase.value = 'answer'
    resultView.value = 'chart'
    return
  }

  phase.value = 'context'
  resultView.value = 'output'
  timers.push(window.setTimeout(() => {
    phase.value = 'python'
  }, 750))
  timers.push(window.setTimeout(() => {
    phase.value = 'quality'
  }, 1500))
  timers.push(window.setTimeout(() => {
    phase.value = 'answer'
    resultView.value = 'table'
  }, 2350))
  timers.push(window.setTimeout(() => {
    resultView.value = 'chart'
  }, 3300))
}

function chartHeight(value: number) {
  const max = Math.max(...bars.map((bar) => bar.value))
  return `${Math.max(18, Math.round((value / max) * 100))}%`
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (props.active) {
    runDemo()
  }
})

onBeforeUnmount(clearTimers)

watch(() => props.active, (isActive) => {
  if (isActive) {
    runDemo()
  } else {
    clearTimers()
  }
})
</script>

<style scoped>
.demo-fade-enter-active,
.demo-fade-leave-active {
  transition: opacity var(--motion-normal) var(--ease-standard), transform var(--motion-normal) var(--ease-standard);
}

.demo-fade-enter-from,
.demo-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
