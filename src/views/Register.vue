<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-3 col-sm-6 col-xs-12 row-container">
                <form>
                    <br/>
                    <h1 style="font-size:20px;">Đăng ký</h1><br/>
                    <div class="form-group">
                        <div>
                        <label for="username">Tên đăng nhập: </label>
                        <input type="text" class="form-control" id="username" placeholder="Nhập tên đăng nhập">
                        </div>
                        <div>
                        <label for="email">Địa chỉ email: </label>
                        <input type="email" class="form-control" id="email" placeholder="Nhập địa chỉ email">
                        </div>
                        <div>
                        <label for="password">Mật khẩu: </label>
                        <input type="password" class="form-control" id="password" placeholde="Nhập mật khẩu">
                        </div>
                        <div>
                        <label for="re-password">Tên đăng nhập: </label>
                        <input type="password" class="form-control" id="re-password" placeholder="Nhập lại mật khẩu">
                        </div>
                        <div>
                        <label for="address">Địa chỉ: </label>
                        <input type="text" class="form-control" id="address" placeholder="Nhập địa chỉ">
                        </div>
                        <div>
                        <label for="phone">Số điện thoại: </label>
                        <input type="number" class="form-control" id="phone" placeholder="Nhập số điện thoại"><br/>
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
    export default{
        name: "Register",
        data() {
            return {
                text: "Register"
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