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
            {
                header: "STT",
                field: "reportId"
            },
            {
                header: "Ngày gửi",
                field: "reportedDate",
                isDate: true,
                width: "8rem"
            },
            {
                header: "Tên truyện",
                isObject: true,
                object: "book",
                field: "name"               
            },
            {
                header: "Người gửi",
                isObject: true,
                object: "userSender",
                field: "name"
            },
            {
                header: "Nội dung",
                field: "reportContent",
            },
            {
                header: "Tình trạng",
                isObject: true,
                object: "statusId",
                field: "statusName"
            },
            {
                header: "Xem chi tiết",
                name: "detail",
                display: "<button class='btn btn-primary'>Xem chi tiết</button>", 
            },
            {
                header: "Phản hồi",
                name: "response",
                display: "<button class='btn btn-primary'>Phản hồi</button>",
            },     
            {
                header: "Thao tác",
                name: "delete",
                display: "<button class='btn btn-primary'>Xóa</button>",
            },      
        ];
        this.paging = {
            page: 0,
            pageSize: 3,
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

</style>