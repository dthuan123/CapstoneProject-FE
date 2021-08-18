<template>
<body>
    <div class="container">
        <h3>Truyện</h3>
        <h2 v-if="resultSearchBooks.length === 0">
                Không tìm thấy kết quả
        </h2>
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
    watch:{
        $route (to, from){
            this.searchword = this.$route.query.searchword,
            this.getResultSearchBook();
        }
    } ,
    methods: {
        getResultSearchBook() {
            axios
                .get("http://localhost:8000/search-book", {
                    headers: {
                        searchword: encodeURIComponent(this.searchword),
                    }
                })
                .then((response) => {this.resultSearchBooks = response.data; console.log(response.data)});
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

<style scoped>
.container {
    min-height: 100vh;
}
.main-right{
    justify-content: flex-start;
}

</style>