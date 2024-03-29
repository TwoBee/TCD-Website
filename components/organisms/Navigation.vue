<template>
    <nav class="mobile" v-if="mobileMenu">
        <div class="topbottombar" :class="{ active: mobileNav }" @click="toggleMobile">
            <div class="middlebar"></div>
        </div>
    </nav>
    <nav v-if="!mobileMenu">
        <NuxtLink to="/">
            <img :src="logo.filename" :alt="logo.alt">
        </NuxtLink>
        <div class="navigation">
            <ul>
                <li v-for="item in left_items" :key="item._uid">
                    <NuxtLink :to="`${item.link.story.url}`">
                        {{ item.link.story.name }}
                    </NuxtLink>
                </li>
            </ul>
            <ul>
                <li v-for="item in right_items" :key="item._uid">
                    <NuxtLink class="highlighted" :to="`/${item.link.story.url}`">
                        {{ item.link.story.name }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
    <Transition name="menu">
        <div v-if="mobileNav" class="burgermenu_itemlist">
            <NuxtLink to="/">
                <img :src="logo.filename" :alt="logo.alt" />
            </NuxtLink>
            <ul>
                <li v-for="item in [...left_items, ...right_items]" :key="item._uid">
                    <NuxtLink :to="`/${item.link.story.url}`">
                        {{ item.link.story.name }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const props = defineProps(['left_items', 'right_items', 'logo'])

const mobileNav = ref(null);
const { width } = useWindowSize();
const mobileMenu = computed(() => {
    return width.value <= 810 ? true : false;
})

const toggleMobile = () => {
    mobileNav.value = !mobileNav.value;
};

</script>

<style scoped lang="scss">
nav {
    display: flex;
    position: absolute;
    width: 100%;
    height: 6.5rem;
    z-index: 99999;
    justify-content: space-between;
    align-items: center;
    padding: 1% 1% 0 5%;
    @include font-body-sans-r;

    @include desktop {
        justify-content: unset;
    }

    .navigation {
        margin: 0 4rem;
        color: $color_white;
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;

        li {
            padding: 1rem 2rem;
        }

        ul {
            display: flex;

            li>a {
                width: fit-content;
                display: block;

                &.highlighted {
                    color: $color-secondary
                }
            }
        }

    }

    a {
        height: 100%;

        img {
            max-height: 142px;
            height: 100%;
        }
    }
}



.mobile {
    position: fixed;
    background: #eaeff5;
    bottom: 0;
    padding: 1rem 2rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10vh;
    font-family: Gotham;

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

    .active.topbottombar::before {
        transform: translateY(12px) rotate(135deg);
    }

    .active.topbottombar::after {
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
    flex-direction: column;

    li {
        padding: 1rem;
        @include font-headline-serif-2;

        a {
            color: $color-primary;
        }

        &:hover {
            color: $color-secondary;
        }
    }

    img {
        height: unset;
    }
}

.menu-enter-from {
    transform: translateX(200%);
}

.menu-leave-to {
    transform: translateX(100%);
}
</style>