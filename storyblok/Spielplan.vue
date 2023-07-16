<template>
  <section class="spielplan">
    <article v-for="spiel in spiele">
      <span class="gegner">{{ spiel.content.Gegner }}</span>
      <span class="spieltag">{{ spiel.content.Spieltag.getFullYear }}</span>
      <span class="mannschaft">{{ spiel.content.Mannschaft.name }}</span>
      <span v-if="spiel.content.Heimspiel" class="spielort">Heimspiel</span>
      <span v-if="!spiel.content.Heimspiel" class="spielort">Auswärtsspiel</span>
      <div class="score">
        <span>15:8</span>
      </div>
    </article>
  </section>
</template>
<script setup>
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
  padding-bottom: 10%;

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
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

    @include tablet {
      width: 70%
    }

    @include desktop {
      width: 100%;
      height: 100%;
    }

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
      background-color: $color_secondary;
      width: 70%;
      aspect-ratio: 4/3;
      padding: 10%;
      transform: translate(100%, 0%);

      @include tablet {
        width: 60%;
        transform: translate(100%, -30%);
      }

      @include desktop {
        transform: translate(110%, -30%);
      }

      >* {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        color: $color_accent;
        @include font-headline-sans-3;
      }
    }
  }
}
</style>