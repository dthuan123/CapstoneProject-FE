<template>
    <div 
        v-for="commentBook in commentsBook"
        :key="commentBook"
        class="custom-container"
    >
        <div class="profile-container">
            <img class="profile-img" src="http://localhost:8000/content/images/books/1.png">
        </div>
        <div class="comment-section">
            <div class="comment-container">
                <div class="comment-user">
                    {{ commentBook.user.name }}
                </div>
                <div class="comment-content" v-html="commentBook.content">
                </div>
                <button class="btn btn-success" @click="displayReplyEditor(commentBook.id)">Trả lời</button>
            </div>
            <div v-show="showEditor && bookComment.parent.id === commentBook.id">
                <ckeditor :editor="editor" v-model="bookComment.content" :config="editorConfig"></ckeditor>
                <div class="reply-button">
                    <button class="btn btn-success" @click="reply">Đăng bình luận</button>
                </div>
            </div>
            <div class="reply">
                <comment-block 
                    v-bind:commentsBook="commentBook.replies"
                ></comment-block>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    name: "CommentOfBookBlock",
    props: ["commentsBook"],
    emits: ["commentBook"],
    components: {  
      ckeditor: CKEditor.component
    },
    data() {
        return {
            parentCommentBookId: null,
            showEditor: false,
            bookComment: {
                chapter: {
                    id: 8
                },
                user: {
                    id:  this.$store.state.user ? this.$store.state.user.id : null
                },
                content: null,
                parent: {
                    id: this.parentCommentBookId
                },
                startDate: null,
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
    methods: {
        displayReplyEditor(parentId) {
            this.showEditor = true;
            this.bookComment.parent.id = parentId;
        },
        reply() {
            axios
                .post("http://localhost:8000/reader/create-comment", this.bookComment)
                .then(() => {
                    this.showEditor = false;
                    this.emitter.emit("commentBook");
                });
        }
    }
}
</script>

<style scoped>
.custom-container {
    display: flex;
    margin-top: 1rem;
}

.profile-container {
    margin-right: 1rem;
}

.comment-section {
    width: 100%;
}

.comment-container {
    padding: 1rem;
    border-radius: 1rem;
    background-color: #f1f2f4;
}

.profile-img {
    width: 4rem;
    height: 4rem;
    border-radius: 3rem;
}

.comment-user {
    font-size: 1.6rem;
    font-weight: bold;
}

.comment-content {
    min-height: 3rem;
    margin: 1rem 0;
    font-size: 1.4rem;
}

.ck-editor__editable {
    min-height: 100px;
    margin-bottom: 20px;
}

.reply-button {
    display: flex;
    justify-content: flex-end;
}

</style>