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
        <ckeditor @ready="setEditorData" :editor="editor" v-model="editorValue" :config="editorConfig"></ckeditor>
        <div>
            <span class="alert alert-success" role="alert" v-show="saveStatus">Success!</span>
        </div>
        <div class="datetime">
          <p style="margin-right: 10px;">Chọn ngày và giờ: </p>
          <datepicker style="margin-right: 10px;" v-model="picked" :lowerLimit="lowerLimit"/>
          <input type="time" v-model="time">
        </div>
        <div class="row-buttons">
            <button class="btn btn-primary" @click="saveChapter">Lưu</button>
            <button v-show="mode === 'EditChapter'" class="btn btn-primary" @click="publish">Xuất bản</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Datepicker from 'vue3-datepicker'

export default {
    name: "CreatorChapterEditor",
    components: {  
      ckeditor: CKEditor.component,
      Datepicker
    },
    data() {
        return {
            mode: this.$route.name,
            book: {},
            chapter: {
                name: "",
            },
            editorValue: "",
            editor: ClassicEditor,
            editorConfig: {
                cloudServices: {
                  tokenUrl: 'https://81882.cke-cs.com/token/dev/aacfa923a509229b4a63ccacee9bd8577e9de6f69a378e3df8712010586b',
                  uploadUrl: 'https://81882.cke-cs.com/easyimage/upload/'
              }
            },
            saveStatus: false,
            picked: null,
            time: null,
            lowerLimit: new Date()
           
        }
    },
    created() {
      console.log(this.chapter);
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
                .then((response) => {
                  this.chapter = response.data
                });
        },
        publish() {
          let publishDate = new Date(this.picked.toDateString() + " " + this.time);
          axios.get("http://localhost:8000/creator/publish", {
            headers: {
              chapterId: this.chapter.id,
              publishDate: publishDate
            }
          })
        },
        saveChapter() {
            this.chapter.book = this.book;
            this.chapter.content = this.editorValue;
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
        },
        setEditorData() {
          this.editorValue = this.chapter.content;
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

.datetime {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}
</style>