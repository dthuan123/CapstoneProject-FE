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
            let body = {
                name: this.name,
                password: this.password
            }
            axios.post("http://localhost:8000/login", body)
                .then(res => {
                    if(res.data) {
                        store.commit("setUser", res.data);
                        if (res.data.role.id == 3) {
                             this.$router.push("/admin");
                        } else {
                             this.$router.push("/home");
                        }
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