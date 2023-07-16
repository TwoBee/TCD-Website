<script setup>

const story = await useAsyncStoryblok('sites/', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
