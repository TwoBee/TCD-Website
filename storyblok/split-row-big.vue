<template>
    <section class="featureRow big" v-editable="blok">
        <NuxtLink class="left" to="/club">
            <h3>{{ blok.left_headline }}</h3>
            <h2>{{ blok.left_subline }}</h2>
        </NuxtLink>
        <NuxtLink class="right" :to="blok.right_link.story.url">
            <div class="feature">
            </div>
            <div class="textwrapper">
                <h3>{{ blok.right_subline }}</h3>
                <h2>{{ blok.right_headline }}</h2>

            </div>
        </NuxtLink>
    </section>
</template>

<script setup>
const props = defineProps({ blok: Object });
const backgroundAlignment = props.blok.alignment ? props.blok.alignment : 'center';
const backgroundImage = ref("url(" +
    props.blok.image.filename +
    ")");
</script>

<style scoped lang="scss">
.featureRow.big {
    display: flex;
    flex-direction: column;
    width: 100vw;

    @include desktop {
        flex-direction: row;
        height: 600px;
    }

    a {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        flex-direction: column;

        &.right {
            display: none;

            @include desktop {
                display: flex;
                justify-content: flex-end;
                align-items: baseline;
                height: 75%;
                width: 100%;
                overflow: hidden;
                transition: all .7s ease;
            }

            .feature {
                display: block;
                height: 100%;
                width: 100%;
                background-image: v-bind('backgroundImage');
                background-size: cover;
                background-position: 0 80%;
                transition: inherit;
                filter: grayscale(1);
            }

            .textwrapper {
                position: absolute;
                transition: all .4s ease;
                color: $color-accent;

                h2 {
                    line-height: 1.5rem;
                }

                @include desktop {
                    padding: 2rem;
                }
            }
        }

        &.left {
            height: 40vh;
            width: 100%;
            transition: all .2s ease;
            color: $color-accent;
            padding: 4rem 2rem;
            background-color: $color-primary;
            overflow: hidden;

            @include desktop {
                max-width: 40%;
                height: 100%;
            }

            h2 {
                @include font-headline-serif-3;
                font-size: 1rem;
            }

            h3 {
                @include font-headline-serif-2;

            }

            &:hover {
                color: $color-accent;
            }

            &::after {
                content: '';
                background-image: url('/assets/img/tennis-icon.png');
                height: 90%;
                width: 90%;
                background-size: contain;
                background-repeat: no-repeat;
                position: relative;
                bottom: -5vh;
                left: -5vw;

                @include desktop {
                    bottom: -15vh;
                }
            }
        }



        .textwrapper {
            display: flex;
            justify-content: center;
            align-items: baseline;
            flex-direction: column;
            font-size: 3rem;

            h3 {
                @include font-headline-serif-3;
                font-size: 1rem;
            }

        }

        &:hover {
            color: $color-white;
        }
    }
}
</style>