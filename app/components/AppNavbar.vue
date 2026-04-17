<template>
  <nav class="app-navbar-surface fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 py-0">
    <div class="mx-auto max-w-[var(--content-max-width)] px-6">
      <div class="flex h-[var(--navbar-height)] items-center justify-between">
         <!-- Logo -->
         <a href="/#top" class="flex items-center gap-3">
           <AppLogo :text-class="'hidden sm:inline font-sans text-lg font-semibold text-text-primary'" />
         </a>

         <!-- Desktop Navigation -->
         <div class="hidden items-center gap-8 md:flex">
           <a :href="'/#features'" :class="getNavLinkClass('features')">
             Features
           </a>
           <a :href="'/#how-it-works'" :class="getNavLinkClass('how-it-works')">
             How It Works
           </a>
           <a v-if="showPricing" :href="'/#pricing'" :class="getNavLinkClass('pricing')">
             Pricing
           </a>
           <a href="/docs" :class="isDocsActive ? 'text-sm font-medium text-primary-500 transition-colors' : 'text-sm font-medium text-text-secondary transition-colors hover:text-primary-500'">
             Docs
           </a>
         </div>

         <!-- Right Side Actions -->
         <div class="flex items-center gap-3">
           <!-- Mobile Menu Button -->
           <button
             type="button"
             class="touch-target flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 md:hidden"
             :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
             @click="isMobileMenuOpen = !isMobileMenuOpen"
           >
             <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
             </svg>
             <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>

            <!-- GitHub Link (Desktop) -->
           <a
             href="https://github.com/adarsh9780/inquira-ce"
             target="_blank"
             rel="noopener noreferrer"
             class="hidden rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 sm:block active:scale-[0.98]"
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

           <!-- Theme Toggle (Desktop) -->
           <button
             type="button"
             class="touch-target hidden items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 md:flex"
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

           <!-- Mobile Download Button (visible in menu) -->
           <a href="/#download" class="btn btn-primary rounded-lg px-4 py-2 text-sm font-medium sm:hidden active:scale-[0.98]">
             Download
           </a>

           <!-- Mobile Menu Overlay & Drawer -->
           <Teleport to="body">
             <!-- Overlay -->
             <div
               v-if="isMobileMenuOpen"
               class="app-overlay-surface fixed inset-0 z-40"
               @click="isMobileMenuOpen = false"
             ></div>

             <!-- Mobile Drawer -->
             <div
               v-if="isMobileMenuOpen"
               class="app-sidebar-surface fixed top-[var(--navbar-height)] left-0 right-0 z-50 max-h-[calc(100vh-var(--navbar-height))] overflow-y-auto rounded-b-3xl border-b shadow-2xl"
               role="dialog"
               aria-modal="true"
               aria-label="Mobile navigation menu"
             >
               <div class="p-4 space-y-1">
                 <!-- Nav Links -->
                 <a
                   href="/#features"
                   class="block rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98]"
                   @click="isMobileMenuOpen = false"
                 >
                   Features
                 </a>
                 <a
                   href="/#how-it-works"
                   class="block rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98]"
                   @click="isMobileMenuOpen = false"
                 >
                   How It Works
                 </a>
                 <a
                   v-if="showPricing"
                   href="/#pricing"
                   class="block rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98]"
                   @click="isMobileMenuOpen = false"
                 >
                   Pricing
                 </a>
                 <a
                   href="/docs"
                   class="block rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98]"
                   @click="isMobileMenuOpen = false"
                 >
                   Docs
                 </a>

                  <hr class="my-3 border-border" />

                  <!-- Mobile Actions -->
                  <div class="space-y-1">
                    <!-- Dark Mode Toggle (Mobile) -->
                    <button
                      type="button"
                      class="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98] text-left"
                      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
                      @click="toggleTheme(); isMobileMenuOpen = false"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span class="font-medium">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
                    </button>

                    <a
                     href="https://github.com/adarsh9780/inquira-ce"
                     target="_blank"
                     rel="noopener noreferrer"
                     class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-primary-500 active:scale-[0.98]"
                     @click="isMobileMenuOpen = false"
                   >
                     <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                     </svg>
                     <span class="font-medium">GitHub</span>
                   </a>
                 </div>
               </div>
             </div>
           </Teleport>
         </div>
       </div>
     </div>
   </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router/auto'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const showPricing = computed(() => config.public.showPricing === 'true')
const route = useRoute()

// Theme management
const isDark = ref(false)
const isMobileMenuOpen = ref(false)

// Active section tracking for scroll spy (landing page only)
const activeSection = ref<string>('')

// Client-only state for route-based active states
const isDocsActive = ref(false)

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
    document.documentElement.setAttribute('data-style-theme', 'glass')
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

// Update docs active state (client-only)
const updateDocsActive = () => {
  if (typeof window !== 'undefined' && route.value) {
    isDocsActive.value = route.value.path.startsWith('/docs')
  }
}

// Initialize on mount
onMounted(() => {
  initTheme()
  setupScrollSpy()
  updateDocsActive()
})

// Scroll spy for landing page sections
const setupScrollSpy = () => {
  if (typeof window === 'undefined') return
  // Only run on landing page (route.path === '/')
  if (route.value?.path !== '/') return

  const sections = ['features', 'how-it-works', 'pricing', 'download']
  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Trigger when section is near top
    threshold: 0
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, observerOptions)

  // Observe each section
  sections.forEach(sectionId => {
    const el = document.getElementById(sectionId)
    if (el) observer.observe(el)
  })
}

// Close mobile menu on Escape
const handleMobileMenuKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleMobileMenuKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleMobileMenuKeydown)
})

// Lock body scroll when mobile menu is open
watch(isMobileMenuOpen, (open) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

// Helper to get link classes for scroll-spy
const getNavLinkClass = (sectionId: string): string => {
  const isActive = activeSection.value === sectionId
  return `text-sm font-medium transition-colors ${isActive ? 'text-primary-500' : 'text-text-secondary hover:text-primary-500'}`
}

// Watch for route changes to reset scroll spy when not on home
watch(() => route.value?.path, (newPath) => {
  if (newPath !== '/') {
    activeSection.value = ''
    isDocsActive.value = true // Any docs route
  } else {
    // Reinitialize scroll spy when returning to home
    isDocsActive.value = false
    nextTick(() => {
      setupScrollSpy()
    })
  }
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

<style scoped>
.app-navbar-surface {
  transition:
    background var(--navbar-open-duration) var(--ease-standard),
    border-color var(--navbar-open-duration) var(--ease-standard);
}
</style>
