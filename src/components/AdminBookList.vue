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
    name: "AdminBookList",
    data() {
        return {
            columnDefs: null,
            data: null,
            paging: null,
            url: null
        }
    },
    components: {
    AdminDataTable,
  },
    beforeMount() {
        let that = this;
        this.columnDefs = [
            {
                header: "STT",
                field: "id"
            },
            {
                header: "Tên truyện",
                field: "name",
            },
            {
                header: "Tác giả",
                field: "alias",
                alias:true
            },
            {
                header: "Mô tả",
                field: "description"
            },
            {
                header: "Tình trạng",
                field: "enabled",
                isConditionalRendering: true,
                fieldTrue: "Hoàn thành",
                fieldFalse: "Chưa hoàn thành"
            },
            {
                header: "Tình trạng hoạt động",
                field: "bookStatus",
                bookStatus:true
            },
            {
                header: "Chi tiết",
                display: true,
                displayTT: "  <button class='btn btn-primary'>Chi tiết</button>",
                action: function edit(row) {
                that.$router.push({ name: "AdminBookView" });
                 that.$store.commit("setBookId", row.id);
                },
            },
            {
                header: "Ban",
                isTT: true,
                field: "enabled",
                fieldFalse: "<button class='btn btn-primary'>Hủy cấm</button>",
                fieldTrue: "<button class='btn btn-primary'>Cấm</button>",
                action: function edit(row) {
                if (confirm("Bạn có đồng ý thao tác không?")) {
                    axios
                    .get("admin/book-enabledadmin", {
                        headers: {
                        bookid: row.id,
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
            issearchKeyword:false
        };
        this.url = "admin/book-listadmin";
    }
};
</script>

<style>
</style>