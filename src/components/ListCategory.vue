<template>
    <main class="app-main">
<<<<<<< HEAD
        <div class="main">
=======
        <div>
>>>>>>> a9c5fe1c073c2af1a081ca48b954262608bdc7bc
            <nav aria-label="breadcrumb" style="font-size: 15px;">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item active" aria-current="/category">Thể loại</li>
                </ol>
            </nav>
            <h1 style="width: 100%, text-align: left; font-size:30px;">Truyện</h1><br/>
            <ul class="list-group">
                <category-block
                    v-for="categoryHome in listCategoriess"
                    :key="categoryHome.id"
                    v-bind:category="categoryHome">
                </category-block>
            </ul>
        </div>
    </main>
</template>
<script>
import CategoryBlock from "@/components/CategoryBlock.vue";
import axios from "axios";
export default{
    name: "ListCategoryPage",
    components: {
        CategoryBlock,
    },
    data() {
        return {
            listCategoriess: [],
        };
    },
    created() {
        this.listCategories();
    },
    methods: {
        listCategories() {
            axios
                .get("http://localhost:8000/category-list")
                .then((response) => {
                    console.log(response.data);
                    this.listCategoriess = response.data
                });
        },
    },
};
</script>
<style scoped>
.main {
    width: 100%;
}
</style>