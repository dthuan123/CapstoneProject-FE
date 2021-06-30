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
                         <div>
                            <span style="color:red" v-show="usernameValidate">Must input username</span>
                        </div>
                        <div>
                        <label for="email">Địa chỉ email(<span style="color:red">*</span>): </label>
                        <input type="email" class="form-control" v-model="email" id="email" placeholder="Nhập địa chỉ email">
                        </div>
                         <div>
                            <span style="color:red" v-show="emailValidate">Must input email</span>
                        </div>
                        <div>
                        <label for="password">Mật khẩu(<span style="color:red">*</span>): </label>
                        <input type="password" class="form-control" v-model="password" id="password" placeholde="Nhập mật khẩu">
                        </div>
                         <div>
                            <span style="color:red" v-show="passwordValidate">Your password must atleast 6 character and less than 18 character</span>
                        </div>
                        <div>
                        <label for="re-password">Xác nhận mật khẩu(<span style="color:red">*</span>): </label>
                        <input type="password" class="form-control" v-model="repassword" id="re-password" placeholder="Nhập lại mật khẩu">
                        </div>
                        <div>
                            <span style="color:red" v-show="isError">Your password is not match</span>
                        </div>
                        <div>
                        <label for="phone">Số điện thoại: </label>
                        <input type="number" class="form-control" v-model="phone" id="phone" placeholder="Nhập số điện thoại"><br/>
                        </div>
                        <div>
                            <span v-show="isExist">This username or email is already exist</span>
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
                    this.isError = true;
                    return;
                }else if(this.username==null || this.username.trim() === ""){
                    this.usernameValidate = true;
                    return;
                }else if(this.email==null){
                    this.emailValidate = true;
                    return;
                }else if(this.password==null || this.password.length <= 5 || this.password.length >=19){
                    this.passwordValidate = true;
                    return;
                }
                axios.post("http://localhost:8000/register", body)
            .then(res =>{
                if(res.data){
                console.log(res);
                    this.$router.push("/login");
                }else{
                    this.isExist = true;
                }
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