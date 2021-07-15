<template>
    <div class="chapter-name">
      <router-link :to="'/chapter?chapterId=' + chapter.id">{{'Chương' + (index + 1) + " : "  + chapter.name }}</router-link>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "ChapterInBookBlock",
    props: ["chapter", "index"],

};
</script>
<style scoped>
.chapter-name {
  font-size: 14px;
  margin-bottom: 15px;
}
</style>
