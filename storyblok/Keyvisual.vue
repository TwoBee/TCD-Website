<template>
  <section
    v-editable="blok">
  <img :src="blok.image.filename" />
  <h2>{{blok.headline}}</h2>
  <h3>{{blok.subline}}</h3>
  </section>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
  section{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  img{
    width: 100vw;
    height: calc(100vh - 8vw);
    object-fit: cover;
  }
  h2{
    position: absolute;
    left: 4vw;
    bottom: 20vw;
    color: $color_white;
    padding: 1rem;
    @include font-headline-2;
  }
  h3{
    position: absolute;
    left: 4vw;
    bottom: 18vw;
    color: $color_white;
    padding: 1rem;
    @include font-headline-3
  }
</style>