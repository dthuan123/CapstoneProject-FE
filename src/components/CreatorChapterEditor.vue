<template>
    <div>
        <span>{{ book.name }}</span>
        <input type="text" class="form-control" v-model="chapter.name">
        <span>{{ chapter.startedDate }}</span>
        <span>{{ chapter.updatedDate }}</span>
        <ckeditor :editor="editor" v-model="chapter.content" :config="editorConfig"></ckeditor>
        <span class="alert alert-success" role="alert" v-show="saveStatus">Success!</span>
        <button @click="saveChapter">Lưu</button>
        <button @click="print">Xuất bản</button>
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
            // let formData = new FormData();
            // formData.append("chapter", new Blob([JSON.stringify(this.book)], {
            //         type: "application/json"
            //     }));
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
        print() {
            console.log(this.chapter)
        }
    }
}
</script>

<style>
.ck-editor__editable {
    min-height: 500px;
}
</style>