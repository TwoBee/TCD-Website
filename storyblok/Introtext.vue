<template>
    <section class="Introtext" v-editable="blok">
        <h1>{{ props.blok.headline }}</h1>
        <div v-html="text"></div>
        <NuxtLink v-if="props.blok.link.story" :to="props.blok.link.story.url">
            {{ props.blok.link.title }}
        </NuxtLink>
    </section>
</template>
<script setup>
const props = defineProps({ blok: Object });
const text = computed(() => renderRichText(props.blok.text));
</script>
<style scoped lang="scss">
.Introtext {
    color: $color-primary;
    max-width: 65%;
    margin: 0 auto;

    @include desktop {
        padding: 0 20% 0 0;
    }

    h1 {
        @include font-headline-serif-1;
        font-weight: lighter;
        line-height: 4rem;
    }

    div {
        @include font-body-serif-r;
        font-size: 2rem;
        line-height: 2.2rem;
        margin: 3rem 0;
    }

    a {
        @include font-body-sans-b;
        color: $color-primary;
    }
}
</style>