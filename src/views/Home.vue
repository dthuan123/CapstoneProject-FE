<template>
<body>
    <div class="c-container">
      <div class="left">
        <h3 class="label">Truyện đề cử</h3>
            <div class="book-container">
              
              <book-detail-block
                  v-for="bookHome in top10Books"
                  :key="bookHome.id"
                  v-bind:book="bookHome">
              </book-detail-block>
            </div>
        <h3 class="label">Truyện đề cử</h3>
        <div class="book-container">
          <book-detail-block
            v-for="bookHome1 in top10NewestBooks"
            :key="bookHome1.id"
            v-bind:book="bookHome1">
          </book-detail-block>
        </div>
      </div>
      <div class="right">
        asdjkasdjkl
      </div>
    </div>
</body>
   
</template>

<script>
import BookDetailBlock from "@/components/BookDetailBlock.vue";
import axios from "axios";
export default {
    name: "HomePage",
    components: {
        BookDetailBlock,
    },
    data() {
        return {
            top10Books: [],
            top10NewestBooks: [],
        };
    },
    created() {
        this.getTop10Book();
        this.getTop10NewestBook();
    },
    methods: {
        getTop10Book() {
            axios
                .get("http://localhost:8000/top-10-books")
                .then((response) => (this.top10Books = response.data));
        },
        getTop10NewestBook(){
            axios
                .get("http://localhost:8000/newest-books")
                .then((response) => (this.top10NewestBooks = response.data));
        }
    },
};
</script>

<style scoped>
.c-container {
  display: flex;
  max-width: 1200px;
  margin: 30px auto;
}

.left {
  flex: 0.7;
  margin-right: 50px;
}

.right {
  flex: 0.3;
}
@font-face {
    font-family: "OpenSans";
    src: url("../assets/fonts/OpenSans-Regular.ttf");
}



.book-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 13rem);
  justify-content: space-between;
  width: 100%;
}

.book-container > * {
    height: 18rem;
    margin-bottom: 2rem;
}

.label {
  margin-bottom: 25px;
}
</style>


