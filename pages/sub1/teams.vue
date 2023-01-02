<script setup>
const story = await useAsyncStoryblok('sub1/teams', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
