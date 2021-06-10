import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/Home.vue";
import CreatorHome from "@/views/CreatorHome.vue";
import Login from "@/views/Login.vue";
import ErrorPermission from "@/views/ErrorPermission.vue";
import CreatorBookList from "@/components/CreatorBookList.vue";
import CreatorBookEdit from "@/components/CreatorBookEdit.vue";
import CreatorBookNew from "@/components/CreatorBookNew.vue";
// import { store } from "@/store"

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
        path: "/login",
        component: Login,
    },
    {
        path: "/error-permission",
        component: ErrorPermission
    },
    {
        path: "/creator",
        component: CreatorHome,
        // meta: {
        //     roles: ['creator']
        // },
        children: [
            {
                path: "book-list",
                component: CreatorBookList
            },
            {
                path: "book-new",
                name: "BookNew",
                component: CreatorBookNew
            },
            {
                path: "book-edit",
                name: "BookEdit",
                component: CreatorBookEdit
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// router.beforeEach((to, from, next) => { 
//     const user = store.state.user
//     let isRole = true;
//     if(to.meta.roles) {
//         if(!to.meta.roles.includes(user.roleName)) {
//             isRole = false;
//         }
//     }
//     if (isRole) {
//         next();
//     } else {
//         next("error-permission")
//     }
     
// })

export default router;