<template>
  <span class="inline-flex items-center gap-3">
    <svg
      :class="markClass"
      viewBox="0 0 200 200"
      role="img"
      aria-label="Inquira"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#f97316" />
        </linearGradient>
      </defs>
      <rect x="18" y="18" width="164" height="164" fill="#0f172a" rx="34" />
      <g transform="translate(100 100)">
        <circle r="20" :fill="`url(#${gradientId})`" />
        <g>
          <circle cx="60" cy="0" r="10" fill="#3b82f6" opacity="0.9">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
          </circle>
          <line x1="20" y1="0" x2="50" y2="0" :stroke="`url(#${gradientId})`" stroke-width="4" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
          </line>
        </g>
        <g transform="rotate(120)">
          <circle cx="60" cy="0" r="10" fill="#f97316" opacity="0.9">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
          </circle>
          <line x1="20" y1="0" x2="50" y2="0" :stroke="`url(#${gradientId})`" stroke-width="4" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
          </line>
        </g>
        <g transform="rotate(240)">
          <circle cx="60" cy="0" r="10" fill="#fb923c" opacity="0.9">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
          </circle>
          <line x1="20" y1="0" x2="50" y2="0" :stroke="`url(#${gradientId})`" stroke-width="4" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
          </line>
        </g>
      </g>
    </svg>
    <span v-if="showWordmark" :class="textClass">Inquira</span>
  </span>
</template>

<script setup lang="ts">
const gradientId = `inquira-mark-gradient-${useId()}`

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
