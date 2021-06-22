<template>
  <div class="user_detail">
    <img v-if="data.profileImageLink" class="user_detail_image"  :src="data.profileImageLink" />
    <p><b>Tên người dùng:</b> {{ data.name }}</p>
    <p><b>Kiểu:</b> {{ data.role }}</p>
    <p><b>Email:</b> {{ data.email }}</p>
    <p><b>CMND:</b> {{ data.cmnd }}</p>
    <p><b>Ảnh CMND:</b></p>
    <img v-if="data.cmndBack" style="width: 250px;" :src="data.cmndBack" />
    <img v-if="data.cmndFront" style="width: 250px;" :src="data.cmndFront" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminUserEdit",
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
        .get("http://localhost:8000/admin/user-edit", {
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