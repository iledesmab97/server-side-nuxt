<script>
import { mapState, mapMutations } from "vuex";
export default {
    methods: {
        async sayGoodbye(){
            const result = await this.$api.getDate();
            this.putGreeting((await result.json()).date);
        },
        ...mapMutations({
            putGreeting: 'putGreeting'
        })
    },
    computed: {
        ...mapState({
            message: store => store.message
        })
    }
}
</script>

<template>
    <div>
        {{message}}
        <button @click="sayGoodbye">Good bye</button>
        <nuxt-link to="/">Home</nuxt-link>
    </div>
</template>