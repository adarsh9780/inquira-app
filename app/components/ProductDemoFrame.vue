<template>
  <div class="relative h-full overflow-hidden rounded-lg border border-[#ded8ce] bg-[#f6efe5] text-[#2d3440] shadow-2xl shadow-black/10">
    <div class="flex h-9 items-center gap-3 border-b border-[#e1d8ca] bg-[#f7efe4] px-4">
      <div class="flex items-center gap-2" aria-hidden="true">
        <span class="h-3 w-3 rounded-full bg-[#ff5f57]"></span>
        <span class="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
        <span class="h-3 w-3 rounded-full bg-[#28c840]"></span>
      </div>
      <div class="text-sm font-semibold text-[#303540]">Inquira</div>
    </div>

    <div class="grid h-[560px] grid-cols-[56px_minmax(0,1fr)] bg-[#faf6ee] md:h-[620px] md:grid-cols-[188px_minmax(0,1fr)] lg:h-[660px]">
      <aside class="flex min-w-0 flex-col border-r border-[#e1d8ca] bg-[#ebe4da]">
        <div class="flex h-16 items-center gap-3 border-b border-[#ded5c8] px-3">
          <img src="/brand/inquira-mark.svg" alt="" class="h-8 w-8 rounded-md">
          <span class="hidden text-sm font-semibold text-[#1f2937] md:block">Inquira</span>
        </div>

        <nav class="space-y-1 px-2 py-4 text-sm">
          <button
            v-for="item in primaryNav"
            :key="item.id"
            type="button"
            class="flex min-h-10 w-full items-center gap-3 rounded-md px-2 text-left transition-colors"
            :class="item.id === activeArea ? 'bg-[#f6e3d5] text-[#202632]' : 'text-[#6b6f76]'"
          >
            <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="item.icon"></svg>
            <span class="hidden truncate md:block">{{ item.label }}</span>
          </button>
        </nav>

        <div class="mt-2 hidden border-t border-[#ded5c8] px-3 py-4 md:block">
          <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8b8378]">Projects</div>
          <div class="space-y-2 text-sm">
            <div class="rounded-md bg-[#f6e3d5] px-3 py-2 font-semibold text-[#2f3440]">{{ workspace }}</div>
            <div class="px-3 py-2 text-[#6b6f76]">Spotify</div>
            <div class="px-3 py-2 text-[#6b6f76]">Test</div>
          </div>
        </div>

        <div class="mt-auto border-t border-[#ded5c8] px-2 py-3">
          <div class="flex min-h-9 items-center gap-3 rounded-md px-2 text-sm text-[#6b6f76]">
            <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.607 2.296.07 2.572-1.065Z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span class="hidden md:block">Settings</span>
          </div>
        </div>
      </aside>

      <main class="relative min-w-0 overflow-hidden bg-[#fffaf3]">
        <slot />
      </main>
    </div>

    <div class="flex h-8 items-center justify-between border-t border-[#ded8ce] bg-[#f8f0e5] px-4 text-xs text-[#777167]">
      <span class="hidden sm:inline">In - | Out - | Cost -</span>
      <span class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-[#22c55e]"></span>
        {{ status }}
      </span>
      <span>Inquira v0.5.35</span>
    </div>

    <div
      v-if="cursor?.visible"
      :key="`${cursor.x}-${cursor.y}-${cursor.click}`"
      class="demo-cursor pointer-events-none absolute z-30 transition-all duration-700"
      :class="{ 'is-clicking': cursor.click }"
      :style="{ left: cursor.x, top: cursor.y }"
      aria-hidden="true"
    >
      <span class="demo-cursor-ring"></span>
      <svg class="relative h-6 w-6 drop-shadow-md" viewBox="0 0 24 24" fill="none">
        <path d="M5 3.5 18.5 12 12.5 13.4 10.2 19.4 5 3.5Z" fill="#172033" stroke="white" stroke-width="1.6" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  activeArea?: 'chat' | 'code' | 'tree' | 'settings'
  workspace?: string
  status?: string
  cursor?: {
    visible: boolean
    x: string
    y: string
    click?: boolean
  }
}>(), {
  activeArea: 'chat',
  workspace: 'IPL ANALYSIS',
  status: 'Connected'
})

const primaryNav = [
  {
    id: 'chat',
    label: 'New conversation',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h8M8 14h5m8-2a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A8.96 8.96 0 0 1 21 12Z" />'
  },
  {
    id: 'code',
    label: 'Code',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 20 4-16m4 4 4 4-4 4M6 16l-4-4 4-4" />'
  },
  {
    id: 'tree',
    label: 'Conversation Tree',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 5l8 7-8 7" />'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Zm7.4-3.5c0-.5-.05-.98-.15-1.44l2.1-1.64-2-3.46-2.48 1a7.58 7.58 0 0 0-2.49-1.44L14 2.35h-4l-.38 2.67a7.58 7.58 0 0 0-2.49 1.44l-2.48-1-2 3.46 2.1 1.64A7.03 7.03 0 0 0 4.6 12c0 .5.05.98.15 1.44l-2.1 1.64 2 3.46 2.48-1c.74.62 1.58 1.1 2.49 1.44L10 21.65h4l.38-2.67a7.58 7.58 0 0 0 2.49-1.44l2.48 1 2-3.46-2.1-1.64c.1-.46.15-.94.15-1.44Z" />'
  }
] as const
</script>

<style scoped>
.demo-cursor {
  transform: translate(-2px, -2px);
}

.demo-cursor-ring {
  position: absolute;
  left: 6px;
  top: 5px;
  height: 22px;
  width: 22px;
  border-radius: 9999px;
  border: 2px solid rgba(192, 107, 62, 0.35);
  opacity: 0;
  transform: scale(0.6);
}

.demo-cursor.is-clicking .demo-cursor-ring {
  animation: demo-click 700ms var(--ease-standard);
}

@keyframes demo-click {
  0% {
    opacity: 0.9;
    transform: scale(0.45);
  }
  100% {
    opacity: 0;
    transform: scale(1.55);
  }
}
</style>
