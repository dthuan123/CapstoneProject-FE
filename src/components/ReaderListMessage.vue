<template>
  <div class="container">
        {{userId}}
        <div v-for="report in messageListByUser" :key="report.id" v-bind:userId="userId">
            {{ report.reportId}} {{ report.reportContent}} {{ report.responseDate}}
        </div>
        <reader-message-list
            v-bind:userId="userId"
        >
        </reader-message-list>
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
import axios from"axios"
export default {
   
        
        props: ["report"],
    
    name: "ReaderListMessage",
    data() {
        return {
            messageListByUser: [],
            userId: this.$store.state.userId,
            columnDefs: null,
            data: null,
            paging: null,
            url: null
        }
    },
    beforeMount() {
        this.get();
    },
    methods: {
        getMessageByUser() {
            axios
                .get("http://localhost:8000/reader/message-list", {
                    headers: {
                        userId: this.userId
                    }
                })
                .then((response) => (this.chapters = response.data));
        }

        
    }
}





</script>