<template>
    <section id="footer">
    <nav>
         <div>
            <span>Copyright 2022</span>
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
props: {'data':Array, 
        'color-primary':{
            type: String, 
            required: false,
            default: '#fff'}, 
        'color-secondary':{
            type: String, 
            required: false, 
            default: '#000'},},
}
</script>
<style scoped>
    nav{
        display: grid;
        justify-content: space-around;
        height: 4rem;
        background-color: var(--color-primary);
        color: var(--color-second);
        margin: 0;
        align-items: center;
        grid-template-columns: repeat(3, 1fr);
    }
    nav>div{
        display: flex;
        width: 50%;
        padding: 0 4rem;
        flex-direction: column;
    }
    nav>div:last-child{
        justify-content: right;
    }
    a{
        padding: 0 4rem;
    }
    a:any-link{
        color: var(--color-white);
    }
</style>