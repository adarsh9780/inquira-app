<template>
  <span class="inline-flex items-center gap-3">
    <img src="/brand/inquira-mark.svg" :class="markClass" alt="Inquira" />
    <span v-if="showWordmark" :class="textClass">Inquira</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    markClass?: string
    showWordmark?: boolean
    textClass?: string
  }>(),
  {
    markClass: 'h-8 w-8',
    showWordmark: true,
    textClass: 'font-sans text-lg font-semibold'
  }
)
</script>
