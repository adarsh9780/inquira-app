<template>
  <ProductDemoFrame
    :active-area="settingsOpen ? 'settings' : 'chat'"
    workspace="LOCAL DEMO"
    :status="created ? 'Workspace Ready' : settingsOpen ? 'Configuring workspace' : 'Connected'"
    :cursor="demoCursor"
  >
    <div class="flex h-full min-h-[520px] items-center justify-center bg-[#f3eee6] p-4 md:min-h-[560px] md:p-6">
      <section
        v-if="settingsOpen"
        class="grid h-full max-h-[660px] w-full max-w-[1120px] overflow-hidden rounded-lg border border-[#ded2c3] bg-[#fffaf3] shadow-xl md:grid-cols-[190px_minmax(0,1fr)]"
      >
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
                    placeholder="Workspace name"
                  >
                  <p v-if="workspaceName" class="mt-2 text-xs text-[#777167]">Naming the local project workspace</p>
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

      <AppIdleDemoSurface v-else variant="workspace" class="h-full max-h-[660px] w-full max-w-[1120px] overflow-hidden rounded-lg border border-[#ded2c3] shadow-xl" />
    </div>
  </ProductDemoFrame>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})

type DemoStep = 'settings' | 'new' | 'name' | 'create' | 'done'

const settingsItems = ['LLM & API Keys', 'Workspace', 'Appearance', 'Account']
const prefersReducedMotion = ref(false)
const settingsOpen = ref(true)
const creating = ref(false)
const created = ref(false)
const workspaceName = ref('Revenue Review')
const demoStep = ref<DemoStep>('done')
const timers: Array<ReturnType<typeof window.setTimeout> | ReturnType<typeof window.setInterval>> = []
const finalWorkspaceName = 'Revenue Review'

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

const demoCursor = computed(() => {
  if (prefersReducedMotion.value || demoStep.value === 'done') {
    return { visible: false, x: '0%', y: '0%' }
  }

  const positions: Record<Exclude<DemoStep, 'done'>, { x: string, y: string }> = {
    settings: { x: '4%', y: '40%' },
    new: { x: '57%', y: '25%' },
    name: { x: '54%', y: '68%' },
    create: { x: '54%', y: '76%' }
  }

  return {
    visible: true,
    click: demoStep.value !== 'name',
    ...positions[demoStep.value]
  }
})

function clearTimers() {
  while (timers.length) {
    const timer = timers.pop()
    if (timer) {
      window.clearTimeout(timer)
    }
  }
}

function startCreate() {
  clearTimers()
  settingsOpen.value = true
  creating.value = true
  created.value = false
  workspaceName.value = ''
}

function createWorkspace() {
  clearTimers()
  workspaceName.value = workspaceName.value || finalWorkspaceName
  creating.value = false
  created.value = true
  demoStep.value = 'done'
}

function runDemo() {
  clearTimers()
  if (prefersReducedMotion.value) {
    settingsOpen.value = true
    creating.value = false
    created.value = true
    workspaceName.value = finalWorkspaceName
    demoStep.value = 'done'
    return
  }

  settingsOpen.value = false
  created.value = false
  creating.value = false
  workspaceName.value = ''
  demoStep.value = 'settings'

  timers.push(window.setTimeout(() => {
    settingsOpen.value = true
  }, 1500))
  timers.push(window.setTimeout(() => {
    demoStep.value = 'new'
  }, 2400))
  timers.push(window.setTimeout(() => {
    creating.value = true
    demoStep.value = 'name'
  }, 3200))
  timers.push(window.setTimeout(() => {
    let nextCharacter = 0
    const typingTimer = window.setInterval(() => {
      nextCharacter += 1
      workspaceName.value = finalWorkspaceName.slice(0, nextCharacter)
      if (nextCharacter >= finalWorkspaceName.length) {
        window.clearInterval(typingTimer)
      }
    }, 80)
    timers.push(typingTimer)
  }, 3500))
  timers.push(window.setTimeout(() => {
    demoStep.value = 'create'
  }, 5000))
  timers.push(window.setTimeout(() => {
    createWorkspace()
  }, 6000))
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
