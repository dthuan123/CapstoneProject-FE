<template>
  <div class="reader-history">
        <div v-if="route==='/reader/history'" class="render-block">
            <h3>Danh sách truyện bạn đang đọc</h3>
            <div class="book-container">
                <book-detail-block 
                    v-for="chapter in data"
                    :key="chapter.id"
                    v-bind:book="chapter.book"
                    v-bind:chapter="chapter"
                >
                </book-detail-block>
            </div>
        </div>
        <div v-else class="render-block">
            <h3>Danh sách truyện bạn đã thích</h3>
            <div  class="book-container">
                <book-detail-block 
                    v-for="book in data"
                    :key="book.id"
                    v-bind:book="book"
                >
                </book-detail-block>
            </div>
        </div>

        <div class="row-end">
            <ul class="pagination">
                <li @click="setPage(1)" :class="{'disabled': currentPage <= 0, 'page-item': true}"><a class="page-link">First</a></li>
                <li @click="toPrevPage" :class="{'disabled': currentPage <= 0, 'page-item': true}"><a class="page-link">Prev</a></li>
                <li v-for="page in pages" :key="page.name" :class="{ 'active': currentPage === page.name - 1, 'page-item': true}">
                    <a class="page-link" @click="setPage(page.name)">{{ page.name }}</a>
                </li>
                <li v-show="currentPage !== totalPage" @click="toNextPage" class="page-item"><a class="page-link">Next</a></li>
                <li @click="setPage(totalPage)" class="page-item"><a class="page-link">Last</a></li>
            </ul>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import BookDetailBlock from './BookDetailBlock.vue';
export default {
    components: { BookDetailBlock },
    name: "ReaderHistory",
    data() {
        return {
            user: this.$store.state.user,
            currentPage: 0,
            totalPage: null,
            pageSize: 10,
            data: [],
            route: this.$route.path
        }
    },
    computed: {
        pages() {
            const pages = [];

            let current = this.currentPage + 1;
            for (let i = current - 2; i < current; i++) {
                if(i > 0) {
                    pages.push({
                        name: i,
                        isDisabled: false
                    })
                }
            }
            pages.push({
                name: current,
                isDisabled: true
            })
            for (let i = current + 1; i <= current + 2; i++) {
                if(i <= this.totalPage) {
                    pages.push({
                        name: i,
                        isDisabled: false
                    })
                }
            }

            return pages;
        }
    },
    watch:{
        $route (to, from){
            this.route = this.$route.path
            this.getData();
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.data = [];
            if(this.route === '/reader/history') {
                this.getHistory();
            } else {
                this.getLikeList();
            }
        },
        getHistory() {
            axios
                .get("http://localhost:8000/reader/get/history", {
                    headers: {
                        userId: this.user.id,
                        page: this.currentPage,
                        pageSize: this.pageSize,
                    }
                })
                .then((response) => {
                    this.data = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;  
                    console.log('hí',this.data);
                });
        },
        getLikeList() {
            axios
                .get("http://localhost:8000/reader/get/likes", {
                    headers: {
                        userId: this.user.id,
                        page: this.currentPage,
                        pageSize: this.pageSize,
                    }
                })
                .then((response) => {
                    this.data = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;  
                    console.log('like', this.data);
                });
        },
        toPrevPage() {
            if(this.currentPage !== 0) {
                this.currentPage--;
            }
            this.getData();
        },
        toNextPage() {
            if(this.currentPage < this.totalPage - 1) {
                this.currentPage++;
            }
            this.getData();
        },
        setPage(pageIndex) {
            this.currentPage = pageIndex - 1;
            this.getData();
        },
    }
}
</script>

<style scoped>
.reader-history {
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
}

.render-block {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 5px 4px 10px #888888;
    margin-bottom: 20px;

}
.render-block h3 {
    background-color:#cde2f3;
    padding: 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.book-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  justify-content: start;
  width: 100%;
  min-height: 80vh;
  padding: 10px;
  
}


.book-container > img {
    margin-right: 50px;
    margin-bottom: 2rem;
}

.row-end {
    display: flex;
    justify-content: center;
}
</style>