<template>
    <header class="app-header">
        <nav class="header-container">
            <ul class="header-left menu-item-container">
                <li>
                    <router-link to="/home">Logo</router-link>
                </li>
                <li>
                    <router-link to="">Sáng tác</router-link>
                </li>
                <li>
                    <router-link to="">Danh sách</router-link>
                </li>
                <li>
                    <router-link to="">Hướng dẫn</router-link>
                </li>
            </ul>
            <div class="header-right">
                <form class="header-search-form">
                    <input
                        class="form-search-field"
                        type="search"
                        placeholder="Tìm kiếm"
                        aria-label="Search"
                    />
                    <button class="form-search-button" type="submit">
                        <font-awesome-icon icon="search"></font-awesome-icon>
                    </button>
                </form>
                <ul v-show="!user.role_id" class="menu-item-container">
                    <li>
                        <router-link to="/login">Đăng nhập</router-link>
                    </li>
                    <li>
                        <router-link to="/register">Đăng kí</router-link>
                    </li>
                </ul>
                <div class="user-navigation">
                    <div class="user-profile-image" v-on:click="toggleUserMenu">
                        <img src="https://i.stack.imgur.com/1cSi4.png" />
                    </div>
                    <ul v-if="showUserMenu" class="user-menu">
                        <li>
                            <router-link to="">Tài khoản</router-link>
                        </li>
                        <li>
                            <router-link to="">Lịch sử</router-link>
                        </li>
                        <li>
                            <router-link to="">Kệ sách</router-link>
                        </li>
                        <li v-show="user.role_id != 1">
                            <router-link v-show="user.role_id == 2" to="/creator">Hệ thống</router-link>
                            <router-link v-show="user.role_id == 3" to="/admin">Hệ thống</router-link>
                        </li>
                        <li>
                            <router-link to="">Thoát</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    data() {
        return {
            user: {
                role_id: 2,
            },
            showUserMenu: false,
        };
    },
    methods: {
        toggleUserMenu: function () {
            this.showUserMenu = !this.showUserMenu;
        },
    },
};
</script>

<style scoped>
@font-face {
    font-family: "OpenSans";
    src: url("../assets/fonts/OpenSans-Regular.ttf");
}

.app-header {
    height: 4.6rem;
    color: #111;
    font-size: 1.4rem;
    font-weight: 700;
    font-family: OpenSans;
    padding: 0 16rem 0 16rem;
}

.header-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
}

.menu-item-container {
    display: flex;
    align-items: center;
}

.menu-item-container li {
    padding: 0 1rem 0 1rem;
}

.header-right {
    width: 30%;
    justify-content: space-between;
    display: flex;
}

.header-search-form {
    position: relative;
    width: 20rem;
    display: flex;
    align-items: center;
}

.form-search-field {
    width: 100%;
    height: 3rem;
    border-radius: 3rem;
    border: none;
    padding-right: 5rem;
    padding-left: 2rem;
    background-color: #e0e0e0;
    vertical-align: baseline;
}

.form-search-button {
    position: absolute;
    right: 1rem;
    top: 8px;
    border: none;
    background-color: transparent;
    height: 3rem;
    width: 4rem;
}

.app-header a {
    color: inherit;
}

.user-navigation {
    position: relative;
    display: flex;
    align-items: center;
}

.user-profile-image {
    width: 3rem;
    height: 3rem;
}

.user-profile-image img {
    width: 100%;
    height: 100%;
    border-radius: 3rem;
}

.user-menu {
    position: absolute;
    top: 4.6rem;
    right: 0;
    width: 15rem;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.user-menu li {
    padding: 1rem;
    cursor: pointer;
}
</style>