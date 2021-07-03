<template>
  <admin-data-table
    v-bind:columnDefs="columnDefs"
    v-bind:data="data"
    v-bind:paging="paging"
    v-bind:url="url"
  >
  </admin-data-table>
</template>

<script>
import AdminDataTable from "@/components/AdminDataTable.vue";
import axios from "axios";
export default {
  name: "AdminUserList",
  data() {
    return {
      columnDefs: null,
      data: null,
      paging: null,
      url: null,
    };
  },
  components: {
    AdminDataTable,
  },
  beforeMount() {
    let that = this;
    this.columnDefs = [
      {
        header: "STT",
        field: "id",
      },
      {
        header: "Ngày gửi",
        field: "reportedDate",
        isDate:true
      },
      {
        header: "Tên truyện",
        field: "book",
        book:true
      },
      {
        header: "Người gửi",
        field: "userSender",
        userSender:true
      },
       {
        header: "Nội dung",
        field: "reportContent",
      },
      {
        header: "Tình trạng",
        field: "statusId",
        statusId:true
      },
      {
        header: "Chi tiết",
        display: true,
        displayTT: "<button class='btn btn-primary'>Chi tiết</button>",
        action: function edit(row) {
          that.$router.push({ name: "AdminReportView" });
          that.$store.commit("setBookId", row.id);
        },
      },
      {
        header: "Phản hồi",
        isapproved: true,
        field: "status_id",
        fieldTrue: "",
        fieldFalse: "<button class='btn btn-primary'>Phản hồi</button>",
        action: function approved(row) {
          that.$router.push({ name: "AdminReportView" });
          that.$store.commit("setBookId", row.id);
        },
      },
    ];
    this.paging = {
      page: 0,
      pageSize: 10,
      sortField: "id",
      sortOrder: "des",
    };
    this.url = "admin/reportListAdmin";
  },
};
</script>

<style>
</style>