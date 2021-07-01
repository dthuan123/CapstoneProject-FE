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
        field: "reported_date",
      },
      {
        header: "Tên truyện",
        field: "book_id",
      },
      {
        header: "Người gửi",
        field: "sender_id",
      },
      {
        header: "Tình trạng",
        isConditionalRendering: true,
        field: "status_id",
        fieldTrue: "Đã phản hồi",
        fieldFalse: "Chưa phản hồi",
      },
      {
        header: "Chi tiết",
        display: true,
        displayTT: "<button>Chi tiết</button>",
        action: function edit(row) {
          that.$router.push({ name: "UserEdit" });
          that.$store.commit("setUserId", row.id);
        },
      },
      {
        header: "Duyệt",
        isapproved: true,
        field: "status_id",
        fieldTrue: "",
        fieldFalse: "<button>Duyệt</button>",
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
        isTT: true,
        field: "enabled",
        fieldTrue: "<button>Hủy cấm</button>",
        fieldFalse: "<button>Cấm</button>",
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
    };
    this.url = "admin/reportListAdmin";
  },
};
</script>

<style>
</style>