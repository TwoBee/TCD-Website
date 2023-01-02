<template>
    <BaseNav :data="navList"></BaseNav>
</template>
<script>
import BaseNav from '../ui/base-nav.vue';
export default {
    props: ['data'],
    components: { BaseNav },
    data(){
        return{
            navList: [
                {
                    display: 'Verein',
                    slug: '/club'
                },
                {
                    display: 'Events',
                    slug: '/events'
                },
                {
                    display: 'Mitmachen',
                    slug: '/join-us'
                },
            ],
        }
    }
}
</script>
<style>
    
</style>