<template>
    <div class="custom-container">
        <div class="comment-block">
            <comment-block
                v-bind:comments="comments"
            ></comment-block>\
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
        
    </div>
</template>

<script>
import axios from "axios"
import CommentBlock from './CommentBlock.vue'
export default {
    name: "ChapterDetail",
    components: { CommentBlock },
    data() {
        return {
            comments: [],
            currentPage: 0,
            totalPage: null,
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
    created() {
        this.getComments();
    },
    methods: {
        getComments() {
            axios
                .get("http://localhost:8000/comments", {
                    headers: {
                        chapterId: 2
                    }
                })
                .then((response) => {
                    this.comments = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                });
        },
        toPrevPage() {
            if(this.currentPage !== 0) {
                this.currentPage--;
            }
            this.getComments();
        },
        toNextPage() {
            if(this.currentPage < this.totalPage - 1) {
                this.currentPage++;
            }
            this.getComments();
        },
        setPage(pageIndex) {
            this.currentPage = pageIndex - 1;
            this.getComments();
        },
    }


}
</script>
    
<style scoped>
.custom-container {
    background-color: #fefefe;
    margin: 0 16rem 0 16rem;
    border: 1px solid black;
}

.comment-block {
    border: 1px solid black;
    margin: 0 25rem;
}

.row-end {
    display: flex;
    justify-content: flex-end;
}
</style>