<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-300">
    <div class="mx-auto max-w-[var(--content-max-width)] px-6">
      <div class="flex h-[var(--navbar-height)] items-center justify-between">
        <!-- Logo -->
        <a href="/#top" class="flex items-center gap-3">
          <AppLogo />
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-8 md:flex">
          <a href="/#features" class="text-sm font-medium text-text-secondary transition-colors hover:text-primary-500">
            Features
          </a>
          <a href="/#how-it-works" class="text-sm font-medium text-text-secondary transition-colors hover:text-primary-500">
            How It Works
          </a>
          <a v-if="showPricing" href="/#pricing" class="text-sm font-medium text-text-secondary transition-colors hover:text-primary-500">
            Pricing
          </a>
          <a href="/docs" class="text-sm font-medium text-text-primary transition-colors hover:text-primary-500">
            Docs
          </a>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-3">
          <!-- GitHub Link (Desktop) -->
          <a
            href="https://github.com/adarsh9780/inquira-ce"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary-500 sm:block active:scale-[0.98]"
            aria-label="View on GitHub"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>

          <!-- Download Button (Desktop) -->
          <a href="/#download" class="btn btn-primary rounded-lg px-4 py-2 text-sm font-medium hidden sm:inline-flex active:scale-[0.98]">
            Download
          </a>

          <!-- Theme Toggle -->
          <button
            type="button"
            class="touch-target hidden items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary-500 md:flex dark:hover:bg-neutral-800"
            style="min-width: 44px; min-height: 44px;"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <!-- Sun Icon (shown in dark mode) -->
            <svg v-if="isDark" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon Icon (shown in light mode) -->
            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            class="touch-target flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary-500 md:hidden dark:hover:bg-neutral-800"
            style="min-width: 44px; min-height: 44px;"
            aria-label="Open menu"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            @click="openMenu"
          >
            <svg v-if="!isMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Mobile Download Button (visible in menu) -->
          <a href="/#download" class="btn btn-primary rounded-lg px-4 py-2 text-sm font-medium sm:hidden active:scale-[0.98]">
            Download
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <MobileNavMenu v-model="isMenuOpen" />
  </nav>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const showPricing = computed(() => config.public.showPricing === 'true')

// Mobile menu state
const isMenuOpen = ref(false)

// Theme management
const isDark = ref(false)

// Initialize theme from localStorage or system preference
const initTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }
}

// Apply theme to document
const applyTheme = () => {
  if (typeof document !== 'undefined') {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }
}

// Toggle theme
const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

// Open mobile menu
const openMenu = () => {
  isMenuOpen.value = true
}

// Initialize on mount
onMounted(() => {
  initTheme()
})

// Watch for system preference changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
      applyTheme()
    }
  })
}
</script>
