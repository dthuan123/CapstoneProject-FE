<template>
    <div>
        <div>
            <p>{{ chapter.name }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "ChapterInBookBlock",
    props: ["chapter"],

};
</script>
