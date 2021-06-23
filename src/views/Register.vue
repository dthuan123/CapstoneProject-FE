<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-3 col-sm-6 col-xs-12 row-container">
                <form @submit.prevent="register">
                    <br/>
                    <h1 style="font-size:20px;">Đăng ký</h1><br/>
                    <div class="form-group">
                        <div>
                        <label for="username">Tên đăng nhập: </label>
                        <input type="text" class="form-control" v-model="username" id="username" placeholder="Nhập tên đăng nhập">
                        </div>
                        <div>
                        <label for="email">Địa chỉ email: </label>
                        <input type="email" class="form-control" v-model="email" id="email" placeholder="Nhập địa chỉ email">
                        </div>
                        <div>
                        <label for="password">Mật khẩu: </label>
                        <input type="password" class="form-control" v-model="password" id="password" placeholde="Nhập mật khẩu">
                        </div>
                        <div>
                        <label for="re-password">Xác nhận mật khẩu: </label>
                        <input type="password" class="form-control" id="re-password" placeholder="Nhập lại mật khẩu">
                        </div>
                        <div>
                        <label for="phone">Số điện thoại: </label>
                        <input type="number" class="form-control" v-model="phone" id="phone" placeholder="Nhập số điện thoại"><br/>
                        </div>
                        <div>
                            <button type="submit" class="btn btn-success btn-block my-3">Đăng ký</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import { store} from '@/store';
    export default{
        name: "Register",
        data() {
            return {
                username: null,
                password: null,
                email: null,
                phone: null,
                role: null
            }
        },
        methods: {
            register() {
                let body = {
                    role: 1,
                    approvve: null,
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    phone: this.phone,
                    useridentity: null,
                    useridentityfront: null,
                    useridentityback: null,
                    enable: true,
                    userimage: null
                }
                axios.post("http://localhost:8000/register", body)
            .then(res =>{
                console.log(res);
                    this.$router.push("/login");
                
            })
            }
        }
    }
</script>
<style>
    .row-container{
        border: 1px solid black;
        border-radius: 30px;
        margin-top: 10vh;
        margin-bottom: 10vh;;
        padding: 10px;
    }
</style>