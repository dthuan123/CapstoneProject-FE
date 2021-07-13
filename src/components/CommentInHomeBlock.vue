<template>
    <div>
        <b>comment.user.name</b>
        <span>comment.content</span>
    </div>
</template>
<script>
    export default {
        name: "CommentInHomeBlock",
        props: ["comment"]
    }
</script>