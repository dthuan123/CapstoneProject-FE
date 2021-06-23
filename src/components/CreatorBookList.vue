<template>
    <div class="creator-book-list">
        <creator-data-table
            v-bind:columnDefs="columnDefs"
            v-bind:data="data"
            v-bind:paging="paging"
            v-bind:url="url"
        >
        </creator-data-table>
    </div>
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
        let self = this;
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
                field: "startedDate",
                isDate: true,
                width: "8rem"
            },
            {
                header: "Ngày cập nhật cuối",
                field: "updatedDate",
                isDate: true,
                width: "8rem"
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
                display: "<button class='btn btn-primary'>Chỉnh sửa</button>",
                action: function edit(row) {
                    self.$router.push({name: "EditBook"});
                    self.$store.commit("setBookId", row.id);
                }
            }
        ];
        this.paging = {
            page: 0,
            pageSize: 10,
            sortField: "id",
            sortOrder: "des"
        };
        this.url = "http://localhost:8000/creator/get/books";
    }
};
</script>

<style>
.creator-book-list {
    background-color: #fefefe;
}
</style>