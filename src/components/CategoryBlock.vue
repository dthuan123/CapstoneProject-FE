<template>
        <div class="category-name"> 
            <router-link :to="'/category?id=' + category.id">{{category.name}}</router-link>
        </div>
</template>

<script>
    export default {
        name: "CategoryBlock",
        props: ["category"]
    }
</script>
<style scoped>
    .category-name {
        display: grid;
        justify-content: space-between;
        width: 120px;
        color: #000;
        font-family: open sans;
        font-size: 15px;
        padding: 10px;
        border: 1px solid #ccd9d5;
    }
    .category-name a{
        color: black;
    }
    .category-name:hover{
        background-color: #80808a;
        transition: 0.3s ease;
    }
    /* .list-group-item{
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 10px;
        width: 50%;
    }
    .title-count{
        font-size: 13px;
    } */
</style>