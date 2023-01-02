<template>
    <header>
        <nav>
            <div class="logo">
                <img src="@/assets/img/logo.png" alt="">
            </div>
            <div class="navigation">
                <div class="navbar"></div>
                <font-awesome-icon icon="fa-solid fa-bars" @click="toggleMobile" />
                <div class="burgermenu" v-show="mobileNav">
                    <div v-show="mobileNav" class="burgermenu_itemlist">
                        <ul>
                            <li>Test 1</li>
                            <li>Test 2</li>
                            <li>Test 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { computed, onMounted } from 'vue';
    import { useWindowSize } from '@vueuse/core';

    defineProps({ 'data': Array })

    const mobileNav = ref(null)
    const { width, height } = useWindowSize()

    function toggleMobile() {
        mobileNav.value = !mobileNav.value;
    }

    const mobileMenu = computed(() => {
        console.log(width.value);
        return width.value <= 750 ? true : false;
    })
</script>

<style scoped lang="scss">
nav {
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;

    .logo {
        width: 40px;
        height: 40px;
    }

    .navigation {
        padding: 0.5rem 0;

        .burgermenu {
            display: block;
            position: fixed;
            height: 100vh;
            width: 400px;
            left: 0;
            background-color: $color_white;

            &_itemlist {
                text-align: center;
                padding: 1.2rem;

                @include font-body-r;

                li {
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>