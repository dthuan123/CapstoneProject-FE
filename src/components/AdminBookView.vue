<template>
   <div class="user_detail">
    <p><b>Ngày gửi:</b> {{ data.startedDate }}</p>
    <p><b>Tên truyện:</b> {{ data.name }}</p>
    <p><b>Người gửi:</b> 
    <!-- {{ data.creator }} -->
    </p>
    <p><b>Nội dung:</b> </p>
    <p>{{ data.description }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminBookView",
  data() {
    return {
      bookId: this.$store.state.userId,
      data: [],
    };
  },
  beforeMount() {
    this.get();
  },
  methods: {
    get() {
      axios
        .get("http://localhost:8000/admin/book-viewadmin", {
          headers: {
            userid: this.bookId,
          },
        })
        .then((response) => (this.data = response.data[0]));
    },
  },
};
</script>

<style>
.user_detail{
    font-size: 14px;
    padding: 30px;
    border: 1px solid #000;
    margin-bottom: 30px;
}
.user_detail p{
   margin-bottom: 10px;
}
.user_detail_image{
    width: 350px;
    margin-bottom: 30px;
}
b{
    font-weight: bold;
}
</style>