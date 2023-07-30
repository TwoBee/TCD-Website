<template>
    <section class="decoratedCTA">
        <div class="container">
            <div class="gallery">
                <img :src="props.blok.Left_Image.filename" alt="">
                <img :src="props.blok.Right_Upper_Image.filename" alt="">
                <img :src="props.blok.Right_Lower_Image.filename" alt="">
            </div>
            <div class="cta">
                <p>{{ props.blok.Shorttext }}</p>
                <NuxtLink :to="props.blok.Link.story.url">Mehr erfahren</NuxtLink>
            </div>
        </div>
    </section>
</template>
<script setup>
const props = defineProps({ blok: Object });
</script>
<style scoped lang="scss">
.decoratedCTA {
    background: linear-gradient(180deg, white 25%, $color-primary 25%);


    @include desktop {
        padding: 10rem 0;
    }

    .container {
        margin: 0 auto;
        width: 90%;

        @include desktop {
            width: 70%;
        }

        .gallery {
            display: grid;
            grid-template-columns: 45% 55%;
            grid-template-rows: repeat(2, 49%);
            grid-column-gap: 1rem;
            grid-row-gap: 1rem;
            height: 350pxpx;
            overflow: hidden;

            @include desktop {
                height: 900px;
            }

            img {
                object-fit: cover;
                object-position: center;
                height: 100%;
                width: 100%;

                &:first-of-type {
                    grid-area: 1 / 1 / 3 / 2;
                }

                &:nth-of-type(2) {
                    grid-area: 1 / 2 / 2 / 3;
                }

                &:last-of-type {
                    grid-area: 2 / 2 / 3 / 3;
                }
            }
        }

        .cta {
            background-color: $color_secondary;
            width: 70%;
            margin: 0 auto;
            padding: 2rem;
            color: $color_white;
            transform: translateY(-50%);

            @include desktop {
                width: 50%;
            }

            p {
                @include font-body-serif-r;
                font-weight: lighter;
            }

            a {
                @include font-body-sans-b;
                display: inline-block;

                &:hover {
                    color: $color_primary
                }
            }
        }
    }
}
</style>