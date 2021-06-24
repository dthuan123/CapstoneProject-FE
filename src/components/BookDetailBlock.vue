<template>
  <div class="novel-detail-block">
      <img class="book-img" :src="book.imageLink">
      <div class="novel-chapter">
      </div>
      <div class="novel-title">
         {{ book.name }}
      </div>
  </div>
</template>

<script>
export default {
    name: "BookDetailBlock",
    props: ["book"]
}
</script>

<style>
.novel-detail-block {
    position: relative;
    height: 200px;
}

img {
    width: 100%;
    height: 100%;
}

.novel-chapter {
    z-index: 100;
    position: absolute;
    bottom: 0px;
}

.novel-title {
    width: 100%;
    text-align: center;
    color: #111;
    font-family: OpenSans;
    font-weight: 700;
    overflow: hidden;
    word-wrap: normal;
}

</style>