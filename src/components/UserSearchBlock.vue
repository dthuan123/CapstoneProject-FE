<template>
    
        <div>
            <!-- <router-link :to="'/bookbycreator?creatorId=' + book.creator.id">{{ user.name }}<router-link> -->
                <p>{{ user.name }}</p>
        </div>
    
</template>
<script>
    export default {
        name: "UserSearchBlock",
        props: ["user"],
        data(){
            return {
                creator: {
                    id: null,
                }
            }
        }
    }
</script>