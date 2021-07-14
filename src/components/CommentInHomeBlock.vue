<template>
        <div class="comment-block">       
                <!-- <router-link :to="'/books?id=' + comment.book.id">{{book.name}}</router-link> -->
                <!-- <b>{{ comments.user.id }}</b> -->
                <a href="#" class="novel-name-comment">Ten truyen</a>
                <!-- <span>{{comments.content}}</span> -->
                <p class="comment-p">Truyen nay hay qua</p>
            <div class="name-user-comment">
                <a href="#">Ten nguoi</a>
                <p>23 phút</p>
            </div>
        </div>
</template>
<script>
    export default {
        name: "CommentInHomeBlock",
        props: ["comments"],
        comments: {
            user: null,
            content: "",
        }

    }
</script>
<style scoped>
.comment-block {
    /* position: relative; */
    margin-bottom: 3px;
    border-bottom: 1px solid #dbded5;
    padding: 10px 15px;
    
}
.name-user-comment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 15px;
    
}
.novel-name-comment{
    font-size: 17px;
    font-weight: bold;
}
.comment-p{
    font-size: 15px;
    padding: 3px 5px;
}
</style>