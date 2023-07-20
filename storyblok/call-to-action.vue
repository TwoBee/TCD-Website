<template>
    <section>
        <div class="cta--container" :data-testcontent="displayText" :class="{ mblock: offsetvalue === '0vh' }"
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
const currentYearString = "1970 \n\r " + currentYear.value.getFullYear()
const displayText = ref(currentYearString);

const offsetvalue = computed(() => {
    return props.blok.Offset ? "-150px" : "0px";
})
</script>
  

<style scoped lang="scss">
.mblock {
    margin: 10vh 0;
}

.cta--container {
    width: 50%;
    margin: 0 auto;
    padding: 5%;
    background-color: $color-secondary;
    transform: translateY(v-bind(offsetvalue));

    .cta--content {
        display: grid;
        gap: 1.2rem;
        color: $color-accent;

        h2 {
            @include font-headline-serif-2;
            letter-spacing: 0.2rem;
        }

        p,
        a {
            @include font-body-sans-r;
            color: inherit;
        }
    }

    &::after {
        content: attr(data-testcontent);
        @include font-body-sans-b;
        font-size: 240px;
        position: absolute;
        line-height: 9rem;
        top: 31%;
        left: 10%;
        opacity: 0.1;
    }
}
</style>