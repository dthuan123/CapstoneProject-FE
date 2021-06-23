<template>
  <div class="container">
        {{userId}}
        <div v-for="report in messageListByUser" :key="report.id" v-bind:userId="userId">
            {{ report.reportId}} {{ report.reportContent}} {{ report.responseDate}}
        </div>        
  </div>
</template>

<script>
import axios from "axios"
export default {         
        props: ["report"],   
        name: "ReaderListMessage",
    data() {
        return {
            messageListByUser: [],
            userId: this.$store.state.userId,
            data: null,           
        }
    },
    beforeMount() {
        this.getMessageByUser();
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