<template>
    <body>
        <!-- <div class="profile-page" style="min-height: 1213px">
            <div class="profile-feature-wrapper">
                <div class="container">
                    <div class="profile-feature">
                        <div class="profile-cover">
                            <div class="fourone-ratio">
                                ::before
                                <img :src="user.coverLink">
                                <div class="content img-in-ratio"></div>
                            </div>
                            <div class="profile-changer none block-m">
                                <div class="p-c_wrapper">
                                    <i class="fas fa-camera">
                                        ::before
                                    </i>
                                    <span class="p-c_text">1200 x 300px</span>
                                </div>
                            </div>
                            <input type="file" id="user_cover_file" style="display: none"/>
                            <input type="file" id="user_avatar_file" style="display: none"/>
                        </div>
                        <div class="profile-nav">
                            <div class="profile-ava-wrapper">
                                <div class="profile-ava">
                                    <div class="profile-changer">
                                        <span class="p-c_text">
                                            <i class="fas fa-camera"></i>
                                        </span>
                                    </div>
                                    <img :src="user.avatarLink">
                                </div>
                            </div>
                            <div class="profile-intro">
                                <h3 class="profile-intro_name">{{user.name}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div>
            <div>
                <img :src="user.avatarLink" class="avatar_image">
                <div class="form-row">
                    <label class="label-attribute">Thay Avatar</label>
                <div class="column">
                <img class="cover-img" :src="user.avatarLink" v-show="mode === 'EDIT'">
                <input class="form-control-file" v-on:change="getAvatarImage($event)" type="file">
                </div>
                </div>
                <p>{{user.id}}</p>
                <h3>{{user.name}}</h3>
                <p>Chức vụ: {{user.role.name}}</p>
                <router-link to="/changePassword">Đổi mật khẩu</router-link>
                <button @click="updateAvatar">Save</button>
            </div>
        </div>
    </body>
</template>
<script>
import axios from "axios";
    export default {
        name: "SeeAccountInformation",
        data(){
            return {
                user: this.$store.state.user,
                avatarImageFile: null,
            }
        },
        methods: {
            getAvatarImage(event){
                this.avatarImageFile = event.target.files[0];
                console.log(this.user);
            },
            updateAvatar() {
              let formData = new FormData();
              formData.append("user", new Blob([JSON.stringify(this.user)], {
                      type: "application/json"
                  }));
              formData.append("avatar", this.avatarImageFile);

              axios
                  .post("http://localhost:8000/creator/update/avatar", formData)
                  .then((response) => {
                    console.log(response)
                    this.saveSuccess = true
                    //goi req voi user id de lay lai user
                    //set user vao store.
                    // this.$store.commit("setUser", res.data);
                  });
              }
        }
        
       
            
        
    }
    
</script>
<style>
    .profile-page {
        width: 100%;
        padding-bottom: 30px;
        padding-top: 20px;
    }
    .profile-feature-wrapper {
        position: relative;
        padding-bottom: 20px;
        padding-top: 66px;
    }
    *, :after, :before{
        box-sizing: border-box;
    }
    .div{
        display: block;
    }
    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .profile-feature {
        background-color: yellow;
        border-radius: 4px;
        overflow: hidden;
        border-color: rgba(202, 204, 206, .8);
        border-style: solid;
        border-width: 1px;
    }
    .body{
        font-family: open sans;
        font-size: 14px;
        font-size: 1.4rem;
        line-height: 22px;
        line-height: 2.2rem;
        color: #111;
        font-weight: 400;
        background: rgba(227, 229, 232, .3);
    }
    .profile-cover {
        width: 100%;
        background-color: #fff;
        background-size: cover;
        position: relative;
    }
    .fourone-ratio .content{
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .img-in-ratio{
        background-size: 100% auto;
        background-position: inherit;
    }
    .profile-changer {
        color: #fff;
        z-index: 9;
        position: absolute;
        text-shadow: 0 0 4px #999;
        left: 0;
        padding: 10px;
        width: 100%;
        cursor: pointer;
    }
    .profile-nav{
        padding: 10px;
        position: relative;
    }
    .profile-ava-wrapper{
        position: absolute;
        bottom: 10px;
        left: 20px;
    }
    .profile-ava{
        width: 150px;
        height: 150px;
        overflow: hidden;
        box-shadow: 0 0 4px #333;
        background-color: #fff;
        border-radius: 100px;
        position: relative;
    }
    .profile-intro{
        padding-left: 180px;
        color: #fff;
    }
    .avatar_image{
        width: 150px;
        height: 150px;
        overflow: hidden;
        box-shadow: 0 0 4px #333;
        background-color: #fff;
        border-radius: 100px;
        position: relative;
    }
</style>