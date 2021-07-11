<template>
<main>
    <div class="list-group-item">     
        <font-awesome-icon icon="thumbs-up" size="20px"></font-awesome-icon> 
        <div class="category-name"> 
            <router-link :to="'/category?id=' + category.id">{{category.name}}</router-link>
            <div class="title-count">So luong: 100</div>
        </div>
    </div>
    </main>
</template>

<script>
    export default {
        name: "CategoryBlock",
        props: ["category"]
    }
</script>
<style scoped>
    .category-name {
        display: flex;
        justify-content: space-between;
        margin-top: auto;
        width: 100%;
        text-align: left;
        color: blue;
        font-family: open sans;
        font-weight: 700;
        white-space: inherit;
        font-size: 20px;
        padding-left: 10px;
    }
    .list-group-item{
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 10px;
        width: 50%;
    }
    .title-count{
        font-size: 13px;
    }
</style>