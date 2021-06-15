<template>
<main>
    <div class="category-block">
        <div class="category-name">
            {{category.name}}
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
    .category-block {
        position: relative;
        height: 50px;
    }
    .category-name {
        width: 100%;
        text-align: left;
        color: blue;
        font-family: open sans;
        font-weight: 700;
        white-space: inherit;
    }
</style>