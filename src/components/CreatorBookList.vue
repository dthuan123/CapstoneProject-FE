<template>
    <creator-data-table
        v-bind:columnDefs="columnDefs"
        v-bind:data="data"
        v-bind:paging="paging"
        v-bind:url="url"
    >
    </creator-data-table>
</template>

<script>
import CreatorDataTable from "@/components/CreatorDataTable.vue"

export default {
    name: "CreatorBookList",
    data() {
        return {
            columnDefs: null,
            data: null,
            paging: null,
            url: null
        }
    },
    components: {
        CreatorDataTable
    },
    beforeMount() {
        let that = this;
        this.columnDefs = [
            {
                header: "STT",
                field: "id"
            },
            {
                header: "Tên",
                field: "name",
            },
            {
                header: "Ảnh bìa",
                field: "imageLink",
                isImage: true
            },
            {
                header: "Ngày bắt đầu",
                field: "startedDate"
            },
            {
                header: "Ngày cập nhật cuối",
                field: "updatedDate"
            },
            {
                header: "Mô tả",
                field: "description"
            },
            {
                header: "Điểm đánh giá",
                field: "overallRating"
            },
            {
                header: "Tổng đánh giá",
                field: "totalRating"
            },
            {
                header: "Số lượt thích",
                field: "likes"
            },
            {
                header: "Trạng thái",
                field: "enabled",
                isConditionalRendering: true,
                fieldTrue: "Ok",
                fieldFalse: "No"
            },
            {
                header: "Tình trạng",
                field: "bookStatusName"
            },
            {
                display: "<button>Chỉnh sửa</button>",
                action: function edit(row) {
                    that.$router.push({name: "BookEdit"});
                    that.$store.commit("setBookId", row.id);
                }
            }
        ];
        this.paging = {
            page: 0,
            pageSize: 10,
            sortField: "id",
            sortOrder: "des"
        };
        this.url = "http://localhost:8000/creator/book-list";
    }
};
</script>

<style>
</style>