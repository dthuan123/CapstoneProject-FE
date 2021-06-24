<template>
    <main>
        <div>
            <img class="book-img" src="books.imageLink">
            <div class="column">
                <h1>{{books.name}}</h1>
                <p>{{books.description}}</p>
            </div>
        </div>
    </main>
</template>

<script>
    export default{
        name: "BookInformationBlock",
        props: ["books"]
    }
</script>
<style>
    .column{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
</style>