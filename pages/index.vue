<script setup>

const story = await useAsyncStoryblok('sites/home', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
