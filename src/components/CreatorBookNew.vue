<template>
    <div class="creator-book-new">
        <form>
            
            <select>
                <option v-for="author in authors" :key="author" v-bind:value="author.id">
                    {{ author.name }}
                </option>
            </select>
        </form>
        <button v-on:click="createBook">Tao moi</button>

    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "CreatorNewBook",
    data() {
        return {
            book: {
                name: "Book test",
                user: {
                    id: 2,
                },
                comment: [],
            },
            authors: [
                {
                    id: 2,
                    name: "creator"
                }
            ]
        }
    },
    methods: {
        createBook() {
            axios
                .post("http://localhost:8000/creator/create-book", this.book)
                .then((response) => console.log(response));
        }
    }

}
</script>

<style>

</style>