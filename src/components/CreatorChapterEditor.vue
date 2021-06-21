<template>
    <div>
        <span>{{ book.name }}</span>
        <span>{{ chapter.name }}</span>
        <span>{{ chapter.startedDate }}</span>
        <span>{{ chapter.updatedDate }}</span>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <button @click="print">In</button>
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
            chapter: {},
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
                }
           
        }
    },
    created() {
        this.getBook();
        if(this.mode === "EditChapter") {
            this.getBook();
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
        print() {
            console.log(this.editorData)
        }
    }
}
</script>

<style>
.ck-editor__editable {
    min-height: 500px;
}
</style>