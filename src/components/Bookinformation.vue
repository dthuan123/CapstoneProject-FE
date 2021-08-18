<template>
<div class="main__container">
  <div class="c-container">
    <img class="book-img" :src="book.imageLink" />
    <div class="book">
      <div class="book__info">
        <h1 class="book-name">{{ book.name }}</h1>
        <div class="cate">
          <span class="book-label">Tác giả:</span>
          <router-link :to="'/bookbycreator?creatorId=' + book.creator.id">{{ book.alias ? book.alias.name : book.creator.name}}</router-link>
        </div>
        <div class="cate">
          <span class="book-label">Thể loại:</span>
          <span v-for="category in book.categories" :key="category">{{ category.name + '' }}</span>
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
                <font-awesome-icon icon="thumbs-up"></font-awesome-icon> Thích {{book.likes}}
                <!-- <span class="badge badge-pill badge-primary">{{book.likes}}</span> -->
            </button>
            <button type="button" class="btn btn-outline-primary  c-btn" v-on:click="openReport">
                Báo cáo
                <span class="badge badge-pill badge-primary"></span>
            </button>
            
        </div>
        <div>
            <star-rating class="star-rate" v-model:rating="rating" 
                v-bind:show-rating="false" 
                v-bind:star-size="30"
                @update:rating="setRating" v-bind:increment="0.5">
            </star-rating>
            <span class="star-total">Số lượt đánh giá: {{book.totalRating}}</span>
        </div>
        <!-- <facebook @url="'local'" @scale="3">Share on</facebook> -->
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
                        <label class="title">Nhập nội dung cần báo cáo:</label><br>
                        <textarea class="form-control" v-model="reportContent"></textarea>
                    </div>     
                    <div class="alert alert-danger" role="alert" v-show="reportError">
                        Gửi báo cáo thất bại!
                    </div>
                    <div class="alert alert-success" role="alert" v-show="reportSuccess">
                        Gửi báo cáo thành công!
                    </div>     

                    <div class="modal-button">
                        <button type="submit" class="btn btn-outline-secondary" id="report-button-2" @click="sendReport">Gửi</button>
                        <button class="btn btn-outline-secondary" id="close-button" @click="closeReport">Đóng</button>
                    </div>
                </div>
            </div>
    </div>
    <div class="comment-block">
        <div v-if="$store.state.user">
            <ckeditor :editor="editor" v-model="Comment.content" :config="editorConfig" ></ckeditor>
            <div class="reply-button">
                <button class="btn btn-success" @click="reply">Đăng bình luận</button>
            </div>
        </div>
        <book-comment
            v-bind:comments="comments"
            v-bind:bookId="bookId"
            @comment="getComments"
        ></book-comment>
        <div class="row-end">
            <ul class="pagination">
                <li @click="setPageComment(1)" :class="{'disabled': currentPageComment <= 0, 'page-item': true}"><a class="page-link">First</a></li>
                <li @click="toPrevPageComment" :class="{'disabled': currentPageComment <= 0, 'page-item': true}"><a class="page-link">Prev</a></li>
                <li v-for="page in pagesComment" :key="page.name" :class="{ 'active': currentPageComment === page.name - 1, 'page-item': true}">
                    <a class="page-link" @click="setPageComment(page.name)">{{ page.name }}</a>
                </li>
                <li v-show="currentPageComment !== totalPageComment" @click="toNextPageComment" class="page-item"><a class="page-link">Next</a></li>
                <li @click="setPageComment(totalPageComment)" class="page-item"><a class="page-link">Last</a></li>
            </ul>
        </div>
    </div>
</div>

</template>

<script>
import axios from "axios";
import ChapterInBookBlock from "@/components/ChapterInBookBlock.vue";
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import StarRating from 'vue-star-rating'
import BookComment from "@/components/BookComment.vue"
// import { Facebook } from 'vue-socialmedia-share';

