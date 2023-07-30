<script setup>

const story = await useAsyncStoryblok('sites/mitglied-werden', { version: 'draft',  resolve_links: 'url' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
