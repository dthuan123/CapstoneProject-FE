<template>
  <div class="novel-detail-block">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Panor%C3%A1mica_Oto%C3%B1o_Alc%C3%A1zar_de_Segovia.jpg">
      <div class="novel-chapter">
      </div>
      <div class="novel-title">
         {{ book.name }}
      </div>
  </div>
</template>

<script>
export default {
    name: 'BookDetailBlock',
    props: ['book']
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
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>