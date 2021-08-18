<template>
    <body>
            <div class="container">
                <div class="cover-images">
                    <img :src="coverLink" class="cover-image">
                </div>
                <div class="image-avatar">
                    <div class="choose-file  img-container">
                        
                            <img :src="avatarLink" class="avatar_image" @mouseover="showButton = true" @mouseleave="showButton = false" @click="$refs.file.click()">
                        
                        <div class="form-row">
                            <!-- <img class="cover-img" :src="avatarLink" v-show="mode === 'EDIT'" > -->
                            <input class="form-control-file" v-on:change="getAvatarImage($event)" ref="file" type="file" style="display: none">    
                        </div>
                    </div>
                <div class="lable-name">
                    <h2>{{user.name}}</h2>
                    <p>{{user.role.name}}</p>
                </div>
                
                </div>
            </div>
            <div class="footer">
                <router-link to="/changePassword">Đổi mật khẩu</router-link>
                <button v-show="avatarImageFile" class="c-btn btn btn-primary" @click="updateAvatar">Save</button>
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
                showButton: false,
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
                    .get("http://localhost:8000/reader/account/seeInfo", {
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
                  .post("http://localhost:8000/reader/update/avatar", formData)
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
.img-container {
    position: relative;
}

.open-file {
    position: absolute;
    top: -60px;
    left: 20px;
    width: 80px;
    height: 50px;
}
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
    border: 5px solid #fff;
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
    margin-left: 0px;
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

.footer {
    width: 80%;
    background-color: white;
    margin: 0 auto;
    padding: 10px;
    display:  flex;
    flex-direction: column;
}

.c-btn {
    width: 100px;
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