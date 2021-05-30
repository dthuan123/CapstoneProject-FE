<template>
    <div class="main-container">
        <app-header></app-header>
        <header-banner></header-banner>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
import HeaderBanner from "./components/HeaderBanner.vue";

export default {
    name: "App",
    components: {
        AppHeader,
        AppFooter,
        HeaderBanner,
    },
};
</script>
<style>
body {
    background-color: #f6f7f8;
}
</style>
