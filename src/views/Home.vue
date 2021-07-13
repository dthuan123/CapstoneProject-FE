<template>
<body>
    <div class="c-container">
      <div class="left">
        <div class="book-block">
          <h3 class="label">Truyện đề cử</h3>
            <div class="book-container">              
              <book-detail-block
                  v-for="bookHome in top10Books"
                  :key="bookHome.id"
                  v-bind:book="bookHome">
              </book-detail-block>
            </div>
        </div>
        <div class="book-block">
          <h3 class="label">Truyện Mới nhất</h3>
          <div class="book-container">
            <book-detail-block
              v-for="bookHome1 in top10NewestBooks"
              :key="bookHome1.id"
              v-bind:book="bookHome1">
            </book-detail-block>
          </div>
        </div>
      </div>
      <div class="right">
        <comment-in-home-block
        v-for="commentHome in top10NewestComments"
        :key="commentHome.id"
        v-bind:comments="commentHome">
        </comment-in-home-block>
      </div>
    </div>
</body>
   
</template>

<script>
import BookDetailBlock from "@/components/BookDetailBlock.vue";
import CommentInHomeBlock from "@/components/CommentInHomeBlock.vue";
import axios from "axios";
export default {
    name: "HomePage",
    components: {
        BookDetailBlock,
        CommentInHomeBlock,
    },
    data() {
        return {
            top10Books: [],
            top10NewestBooks: [],
            top10NewestComments: [],
        };
    },
    created() {
        this.getTop10Book();
        this.getTop10NewestBook();
        this.getTop10NewestComment();
        console.log(this.top10NewestComments);
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
        },
        getTop10NewestComment(){
            axios
                .get("http://localhost:8000//get-top-newest-comment-book")
                .then((response) => (this.top10NewestComments = response.data));
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
  border-radius: 10px;
}

.right {
  flex: 0.3;
}
@font-face {
    font-family: "OpenSans";
    src: url("../assets/fonts/OpenSans-Regular.ttf");
}

.book-block{
  margin-bottom: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 5px 4px 10px #888888;

}

.book-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 13rem);
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.book-container > * {
    height: 18rem;
    margin-bottom: 2rem;
}

.label {
  margin-bottom: 25px;
  background-color:#cde2f3;
  padding: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
</style>


