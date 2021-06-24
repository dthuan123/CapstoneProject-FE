<template>
    
        <div>
            <img class="book-img" :src="book.imageLink">
            <div class="column">
                <h1>{{book.name}}</h1>
                <p>{{book.description}}</p>
            </div>
        </div>
    
</template>

<script>
    export default{
        name: "BookInformationBlock",
        props: ["book"]
    }
</script>
<style>
    .column{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
</style>