<template>
  <section class="keyvisual" v-editable="blok">
    <!-- <img :src="blok.image.filename" /> -->
    <div class="text__wrapper">
      <h2>{{ blok.headline }}</h2>
      <h3>{{ blok.subline }}</h3>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({ blok: Object });
  const backImage = ref("url(" +
    props.blok.image.filename +
    ")");
  const greyscale = props.blok.greyscale ? 'grayscale(1)':'grayscale(0)';
  console.log(greyscale);
  const filter = ref(greyscale);
</script>

<style scoped lang="scss">
.keyvisual {
  background-image: v-bind('backImage');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: calc(100vh - 8vw);
  filter: v-bind('filter');

  .text__wrapper {
    position: absolute;
    min-height: 200px;
    min-width: 400px;
    top: 60%;
    left: 10%;
    display: flex;
    flex-direction: column;
  }
}

img {
  width: 100vw;
  max-height: calc(100vh - 8vw);

  object-fit: cover;
}

h2 {
  color: $color_white;
  @include font-headline-2;
}

h3 {
  color: $color_white;
  @include font-headline-3
}
</style>