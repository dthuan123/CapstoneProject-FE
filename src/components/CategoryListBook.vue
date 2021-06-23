<template>
    <main class="app-main">
        <div main-right>
            <category-list-book-block
                v-for="book in data"
                :key="book.id"
                v-bind:book="book">
            </category-list-book-block>
        <ul class="pagination-container">
            <li v-show="currentPage > 0" @click="toPrevPage">Prev</li>
            <li v-for="page in pages" :key="page.name">
                <button type="button" :disabled="page.isDisabled" @click="setPage(page.name)">
                    {{ page.name }}
                </button>
            </li>
            <li v-show="currentPage !== totalPage" @click="toNextPage">Next</li>
            <li @click="setPage(totalPage)">Last</li>
        </ul>
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
            data: null,
            currentPage: 0,
            totalPage: null,
            pagingSetting: {
                page: 0,
                pageSize: 10,
                sortField: "id",
                sortOrder: "des"
            },
            apiURL: this.url,
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
    created(){
        this.listbooks();
    },
    methods: {
        listbooks(){
            axios
                .get("http://localhost:8000/book-list", {
                    headers: {
                        categoryId: this.categoryId,
                        page: this.pagingSetting.page,
                        pageSize: 10,
                        sortField: "id",
                        sortOrder: "des"
                    }
                })
                .then((response) => {
                    this.data = response.data.content;
                    console.log(this.data);
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                    console.log(this.totalPage)
                });
        },
        toPrevPage() {
            if(this.currentPage !== 1) {
                this.pagingSetting.page--;
            }
            this.listbooks();
        },
        toNextPage() {
            if(this.currentPage !== this.totalPage) {
                this.pagingSetting.page++;
            }
            this.listbooks();
        },
        setPage(pageIndex) {
            this.pagingSetting.page = pageIndex - 1;
            this.listbooks();
        }
    }
}
</script>

<style>

</style>