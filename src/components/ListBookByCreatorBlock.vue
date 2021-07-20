<template>
    <main> 
        <div class="creator-list-book-block">
         <img class="book-img" :src="book.imageLink">
            <div class="column">
                <router-link :to="'/books?id=' + book.id" class="book-name">{{book.name}}</router-link>
                <div class="cate">
                    <span class="book-label">Thể loại: </span>
                    <span v-for="category in book.categories"
                    :key="category">
                        {{category.name + ' '}} 
                        </span>
                </div>
                <br/>
                <p>{{book.description}}</p>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: "ListBookByCreatorBlock",
        props: ["book"]
    }
</script>
<style scoped>
.creator-list-book-block{
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
    width: 80px;
    height: 130px;
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
.cate{
    
}
.book-label{
    color: #111;
    font-size: 14px;
}
.book-name{
    font-size: 26px;
    margin-bottom: 15px;
}
</style>