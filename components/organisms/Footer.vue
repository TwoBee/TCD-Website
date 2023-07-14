<template>
    <section id="footer">
        <nav>
            <div>
                <p>String</p>
                <p>String</p>
                <p>String</p>
                <p>String</p>
            </div>
            <div>
                <router-link :to="`/${blok.link.url}`" v-for="blok in items" :key="blok._uid">{{ blok.link.story.name
                }}</router-link>
            </div>
            <div>
                <p>String</p>
                <p>String</p>
                <p>String</p>
                <p>String</p>
            </div>
            <div>
                <p>String</p>
                <p>String</p>
                <p>String</p>
                <p>String</p>
            </div>
        </nav>
        <div class="subfooter">
            <span class="copyright">Copyright 2022</span>
            <img src="@/assets/img/logo.png" alt="">
        </div>
    </section>
</template>
<script setup>
const props = defineProps(['items'])
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
        }

        .subfooter {
            display: flex;
            
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
                color: $color_grey_light;
                padding: 1rem 0;
            }
        }
    }
}
</style>