<template>
    <div class="app-main">
        <div>
            <h1>Danh sách tất cả các truyện</h1>
        </div>
        <div class="main-right">
            <book-detail-block
                v-for="book in listbook"
                :key="book.id"
                v-bind:book="book">
            </book-detail-block>
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
        <div class="main-left">

        </div>
    </div>

</template>

<script>
import BookDetailBlock from "@/components/BookDetailBlock.vue";
import axios from "axios";
export default{
    name: "ListAllBook",
    components: {
        BookDetailBlock,
    },
    data(){
        return {
            listbook: [],
            currentPage: 0,
            totalPage: null,
            pageSize: 1,
        };
    },
    computed: {
        pages() {
            const pages = [];

            let current = this.currentPage + 1;
            for (let i = current - 2; i < current; i++) {
                if (i > 0) {
                    pages.push({
                        name: i,
                        isDisabled: false,
                    });
                }
            }
            pages.push({
                name: current,
                isDisabled: true,
            });
            for (let i = current + 1; i <= current + 2; i++) {
                if (i <= this.totalPage) {
                    pages.push({
                        name: i,
                        isDisabled: false,
                    });
                }
            }

            return pages;
        },
    },
    created(){
        this.getListBook();
    },
    methods: {
        getListBook() {
            axios
                .get("http://localhost:8000/all-books", {
                    headers: {
                        page: this.currentPage,
                        pageSize: 12
                    }
                })
                .then((response) =>{
                    this.listbook = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                });
        },
        toPrevPage() {
            if (this.currentPage !== 0) {
                this.currentPage--;
            }
            this.getListBook();
        },
        toNextPage() {
            if (this.currentPage < this.totalPage - 1) {
                this.currentPage++;
            }
            this.getListBook();
        },
        setPage(pageIndex) {
            this.currentPage = pageIndex - 1;
            this.getListBook();
        },
    },
};
</script>
<style>
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