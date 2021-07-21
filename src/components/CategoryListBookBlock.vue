<template>
    <main> 
        <div class="category-list-book-block">
            <img class="book-img" :src="book.imageLink">
            <div class="column">
                <router-link :to="'/books?id=' + book.id" style="font-size: 20px; ">{{book.name}}</router-link>
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
<style scoped>
.category-list-book-block{
    display: flex;
    border-bottom: 1px solid #000;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;
}

.column {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.category-list-book-block a{
   color: black;
}
.category-list-book-block a:hover{
    color: rgb(117, 5, 20);
}
.book-img{
    max-width: 100px;
    height: 150px;
    box-shadow: 5px 2px 10px #888888;
    object-fit: cover;
}
.column p{
    margin-top: 10px;
}
</style>