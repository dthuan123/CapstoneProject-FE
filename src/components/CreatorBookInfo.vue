<template>
    <div class="creator-book-form">
        <div class="form-row">
            <label class="label-attribute">Tiêu đề</label>
            <input type="text" v-model="book.name">
        </div>
        <div class="form-row">
            <label class="label-attribute">Ảnh bìa</label>
            <div class="column">
                <img class="cover-img" :src="book.imageLink" v-show="mode === 'EDIT'">
                <input v-on:change="getCoverImage($event)" type="file" style="display: none;" ref="inputImage">
                <input type="button" value="Chọn ảnh" @click="this.$refs['inputImage'].click()" />
            </div>
        </div>
        <div class="form-row">
            <label class="label-attribute">Tên tác giả</label>
            <div class="book-creator-name">
                <input type="radio" name="creator-name-mode" v-bind:value="true"  v-model="useCreatorName" checked>Dùng tên tác giả
                <input type="radio" name="creator-name-mode" v-bind:value="false" v-model="useCreatorName" >Dùng nghệ danh
                <div class="creator-container">
                    <div class="creator-name" v-show="useCreatorName">
                        <span>{{ creator.name }}</span>
                    </div>
                    <div class="alias-name" v-show="!useCreatorName">
                        <select v-model="selectedAliasId">
                            <option v-for="alias in aliases" :key="alias" v-bind:value="alias.id">
                                {{ alias.name }}
                            </option>
                        </select>
                        <button @click="showModal = true">Thêm mới</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-row">
            <label class="label-attribute">Thể loại</label><br>
            <div class="categories">
                <div v-for="category in categories" :key="category">
                    <input type="checkbox" :id="category.id" :value="category.id" v-model="checkedCategories" :checked="checkedCategories.includes(category.id)">
                    <label :for="category.id">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <div class="form-row">
            <label class="label-attribute">Tóm tắt</label><br>
            <textarea v-model="book.description"></textarea>
        </div>
        <button v-on:click="createBook">Tao moi</button>

        <div class="alias-modal-wrapper" v-if="showModal">
            <div class="alias-modal-container">
                <div class="modal-field">
                    <input type="text" class="form-control" placeholder="Alias name..." v-model="newAlias">
                </div>
                <div class="alert alert-danger" role="alert" v-show="aliasError">
                    Alias name already exists!
                </div>
                <div class="alert alert-success" role="alert" v-show="aliasSuccess">
                    Success!
                </div>

                <div class="modal-button">
                    <button class="btn btn-outline-secondary" @click="createAlias">Lưu</button>
                    <button class="btn btn-outline-secondary" @click="closeModal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    
    
   
</template>

<script>
import axios from "axios"

export default {
    name: "CreatorNewBook",
    props: ["mode", "editId"],
    data() {
        return {
            useCreatorName: true,
            aliases: [],
            selectedAliasId: null,
            categories: [],
            checkedCategories: [],
            coverImageFile: null,
            creator: {
                id: this.$store.state.user.id,
                name: this.$store.state.user.name
            },
            book: {
                name: "",
                creator: null,
                alias: null,
                categories: [],
                description: ""
            },
            showModal: false,
            newAlias: null,
            aliasError: false,
            aliasSuccess: false
        }
    },
    created () {
        
        this.getAliases();
        this.getCategories();
        if (this.mode === "EDIT") {
            this.getBook();  
            
        }
        
    },
    methods: {
        setBookCreator() {
            this.book.creator = this.creator;
            if (!this.useCreatorName) {
                this.book.alias = {
                    id: this.selectedAliasId
                };
            }
        },
        filterCategory() {
            
            this.book.categories = this.categories.filter(category => this.checkedCategories.includes(category.id))
        },
        createBook() {
            this.setBookCreator();
            this.filterCategory();
            
            let formData = new FormData();
            formData.append("book", new Blob([JSON.stringify(this.book)], {
                    type: "application/json"
                }));
            formData.append("coverImage", this.coverImageFile);

            axios
                .post("http://localhost:8000/creator/create/book", formData)
                .then((response) => console.log(response));
        },

        getBook() {
            axios
                .get("http://localhost:8000/creator/get/book", {
                    headers: {
                        bookId: this.editId
                    }
                })
                .then((response) => {
                    this.book = response.data
                    this.settingBookInfo();
                    
                });
        },

        settingBookInfo() {
            //check checkbox based on book categories
            this.book.categories.forEach((cate) => {
                this.checkedCategories.push(cate.id);
            })

            //show alias if used
            if(this.book.alias) {
                this.useCreatorName = false;
                this.selectedAliasId = this.book.alias.id;
            }

            //display cover image and image file name
            // if(this.book.imageLink) {

            // }
            
        },

        getAliases() {
            axios
                .get("http://localhost:8000/creator/get/aliases", {
                    headers: {
                        creatorId: this.creator.id
                    }
                })
                .then((response) => {
                    this.aliases = response.data
                });
        },

        createAlias() {
            let body = {
                name: this.newAlias,
                user: {
                    id: 2
                }
            }
            axios
                .post("http://localhost:8000/creator/create/alias", body)
                .then((res) => {
                    this.getAliases();
                    this.aliasSuccess = true;
                    this.aliasError = false
                })
                .catch((error) => {
                    this.aliasError = true;
                })
        },
        closeModal() {
            this.showModal = false;
            this.aliasSuccess = false;
            this.aliasError = false;
        },
        getCategories() {
            axios
                .get("http://localhost:8000/creator/get/categories")
                .then((response) => {
                    this.categories = response.data
                });
        },
        getCoverImage(event) {
            this.coverImageFile = event.target.files[0];
        },

        getAudio() {
            axios
                .get("http://localhost:8000/audio")
                .then((response) => {
                    this.book.categories = response.data
                });
        }
    }

}
</script>

<style>
@font-face {
    font-family: "OpenSans";
    src: url("../assets/fonts/OpenSans-Regular.ttf");
}

.creator-book-form {
    background-color: #fefefe; 
    padding: 1rem;
    color: #111;
    font-size: 1.4rem;
    font-family: OpenSans;
}
.form-row {
    display: flex;
    margin-bottom: 2rem;
    justify-content: flex-start;
}

.column {
    display: flex;
    flex-direction: column;
}

.label-attribute {
    width: 10rem;
    margin-right: 5rem;
}

.creator-container {
    padding: 2rem 0;
}

.cover-img {
    width: 50rem;
    height: auto;
    margin-bottom: 2rem;
}

.alias-name {
    display: flex;
    flex-direction: column;
}

.alias-modal-wrapper {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}


.alias-modal-container {
    display: flex;
    flex-direction: column;
    width: 50rem;
    height: 30rem;
    margin: 0 auto;
    padding: 3rem;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-field {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.modal-field > input {
    font-size: 2rem;
    padding: 2rem;
}

.modal-button {
    display: flex;
    justify-content: flex-end;
}

.modal-button > button {
    padding: 1rem;
    margin-left: 1rem;
}
</style>