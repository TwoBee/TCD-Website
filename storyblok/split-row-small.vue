<template>
    <section class="featureRow" v-editable="blok">
        <!-- <img :src="blok.image.filename" /> -->
        <a class="left" :href="'/' + props.blok.left_link.story.slug">
            <h3>{{ blok.left_headline }}</h3>
            <h2>{{ blok.left_subline }}</h2>
        </a>
        <a class="right" :href="rightLink">
            <div class="feature">
            </div>
            <div class="textwrapper">
                <h3>{{ blok.right_subline }}</h3>
                <h2>{{ blok.right_headline }}</h2>

            </div>
        </a>
    </section>
</template>

<script setup>
const props = defineProps({ blok: Object });
const backgroundAlignment = props.blok.alignment ? props.blok.alignment : 'center';
const backgroundImage = ref("url(" +
    props.blok.image.filename +
    ")");

    const rightLink = props.blok.right_link.story ? '/' + props.blok.right_link.story.slug : props.blok.right_link.url
</script>

<style scoped lang="scss">
.featureRow {
    display: flex;
    flex-direction: column;
    width: 100vw;

    @include desktop {
        flex-direction: row;
        height: 250px;
    }

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &.right {
            height: 50vh;
            max-height: 100%;
            width: 100%;
            overflow: hidden;
            transition: all .7s ease;

            @include desktop {
                height: 90vh;
                max-width: 60%;
            }

            .feature {
                display: block;
                height: 100%;
                width: 100%;
                background-image: v-bind('backgroundImage');
                background-size: cover;
                background-position: 0 50%;
                transition: inherit;
            }

            .textwrapper {
                position: absolute;
                transition: all .4s ease;
                color: $color-accent;

                h2 {
                    line-height: 2.5rem;

                    @include desktop {
                        line-height: 1.5rem;
                    }
                }

                @include desktop {
                    margin-left: -28vw;
                }
            }

            &:hover {
                .feature {
                    transform: scale(1.2);
                }
            }
        }

        &.left {
            height: 100%;
            width: 100%;
            transition: all .2s ease;
            color: $color-primary;
            padding: 2rem;
            align-items: baseline;

            @include desktop {
                max-width: 40%
            }

            h2 {
                @include font-headline-serif-3;
                font-size: 1rem;
            }

            h3 {
                @include font-headline-serif-2;

            }

            &:hover {
                color: $color-secondary;
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