<template>
    <div class="message-content">
            <div class="message-userContent">
                <div class="message-fields message-fields--before">
                <dl class="pairs pairs--columns pairs--fixedSmall pairs--customField">
                    <img class="book-img" :src="book.imageLink">
                </dl>
                <h1 class="message-fields--before .pairs.pairs--columns.pairs--fixedSmall">{{book.name}}</h1>
                <dl class="message-fields--before .pairs.pairs--columns.pairs--fixedSmall">Tác giả: {{book.alias.name}}</dl>
                </div>
                <div class="cate">
                <p>Thể loại: </p>
                <dl v-for="category in book.categories"
                :key="category">
                    {{category.name}} 
                    </dl>
                <br/>
                </div>
                <div class="cate">
                    Tình trạng: <dl>{{book.bookStatus.name}}</dl>
                </div>
            <div>
                <dl>{{book.description}}</dl>
            </div>
            <div>
                <button type="button" class="btn btn-outline-primary" v-on:click="like">
                    <i class="far fa-thumbs-up"></i> Thích <span class="badge badge-pill badge-primary">{{ book.likes }}</span>
                </button>
            </div>
            </div>
        </div>
    <div>
        <h3>Tất cả các chương của truyện</h3>
        <chapter-in-book-block 
            v-for="chapter in data"
            :key="chapter.id"
            v-bind:chapter="chapter"
            v-bind:bookId="bookId">
        </chapter-in-book-block>
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
import ChapterInBookBlock from '@/components/ChapterInBookBlock.vue';

export default {
    name: "Bookinformation",
    components: { ChapterInBookBlock },
    data() {
        return {bookId: this.$route.query.id,
            book: {
                name: "",
                alias: {
                    name: ""
                },
                bookStatus: {
                    name: ""
                }
            },
            data: [],
            currentPage: 0,
            totalPage: null,
            pageSize: 1,
            likecount: 0,
            user: this.$store.state.user
        }
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
    created() {
        this.books();
        this.listChapters();
    },
    methods: {
        books() {
            axios
                .get("http://localhost:8000/book-by-id",{
                    headers: {
                        bookId: this.bookId,
                    }
                })
                .then((response) => {
                    this.book = response.data;
                    this.likecount = this.book.likes;
                    console.log("1", this.book);
                });
        },
        like(){
            console.log(this.user);
            if(!this.user) {
                alert("Bạn cần phải đăng nhập trước!");
                return;
            }
            axios
                .get("http://localhost:8000/updateLike", {
                    headers: {
                        likeCount: this.likecount,
                        bookId: this.bookId,
                        userId: this.user.id
                    }
                })
                .then((res) => {
                    console.log("user", this.user);
                    this.books();
                })
        },
        listChapters(){
            axios
                .get("http://localhost:8000/chapter", {
                    headers: {
                        bookId: this.bookId,
                        page: this.currentPage,
                        pageSize: 5
                    }
                })
                .then((response) =>{
                    this.data = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                });
        },
        toPrevPage() {
            if (this.currentPage !== 0) {
                this.currentPage--;
            }
            this.listChapters();
        },
        toNextPage() {
            if (this.currentPage < this.totalPage - 1) {
                this.currentPage++;
            }
            this.listChapters();
        },
        setPage(pageIndex) {
            this.currentPage = pageIndex - 1;
            this.listChapters();
        },
    }
}
</script>

<style>
.column{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
.book-img{
    height: 210px;
}
.message-content{
    position: relative;
    flex: 1 1 auto;
    min-height: 1px;
}
.message-userContent{

}
* {
    box-sizing: border-box;
}
.message-fields{
    margin: 10px 0;
}
.message-fields--before{
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 6px;

}
.message-fields--before dl{
    float: left;
    margin-right: 30px;
}
.pairs.pairs--column{
    display: table;
    table-layout: fixed;
    width: 100%;
}
.pairs{
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    /* .dd{
        padding: 0px;
        margin: 0px;
    } */
}
.message-fields--before .pairs.pairs--columns.pairs--fixedSmall{
    font-size: 17px;
    padding-bottom: 6px;
    width: auto;
}
.cate{
    display: flex;
}
</style>