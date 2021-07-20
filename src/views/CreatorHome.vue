<template>
    <div v-if="user.role.id === 2 && user.approved">
        <div class="creator-home" >
            <div class="creator-home-left">
                <creator-vertical-navigation v-bind:menuList="menuList"></creator-vertical-navigation>
            </div>

            <div class="creator-home-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <div class="c-error" v-else-if="!user.enabled">
        Tài khoản của bạn hiện tại đang bị cấm do vi phạm điều lệ của hệ thống.
    </div>
    <div v-else class="c-error">
        Bạn đã đăng kí làm tác giả thành công, vui lòng đợi quản trị viên duyệt.
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
                    routeName: "/creator/get/books"
                },
                {
                    id: 2,
                    name: "Viết mới",
                    routeName: "/creator/create/book"
                }
            ],
            user: this.$store.state.user
        }
    },
    created() {
        console.log(this.user);
    }
}
</script>

<style scoped>
.creator-home {
    display: flex;
    justify-content: space-between;
    padding: 4rem 16rem 0 16rem;
    min-height: 50rem;
    background-color: #f6f7f8;
}

.creator-home-left {
    width: 15%;
}

.creator-home-right {
    width: 80%;
}

.c-error {
    max-width: 1200px;
    margin: 40px auto;
    height: 100vh;
    font-size: 30px;
}
</style>