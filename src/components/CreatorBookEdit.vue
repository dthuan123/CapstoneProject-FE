<template>
  <div class="container">
        <creator-book-info
            v-bind:mode="mode"
            v-bind:editId="bookId"
        >
        </creator-book-info>
        <creator-data-table
            v-bind:columnDefs="columnDefs"
            v-bind:data="data"
            v-bind:paging="paging"
            v-bind:url="url"
        >
        </creator-data-table>  
        <button @click="addChapter">Thêm chương mới</button>      
  </div>
</template>

<script>
import axios from "axios"
import CreatorBookInfo from "@/components/CreatorBookInfo.vue"
import CreatorDataTable from "@/components/CreatorDataTable.vue"

export default {
    components: { 
        CreatorBookInfo,
        CreatorDataTable
    },
    name: "CreatorBooKEdit",
    data() {
        return {
            mode: "EDIT",
            bookId: this.$store.state.bookId,
            chapters: [],
            columnDefs: null,
            data: null,
            paging: null,
            url: null
        }
    },
    beforeMount() {
        let self = this;
        this.columnDefs = [
            {
                header: "STT",
                field: "id"
            },
            {
                header: "Tên chương",
                field: "name",
            },
            // {
            //     header: "Ngày bắt đầu",
            //     field: "startedDate"
            // },
            // {
            //     header: "Ngày cập nhật cuối",
            //     field: "updatedDate"
            // },
            // {
            //     header: "Tình trạng",
            //     field: ""
            // },
            {
                display: "<button>Chỉnh sửa</button>",
                action: function edit(row) {
                    self.$router.push({name: "EditChapter"});
                    self.$store.commit("setChapterId", row.id);
                }
            },
            {
                display: "<button>Xóa</button>",
                action: function edit(row) {
                    self.$router.push({name: "BookEdit"});
                    self.$store.commit("setBookId", row.id);
                }
            }
        ];
        this.paging = {
            page: 0,
            pageSize: 10,
            sortField: "id",
            sortOrder: "des",
            bookId: this.bookId
        };
        this.url = "http://localhost:8000/creator/get/chapters";
    },
    methods: {
        addChapter() {
            this.$router.push({name: "CreateChapter"});
        },
        deleteChapter(id) {
            axios
                .delete("http://localhost:8000/creator/get/chapters", {
                    headers: {
                        bookId: this.bookId
                    }
                })
                .then((response) => (this.chapters = response.data));
        }

        
    }
}
</script>

<style>

</style>