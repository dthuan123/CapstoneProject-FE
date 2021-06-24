import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/Home.vue";
import CreatorHome from "@/views/CreatorHome.vue";
import Login from "@/views/Login.vue";
import ErrorPermission from "@/views/ErrorPermission.vue";
import CreatorBookList from "@/components/CreatorBookList.vue";
import CreatorBookEdit from "@/components/CreatorBookEdit.vue";
import CreatorBookNew from "@/components/CreatorBookNew.vue";
import ListCategory from "@/components/ListCategory";
import CategoryListBook from "@/components/CategoryListBook.vue";
import AdminHome from "@/views/AdminHome.vue";
import AdminUserList from "@/components/AdminUserList.vue";
import AdminUserEdit from "@/components/AdminUserEdit.vue";
import AdminReportList from "@/components/AdminReportList.vue";
import Register from "@/views/Register.vue";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/home",
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
        path: "/list-category",
        component: ListCategory,
    },
    {
        path: "/category",
        component: CategoryListBook
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/admin",
        component: AdminHome,
        children: [
            {
                path: "report-list",
                component: AdminReportList
            },
            {
                path: "user-list",
                component: AdminUserList
            },
            {
                path: "user-edit",
                name: "UserEdit",
                component: AdminUserEdit
            },
            {
                path: "book-list",
                name: "BookEdit",
                component: CreatorBookEdit
            }
        ]

     










        
    },

    ///path cua guess
    {
        path: "/guest",

     










        
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
    },
    {
        path: "/reader",
        





























    },
  
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