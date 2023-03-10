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
  const backgroundImage = ref("url(" +
    props.blok.image.filename +
    ")");
  const greyscale = props.blok.greyscale ? 'grayscale(.5)' : 'grayscale(0)';
  const backgroundAlignment = props.blok.alignment ? props.blok.alignment : 'center';
  const filter = ref(greyscale);

</script>

<style scoped lang="scss">
img {
  width: 100vw;
  max-height: calc(100vh - 8vw);

  object-fit: cover;
}

h2 {
  @include font-headline-2;
  color: $color_white;
  max-width: 60%;

  @include desktop {
    max-width: unset;
  }
}

h3 {
  @include font-headline-3;
  color: $color_white;
}

.keyvisual {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 212, 255, 0) 100%), v-bind('backgroundImage');
  background-position: v-bind('backgroundAlignment');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  filter: v-bind('filter');
  height: 50vh;

  @include desktop {
    height: calc(100vh - 8vw);
  }

  .text__wrapper {
    position: absolute;
    top: 60%;
    left: 10%;
    display: flex;
    flex-direction: column;
  }
}
</style>