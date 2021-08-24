<template>

    <div class="reader-apply">
        <form class="apply-form" v-if="user.role.id === 1" v-on:submit.prevent >
            <h3>Đăng kí làm người viết truyện</h3>
            <div class="form-group c-row">
                <label for="card">Chứng minh nhân dân</label><br>
                <input type="radio" :value="true" v-model="is9digit"> 9 số
                <input type="radio" :value="false" v-model="is9digit"> 12 số
                <input type="number" v-model="card" class="form-control" placeholder="Nhập chứng minh nhân dân" id="card" required>
            </div>
            <div class="form-group c-row">
                <label for="front" >Ảnh chứng minh nhân dân mặt trước</label>
                <input type="file" class="form-control" id="front"  v-on:change="getFrontImage($event)" required>
            </div>
            <div class="form-group c-row">
                <label class="form-check-label" for="back">Ảnh chứng minh nhân dân mặt sau</label>
                <input type="file" class="form-control" id="back" v-on:change="getBackImage($event)" required>
            </div>
            <div class="alert alert-danger" role="alert" v-show="error">
                Chứng minh nhân dân bạn nhập đã tồn tại.
            </div>
             <div class="alert alert-danger" role="alert" v-show="!validIdentityCard">
                Chứng minh nhân dân bạn nhập không đúng định dạng.
            </div>
            <div class="alert alert-success" role="alert" v-show="saveSuccess">
                Bạn đã đăng kí thành công, xin vui lòng chờ quản trị viên duyệt.
            </div>
            <button @click="apply" class="btn btn-primary c-btn">Đăng kí</button>
        </form>
        <div v-else>
            Bạn đã đăng kí thành công, xin vui lòng chờ admin duyệt.
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ReaderApply",
    data() {
        return {
            card: null,
            frontImage: null,
            backImage: null,
            saveSuccess: false,
            error: false,
            user: this.$store.state.user,
            is9digit: true,
            validIdentityCard: true
        }
    },
    created() {
    },
    methods: {
        apply(event) {
            this.error = false;
            this.saveSuccess = false;
            this.validIdentityCard = true;
            if(!this.card || !this.frontImage || !this.backImage) {
                return;
            }
            if (this.is9digit) {
                if(this.card.length != 9) {
                    this.validIdentityCard = false;
                    return;
                }
            } else {
                if(this.card.length != 12) {
                    this.validIdentityCard = false;
                    return;
                }
            }
            this.validIdentityCard = true;
            let formData = new FormData();
            formData.append("card", new Blob([JSON.stringify(this.card)], {
                    type: "application/json"
                }));
            formData.append("userId", new Blob([JSON.stringify(this.user.id)], {
                    type: "application/json"
                }));
            formData.append("front", this.frontImage);
            formData.append("back", this.backImage);

            axios
                .post("reader/apply", formData)
                .then((response) => {
                    if(response.status === 200) {
                        this.saveSuccess = true;
                        this.error = false;
                        this.getUser();
                    }
                })
                .catch(err => {
                    this.error = true;
                    this.saveSuccess = false;
                })
        },
        getFrontImage(event) {
            this.frontImage = event.target.files[0];
        },
        getBackImage(event) {
            this.backImage = event.target.files[0];
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
    }
}
</script>

<style scoped>
.reader-apply {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
}

.apply-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 700px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 20px;
    background-color: #fff;
}
.c-row {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.c-row label {
    margin-bottom: 10px;
}

.c-row input {
    padding: 10px;
    font-size: 14px;
}

.c-btn {
    margin-top: 20px;
    padding: 10px;
}
</style>