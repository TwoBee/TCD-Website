<script setup>
const props = defineProps({ blok: Object });
</script>

<template>
  <section>
    <a :href="blok.OutsourceLink.url">Jetzt Platz reservieren!</a>
  </section>
</template>

<style scoped lang="scss">
section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;

  a {
    padding: 1rem 4rem;
    background-color: $color-primary;
    border: 1px solid $color-secondary;
    border-radius: 1px;
    -webkit-box-shadow: 4px 4px 10px -6px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 4px 4px 10px -6px rgba(0, 0, 0, 0.5);
    box-shadow: 4px 4px 10px -6px rgba(0, 0, 0, 0.5);
  }
}
</style>