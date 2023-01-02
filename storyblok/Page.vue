<template>
  <div v-editable="blok" class="">
    <Nav></Nav>
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from '../components/layout/footer.vue';
import Nav from '../components/layout/nav.vue';

defineProps({ blok: Object })
</script>
