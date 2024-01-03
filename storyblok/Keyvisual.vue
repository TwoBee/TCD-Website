<script setup>
const props = defineProps({ blok: Object });
const backgroundImage = ref("url(" +
  props.blok.image.filename +
  ")");
const greyscale = props.blok.greyscale ? 'grayscale(.5)' : 'grayscale(0)';
const backgroundAlignment = props.blok.alignment ? props.blok.alignment : 'center';
const filter = ref(greyscale);

</script>

<template>
  <section class="container" v-editable="blok">
    <div class="text__wrapper">
      <h2>{{ blok.headline }}</h2>
      <h3>{{ blok.subline }}</h3>
    </div>
  </section>
</template>

<style scoped lang="scss">
img {
  width: 100vw;
  max-height: calc(100vh - 8vw);

  object-fit: cover;
}

h2 {
  @include font-headline-serif-2;
  color: $color_white;
  max-width: 60%;
  margin: 1rem 0;

  @include desktop {
    max-width: unset;
  }
}

h3 {
  @include font-headline-sans-3;
  font-size: 1.5rem;
  line-height: 1.5rem;
  color: $color_white;

  @include desktop {
    line-height: 4rem;
  }
}

.container {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 212, 255, 0) 100%), v-bind('backgroundImage');
  background-position: v-bind('backgroundAlignment');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  filter: v-bind('filter');
  height: 50vh;

  @include desktop {
    min-height: 50vh;
    height: 600px;
  }

  .text__wrapper {
    position: absolute;
    top: 50%;
    left: 10%;
    display: flex;
    flex-direction: column;

    @include desktop {
      top: 60%;
    }
  }
}
</style>