import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/Home.vue";
import CreatorHome from "@/views/CreatorHome.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/home",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/creator",
        component: CreatorHome
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;