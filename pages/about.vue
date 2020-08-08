<script>
import { mapState, mapMutations } from "vuex";
export default {
    methods: {
        sayGodbye(){
            this.putGreeting('goodbye')
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
        <button @click="sayGodbye">Good bye</button>
        <nuxt-link to="/">Home</nuxt-link>
    </div>
</template>