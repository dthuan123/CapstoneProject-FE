<template>
    <creator-book-info v-bind:mode="mode">
    </creator-book-info>
    <audio controls>
        <source src="http://localhost:8000/audio" type="audio/mpeg">
    </audio>
</template>

<script>
import CreatorBookInfo from '@/components/CreatorBookInfo.vue'

export default {
    name: "CreatorNewBook",
    components: {
        CreatorBookInfo
    },
    data() {
        return {
            mode: "CREATE",
        }
    }

}
</script>

<style>
</style>