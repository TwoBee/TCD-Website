<template>
    <div class="history-item">
        <h2>{{ props.blok.Datum }}</h2>
        <div class="text" v-html="text"></div>
    </div>
</template>
<script setup>
    const props = defineProps({ blok: Object });
    const text = computed(() => renderRichText(props.blok.Text));
</script>
<style scoped lang="scss">
.history-item{
    padding: 5% 15% 5% 5%;
}
h2 {
    @include font-headline-serif-2;
    font-weight: lighter;
    padding-bottom: 2rem;

    @include desktop {
        @include font-headline-serif-1;
        font-weight: lighter;
    }
}
</style>