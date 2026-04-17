<template>
  <DocsContent
    :doc="doc"
    :all-docs="allDocs"
    :current-path="'/docs/welcome'"
  >
    <template #content>
      <ContentRenderer :value="doc" />
    </template>
  </DocsContent>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const { data: doc } = await useAsyncData('welcome-doc', () =>
  queryCollection('docs').path('/docs/welcome').first()
)

if (!doc.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found'
  })
}

const { data: allDocs } = await useAsyncData('all-docs', () =>
  queryCollection('docs').all()
)
</script>
