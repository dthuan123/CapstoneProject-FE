<template>
    <div class="creator-book-list">
        <creator-data-table
            v-bind:columnDefs="columnDefs"
            v-bind:pageSize="pageSize"
            v-bind:url="url"
            v-bind:headerOption="headerOption"
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
            url: null,
            pageSize: 10,
            headerOption: [
                {
                    name: "creatorId",
                    value:  this.$store.state.user.id,
                }
            ]
        }
    },
    components: {
        CreatorDataTable
    },
    beforeMount() {
        let self = this;
        this.columnDefs = [
            // {
            //     header: "STT",
            //     isRowIndex: true
            // },
            {
                header: "Tên",
                field: "name",
                width: "100px"
            },
            {
                header: "Ảnh bìa",
                field: "imageLink",
                isImage: true,
                width: "150px"
            },
            {
                header: "Ngày bắt đầu",
                field: "startedDate",
                isDate: true,
                width: "9rem"
            },
            {
                header: "Ngày cập nhật cuối",
                field: "updatedDate",
                isDate: true,
                width: "9rem"
            },
            // {
            //     header: "Mô tả",
            //     field: "description"
            // },
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
                fieldTrue: "Đang hoạt động",
                fieldFalse: "Đã bị cấm"
            },
            {
                header: "Tình trạng",
                isObject: true,
                object: "bookStatus",
                field: "name"
                
            },
            {
                display: "<button class='btn btn-primary'>Chỉnh sửa</button>",
                action: function edit(row) {
                    self.$router.push({name: "EditBook"});
                    self.$store.commit("setBookId", row.id);
                }
            }
        ];
        this.url = "http://localhost:8000/creator/get/books";
    }
};
</script>

<style>
.creator-book-list {
    background-color: #fefefe;
}
</style>