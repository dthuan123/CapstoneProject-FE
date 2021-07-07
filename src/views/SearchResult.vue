<template>
<body>
    <div class="container">
        <h3>Truyện</h3>
        <div class="main-right">
            <book-detail-block
                v-for="bookHome in resultSearchBooks"
                :key="bookHome.id"
                v-bind:book="bookHome">
            </book-detail-block>
        </div>
    </div>
</body>
</template>
<script>
import BookDetailBlock from "@/components/BookDetailBlock.vue";
import axios from "axios";
export default {
    name: "SearchResult",
    components: {BookDetailBlock,
    },
    data(){
        return {
            searchword: this.$route.query.searchword,
            resultSearchBook: [],
        };
    },
    created(){
        this.getResultSearchBook();
    },
    methods: {
        getResultSearchBook() {
            axios
                .get("http://localhost:8000/search-book", {
                    headers: {
                        searchword: this.searchword,
                    }
                })
                .then((response) => (this.resultSearchBook = response.data));
        }
    }
}
</script>