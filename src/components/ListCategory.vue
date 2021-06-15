<template>
    <main class="app-main">
        <div main-right>
            <category-block
                v-for="categoryHome in listCategories"
                :key="categoryHome.id"
                v-bind:category="categoryHome">
            </category-block>
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
            listCategories: [],
        };
    },
    create() {
        this.listCategories();
    },
    methods: {
        listCategories() {
            axios
                .get("http://localhost:8000/category-list")
                .then((response) => {this.listCategories = response.data});
        },
    },
};
</script>