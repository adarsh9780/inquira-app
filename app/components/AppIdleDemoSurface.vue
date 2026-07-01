<template>
  <div class="grid h-full min-h-[520px] grid-rows-[auto_minmax(0,1fr)_auto] bg-[#fffaf3] md:min-h-[560px]">
    <div class="flex h-14 items-center justify-between border-b border-[#e3d9cc] px-4 text-sm">
      <div class="flex items-center gap-5">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="border-b-2 py-4 font-medium"
          :class="tab === 'Chat' ? 'border-[#c06b3e] text-[#202632]' : 'border-transparent text-[#777167]'"
        >
          {{ tab }}
        </button>
      </div>
      <span class="rounded-full border border-[#e1d7ca] bg-[#f8f0e5] px-3 py-1 text-xs text-[#777167]">
        {{ variant === 'api' ? 'Provider required' : 'Local workspace' }}
      </span>
    </div>

    <div class="grid min-h-0 md:grid-cols-[44%_56%]">
      <section class="flex min-h-0 flex-col border-r border-[#e3d9cc] bg-[#fffaf3]">
        <div class="min-h-0 flex-1 overflow-hidden p-5">
          <div class="rounded-2xl border border-[#dfcdbb] bg-[#f3e5d8] px-4 py-3 text-sm font-medium text-[#2f3440]">
            {{ variant === 'api' ? 'create a model-backed analysis run' : 'set up revenue analysis for this launch' }}
          </div>
          <p class="mt-2 text-xs text-[#938b80]">Draft</p>

          <div class="mt-5 space-y-3">
            <div class="rounded-lg border border-[#e2d8ca] bg-[#f8f0e5] px-4 py-3">
              <div class="text-xs font-semibold uppercase tracking-wide text-[#a46a45]">
                {{ variant === 'api' ? 'Model access missing' : 'Workspace context' }}
              </div>
              <p class="mt-2 text-sm leading-6 text-[#3f4651]">
                {{ variant === 'api'
                  ? 'Inquira needs one saved provider key before it can run the local workflow.'
                  : 'Local files, context, conversations, and generated artifacts stay grouped by workspace.' }}
              </p>
            </div>

            <div class="rounded-lg border border-[#e2d8ca] bg-[#fffdf8] px-4 py-3">
              <div class="text-xs font-semibold uppercase tracking-wide text-[#777167]">
                {{ variant === 'api' ? 'Next action' : 'Available local files' }}
              </div>
              <div v-if="variant === 'api'" class="mt-3 flex items-center gap-2 text-sm text-[#4d5561]">
                <span class="h-2.5 w-2.5 rounded-full bg-[#eab308]"></span>
                Configure a provider in Settings.
              </div>
              <div v-else class="mt-3 grid gap-2">
                <div
                  v-for="file in files"
                  :key="file.name"
                  class="flex items-center justify-between gap-3 rounded-md border border-[#eadfd1] bg-[#fbf4eb] px-3 py-2"
                >
                  <span class="text-sm font-medium text-[#303540]">{{ file.name }}</span>
                  <span class="text-xs text-[#777167]">{{ file.meta }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="min-h-0 bg-[#fffaf3] p-5">
        <div class="h-full rounded-lg border border-dashed border-[#e1d7ca] bg-[#fffdf8] p-5">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-[#303540]">
              {{ variant === 'api' ? 'Execution preview' : 'Workspace preview' }}
            </h3>
            <span class="rounded-full bg-[#f1dfcf] px-2.5 py-1 text-xs font-medium text-[#9b4d27]">
              {{ variant === 'api' ? 'Waiting' : 'Ready' }}
            </span>
          </div>
          <div class="mt-6 space-y-3">
            <div
              v-for="bar in previewBars"
              :key="bar.label"
              class="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3"
            >
              <span class="truncate text-xs text-[#777167]">{{ bar.label }}</span>
              <span class="h-2 rounded-full bg-[#f1dfcf]">
                <span class="block h-full rounded-full bg-[#ba6a3c]" :style="{ width: bar.width }"></span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="border-t border-[#e3d9cc] bg-[#fffaf3] p-4">
      <div class="rounded-xl border border-[#e1d7ca] bg-[#fffdf8] p-3">
        <div class="text-sm text-[#777167]">
          {{ variant === 'api' ? 'Ask once provider access is configured...' : 'Ask about this local workspace...' }}
        </div>
        <div class="mt-3 flex items-center gap-3">
          <span class="text-lg text-[#777167]">+</span>
          <span class="min-w-0 flex-1 rounded-full border border-[#e1d7ca] bg-[#f8f0e5] px-3 py-1 text-center text-xs text-[#4d5561]">
            {{ variant === 'api' ? 'No provider selected' : 'Local workspace context' }}
          </span>
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#172033] text-xs text-white">↵</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'workspace' | 'api'
}>(), {
  variant: 'workspace'
})

const tabs = ['Code', 'Chat', 'Tree']
const files = [
  { name: 'revenue.csv', meta: '84k rows' },
  { name: 'customers.parquet', meta: '18k rows' }
]
const previewBars = [
  { label: 'Revenue', width: '88%' },
  { label: 'Retention', width: '74%' },
  { label: 'Activation', width: '62%' },
  { label: 'Expansion', width: '51%' }
]
</script>
