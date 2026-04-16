<template>
  <!-- Mobile Navigation Overlay -->
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      :class="{ 'opacity-100': isOpen, 'opacity-0 pointer-events-none': !isOpen }"
      aria-hidden="true"
      @click="closeMenu"
    />

    <!-- Mobile Menu Panel -->
    <div
      ref="menuPanel"
      class="fixed top-0 right-0 z-[var(--z-modal)] h-full w-full max-w-xs bg-surface border-l border-border shadow-xl transition-transform duration-300 ease-out"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-border p-4">
        <AppLogo :size="40" />
        <button
          type="button"
          class="touch-target flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary-500 active:scale-[0.98] dark:hover:bg-neutral-800"
          style="min-width: 44px; min-height: 44px;"
          aria-label="Close menu"
          @click="closeMenu"
          @keydown.escape="closeMenu"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col p-4" aria-label="Main navigation">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="touch-target rounded-lg px-4 py-3 text-lg font-medium text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary-500 active:scale-[0.98] dark:hover:bg-neutral-800"
          :aria-current="isActiveLink(link.href) ? 'page' : undefined"
          @click="closeMenu"
        >
          <span class="flex items-center gap-3">
            <component :is="link.icon" v-if="link.icon" class="h-5 w-5" aria-hidden="true" />
            {{ link.label }}
          </span>
        </a>

        <!-- Divider -->
        <hr class="my-2 border-border" />

        <!-- Secondary Actions -->
        <a
          href="https://github.com/adarsh9780/inquira-ce"
          target="_blank"
          rel="noopener noreferrer"
          class="touch-target rounded-lg px-4 py-3 text-lg font-medium text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary-500 active:scale-[0.98] dark:hover:bg-neutral-800"
          @click="closeMenu"
        >
          <span class="flex items-center gap-3">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            GitHub
          </span>
        </a>

        <a
          v-if="showPricing"
          href="/#pricing"
          class="touch-target rounded-lg px-4 py-3 text-lg font-medium text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary-500 active:scale-[0.98] dark:hover:bg-neutral-800"
          @click="closeMenu"
        >
          Pricing
        </a>
      </nav>

      <!-- Footer (optional) -->
      <div class="absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4">
        <p class="text-center text-sm text-text-muted">
          © {{ currentYear }} Inquira-CE
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const showPricing = computed(() => config.public.showPricing === 'true')

const isOpen = defineModel<boolean>('open', { required: true })

const menuPanel = ref<HTMLElement | null>(null)

const currentYear = new Date().getFullYear()

interface NavLink {
  label: string
  href: string
  icon?: any
}

const navLinks = computed<NavLink[]>(() => [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Docs', href: '/docs' },
])

// Check if a link corresponds to current page/section
const isActiveLink = (href: string): boolean => {
  if (typeof window === 'undefined') return false
  if (href.startsWith('/#')) {
    // Anchor links - check URL hash
    return window.location.hash === href.substring(1)
  }
  return window.location.pathname === href
}

// Close menu and reset scroll
const closeMenu = () => {
  isOpen.value = false
  // Optionally clear hash on close to prevent jump
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname)
  }
}

// Keyboard trap and focus management
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Prevent body scroll when menu is open
watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    // Focus trap
    nextTick(() => {
      menuPanel.value?.focus()
    })
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Smooth transition for panel */
.panel-enter-active,
.panel-leave-active {
  transition: transform 0.3s ease-out;
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}
</style>
