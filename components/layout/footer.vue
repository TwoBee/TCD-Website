<template>
    <BaseFooter :data="navList"></BaseFooter>
</template>
<script>
import BaseFooter from '../ui/base-footer.vue';
export default {
    props: ['data'],
    components: { BaseFooter },
    data(){
        return{
            navList: {
                item1: {
                    display: 'Verein',
                    slug: 'club'
                },
                item2: {
                    display: 'Events',
                    slug: 'events'
                },
                item3: {
                    display: 'Mitmachen',
                    slug: 'join-us'
                },
            },
        }
    }
}
</script>
<style>
    
</style>