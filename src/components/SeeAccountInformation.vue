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
       
            <div class="container">
                <div class="cover-images">
                    <img src="https://i.pinimg.com/564x/48/3e/c5/483ec56eeacf4db4aab03eff76a6a5c1.jpg">
                </div>
                <div class="image-avatar">
                    <div class="choose-file">
                        <img :src="avatarLink" class="avatar_image">
                        <div class="form-row">
                            <img class="cover-img" :src="avatarLink" v-show="mode === 'EDIT'">
                            <input class="form-control-file" v-on:change="getAvatarImage($event)" type="file">    
                        </div>
                    </div>
                <div class="lable-name">
                    <h2>{{user.name}}</h2>
                    <p>{{user.role.name}}</p>
                </div>
                </div>
            </div>
                <router-link to="/changePassword">Đổi mật khẩu</router-link>
                <button @click="updateAvatar">Save</button>
      
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
        computed: {
          avatarLink(){
            return  this.$store.state.user.avatarLink;
          },
        },
        created(){
            this.getUser();
        },
        methods: {
            getAvatarImage(event){
                this.avatarImageFile = event.target.files[0];
                console.log(this.user);
            },
            getUser() {
                axios
                    .get("http://localhost:8000/creator/account/seeInfo", {
                        headers: {
                            userId: this.user.id
                        }
                    })
                    .then((response) => {
                      // this.user = response.data;
                      this.$store.commit("setUser", response.data);
                    })
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
                    alert("upload anh thanh cong")
                    // goi req voi user id de lay lai user
                    // set user vao store.
                    this.getUser();
                    
                  });
              }
        }
        
       
            
        
    }
    
</script>
<style scoped>
    .image-avatar{
        flex-direction: row;
        display: flex;
        position: absolute;
        bottom: 0;
        padding-bottom: 20px;
    }
    .image-avatar img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .cover-images{
        
    }
    .cover-images img{
        width: 100%;
        
    }
    .lable-name{
         align-self: flex-end;
         padding-bottom: 15px;
         margin-left: 0px;
    }
    .lable-name h{
        font-weight: bold;
        margion-left: 0px;
    }
    .lable-name p{
        padding: 5px 20px;
        border: 1px solid #000;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background-color: green;
        margin-left: 10px;
    }
    .choose-file{
        position: relative;

    }
    .form-row{
        position: absolute;
        bottom: 0;
        
    }
    .container{
        text-align: center;
        margin-top: 30px;
        padding-bottom: 100px;
        background-color: white;
        position: relative;
        width: 80%;
    }
    

    /* .body{
        font-family: open sans;
        font-size: 14px;
        font-size: 1.4rem;
        line-height: 22px;
        line-height: 2.2rem;
        color: #111;
        font-weight: 400;
        background: rgba(227, 229, 232, .3);
    } */
</style>