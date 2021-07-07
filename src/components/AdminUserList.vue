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
        header: "Tên",
        field: "name",
      },
      {
        header: "Kiểu",
        TT: true,
        field: "role",
        nameTT: "name",
      },
      {
        header: "Email",
        field: "email",
      },
      {
        header: "CMND",
        field: "cmnd",
      },
      {
        header: "Số điện thoại",
        field: "phone",
      },
      {
        header: "Tình trạng",
        isConditionalRendering: true,
        field: "approved",
        fieldTrue: "Đã duyệt",
        fieldFalse: "Chờ duyệt",
      },
      {
        header: "Trạng thái",
        isConditionalRendering: true,
        field: "enabled",
        fieldTrue: "Đang hoạt động",
        fieldFalse: "Đã bị cấm",
      },
      {
        header: "Chi tiết",
        display: true,
        displayTT: "<button class='btn btn-primary'>Chi tiết</button>",
        action: function edit(row) {
          that.$router.push({ name: "UserEdit" });
          that.$store.commit("setBookId", row.id);
        },
      },
      {
        header: "Duyệt",
        isapproved: true,
        field: "approved",
        fieldTrue: "",
        fieldFalse: "<button class='btn btn-primary'>Duyệt</button>",
        action: function approved(row) {
          if (confirm("Bạn có đồng ý duyệt không?")) {
            axios
              .get("admin/user-approved", {
                headers: {
                  userid: row.id,
                },
              })
              .then((response) => window.location.reload());
          }
        },
      },
      {
        header: "Ban",
        isTTUser: true,
        field: "enabled",
        fieldFalse: "<button class='btn btn-primary'>Hủy cấm</button>",
        fieldTrue: "<button class='btn btn-primary'>Cấm</button>",
        action: function edit(row) {
          if (confirm("Bạn có đồng ý thao tác không?")) {
            axios
              .get("admin/user-enabled", {
                headers: {
                  userid: row.id,
                },
              })
              .then((response) => window.location.reload());
          }
        },
      },
    ];
    this.paging = {
      page: 0,
      pageSize: 10,
      sortField: "id",
      sortOrder: "des",
      searchKeyword:"",
      issearchKeyword:true
    };
    this.url = "admin/user-list";
  },
};
</script>

<style>
</style>