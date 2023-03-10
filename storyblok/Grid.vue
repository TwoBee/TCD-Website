<template>
  <section>
    <p>{{ props.blok.Titel }}</p>
    <div v-editable="blok" class="container grid">

      <StoryblokComponent v-for="blok in blok.columns" :key="blok._uid" :blok="blok" />
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({ blok: Object })
</script>
<style scoped lang="scss">
section {
  width: 100vw;
  background-color: $color-primary;
  color: $color-white;

  @include desktop {
    display: flex;
    padding: 0 10% 20% 10%;
  }

  .container {

    &.grid {
      display: grid;
      grid-template-columns: 1fr;
      padding: 0 2rem;

      @include desktop {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  p {
    @include font-headline-2;
    text-align: center;
    padding: 2rem 0;
    background-color: $color-primary;
    width: 100%;

    @include desktop {
      width: unset;
      padding: 0;
    }
  }
}
</style>