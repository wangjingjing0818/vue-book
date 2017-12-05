<template>
    <div>
     <button @click="minus">-</button>
        <br>
        {{this.$store.state.count}}
        <button @click="add">+</button>
        {{$store.getters.val}}
    </div>
</template>
<script>
    import * as Types from '../store/mutations-types'
    export default {
        data(){
            return {}
        },
        components: {},
        methods: {
            add () {
                this.$store.commit(Types.INCREMENT, 2)
            },
            minus () {
                this.$store.commit(Types.DECREMENT, 1)
            }
        }
    }
</script>
<style scoped>

</style>
