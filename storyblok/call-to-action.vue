<template>
    <section :data-backdroptext="displayText" >
        <div class="cta--container" :class="{ mblock: offsetvalue === '0vh' }"
            :style="{ ' --offsetvar': offsetvalue }">
            <div class="cta--content">
                <h2>{{ blok.Headline }}</h2>
                <p>{{ blok.Text }}</p>
                <router-link :to="'/' + props.blok.Link.story.slug">
                    {{ props.blok.Link.title ? props.blok.Link.title : props.blok.Link.story.name }}
                </router-link>
            </div>
        </div>
    </section>
</template>
  
<script setup>
import { useNow } from '@vueuse/core';

const props = defineProps({ blok: Object });
const currentYear = useNow();
const currentYearString = "1970 " + currentYear.value.getFullYear()
const displayText = ref(currentYearString);

const offsetvalue = computed(() => {
    return props.blok.Offset ? "-150px" : "0px";
})
</script>
  

<style scoped lang="scss">
.mblock {
    margin: 10vh 0;
}

section {
    &::after {
        content: attr(data-backdroptext);
        position: absolute;
        @include font-body-sans-b;
        font-size: 9rem;
        line-height: 7rem;
        left: 0;
        max-width: 100vw;
        opacity: 0.1;
        z-index: 1;

        @include desktop {
            font-size: 240px;
            line-height: 9rem;
            top: 31%;
            left: 10%;

        }
    }

    .cta--container {
        width: 100%;
        background-color: $color-secondary;
        padding: 5%;


        @include desktop {
            width: 50%;
            margin: 0 auto;
            transform: translateY(v-bind(offsetvalue));
        }

        .cta--content {
            position: relative;
            z-index: 2;
            display: grid;
            gap: 1.2rem;
            color: $color-accent;

            h2 {
                @include font-headline-serif-2;


                @include desktop {
                    letter-spacing: 0.2rem;
                }
            }

            p,
            a {
                @include font-body-sans-r;
                color: inherit;
            }
        }
    }
}
</style>