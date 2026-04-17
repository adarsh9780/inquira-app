<template>
  <DocsContent
    :doc="doc"
    :all-docs="allDocs"
    :current-path="route.path"
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

const route = useRoute()

const { data: doc } = await useAsyncData(route.path, () =>
  queryCollection('docs').path(route.path).first()
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
