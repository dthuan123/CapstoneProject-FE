<template>
    <!-- <div class="container">
        {{userId}}
        <div v-for="report in messageListByUser" :key="report.id" v-bind:userId="userId">
            {{ report.reportId}} {{ report.reportContent}} {{ report.responseDate}}
        </div>        
    </div> -->
    <div class="reader-message-list">
        <reader-data-table
            v-bind:columnDefs="columnDefs"
            v-bind:pageSize="pageSize"
            v-bind:url="url"
            v-bind:headerOption="headerOption"
        >
        </reader-data-table> 
    </div>

    
    
</template>

<script>
import axios from "axios"
import ReaderDataTable from "@/components/ReaderDataTable.vue"

export default {         
    props: ["report"],   
    name: "ReaderListMessage",
    data() {
        return {   
            columnDefs: null,
            url: "http://localhost:8000/reader/message-list", 
            headerOption: [
                {
                    name: "userId",
                    value:  this.$store.state.user.id,    
                }
            ],
            pageSize: 10
        }
        
    },
    components: {
        ReaderDataTable
    },
    beforeMount() {
        //this.getMessageByUser();
        let self = this;
        this.columnDefs = [
            // {
            //     header: "STT",
            //     field: "reportId"
            // },
            {
                header: "Ngày gửi",
                field: "reportedDate",
                isDate: true,
                width: "100px"
            },
            {
                header: "Tên truyện",
                isObject: true,
                object: "book",
                field: "name",
                width: "250px"   

            },
            {
                header: "Người gửi",
                isObject: true,
                object: "userSender",
                field: "name",
                width: "150px"
            },
            {
                header: "Nội dung",
                field: "reportContent",
            },
            {
                header: "Tình trạng",
                isObject: true,
                object: "statusId",
                field: "statusName",
                width: "120px"
            },
            {
                header: "Chi tiết",
                name: "detail",
                display: "<button class='btn btn-primary'>Chi tiết</button>",
                width: "80px"

            },
            {
                header: "Xem phản hồi",
                name: "response",
                display: "<button class='btn btn-primary'>Xem phản hồi</button>",
                width: "110px"
            },     
            {
                header: "Thao tác",
                name: "delete",
                display: "<button class='btn btn-primary'>Xóa</button>",
                width: "80px"
                // action: function edit(row) {
                    // axios
                    //     .delete("http://localhost:8000/reader/delete-message", {   
                    //         headers: {
                    //             reportId: row.id
                    //         }
                    //     })
                    //     .then((response) => {});
                // }
            },      
        ];
        this.paging = {
            page: 0,
            pageSize: 10,
            sortField: "id",
            sortOrder: "des"
        };
       
    },
    methods: {
        // getMessageByUser() {
        //     axios
        //         .get("http://localhost:8000/reader/message-list", {
        //             headers: {
        //                 userId: this.userId
        //             }
        //         })
        //         .then((response) => (this.messageList = response.data));
        // },
        // showMessage() {
        //     this.report.reportContent
        // }
        
    }
}
</script>
<style scoped>
.reader-message-list {
    min-height: 100vh;
    background-color: white;
    padding-top: 20px;
}
</style>