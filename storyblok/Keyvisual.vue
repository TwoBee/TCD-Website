<template>
  <section class="keyvisual" v-editable="blok">
    <!-- <img :src="blok.image.filename" /> -->
    <div class="text__wrapper">
      <h2>{{ blok.headline }}</h2>
      <h3>{{ blok.subline }}</h3>
      <h3>{{ blok.image.filename }}</h3>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({ blok: Object });
  const backImage = ref("url(" +
    props.blok.image.filename +
    ")");
</script>

<style scoped lang="scss">
$color_white: red;

.keyvisual {
  background-image: v-bind('backImage');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 100vh;

  .text__wrapper {
    position: absolute;
    background-color: blue;
    min-height: 200px;
    min-width: 400px;
  }
}

img {
  width: 100vw;
  max-height: calc(100vh - 8vw);

  object-fit: cover;
}

h2 {
  position: absolute;
  color: $color_white;
  padding: 1rem;
  @include font-headline-2;
}

h3 {
  position: absolute;
  color: $color_white;
  padding: 1rem;
  @include font-headline-3
}
</style>