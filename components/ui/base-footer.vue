<template>
    <section id="footer">
        <nav>
            <div>
                <span class="copyright">Copyright 2022</span>
            </div>
            <div>
                <router-link :to="item.slug" v-for="item in data" :key="item">{{ item.display }}</router-link>
            </div>
            <div>
                <router-link :to="item.slug" v-for="item in data" :key="item">{{ item.display }}</router-link>
            </div>
        </nav>
    </section>
</template>
<script>

    export default {
        props: { 'data': Array },
    }
</script>
<style scoped lang="scss">
nav{
    display: none;
}
.copyright{
    color: $color-secondary;
}
@include desktop {
    nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 20% 2rem 20%;
        

        >div {
            display: flex;
            flex-direction: column;

            &:first-of-type {
                align-items: center;
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