export default {
    name: "Bookinformation",
    components: { ChapterInBookBlock, ckeditor: CKEditor.component, BookComment, StarRating },
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
                }
            },
            data: [],
            currentPage: 0,
            totalPage: null,
            pageSize: 1,
            likecount: 0,
            user: this.$store.state.user,

            reportSender: {
                id: this.$store.state.user?.id,
            },
            reports: [],
            showModal: false,
            showDetail: false,
            reportContent: null,
            reportError: false,
            reportSuccess: false,
            rating: 0,
            comments: [],
            Comment: {
                book: {
                    id: this.$route.query.id,
                },
                user: {
                  id: this.$store.state.user?.id
                },
                content: null
            },
            currentPageComment: 0,
            totalPageComment: null,
            pageSizeComment: 3,
            editor: ClassicEditor,
            editorConfig: {
                toolbar: {
                  items: [
                      'heading', 
                      'bold',
                      'italic',
                      'link',
                      'bulletedList', 
                      'numberedList',
                      'undo', 
                      'redo'
                  ]
                }
            },
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
        pagesComment() {
            const pagesComment = [];

            let current = this.currentPageComment + 1;
            for (let i = current - 2; i < current; i++) {
                if (i > 0) {
                    pagesComment.push({
                        name: i,
                        isDisabled: false,
                    });
                }
            }
            pagesComment.push({
                name: current,
                isDisabled: true,
            });
            for (let i = current + 1; i <= current + 2; i++) {
                if (i <= this.totalPageComment) {
                    pagesComment.push({
                        name: i,
                        isDisabled: false,
                    });
                }
            }

            return pagesComment;
        },
    },

    beforeMount() {
        this.books();
        this.listChapters();
    },
    mounted() {
        this.emitter.on("comment", () => {
            this.getComments();
        });
    },
    created() {
      this.getComments();
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
                    this.rating = this.book.overallRating;
                });
        },
        like() {
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
            // const current = new Date();
            // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            // return date;
            const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
            return dateTime;
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
            axios
                .post("http://localhost:8000/reader/create-report", report)
                .then((response) => {    
                    this.reportSuccess = true;
                    this.reportError = false;
                    this.reportContent = null;
                    console.log('1123', response);
                })
                // .catch((error) => {
                //     this.reportError = true;
                //     console.log(error);
                // })
        },
        openReport() {
            if (!this.user) {
                alert("Bạn cần phải đăng nhập trước!");
                return;
            }
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
        getComments() {
            axios
                .get("http://localhost:8000/list-comments", {
                    headers: {
                        page: this.currentPageComment,
                        pageSize: this.pageSizeComment,
                        bookId: this.bookId,
                    }
                })
                .then((response) => {
                    this.comments = response.data.content;
                    this.currentPageComment = response.data.pageable.pageNumber;
                    this.totalPageComment = response.data.totalPages;
                });
        },
        reply() {
            if (!this.Comment.content) {
                return;
            }
            axios
                .post("http://localhost:8000/reader/comment", this.Comment)
                .then((response) => {
                    this.getComments();
                });
        },

        toPrevPage() {
            if (this.currentPage !== 0) {
                this.currentPage--;
            }
            this.listChapters();
            //this.getComments();
        },
        toNextPage() {
            if (this.currentPage < this.totalPage - 1) {
                this.currentPage++;
            }
            this.listChapters();
            //this.getComments();
        },
        setPage(pageIndex) {
            this.currentPage = pageIndex - 1;
            this.listChapters();
            //this.getComments();
        },

        toPrevPageComment() {
            if (this.currentPageComment !== 0) {
                this.currentPageComment--;
            }

            this.getComments();
        },
        toNextPageComment() {
            if (this.currentPageComment < this.totalPageComment - 1) {
                this.currentPageComment++;
            }
            this.getComments();
        },
        setPageComment(pageIndex) {
            this.currentPageComment = pageIndex - 1;
            this.getComments();
        },
        setRating(rating) {
            if (!this.user) {
                alert("Bạn cần phải đăng nhập trước!");
                return;
            }
            let formData = new FormData();
            formData.append("book", new Blob([JSON.stringify(this.book)], {
                type: "application/json"
            }));
            formData.append("rating", new Blob([JSON.stringify(this.rating)], {
                type: "application/json"
            }));
            axios
                .post("http://localhost:8000/reader/rate", formData)
                .then((response) => this.books());
        }
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
.main__container {
  display: flex;
  flex-direction: column;
}
.c-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 20px;
  /* display: flex;
  flex-direction: column; */
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
  width: 80px;
  margin-right: 20px;
}

.star-rate {
    margin-bottom: 20px;
}
.chapter {
  margin-bottom: 10px;
}

#report-button-1 {
  margin-bottom: 10px;
  margin-left: 10px;
}

.modal-button #report-button-2 {
  margin-top: 7px;
  margin-left: 75px;
  height: 30px;
  width: 60px;
  font-size : 11px;
}

.modal-button #close-button {
  margin-top: 7px;
  margin-left: 169px;
  height: 30px;
  width: 60px;
  font-size : 11px;
}

.form-control {
    resize: none;
    height: 160px;
    width: 440px;
    font-size : 15px;
}

.title {
    margin-bottom: 5px;
    font-size: 15px;
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

.comment-block {
    margin: 0 20rem;
    padding: 1rem;
    background-color: #fefefe;
}

.row-end {
    display: flex;
    justify-content: flex-end;
}

.reply-button {
    display: flex;
    justify-content: flex-end;
}

.star-total {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 20px;
}
</style>