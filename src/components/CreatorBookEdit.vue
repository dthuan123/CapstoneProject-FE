<template>
  <div class="container">
        <creator-book-info
            v-bind:mode="mode"
            v-bind:editId="bookId"
        >
        </creator-book-info>
        <creator-data-table
            v-bind:columnDefs="columnDefs"
            v-bind:pageSize="pageSize"
            v-bind:url="url"
            v-bind:headerOption="headerOption"
        >
        </creator-data-table>  
        <div class="row-end">
            <button class="btn btn-primary" @click="addChapter">Thêm chương mới</button>  
        </div>

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
            url: null,
            pageSize: 10,
            headerOption: [
                {
                    name: "bookId",
                    value:  this.$store.state.bookId,
                }
            ]
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
            {
                header: "Ngày bắt đầu",
                isDate: true,
                field: "startedDate"
            },
            {
                header: "Ngày cập nhật cuối",
                isDate: true,
                field: "updatedDate"
            },
            {
                header: "Tình trạng",
                field: ""
            },
            {
                display: "<button class='btn btn-primary'>Chỉnh sửa</button>",
                action: function edit(row) {
                    self.$router.push({name: "EditChapter"});
                    self.$store.commit("setChapterId", row.id);
                }
            },
            {
              deleteDisplay: "<button class='btn btn-danger'>Xóa</button>", 
            }
        ];
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

<style scoped>
.container {
    background-color: #fefefe;
}

.row-end {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
}

.row-end button {
    padding: 1.5rem;
}
</style>