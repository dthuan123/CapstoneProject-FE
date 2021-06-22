<template>
    <ul class="vertical-navigation">
        <li 
            v-for="menu in menuList" 
            :key="menu.id"
        >
            <router-link :to="menu.routeName">{{ menu.name }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "VerticalNavigation",
    props: ["menuList"],
};
</script>

<style>
.vertical-navigation {
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 1.4rem;
    font-weight: 700;
    font-family: OpenSans;
}

.vertical-navigation li {   
    padding: 1rem;
}
.vertical-navigation li a {
    color: #111;
}

</style>