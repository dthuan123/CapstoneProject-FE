<template>
    <main>
        <div class="category-list-book-block">
            {{book.id}} {{book.name}}<br/>
            {{book.description}}
        </div>
    </main>
</template>

<script>
    export default {
        name: "CategoryListBookBlock",
        props: ["book"]
    }
</script>