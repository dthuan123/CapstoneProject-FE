<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-3 col-sm-6 col-xs-12 row-container">
                <form @submit.prevent="changePassword">
                    <br/>
                    <h1 style="font-size:20px;">Đổi mật khẩu</h1><br/>
                    <div class="form-group">
                        <div>
                        <label for="username">Tên đăng nhập(<span style="color:red">*</span>): </label>
                        <input type="text" class="form-control" id="username" :value="user.name" disabled>
                        </div>
                        <div>
                        <label for="email">Địa chỉ email(<span style="color:red">*</span>): </label>
                        <input type="email" class="form-control" id="email" :value="user.email" disabled>
                        </div>

                         <div>
                        <label for="old-password">Mật khẩu cũ(<span style="color:red">*</span>): </label>
                        <input type="password" class="form-control" v-model="oldpassword" id="password" placeholde="Nhập mật khẩu cũ">
                        </div>
                         <div>
                            <span style="color:red" v-show="oldpasswordValidate">Your old password wrong</span>
                        </div>

                        <div>
                        <label for="password">Mật khẩu mới(<span style="color:red">*</span>): </label>
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
                            <button type="submit" class="btn btn-success btn-block my-3">Đổi mật khẩu</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {store} from '@/store';
    export default {
        name: "ChangePassword",
        data(){
            return {
                user: this.$store.state.user,
                password: null,
                repassword: null,
                passwordValidate: false,
                isError: false,
                oldpassword: this.oldpassword,
            }
        },
        methods: {
            changePassword(){
                // let body = {
                //     password: this.password,
                //     userId: this.user.id
                // }
                if(this.password!= this.repassword){
                    this.isError = true;
                    return;
                }else if(this.password==null || this.password.length <= 5 || this.password.length >=19){
                    this.passwordValidate = true;
                    return;
                }
                
                let formData = new FormData();
                formData.append("password", new Blob([JSON.stringify(this.password)], {
                  type: "application/json"
                }));
                formData.append("userId", new Blob([JSON.stringify(this.$store.state.user.id)], {
                  type: "application/json"
                }));
                formData.append("oldPassword", new Blob([JSON.stringify(this.oldpassword)], {
                  type: "application/json"
                }));
            axios
              .post("http://localhost:8000/changePassword", formData)
              .then(res =>{
                console.log(res);
                alert("doi mat khau thanh cong");
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