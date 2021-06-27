<template>
    <div class="container">
        {{userId}}
        <div v-for="report in messageListByUser" :key="report.id" v-bind:userId="userId">
            {{ report.reportId}} {{ report.reportContent}} {{ report.responseDate}}
        </div>        
    </div>
    <div class="reader-message-list">
        <reader-data-table
            v-bind:columnDefs="columnDefs"
            v-bind:data="data"
            v-bind:paging="paging"
            v-bind:url="url"
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
            messageListByUser: [],
            userId: this.$store.state.user.id,    
            columnDefs: null,
            data: null,
            paging: null,
            url: null      
        }
    },
    components: {
        ReaderDataTable
    },
    beforeMount() {
        this.getMessageByUser();
        let self = this;
        this.columnDefs = [
            {
                header: "STT",
                field: "reportId"
            },
            // {
            //     header: "Ngày gửi",
            //     field: "reportedDate",
            //     isDate: true,
            //     width: "8rem"
            // },
            // {
            //     header: "Tên truyện",
            //     field: "book",                
            // },
            // {
            //     header: "Người gửi",
            //     field: "userSender",
            // },
            {
                header: "Nội dung",
                field: "reportContent",
            },
            // {
            //     header: "Tình trạng",
            //     field: "statusId"
            // },
            // {
            //     header: "Xem chi tiết",
            //     field: ""
            // },
            // {
            //     header: "Phản hồi",
            //     field: ""
            // },           
        ];
        this.paging = {
            page: 0,
            pageSize: 10,
            sortField: "id",
            sortOrder: "des"
        };
        this.url = "http://localhost:8000/reader/message-list";
    },
    methods: {
        getMessageByUser() {
            axios
                .get("http://localhost:8000/reader/message-list", {
                    headers: {
                        userId: this.userId
                    }
                })
                .then((response) => (this.messageListByUser = response.data));
        }

        
    }
}





</script>