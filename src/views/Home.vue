<template>
<body>
    <div class="container">
        <h3>Truyện đề cử</h3>
        <div class="main-right">
            <book-detail-block
                v-for="bookHome in top10Books"
                :key="bookHome.id"
                v-bind:book="bookHome">
            </book-detail-block>
        </div>
        <hr/>
        <h3>Truyện mới nhất</h3>
        <div class="main-right">
        <book-detail-block
                v-for="bookHome1 in top10NewestBooks"
                :key="bookHome1.id"
                v-bind:book="bookHome1">
            </book-detail-block>
        </div>
    </div>
</body>
    <!-- <div class="app-main">
        <div>
            
        </div>
        <div class="main-right">
            <book-detail-block
                v-for="bookHome in newestChapterBooks"
                :key="bookHome.id"
                v-bind:book="bookHome">
            </book-detail-block>
        </div>
        <div class="main-left">
        </div>
    </div> -->
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
            top10Books: [],
            top10NewestBooks: [],
        };
    },
    created() {
        this.getTop10Book();
        this.getTop10NewestBook();
    },
    methods: {
        getTop10Book() {
            axios
                .get("http://localhost:8000/top-10-books")
                .then((response) => (this.top10Books = response.data));
        },
        getTop10NewestBook(){
            axios
                .get("http://localhost:8000/newest-books")
                .then((response) => (this.top10NewestBooks = response.data));
        }
    },
};
</script>

<style scoped>
.container{
    width: 780px;
    margin: auto auto;
}
.body{
    position: relative;
}
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
    margin: 20px auto 20px auto;
}

.main-right > * {
    height: 18rem;
    margin-bottom: 2rem;
}

.main-left {
    width: 22%;
}
.h3{
    border: 1px solid #aaa;
    border-radius: 4px 4px 0 0;;
}
</style>


