<template>
    <title>{{category}}</title>
    <main> 
        <div class="category-list-book-block">
            <img class="book-img" src="https://upload.wikimedia.org/wikipedia/commons/4/40/Panor%C3%A1mica_Oto%C3%B1o_Alc%C3%A1zar_de_Segovia.jpg">
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