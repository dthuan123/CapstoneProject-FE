<template>
    <title>{{category}}</title>
    <main> 
        <div class="category-list-book-block">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Panor%C3%A1mica_Oto%C3%B1o_Alc%C3%A1zar_de_Segovia.jpg">
            <h1>{{book.name}}</h1><br/>
            <p>{{book.description}}</p>
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
    margin-top: auto;
}
.category-list-book-block img{
    width: 20px;
    height: 25px;
}
</style>