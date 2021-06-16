<template>
    <div> {{ categoryId }}</div>
</template>

<script>
export default {
    data() {
        return {
            categoryId: this.$route.query.id
        }
    },
    created() {
        
    }
}
</script>

<style>

</style>