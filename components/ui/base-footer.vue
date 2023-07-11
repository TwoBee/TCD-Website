<template>
    <section id="footer">
        <nav>
            <div>
                <router-link :to="item.slug" v-for="item in data" :key="item">{{ item.display }}</router-link>
            </div>
            <div>
                <router-link :to="item.slug" v-for="item in data" :key="item">{{ item.display }}</router-link>
            </div>
            <div>
                <router-link :to="item.slug" v-for="item in data" :key="item">{{ item.display }}</router-link>
            </div>
            <div>
                <router-link :to="item.slug" v-for="item in data" :key="item">{{ item.display }}</router-link>
            </div>
        </nav>
        <div class="subfooter">
            <span class="copyright">Copyright 2022</span>
            <img src="@/assets/img/logo.png" alt="">
        </div>
    </section>
</template>
<script>

export default {
    props: { 'data': Array },
}
</script>
<style scoped lang="scss">
nav {
    display: none;
}

.copyright {
    color: $color-secondary;
}

@include desktop {

    .subfooter{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 5% 0;

        .copyright{
            display: flex;
            align-items: center;
            justify-content: center
        }

        img{
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

        > div{
            display: flex;
            flex-direction: column;

            > a{
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
</style>