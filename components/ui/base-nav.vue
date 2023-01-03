<template>
    <nav class="mobile" v-if="mobileMenu">
        <img src="@/assets/img/logo.png" alt="" />
        <div class="topbottombar" :class="{active: mobileNav}" @click="toggleMobile">
            <div class="middlebar"></div>
        </div>
    </nav>
    <Transition name="menu">
        <div v-if="mobileNav" class="burgermenu_itemlist">
            <ul>
                <li>Test 1</li>
                <li>Test 2</li>
                <li>Test 3</li>
            </ul>
        </div>
    </Transition>
</template>

<script setup>
    import { computed, onMounted } from 'vue';
    import { useWindowSize } from '@vueuse/core';

    defineProps({ 'data': Array })

    const mobileNav = ref(null)
    const { width, height } = useWindowSize()

    function toggleMobile() {
        console.log(mobileNav.value);
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
    z-index: 99999;

    img {
        height: calc(16vw - 10px);
    }

    .topbottombar {
        top: 50%;
        left: 50%;
        width: 50px;
    }

    .topbottombar:before,
    .topbottombar:after,
    .topbottombar div {
        background: $color-primary;
        content: "";
        display: block;
        height: 6px;
        border-radius: 3px;
        margin: 7px 0;
        transition: 0.5s;
    }

     .active.topbottombar::before{
        transform: translateY(12px) rotate(135deg);
    }

    .active.topbottombar::after{
        transform: translateY(-12px) rotate(-135deg);
    }

    .topbottombar.active .middlebar {
        transform: scale(0);
    }

}

.burgermenu_itemlist {
    position: fixed;
    background: #ffffff;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9998;
    -webkit-transition: -webkit-transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    -moz-transition: -moz-transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    @include font-body-r;

    li{
        padding: 1rem;
    }
}

.menu-enter-from {
    transform: translateX(200%);
}

.menu-leave-to {
    transform: translateX(100%);
}
</style>