<template>
    <div>
        <div>
            <p>{{chapter.name}}</p>
        </div>
    </div>
</template>

<script>
    export default{
        name: "ChapterInBookBlock",
        props: ["Chapter"]
    }
</script>
