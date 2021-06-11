<template>
  <div>
      {{bookId}}
      <div v-for="(chapter, index) in data" :key="index">
          {{ chapter.id }}   {{ chapter.name }}
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
                .get("http://localhost:8000/creator/book-edit", {
                    headers: {
                        bookId: this.bookId
                    }
                })
                .then((response) => (this.data = response.data));
        }
        
    }
}
</script>

<style>

</style>