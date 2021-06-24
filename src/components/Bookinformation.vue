<template>
    <main>
        <div>
            <book-information-block
                v-bind:book="data">
            </book-information-block>
        </div>
    </main>
</template>

<script>
import BookInformationBlock from '@/components/BookInformationBlock.vue';
import axios from "axios";
    export default {
        components: { BookInformationBlock },
        name: "Bookinformation",
        data(){
            return {
                bookId: this.$route.query.id,
                data: null,

            }
        },
        created() {
            this.books();
        },
        methods: {
            books() {
                axios
                .get("http://localhost:8000/book-by-id",{
                    headers: {
                        bookId: this.bookId,
                    }
                })
                .then((response) => {
                    this.data = response.data;
                    console.log(this.data);
                });
            }
        }
    }
</script>

<style>

</style>