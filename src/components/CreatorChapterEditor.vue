<template>
    <div class="container">
        <div class="custom-row">
            <label>Tên truyện</label>
            <span>{{ book.name }}</span>
        </div>
        <div class="custom-row">
            <label>Tên chương</label>
            <input type="text" v-model="chapter.name">
        </div>
        <div class="custom-row">
            <label>Ngày bắt đầu</label>
            <span>{{ formatDate(chapter.startedDate) }}</span>
        </div>
        <div class="custom-row">
            <label>Ngày cập nhật</label>
            <span>{{ formatDate(chapter.updatedDate) }}</span>
        </div>
        <ckeditor :editor="editor" v-model="chapter.content" :config="editorConfig"></ckeditor>
        <div>
            <span class="alert alert-success" role="alert" v-show="saveStatus">Success!</span>
        </div>
        <div class="row-buttons">
            <button class="btn btn-primary" @click="saveChapter">Lưu</button>
            <button class="btn btn-primary" @click="print">Xuất bản</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Font from '@ckeditor/ckeditor5-font/src/font';

export default {
    name: "CreatorChapterEditor",
    data() {
        return {
            mode: this.$route.name,
            book: {},
            chapter: {
                name: "",
                content: ""
            },
            editor: ClassicEditor,
            editorData: "",
            editorConfig: {
                plugins: [
                    EssentialsPlugin,
                    BoldPlugin,
                    ItalicPlugin,
                    LinkPlugin,
                    ParagraphPlugin,
                    Font
                ],

                toolbar: {
                    items: [
                        'bold',
                        'italic',
                        'link',
                        'undo',
                        'redo',
                        'fontSize', 
                        'fontFamily', 
                        'fontColor'
                    ]
                }
            },
            saveStatus: false
           
        }
    },
    created() {
        this.getBook();
        if(this.mode === "EditChapter") {
            this.getChapter();
        }
    },
    methods: {
        getBook() {
            axios
                .get("http://localhost:8000/creator/get/book", {
                    headers: {
                        bookId: this.$store.state.bookId,
                    }
                })
                .then((response) => {
                    this.book = response.data   
                });
        },
        getChapter() {
            axios
                .get("http://localhost:8000/creator/get/chapter", {
                    headers: {
                        chapterId: this.$store.state.chapterId,
                    }
                })
                .then((response) => this.chapter = response.data);
        },
        saveChapter() {
            this.chapter.book = this.book;
            let url = "http://localhost:8000/creator/create/chapter";
            if(this.mode === "EditChapter") {
                url = "http://localhost:8000/creator/edit/chapter"
            }
            axios
                .post(url, this.chapter)
                .then((response) => {
                    this.saveStatus = true;
                });
        },
        formatDate(date) {
            if(date) {
                date =  date.split("T")[0];
                return date.split("-").reverse().join("-");
            }
            return "";
        }
    }
}
</script>

<style scoped>
.container {
    padding: 1rem;
    margin-bottom: 2rem;
    font-size: 1.4rem;
    background-color: #fefefe;
    border-radius: 1rem;
}

.custom-row {
    display: flex;
    margin-bottom: 2rem;
}

.custom-row input[type=text] {
    width: 70rem;
}

.row-buttons {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
}

.row-buttons button {
    width: 10rem;
    padding: 1rem;
    margin-left: 1rem;
}

.custom-row label {
    width: 10rem;
    margin-right: 2rem;
}

</style>