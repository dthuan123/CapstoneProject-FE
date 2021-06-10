<template>
    <div class="login-page">
        <form @submit.prevent="login" class="login-form">
            <input v-model="name" type="text" name="name" >
            <input v-model="password" type="password" name="password">
            <button type="submit">Login</button>
            <span v-show="isError">Wrong username or password</span>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '@/store';

export default {
    name: "LoginPage",
    data() {
        return {
            name: null,
            password: null,
            isError: false
        }
    },
    methods: {
        login() {
            let data = {
                name: this.name,
                password: this.password
            }
            axios.post("http://localhost:8000/login", data)
                .then(res => {
                    console.log(res);
                    if(res.data) {
                        let user = {
                            roleName: res.data.role.name,
                            userID: res.data.id               
                        }
                        store.commit("setUser", user);
                        this.$router.push("/home");
                    } else {
                        this.isError = true;
                    }
                })
        }
    }

    
}
</script>

<style>

.login-form {
    width: 150px;
    height: 100px;
    margin: 0 auto;
}
</style>