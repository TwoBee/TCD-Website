<script setup>
const story = await useAsyncStoryblok('sites/contact', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
