<template>
    <div class="login-page">
        <form @submit.prevent="login" class="login-form">
            <input v-model="name" type="text" name="name" placeholder="Tên đăng nhập" class="form-control c-input">
            <input v-model="password" type="password" name="password" placeholder="Mật khẩu" class="form-control c-input">
            <div class="custom-alert alert alert-danger" role="alert" v-show="isError">
                Tên đăng nhập hoặc mật khẩu không chính xác
            </div>
            <button type="submit" class="btn btn-primary">Đăng nhập</button> 
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
                        let user = res.data;
                        if (!user.enabled) {
                            this.$router.push("/login-error");
                            return;
                        }
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
.login-page {
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
    padding: 70px;
}
.login-form {
    width: 150px;
    height: 100px;
    margin: 0 auto;
}

.c-input {
    margin-bottom: 20px;
    font-size: 15px;
    width: 200px;
    padding: 10px;
}
.custom-alert {
    width: 150px;
    margin: 0 auto;
}
</style>