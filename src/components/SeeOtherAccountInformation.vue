<template>
    <div class="container">
        <img class="acc-img" :src="users.avatarLink" />
        <div class="account">
            <div class="account-info">
                <h1 class="acc-name">{{users.name}}</h1>
                <div class="role">
                    <span class="acc-label">Chức vụ</span>
                    <span>{{users.role.name}}</span>
                </div>
                <div class="acc-book">
                    <span class="acc-label">Số truyện đã đăng: </span>
                    <span>{{users.book.size}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default{
        name: "SeeOtherAccountInformation",
        data(){
            return{
                users: {
                    usersId: this.$route.query.userId,
                    role: {
                        name: "",
                    },
                    book: [], 
                }
            }
        },
        created(){
            this.getUser();
        },
        methods: {
            getUser(){
                axios
                    .get("http://localhost:8000/reader/account/seeInfo", {
                        headers: {
                            userId: this.usersId,
                        }
                    })
                    .then((response) => {
                        this.users = response.data;
                        console.log(this.data)
                    })
            }
        }
    }
</script>
<style scoped>
.container {
    margin: 0 auto;
    padding: 20px;
    font-family: "OpenSans";
}
.acc-img{
    width: 150px;
    height:200px;
    margin-right: 20px;
}
.account{
    margin-bottom: 20px;
}
.account-info{
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
}
.acc-name{
    font-weight: 700;
    font-size: 26px;
    margin-bottom: 10px;
}
.acc-label{
    color: #111;
    font-weight: 700;
    font-size: 14px;
    margin-right: 6px;
}
</style>