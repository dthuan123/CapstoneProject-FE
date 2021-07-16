<template>
    <div class="custom-container">
        <div class="chapter-container">
            <div class="chapter-title">
                <span>{{ chapter.name }}</span>
            </div>
            <div class="audio">
                <text-to-speech-audio></text-to-speech-audio>
            </div>
            <div class="chapter-content" v-html="chapter.content">

            </div>
        </div>
        
        <div class="comment-block">
            <div v-if="$store.state.user">
                <ckeditor :editor="editor" v-model="chapterComment.content" :config="editorConfig" ></ckeditor>
                <div class="reply-button">
                    <button class="btn btn-success" @click="reply">Đăng bình luận</button>
                </div>
            </div>
            <comment-block
                v-bind:comments="comments"
                @comment="getComments"
            ></comment-block>
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
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextToSpeechAudio from './TextToSpeechAudio.vue';

export default {
    name: "ChapterDetail",
    components: { CommentBlock, TextToSpeechAudio,ckeditor: CKEditor.component},
    data() {
        return {
            comments: [],
            chapterId: this.$route.query.chapterId,
            chapter: {},
            currentPage: 0,
            totalPage: null,
            pageSize: 5,
            chapterComment: {
                chapter: {
                    id: null
                },
                user: {
                    id: this.$store.state.user ? this.$store.state.user.id : null
                },
                content: null
            },
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
    mounted() {
        this.emitter.on("comment", () => {
            this.getComments();
        });
    },
    created() {
        this.$store.commit("setChapterId", this.$route.query.chapterId);
        this.getComments();
        this.getChapter();
    },
    methods: {
        // saveHistory() {
        //     if(this.$store.state.user) {
        //         let user = {
        //             id: this.$store.state.user.id,
        //         }
        //         let chapter = {
        //             id: this.chapter.id,
        //             book: this.chapter.book
        //         }
        //         axios     
        //             .post("http://localhost:8000/reader/history", {
        //                 user, 
        //                 chapter
        //             })
        //     }

        // },
        getComments() {
            axios
                .get("http://localhost:8000/comments", {
                    headers: {
                        page: this.currentPage,
                        pageSize: this.pageSize,
                        chapterId: this.chapterId
                    }
                })
                .then((response) => {
                    this.comments = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                });
        },
        getChapter() {
            axios
                .get("http://localhost:8000/creator/get/chapter", {
                    headers: {
                        chapterId: this.chapterId
                    }
                })
                .then((response) => {
                    this.chapter = response.data;
                    this.chapterComment.chapter.id = this.chapter.id;
                    this.saveHistory();
                });
        },
        reply() {
            axios
                .post("http://localhost:8000/reader/create/comment", this.chapterComment)
                .then((response) => {
                    this.getComments();
                });
        },
        saveHistory() {
            if(this.$store.state.user) {
                let chapter = {
                    id: this.chapter.id,
                    book: this.chapter.book
                }
                let user = {
                    id: this.$store.state.user.id,
                }
                let formData = new FormData();
                formData.append("user", new Blob([JSON.stringify(user)], {
                        type: "application/json"
                    }));
                formData.append("chapter", new Blob([JSON.stringify(chapter)], {
                        type: "application/json"
                    }));
                axios     
                    .post("http://localhost:8000/reader/history", formData)
            }
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
    background-color: #f6f4ec;
    padding: 0 16rem 0 16rem;
    border: 1px solid black;
}

.chapter-container {
    margin: 3rem 0;
}
.chapter-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 5rem;
}

.chapter-content {
    font-size: 16px;
    white-space: pre-line;
    line-height: 22px;;
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
</style>