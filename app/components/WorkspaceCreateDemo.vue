<template>
  <ProductDemoFrame active-area="settings" workspace="LOCAL DEMO" :status="created ? 'Workspace Ready' : 'Connected'">
    <div class="flex h-full min-h-[520px] items-center justify-center bg-[#f3eee6] p-4">
      <section class="grid h-[88%] w-full max-w-4xl overflow-hidden rounded-lg border border-[#ded2c3] bg-[#fffaf3] shadow-xl md:grid-cols-[170px_minmax(0,1fr)]">
        <aside class="hidden border-r border-[#e3d9cc] bg-[#f5eee4] p-4 md:block">
          <div
            v-for="item in settingsItems"
            :key="item"
            class="mb-2 rounded-md px-3 py-2 text-sm"
            :class="item === 'Workspace' ? 'border border-[#dfb991] bg-[#f6e3d5] font-semibold text-[#202632]' : 'text-[#777167]'"
          >
            {{ item }}
          </div>
        </aside>

        <div class="flex min-w-0 flex-col">
          <header class="flex items-start justify-between border-b border-[#e3d9cc] px-5 py-4">
            <div>
              <h3 class="text-base font-semibold text-[#202632]">Manage Workspaces</h3>
              <p class="text-xs text-[#5f6874]">Browse, create, configure, activate, or delete your workspaces.</p>
            </div>
            <button type="button" class="text-xl leading-none text-[#777167]">x</button>
          </header>

          <div class="grid min-h-0 flex-1 gap-0 md:grid-cols-[36%_64%]">
            <section class="border-r border-[#e3d9cc] p-5">
              <div class="mb-4 flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wide text-[#303540]">Workspaces</span>
                <button
                  type="button"
                  class="text-sm font-semibold text-[#c06b3e]"
                  @click="startCreate"
                >
                  + New
                </button>
              </div>

              <div class="space-y-3">
                <button
                  v-for="workspace in visibleWorkspaces"
                  :key="workspace.name"
                  type="button"
                  class="w-full rounded-lg px-3 py-3 text-left transition"
                  :class="workspace.selected ? 'border border-[#dfb991] bg-[#f6e3d5]' : 'bg-[#f1eadf] text-[#4d5561]'"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="truncate text-sm font-semibold text-[#303540]">{{ workspace.name }}</span>
                    <span v-if="workspace.selected" class="rounded-full bg-[#dff4df] px-2 py-0.5 text-xs text-[#30965f]">Active</span>
                  </div>
                  <p class="mt-2 text-xs text-[#777167]">{{ workspace.meta }}</p>
                </button>

                <div v-if="creating && !created" class="rounded-lg border border-dashed border-[#d4b79d] bg-[#fff7ed] p-3">
                  <label for="workspace-name" class="text-xs font-semibold uppercase tracking-wide text-[#9b4d27]">New workspace</label>
                  <input
                    id="workspace-name"
                    v-model="workspaceName"
                    class="mt-2 w-full rounded-md border border-[#e1d7ca] bg-white px-3 py-2 text-sm text-[#303540] focus:border-[#c06b3e] focus:outline-none"
                  >
                  <button
                    type="button"
                    class="mt-3 w-full rounded-md bg-[#ba6a3c] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#a85d34]"
                    @click="createWorkspace"
                  >
                    Create workspace
                  </button>
                </div>
              </div>
            </section>

            <section class="min-w-0 p-5">
              <div class="mb-5 flex items-center justify-between gap-3">
                <h4 class="text-base font-semibold text-[#202632]">Selected Workspace Summary</h4>
                <button type="button" class="rounded-full border border-[#e1d7ca] bg-[#f8f0e5] px-3 py-1.5 text-sm text-[#4d5561]">Rename</button>
              </div>

              <div class="space-y-5">
                <div>
                  <div class="mb-2 flex items-center justify-between">
                    <span class="text-xs font-semibold uppercase tracking-wide text-[#303540]">Workspace Context</span>
                    <button type="button" class="text-sm font-semibold text-[#c06b3e]">Edit</button>
                  </div>
                  <div class="rounded-lg border border-[#e1d7ca] bg-[#f7efe4] px-4 py-3 text-sm text-[#4d5561]">
                    {{ created ? 'analyze local revenue and retention data for the product launch' : 'create a focused analysis workspace for a local project' }}
                  </div>
                </div>

                <div>
                  <div class="mb-2 flex items-center justify-between">
                    <span class="text-xs font-semibold uppercase tracking-wide text-[#303540]">Linked Datasets</span>
                    <button type="button" class="text-lg font-semibold text-[#c06b3e]">+</button>
                  </div>
                  <div class="rounded-lg border border-dashed border-[#d8c6b3] px-4 py-5 text-center">
                    <p class="text-sm font-medium text-[#4d5561]">Drop files here or choose files</p>
                    <p class="mt-1 text-xs text-[#777167]">CSV, TSV, Parquet, JSON, XLSX, and XLS</p>
                  </div>
                  <TransitionGroup name="dataset" tag="div" class="mt-3 space-y-2">
                    <div
                      v-for="dataset in visibleDatasets"
                      :key="dataset.name"
                      class="flex items-center justify-between gap-3 rounded-lg border border-[#e1d7ca] bg-[#f8f0e5] px-4 py-3"
                    >
                      <div>
                        <div class="text-sm font-semibold text-[#303540]">{{ dataset.name }}</div>
                        <div class="text-xs text-[#777167]">{{ dataset.meta }}</div>
                      </div>
                      <span class="rounded-full bg-[#dff4df] px-2 py-1 text-xs font-medium text-[#30965f]">Schema ready</span>
                    </div>
                  </TransitionGroup>
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
const prefersReducedMotion = ref(false)
const creating = ref(false)
const created = ref(false)
const workspaceName = ref('Revenue Review')
let timer: ReturnType<typeof window.setTimeout> | null = null

const baseWorkspaces = [
  { name: 'IPL ANALYSIS', meta: '3 convs - 6h ago', selected: false },
  { name: 'SPOTIFY', meta: '1 conv - 6h ago', selected: false },
  { name: 'TEST', meta: '1 conv - 6h ago', selected: false }
]

const visibleWorkspaces = computed(() => {
  if (!created.value) {
    return baseWorkspaces.map((workspace, index) => ({
      ...workspace,
      selected: index === 0
    }))
  }

  return [
    { name: workspaceName.value.toUpperCase(), meta: '2 datasets - just now', selected: true },
    ...baseWorkspaces
  ]
})

const visibleDatasets = computed(() => {
  if (!created.value) {
    return []
  }

  return [
    { name: 'revenue.csv', meta: '84,212 rows - 19 cols' },
    { name: 'customers.parquet', meta: '18,640 rows - 26 cols' }
  ]
})

function clearTimer() {
  if (timer) {
    window.clearTimeout(timer)
    timer = null
  }
}

function startCreate() {
  clearTimer()
  creating.value = true
  created.value = false
}

function createWorkspace() {
  clearTimer()
  creating.value = false
  created.value = true
}

function runDemo() {
  clearTimer()
  if (prefersReducedMotion.value) {
    creating.value = false
    created.value = true
    return
  }

  creating.value = true
  created.value = false
  timer = window.setTimeout(createWorkspace, 1200)
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
.dataset-enter-active,
.dataset-leave-active {
  transition: opacity var(--motion-normal) var(--ease-standard), transform var(--motion-normal) var(--ease-standard);
}

.dataset-enter-from,
.dataset-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
