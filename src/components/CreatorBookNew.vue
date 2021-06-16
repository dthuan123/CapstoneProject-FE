<template>
    <div class="creator-book-form">
        <div class="form-row">
            <label class="label-attribute">Tiêu đề</label>
            <input type="text" v-model="book.name">
        </div>
        <div class="form-row">
            <label class="label-attribute">Ảnh bìa</label>
            <input v-on:change="getCoverImage($event)" type="file">
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
                <div v-for="category in book.categories" :key="category">
                    <input type="checkbox" :id="category.id" :value="category.id" v-model="checkedCategories">
                    <label :for="category.id">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <div class="form-row">
            <label class="label-attribute">Tóm tắt</label><br>
            <textarea v-model="book.description"></textarea>
        </div>
        
    </div>
    <button v-on:click="createBook">Tao moi</button>
    <button v-on:click="print">Print</button>

    <div class="alias-modal-wrapper" v-if="showModal">
        <div class="alias-modal-container">
            <label>Tên</label>
            <input type="text" v-model="newAlias">
            <button @click="createAlias">Lưu</button>
            <button @click="showModal = false">Hủy</button>
        </div>
    </div>
   
</template>

<script>
import axios from "axios"

export default {
    name: "CreatorNewBook",
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
            newAlias: null
        }
    },
    created() {
        this.getAliases();
        this.getCategories();
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
            this.book.categories = this.book.categories.filter(category => this.checkedCategories.includes(category.id))
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
                .post("http://localhost:8000/creator/create-book", formData)
                .then((response) => console.log(response));
        },

        getAliases() {
            axios
                .get("http://localhost:8000/creator/aliases", {
                    headers: {
                        creatorId: this.creator.id
                    }
                })
                .then((response) => {
                    this.aliases = response.data
                });
        },

        addAlias() {
            let body = {
                name: this.newAlias,
                user: {
                    id: this.creator.id
                }
            }
            axios
                .post("http://localhost:8000/creator/create-alias", body)
                .then((res) => {
                    
                })
        },
        getCategories() {
            axios
                .get("http://localhost:8000/creator/categories")
                .then((response) => {
                    this.book.categories = response.data
                });
        },
        getCoverImage(event) {
            this.coverImageFile = event.target.files[0];
        },

        print() {
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
    color: #111;
    font-size: 1.4rem;
    font-family: OpenSans;
}
.form-row {
    display: flex;
    margin-bottom: 2rem;
    justify-content: flex-start;
}

.label-attribute {
    width: 10rem;
    margin-right: 5rem;
}

.creator-container {
    padding: 2rem 0;
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
    width: 300px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}
</style>