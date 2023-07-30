<template>
    <section id="footer">
        <nav>
            <div>
                <NuxtLink :to="`/${blok.link.story.url}`" v-for="blok in footer_start" :key="blok._uid">{{
                    blok.link.story.name
                }}</NuxtLink>
            </div>
            <div>
                <NuxtLink :to="`/${blok.link.story.url}`" v-for="blok in footer_middle" :key="blok._uid">{{
                    blok.link.story.name
                }}</NuxtLink>
            </div>
            <div>
                <NuxtLink :to="`/${blok.link.story.url}`" v-for="blok in footer_end" :key="blok._uid">{{
                    blok.link.story.name
                }}</NuxtLink>
            </div>
            <div>
                <a :href="blok.Link.url" v-for="blok in socials" target="_blank" :key="blok._uid">
                    <span :key="blok._uid">{{ blok.Link.title }}</span>
                    <font-awesome-icon :icon="['fab', blok.Icon]" :key="blok._uid" size="xl" />
                </a>
            </div>
        </nav>
        <div class="subfooter">
            <span class="copyright">Copyright 2022</span>
            <img :src="logo.filename" :alt="logo.alt">
        </div>
    </section>
</template>
<script setup>
const storyblokApi = useStoryblokApi()
const props = defineProps(['footer_start', 'footer_middle', 'footer_end', 'socials', 'logo'])

const { data } = await storyblokApi.get('cdn/stories', {
    version: 'draft',
    is_startpage: false,
    starts_with: 'config',
    resolve_relations: 'Social.socials'
})
</script>
<style scoped lang="scss">
#footer {

    nav {
        display: none;

    }

    .subfooter {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);

        .copyright {
            color: $color-secondary;
            margin: 0 auto;
        }

        img {
            grid-area: 1 / 1 / 3 / 2;
            margin: 0 auto;
        }
    }
}


@include desktop {
    #footer {
        nav {
            display: block;

            div {
                &:nth-of-type(4) {
                    a {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 5px;

                        :first-child {
                            grid-area: 1 / 2 / 2 / 3;
                        }

                        :last-child {
                            grid-area: 1 / 1 / 2 / 2;
                            justify-self: right;
                            align-self: baseline;
                        }
                    }
                }
            }
        }

        .subfooter {
            display: flex;
            padding: 0 10%;

            .copyright {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: unset
            }

            img {
                height: 132px;
                width: 132px;
                margin: 0 auto;
            }
        }

        nav {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            width: 60vw;
            margin: 0 auto;

            >div {
                display: flex;
                flex-direction: column;

                >a {
                    display: flex;
                    justify-content: center;
                }
            }

            a:any-link {
                @include font-body-serif-r;
                color: $color-primary;
                padding: 1rem 0;
            }
        }
    }
}
</style>