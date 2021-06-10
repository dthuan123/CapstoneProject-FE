<template>
    <div class="creator-home">
        <div class="creator-home-left">
            <creator-vertical-navigation v-bind:menuList="menuList"></creator-vertical-navigation>
        </div>

        <div class="creator-home-right">
            <router-view></router-view>
        </div>
       
    </div>
</template>

<script>
import CreatorVerticalNavigation from '@/components/CreatorVerticalNavigation.vue'

export default {
    components: {
        CreatorVerticalNavigation
    },
    data() {
        return {
            menuList: [
                {
                    id: 1,
                    name: "Danh sách tác phẩm",
                    routeName: "/creator/book-list"
                },
                {
                    id: 2,
                    name: "Viết mới",
                    routeName: "/creator/book-new"
                }
            ]
        }
    }
}
</script>

<style>
.creator-home {
    display: flex;
    justify-content: space-between;
    padding: 0 16rem 0 16rem;
    min-height: 50rem;
    background-color: #f6f7f8;
}

.creator-home-left {
    width: 15%;
}

.creator-home-right {
    width: 80%;
}
</style>