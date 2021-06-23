<template>
<main>
    <div class="list-group-item" style="background-color: #CCFFFF;">
        <div class="category-name">
            <router-link :to="'/category?id=' + category.id">{{category.name}}</router-link>
            <div>So luong</div>
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
<style>
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
    }
    .list-group-item{
        display: flex
    }
</style>