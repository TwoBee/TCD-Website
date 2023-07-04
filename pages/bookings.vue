<script setup>
const story = await useAsyncStoryblok('sites/reservierungen', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
