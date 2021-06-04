<template>
    <main class="app-main">
        <div class="main-right">
            <book-detail-block
                v-for="book in newestChapterBooks"
                :key="book.id"
                v-bind:book="book">
            </book-detail-block>
        </div>
        <div class="main-left">
            BInh luan Dao vanh day nay 
            
        </div>
    </main>
</template>

<script>
import BookDetailBlock from "@/components/BookDetailBlock.vue";
import axios from "axios";
export default {
    name: "HomePage",
    components: {
        BookDetailBlock,
    },
    data() {
        return {
            newestChapterBooks: [],
        };
    },
    created() {
        this.getNewestChapterBook();
    },
    methods: {
        getNewestChapterBook() {
            axios
                .get("http://localhost:8000/books")
                .then((response) => (this.newestChapterBooks = response.data));
        },
    },
};
</script>

<style>
@font-face {
    font-family: "OpenSans";
    src: url("../assets/fonts/OpenSans-Regular.ttf");
}

.app-main {
    display: flex;
    justify-content: space-between;
    margin: 0 16rem 0 16rem;
}

.main-right {
    display: grid;
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, 13rem);
    justify-content: space-between;
    width: 75%;
}

.main-right > * {
    height: 18rem;
    margin-bottom: 2rem;
}

.main-left {
    width: 22%;
}
</style>


