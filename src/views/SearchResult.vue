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
import UserSearchBlock from '../components/UserSearchBlock.vue';
export default {
    name: "SearchResult",
    components: {BookDetailBlock},
    data(){
        return {
            searchword: this.$route.query.searchword,
            resultSearchBooks: [],
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
                .then((response) => (this.resultSearchBooks = response.data));
        },
        // getResultSearchUser() {
        //     axios
        //         .get("http://localhost:8000/creator/search/user", {
        //             headers: {
        //                 searchword: this.searchword,
        //             }
        //         })
        //         .then((response) => (this.resultSearchUsers = response.data));
        // }
    }
}
</script>