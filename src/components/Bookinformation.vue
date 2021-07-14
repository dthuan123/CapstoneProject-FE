<template>
<div class="c-container">
    <img class="book-img" :src="book.imageLink" />
    <div class="book">
      <div class="book__info">
        <h1 class="book-name">{{ book.name }}</h1>
        <div class="cate">
          <span class="book-label">Tac gia:</span>
          <router-link :to="'/bookbycreator?creatorId=' + book.creator.id">{{ book.alias.name }}</router-link>
        </div>
        <div class="cate">
          <span class="book-label">Thể loại:</span>
          <span v-for="category in book.categories" :key="category">{{ category.name }}</span>
          <br />
        </div>
        <div class="cate">
          <span class="book-label">Tình trạng:</span>
          <span>{{ book.bookStatus.name }}</span>
        </div>
        <div>
        <button
            type="button"
            class="btn btn-outline-primary c-btn"
            v-on:click="like"
        >
            <font-awesome-icon icon="thumbs-up"></font-awesome-icon>Thích
            <span class="badge badge-pill badge-primary">{{book.likes}}</span>
        </button>
        <button type="button" class="btn btn-outline-primary" v-on:click="openReport">
            <font-awesome-icon icon="thumbs-up"></font-awesome-icon> Báo cáo
            <span class="badge badge-pill badge-primary"></span>
        </button>
        </div>
        <div class="book-description">
            <p>{{ book.description }}</p>
            
        </div>
        </div>
        
    <div class="chapter-book">
      <h2 class="chapter">Tất cả các chương của truyện</h2>
      <chapter-in-book-block
            v-for="(chapter, index) in data"
            :key="chapter.id"
            v-bind:chapter="chapter"
            v-bind:index="index">
      </chapter-in-book-block>
      <div class="row-end">
        <ul class="pagination">
          <li @click="setPage(1)" :class="{ disabled: currentPage <= 0, 'page-item': true }">
            <a class="page-link">First</a>
          </li>
          <li @click="toPrevPage" :class="{ disabled: currentPage <= 0, 'page-item': true }">
            <a class="page-link">Prev</a>
          </li>
                <li
                    v-for="page in pages"
                    :key="page.name"
                    :class="{
                        active: currentPage === page.name - 1,
                        'page-item': true,
                    }"
                >
                    <a class="page-link" @click="setPage(page.name)">{{
                        page.name
                    }}</a>
                </li>
                <li
                    v-show="currentPage !== totalPage"
                    @click="toNextPage"
                    class="page-item"
                >
                    <a class="page-link">Next</a>
                </li>
                <li @click="setPage(totalPage)" class="page-item">
                    <a class="page-link">Last</a>
                </li>
            </ul>
            </div> 
        </div>
    </div>
    <div class="report-detail-wrapper" v-if="showModal">
                <div class="report-detail-container">
                    <div class="model-field" v-show="showDetail">
                        <label class="title">Báo cáo</label><br>
                        <textarea class="form-control" v-model="reportContent"></textarea>
                    </div>     
                    <div class="alert alert-danger" role="alert" v-show="reportError">
                        Gửi báo cáo thất bại!
                    </div>
                    <div class="alert alert-success" role="alert" v-show="reportSuccess">
                        Gửi báo cáo thành công!
                    </div>     

                    <div class="modal-button">
                        <button type="submit" class="btn btn-outline-secondary" @click="sendReport">Báo cáo</button>
                        <button class="btn btn-outline-secondary" @click="closeReport">Đóng</button>
                    </div>
                </div>
            </div>
</div>
</template>

<script>
import axios from "axios";
import ChapterInBookBlock from "@/components/ChapterInBookBlock.vue";

export default {
    name: "Bookinformation",
    components: { ChapterInBookBlock },
    data() {
        return {
            bookId: this.$route.query.id,
            book: {
                name: "",
                alias: {
                    name: "",
                },
                bookStatus: {
                    name: "",
                },
                creator: {
                    id: null,
                },
            },
            data: [],
            currentPage: 0,
            totalPage: null,
            pageSize: 1,
            likecount: 0,
            user: this.$store.state.user,

            reportSender: {
                id: this.$store.state.user.id,
            },
            reports: [],
            showModal: false,
            showDetail: false,
            reportContent: null,
            reportError: false,
            reportSuccess: false,
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
    beforeMount() {
        this.books();
        this.listChapters();
    },
    methods: {
        books() {
            axios
                .get("http://localhost:8000/book-by-id", {
                    headers: {
                        bookId: this.bookId,
                    },
                })
                .then((response) => {
                    this.book = response.data;
                    this.likecount = this.book.likes;
                    console.log("1", this.book);
                });
        },
        like() {
            console.log(this.user);
            if (!this.user) {
                alert("Bạn cần phải đăng nhập trước!");
                return;
            }
            axios
                .get("http://localhost:8000/updateLike", {
                    headers: {
                        likeCount: this.likecount,
                        bookId: this.bookId,
                        userId: this.user.id,
                    },
                })
                .then((res) => {
                    console.log("user", this.user);
                    this.books();
                });
        },
        listChapters() {
            axios
                .get("http://localhost:8000/chapter", {
                    headers: {
                        bookId: this.bookId,
                        page: this.currentPage,
                        pageSize: 5,
                    },
                })
                .then((response) => {
                    this.data = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                });
        },
        currentDate() {
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            return date;
        },
        sendReport() {
            // console.log(this.user);
            // if(!this.user) {
            //     alert("Bạn cần phải đăng nhập trước!");
            //     return;
            // }
            let report = {
                reportContent: this.reportContent,
                // reportedDate: this.currentDate(),
                userSender: {
                  id: this.reportSender.id
                },
                userReceiver: {
                  id:3
                },
                book: this.book,
                statusId: {
                  statusId: 1
                }
            }
            console.log('body', report);
            axios
                .post("http://localhost:8000/reader/create-report", report)
                .then((response) => {    
                    this.reportSuccess = true;
                    this.reportError = false;
                    console.log('1123', response);
                })
                // .catch((error) => {
                //     this.reportError = true;
                //     console.log(error);
                // })
        },
        openReport() {
            this.showModal = true;
            this.showDetail = true;
        },
        closeReport() {
            this.showModal = false;
            this.showDetail = false;
            this.reportContent = null;
            this.reportSuccess = false;
            this.reportError = false;
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
    },
};
</script>

<style scoped>
@font-face {
    font-family: "OpenSans";
    src: url("../assets/fonts/OpenSans-Regular.ttf");
}

.book__info {
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
}
.chapter-book {
    /* padding-left: 20px; */
    padding-top: 20px;
}

.c-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 20px;
  font-family: "OpenSans";
}
.book {
  /* display: flex; */
  margin-bottom: 20px;
}
.book-name {
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 10px;
}
.book-img {
  width: 150px;
  height:200px;
  margin-right: 20px;
}
.cate {
 margin-bottom: 10px;
}
.book-label {
  color: #111;
  font-weight: 700;
  font-size: 14px;
  margin-right: 6px;
}

.book-description {
  font-size: 12px;
  line-height: 16px;;
}

.c-btn {
  margin-bottom: 10px;
}

.chapter {
  margin-bottom: 10px;
}

.report-detail-wrapper {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}

.report-detail-container {
    display: flex;
    flex-direction: column;
    width: 50rem;
    height: 30rem;
    margin: 0 auto;
    padding: 3rem;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}
</style>