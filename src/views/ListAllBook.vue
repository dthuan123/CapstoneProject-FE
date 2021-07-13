<template>
        <div class="c-container">
        <div class="left">
        <div class="book-block">
            <h3 class="label">Danh sách tất cả các truyện</h3>   
            <div class="book-container">
                <book-detail-block
                    v-for="book in listbook"
                    :key="book.id"
                    v-bind:book="book">
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
    <div class="right">
        <h3>Sort By</h3>
        <div class="dropdown">
            <!-- <a class="btn btn-secondary dropdown-toggle" href="https://www.google.com/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
            </a> -->
<!-- 
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" @change="sort">
                <li><a class="dropdown-item" id="az" href="#">A-Z</a></li>
                <li><a class="dropdown-item" id="startedDate" href="#">Ngày phát hành</a></li>
                <li><a class="dropdown-item" id="complete" href="#">Được yêu thích</a></li>
                <li><a class="dropdown-item" id="writing" href="#">Mới cập nhập</a></li>
            </ul> -->
            <select @change="sortList" v-model="sort" class="select-list">
                <option value="a" selected class="select-list-item">A-Z</option>
               <option value="date" class="select-list-item">Ngày phát hành</option>
               <option value="likes" class="select-list-item">Được yêu thích</option>
               <option value="newupdate" class="select-list-item">Mới cập nhật</option>
            </select>
        </div>
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
            sort: this.a,
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
        sortList() {
          console.log(this.sort);
          this.getListBook();
        },
        getListBook() {
            axios
                .get("http://localhost:8000/all-books", {
                    headers: {
                        page: this.currentPage,
                        pageSize: 12,
                        sort: this.sort
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
.c-container {
    display: flex;
    max-width: 1200px;
    margin: 30px auto;
    }

    .left {
    flex: 0.7;
    margin-right: 50px;
    border-radius: 10px;
    }

    .right {
    flex: 0.3;
    }
    @font-face {
        font-family: "OpenSans";
        src: url("../assets/fonts/OpenSans-Regular.ttf");
    }

    .book-block{
    margin-bottom: 50px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 5px 4px 10px #888888;

    }

    .book-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 13rem);
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    }

    .book-container > * {
        height: 18rem;
        margin-bottom: 2rem;
    }

    .label {
    margin-bottom: 25px;
    background-color:#cde2f3;
    padding: 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    }
    .row-end{
        padding-bottom: 20px;
        margin-top: 5px;
    }
    .pagination {
        right: 10px;
    }
    .select-list{
        background-color: #595a59;
        border-radius: 5px;
    }
    .select-list-item{
        background-color: white;
    }
</style>