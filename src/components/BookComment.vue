<template>
    <div 
        v-for="comment in comments"
        :key="comment"
        class="custom-container"
    >
        <div class="profile-container">
            <img class="profile-img" :src="user ? user.avatarLink : 'http://localhost:8000/content/images/books/1.png'">
        </div>
        <div class="comment-section">
            <div class="comment-container">
                <div class="comment-user">
                    {{ comment.user.name }}
                </div>
                <div class="comment-content" v-html="comment.content">
                </div>
                <button class="btn btn-success" v-show="$store.state.user" @click="displayReplyEditor(comment.id)">Trả lời</button>
            </div>
            <div v-show="showEditor && bookComment.parent.id === comment.id">
                <ckeditor :editor="editor" v-model="bookComment.content" :config="editorConfig"></ckeditor>
                <div class="reply-button">
                    <button class="btn btn-success" @click="reply">Đăng bình luận</button>
                </div>
            </div>
            <div class="reply">
                <book-comment
                    v-bind:comments="comment.replies"
                    v-bind:bookId="bookId"
                ></book-comment>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    name: "BookComment",
    props: ["comments", "bookId"],
    emits: ["comment"],
    components: {  
      ckeditor: CKEditor.component
    },
    mounted() {
    },
    data() {
        return {
            user: this.$store.state.user,
            parentCommentId: null,
            showEditor: false,
            bookComment: {
                book: {
                    id: this.bookId
                },
                user: {
                    id:  this.$store.state.user ? this.$store.state.user.id : null
                },
                content: null,
                parent: {
                    id: this.parentCommentId
                }
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
            if (!this.bookComment.content) {
                return;
            }
            axios
                .post("http://localhost:8000/reader/comment", this.bookComment)
                .then(() => {
                    this.showEditor = false;
                    this.emitter.emit("comment");
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