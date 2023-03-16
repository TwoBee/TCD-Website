<template>
    <section class="featureRow" v-editable="blok">
        <!-- <img :src="blok.image.filename" /> -->
        <a class="left">
            <h3>{{ blok.left_headline }}</h3>
            <h2>{{ blok.left_subline }}</h2>
        </a>
        <a class="right" :href="blok.right_link.cached_url">
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
</script>

<style scoped lang="scss">
.featureRow {
    display: grid;
    grid-template-columns: 40vw 60vw;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100vw;
    height: 200px;



    a {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &.right {
            max-height: 100%;
            width: 100%;
            overflow: hidden;

            .feature {
                display: block;
                height: 100%;
                width: 100%;
                background-image: v-bind('backgroundImage');
                background-size: cover;
                background-position: 0 80%;
                transition: all .7s ease;
            }

            .textwrapper {
                position: absolute;
                margin-left: -30vw;

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

            h2 {
                @include font-body-b;
                font-size: 1rem;
            }

            h3 {
                @include font-headline-2;

            }

            &:hover {
                background: $color-primary;
                color: $color-accent;
            }
        }



        .textwrapper {
            display: flex;
            justify-content: center;
            align-items: baseline;
            flex-direction: column;
            font-size: 3rem;

            h3 {
                @include font-headline-3;
                font-size: 1rem;
            }

        }

        &:hover {
            color: $color-white;
        }
    }
}
</style>