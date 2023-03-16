<script setup>
const story = await useAsyncStoryblok('club', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
