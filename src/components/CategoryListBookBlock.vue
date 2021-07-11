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
<style scoped>
.category-list-book-block{
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid #000;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.column {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.category-list-book-block img{
   
}
.book-img{
    max-width: 150px;
    height: 130px;
    box-shadow: 5px 2px 10px #888888;
}
.column p{
    margin-top: 10px;
}
</style>