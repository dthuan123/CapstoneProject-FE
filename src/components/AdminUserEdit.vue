<template>
  <div class="user_detail">
    <img v-if="data.avatarLink" class="user_detail_image"  :src="data.avatarLink" />
    <p><b>Tên người dùng:</b> {{ data.name }}</p>
    <p><b>Kiểu:</b> <span v-if="data.role">{{ data.role['name'] }}</span></p>
    <p><b>Email:</b> {{ data.email }}</p>
    <p><b>CMND:</b> {{ data.identityCard }}</p>
    <p><b>Ảnh CMND:</b></p>
    <img v-if="data.identityCardBack" style="width: 250px;" :src="data.identityCardBack" />
    <img v-if="data.identityCardFront" style="width: 250px;" :src="data.identityCardFront" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminUserEdit",
  data() {
    return {
      bookId: this.$store.state.bookId,
      data: [],
    };
  },
  beforeMount() {
    this.get();
  },
  methods: {
    get() {
      axios
        .get("admin/user-edit", {
          headers: {
            userid: this.bookId,
          },
        })
        .then((response) => (
          this.data = response.data[0]
          ));
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