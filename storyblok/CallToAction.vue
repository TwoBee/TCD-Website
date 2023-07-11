<template>
    <section ref="container" class="call-to-action" :style="{ '--bgContent': displayText }" v-editable="blok">
        <div class="card">
            <div class="textwrapper">
                <h2>
                    {{ blok.Headline }}
                </h2>
                <p>
                    {{ blok.Text }}
                </p>
            </div>

            <a :href="props.blok.Link.cached_url">
                {{ goToLink }}
            </a>
        </div>
    </section>
</template>
  
<script setup>
import { useNow } from '@vueuse/core';

const props = defineProps({ blok: Object });
const goToLink = computed(() => {
    return props.blok.Link.title ? props.blok.Link.title : props.blok.Link.cached_url;
})
const currentYear = useNow();
const currentYearString = "1970 /A " + currentYear.value.getFullYear()
const displayText = ref(currentYearString);

</script>
  

<style scoped lang="scss">
.call-to-action {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-secondary;


    .card {
        z-index: 1;
        padding: 1rem;

        >*>* {
            margin-top: 1.5rem;
            margin-bottom: .5rem;
            color: $color-accent;
        }

        a {
            @include font-body-sans-b;
            color: $color-accent;
            width: fit-content;

            &:hover {
                color: $color-primary;
            }
        }
    }

    &::after {
        content: "1970 \A 2023";
        white-space: pre;
        position: absolute;
        font-size: 9rem;
        line-height: 9rem;
        color: $color_secondary_dark_reduced;
        transform: translateX(0%) translateY(-15%);
    }
}

@include desktop {
    section {
        transform: translateX(20vw) translateY(-20vh);
    }

    .call-to-action {
        width: 60%;

        .card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 60vw;
            height: 100%;
            padding: 3rem;

            >*,
            >*>* {
                margin-top: 1.5rem;
                margin-bottom: .5rem;
                color: $color-accent;
            }

            h2 {
                @include font-headline-serif-2;
            }


        }

        &::after {
            font-size: 14rem;
            line-height: 10rem;
        }
    }
}
</style>