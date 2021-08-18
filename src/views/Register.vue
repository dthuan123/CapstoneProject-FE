<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-3 col-sm-6 col-xs-12 row-container">
                <form @submit.prevent="register">
                    <br/>
                    <h1 style="font-size:20px;">Đăng ký</h1><br/>
                    <div class="form-group">
                        <div>
                        <label for="username">Tên đăng nhập(<span style="color:red">*</span>): </label>
                        <input type="text" class="form-control" v-model="username" id="username" placeholder="Nhập tên đăng nhập">
                        </div>
                         <div class="alert alert-danger" role="alert" v-show="usernameValidate">
                            Tên đăng nhập không được để trống
                        </div>
                        <div>
                        <label for="email">Địa chỉ email(<span style="color:red">*</span>): </label>
                        <input type="email" class="form-control" v-model="email" id="email" placeholder="Nhập địa chỉ email">
                        </div>
                         <div class="alert alert-danger" role="alert" v-show="emailValidate">
                            Email không được để trống
                        </div>
                        <div>
                        <label for="password">Mật khẩu(<span style="color:red">*</span>): </label>
                        <input type="password" class="form-control" v-model="password" id="password" placeholde="Nhập mật khẩu">
                        </div>
                         <div class="alert alert-danger" role="alert" v-show="passwordValidate">
                            Mật khẩu phải chứa từ 6-18 ký tự
                        </div>
                        <div>
                        <label for="re-password">Xác nhận mật khẩu(<span style="color:red">*</span>): </label>
                        <input type="password" class="form-control" v-model="repassword" id="re-password" placeholder="Nhập lại mật khẩu">
                        </div>
                        <div class="alert alert-danger" role="alert" v-show="isError">
                            Xác nhận mật khẩu không chính xác
                        </div>
                        <div>
                        <label for="phone">Số điện thoại: </label>
                        <input type="text" class="form-control" v-model="phone" id="phone" placeholder="Nhập số điện thoại"><br/>
                        </div>
                        <div class="alert alert-danger" role="alert" v-show="isExist">
                            Tên đăng nhập đã tồn tại
                        </div>
                        <div style="text-align: center">
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
                role: null,
                repassword: this.repassword,
                isError: false,
                isExist: false,
                usernameValidate: false,
                emailValidate: false,
                passwordValidate: false
            }
        },
        methods: {
            register() {
                let body = {
                    role: {
                        id: 1
                    },
                    approved: 0,
                    name: this.username,
                    password: this.password,
                    email: this.email,
                    phone: this.phone,
                    identityCard: null,
                    identityCardFront: null,
                    identityCardBack: null,
                    enabled: 1,
                    userimage: null
                    
                }
                if(this.password!= this.repassword){
                    this.usernameValidate = false;
                    this.emailValidate = false;
                    this.passwordValidate = false;
                    this.isError = true;
                    return;
                }else if(this.username==null || this.username.trim() === ""){
                    this.emailValidate = false;
                    this.passwordValidate = false;
                    this.isError = false;
                    this.usernameValidate = true;
                    return;
                }else if(this.email==null || this.email.trim() === ""){
                    this.usernameValidate = false;
                    this.emailValidate = true;
                    this.passwordValidate = false;
                    this.isError = false;
                    return;
                }else if(this.password==null || this.password.length <= 5 || this.password.length >=19){
                    this.usernameValidate = false;
                    this.emailValidate = false;
                    this.passwordValidate = true;
                    this.isError = false;
                    return;
                }
                axios.post("http://localhost:8000/register", body)
            .then(res =>{
                
                    this.$router.push("/login");
                })
            .catch(err => {
                    this.usernameValidate = false;
                    this.passwordValidate = false;
                    this.emailValidate = false;
                    this.isExist = true;
                    return;
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
        background-color: white;
    }
    .form-group label{
        padding-bottom: 10px;
        padding-top: 10px;
    }
    .form-group button{
        text-align: center;
    }
</style>