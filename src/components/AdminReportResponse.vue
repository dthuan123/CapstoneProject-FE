<template>
   <div class="user_detail">
       <form @submit.prevent="response">
            <p><b>Đến:</b> <span v-if="data.userSender"> {{data.userSender['name']}}</span></p>
            <p><b>Nội dung:</b> </p>
            <p> <textarea class="content"  placeholder="Nhập nội dung"  rows="6" v-model="content"></textarea>  </p>
            <p>Message is: {{ content }}</p>
            <div style="    text-align: right;">
                <button type="submit" class="btn btn-primary mr-5" style="margin-right: 15px;">Gửi</button>
                <router-link :to="{ name: 'AdminReportList' }" class="btn btn-outline-secondary">Huỷ</router-link>
            </div>
            
        </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminReportResponse",
  data() {
    return {
      bookId: this.$store.state.bookId,
      data: [],
      content:""
    };
  },
   beforeMount() {
    this.get();
  },
  methods: {
    get() {
      axios
        .get("admin/report-viewadmin", {
          headers: {
            reportid: this.bookId,
          },
        })
        .then((response) => (this.data = response.data));
    },
    response() {
        var report = {
            responseContent: this.content,
            id:this.bookId
        }
        axios
        .post("admin/report-responseadmin",report)
        .then((response) => {
              this.$router.push("/admin/report-list");
        }
        );

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
.content{
    width: 100%;
}
</style>