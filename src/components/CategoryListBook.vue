<template>
    <main class="app-main">
        <div main-right>
            <category-list-book-block
                v-for="book in data"
                :key="book.id"
                v-bind:book="book">
            </category-list-book-block>
        </div>
    </main>
</template>

<script>
import axios from "axios"
import CategoryListBookBlock from '@/components/CategoryListBookBlock.vue';
export default {
  components: { CategoryListBookBlock },
    name: "CategoryListBook",
    data() {
        return {
            categoryId: this.$route.query.id,
            data: null
        }
    },
    created(){
        this.listbooks();
    },
    
    methods: {
        listbooks(){
            axios
                .get("http:localhost:8000/creator/book-list", {
                    headers: {
                        categoryId: this.categoryId
                    }
                })
                .then((response) => {
                this.data = response.data
                console.log(this.data);
                }
                    );
        }
    }
}
</script>

<style>

</style>