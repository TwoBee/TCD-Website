<template>
    <nav class="mobile">
        <img src="@/assets/img/logo.png" alt="" />
        <div class="navigation">
            <font-awesome-icon icon="fa-solid fa-bars" @click="toggleMobile" />
            <div class="burgermenu" v-if="mobileMenu">
                <div v-if="mobileNav" class="burgermenu_itemlist">
                    <ul>
                        <li>Test 1</li>
                        <li>Test 2</li>
                        <li>Test 3</li>
                    </ul>
                </div>
            </div>
        </div>


    </nav>
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
        return width.value <= 750 ? true : false;
    })
</script>

<style scoped lang="scss">
.mobile {
    position: fixed;
    background: #eaeff5;
    height: 16vw;
    width: 100%;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 8vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        max-height: 100%;
        max-width: 100%;
        margin: 0;
    }

    .navigation {
        display: flex;
        align-items: center;

        .burgermenu {

            &_itemlist {

                position: absolute;
                left: 0;
                top: -95vh;
                background: red;
                height: 100vh;
                width: 100vw;
                display: flex;
                align-items: center;
                justify-content: center;

                @include font-body-r;

                li {

                    &:hover {}
                }
            }
        }
    }
}
</style>