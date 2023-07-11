<script setup>
const props = defineProps({ blok: Object });
</script>

<template>
  <section class="teamitem">
    <div class="content">
      <img src="https://a.storyblok.com/f/182146/2400x1600/dd5f3d91a1/moises-alex-wqi-pbyugn4-unsplash.jpg" alt="">
      <div class="text__content">
        <h3>Unsere Goldies</h3>
        <h2>Herren Ü40</h2>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren,</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.teamitem {
  padding: 2rem 0;

  @include tablet {
    padding: 0;
    margin-top: -3%;
  }

  .content {
    @include tablet {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    img {
      @include tablet {
        transform: translate(-52vw, 15vh);
        width: 45vw;
      }

      @include desktop {
        transform: translate(-55vw, 25vh);
        width: 35vw;
      }
    }

    .text__content {
      background-color: $color-primary;
      color: $color-white;
      padding: 1rem;

      @include tablet {
        width: 80vw;
        padding: 1rem 1rem 1rem 30%;
      }

      @include desktop {
        min-height: 35vh;
        padding: 1rem 10% 1rem 30%
      }

      h3 {
        @include font-headline-serif-2;
      }

      h2 {
        @include font-body-sans-b;
        font-size: 1.5rem;
        line-height: 2rem;
      }

      p {
        @include font-body-sans-r;
      }
    }
  }

  &:nth-of-type(odd) {

    .content {
      align-items: flex-start;

      img {
        @include tablet {
          transform: translate(52vw, 15vh);
        }
      }
    }

    .text__content {
      background-color: $color-secondary;
      color: $color-black;

      @include tablet {
        width: 80vw;
        padding: 1rem 30% 1rem 1rem;
      }

      @include desktop {
        padding: 1rem 30% 1rem 10%;
      }
    }
  }
}
</style>