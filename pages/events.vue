<script setup>
const story = await useAsyncStoryblok('sites/e', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

<style scoped lang="scss">
:deep(section){
    padding-top: 20vh;
}
</style>