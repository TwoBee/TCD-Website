<script setup>
const story = await useAsyncStoryblok('sites/spieler', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
