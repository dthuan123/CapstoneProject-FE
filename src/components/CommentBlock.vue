<template>
    <div 
        v-for="comment in comments"
        :key="comment"
        class="custom-container"
    >
        <div class="profile-container">
            <img class="profile-img" src="http://localhost:8000/content/images/books/1.png">
        </div>
        <div class="comment-section">
            <div class="comment-container">
                <div class="comment-user">
                    {{ comment.user.name }}
                </div>
                <div class="comment-content">
                    {{ comment.content }}
                </div>
                <button class="btn btn-success" @click="displayReplyEditor(comment.id)">Trả lời</button>
            </div>
            <ckeditor :editor="editor" v-model="replyContent" :config="editorConfig" v-if="showEditor && parentCommentId === comment.id"></ckeditor>
            <div class="reply">
                <comment-block 
                    v-bind:comments="comment.replies"
                ></comment-block>
            </div>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Font from '@ckeditor/ckeditor5-font/src/font';

export default {
    name: "CommentBlock",
    props: ["comments"],
    data() {
        return {
            parentCommentId: null,
            replyContent: null,
            showEditor: false,
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
        }
    },
    methods: {
        displayReplyEditor(parentId) {
            this.parentCommentId = parentId;
            this.showEditor = true;

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

</style>