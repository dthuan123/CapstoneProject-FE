<template>
  <div class="novel-detail-block">
      <img class="book-img1" :src="book.imageLink">
      <!-- <router-link :to="'/books?id=' + book.id" tag="img" :src="book.imageLink"></router-link> -->
      <div class="novel-chapter">
      </div>
      <div class="novel-title">
         <router-link :to="'/books?id=' + book.id">{{book.name}}</router-link>
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

.book-img1 {
    width: 120px;
    height: 150px;
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
    font-size: 15px;
    overflow: hidden;
    word-wrap: normal;
}

.novel-title a {
  font-size: 10px;
  color: black;
}

</style>