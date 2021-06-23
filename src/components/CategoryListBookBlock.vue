<template>
    <span>{{category}}</span>
    <main> 
        <div class="category-list-book-block">
            <img class="book-img" :src="book.imageLink">
            <div class="column">
                <h1>{{book.name}}</h1>
                <p>{{book.description}}</p>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: "CategoryListBookBlock",
        props: ["book"]
    }
</script>
<style>
.category-list-book-block{
    display: flex;
    margin-bottom: 10px;
}

.column {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.category-list-book-block img{
    width: 80px;
    height: 130px;
}
</style>