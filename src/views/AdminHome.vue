<template>
    <div class="admin-home" style="padding-top: 30px;">
        <div class="admin-home-left">
            <admin-vertical-navigation v-bind:menuList="menuList"></admin-vertical-navigation>
        </div>

        <div class="admin-home-right">
            <router-view></router-view>
        </div>
       
    </div>
</template>

<script>
import adminVerticalNavigation from '@/components/AdminVerticalNavigation.vue'

export default {
    components: {
        adminVerticalNavigation
    },
    data() {
        return {
            menuList: [
                {
                    id: 1,
                    name: "Quản lý báo cáo",
                    routeName: "/admin/report-list"
                },
                {
                    id: 2,
                    name: "Quản lý thành viên",
                    routeName: "/admin/user-list/-1"
                },
                {
                    id: 2,
                    name: "Quản lý truyện",
                    routeName: "/admin/book-list/0"
                }
            ]
        }
    }
}
</script>

<style>
.admin-home {
    display: flex;
    justify-content: space-between;
    padding: 0 16rem 0 16rem;
    min-height: 100vh;
    background-color: #f6f7f8;
}

.admin-home-left {
    width: 15%;
}

.admin-home-right {
    width: 80%;
}
</style>