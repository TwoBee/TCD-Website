<script setup>
const story = await useAsyncStoryblok('sites/termine', { version: 'draft', resolve_links: "url" })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

<style scoped lang="scss">
</style>