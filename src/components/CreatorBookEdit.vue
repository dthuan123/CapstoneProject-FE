<template>
  <div>
      {{bookId}}
      <div v-for="(book, index) in data" :key="index">
          {{ book.id }}   {{ book.name }}
      </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name: "CreatorBooKEdit",
    data() {
        return {
            bookId: this.$store.state.bookId,
            data: null
        }
    },
    beforeMount() {
        this.get();
    },
    methods: {
        get() {
            axios
                .get("http://localhost:8000/books")
                .then((response) => (this.data = response.data));
        }
        
    }
}
</script>

<style>

</style>