<template>
    <section class="Introtext" v-editable="blok">
        <h1>{{ props.blok.headline }}</h1>
        <div v-html="text"></div>
        <a :href="url" target="_self">Linktext</a>
    </section>
</template>
<script setup>
    const props = defineProps({ blok: Object });
    const text = computed(() => renderRichText(props.blok.text));
    const url = useLinkhandling(props.blok.link);
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
        @include font-headline-1;
        font-weight: lighter;
        line-height: 4rem;

        @include desktop {
            @include font-headline-1;
            font-weight: lighter;
        }
    }

    div {
        @include font-headline-3;

        margin: 3rem 0
    }

    a {
        @include font-body-b;
        color: $color-primary;
    }
}
</style>