<template>
  <section class="spielplan">
    <article v-for="spiel in spiele">
      <span class="gegner">{{ spiel.content.Gegner }}</span>
      <span class="spieltag">{{ spiel.content.Spieltag.getFullYear }}</span>
      <span class="mannschaft">{{ spiel.content.Mannschaft.name }}</span>
      <span v-if="spiel.content.Heimspiel" class="spielort">Heimspiel</span>
      <span v-if="!spiel.content.Heimspiel" class="spielort">Auswärtsspiel</span>
      <div class="score"></div>
    </article>
  </section>
</template>
<script setup>
console.log("test");
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories', {
  version: 'draft',
  starts_with: 'spiele',
  is_startpage: false,
  resolve_relations: 'Spiel.Mannschaft'
})

const spiele = ref(data.stories)

</script>
<style scoped lang="scss">
section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  width: 80%;
  margin: 0 auto;

  @include desktop {
    grid-template-columns: repeat(4, 1fr);
  }

  article {
    display: flex;
    flex-direction: column;
    background-color: $color_primary;
    padding: 1rem 2rem;
    color: $color_white;
    width: 80%;
    max-height: 20vh;
    aspect-ratio: 4/3;
    margin: 0 auto;

    span {
      @include font-body-sans-b;
    }

    .gegner {
      @include font-headline-serif-3;
    }

    .spieltag {}

    .mannschaft {
      @include font-body-sans-b;
    }
    .score {
      background-color: #c4a552;
      width: 70%;
      aspect-ratio: 4/3;
      transform: translate(130%, 0%);
    }
  }
}
</style>