import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/Home.vue";
import CreatorHome from "@/views/CreatorHome.vue";
import Login from "@/views/Login.vue";
import LoginError from "@/views/LoginError.vue";
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
import AdminReportView from "@/components/AdminReportView.vue";
import AdminReportResponse from "@/components/AdminReportResponse.vue";
import AdminBookList from "@/components/AdminBookList.vue";
import AdminBookView from "@/components/AdminBookView.vue";
import Register from "@/views/Register.vue";
import Bookinformation from "@/components/Bookinformation.vue";
import ReaderListMessage from "@/components/ReaderListMessage.vue";
import CreatorChapterEditor from "@/components/CreatorChapterEditor.vue"
import ChapterDetail from "@/components/ChapterDetail.vue"
import ListAllBook from "@/views/ListAllBook.vue"
import BookListByCreator from "@/components/BookListByCreator.vue"
import SeeAccountInformation from "@/components/SeeAccountInformation.vue"
import ChangePassword from "@/components/ChangePassword.vue"
import SearchResult from "@/views/SearchResult.vue"
import ReaderHistory from "@/components/ReaderHistory.vue";
import ReaderApply from "@/components/ReaderApply.vue";
import SeeOtherAccountInformation from "@/components/SeeOtherAccountInformation.vue";
import AdminCategories from "@/components/AdminCategories.vue";
import Introduce from "@/components/Introduce.vue";
import InstructionsForPostingNovels from "@/components/InstructionsForPostingNovels.vue";
import InstructionsForReportNovels from "@/components/InstructionsForReportNovels.vue"
import { store } from '../store/index.js'

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
        path: "/intro-reporting",
        component: InstructionsForReportNovels,
    },
    {
        path: "/introduce",
        component: Introduce,
    },
    {
        path: "/intro-posting",
        component: InstructionsForPostingNovels,
    },
    {
        path: "/list-all-book",
        component: ListAllBook,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/login-error",
        component: LoginError
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
        path: "/bookbycreator",
        component: BookListByCreator
    },
    {
        path: "/search-result",
        component: SearchResult
    },
    {
        path: "/account",
        component: SeeOtherAccountInformation,
        meta: { authorize: ['admin', 'reader', 'creator'] } ,
    },
    {
        path: "/accountInfor",
        component: SeeAccountInformation,
        meta: { authorize: ['admin', 'reader', 'creator'] } ,
    },
    {
        path: "/changePassword",
        component: ChangePassword,
        meta: { authorize: ['admin', 'reader', 'creator'] } ,
    },
    {
        path: "/books",
        component: Bookinformation
    },
    {
        path: "/admin",
        component: AdminHome,
        meta: { authorize: ['admin'] } ,
        children: [
            {
                path: "report-list",
                name: "AdminReportList",
                component: AdminReportList
            },
            {
                path: "report-view",
                name: "AdminReportView",
                component: AdminReportView
            },
            {
                path: "report-response",
                name: "AdminReportResponse",
                component: AdminReportResponse
            },
            {
                path: "user-list/:id",
                name: "AdminUserList",
                component: AdminUserList
            },
            {
                path: "user-edit",
                name: "UserEdit",
                component: AdminUserEdit
            },
            {
                path: "book-list/:id",
                name: "AdminBookList",
                component: AdminBookList
            }
            ,
            {
                path: "book-view",
                name: "AdminBookView",
                component: AdminBookView
            },
            {
              path: "categories",
              name: "AdminBookCate",
              component: AdminCategories
          }
        ]  
    },

    ///path cua guess
    {
        path: "/guest",   
    },
    {
        path: "/chapter",
        component: ChapterDetail
    },
    {
        path: "/creator",
        component: CreatorHome,
        meta: { authorize: ['creator'] } ,
        children: [
            {
                path: "get/books",
                component: CreatorBookList
            },
            {
                path: "create/book",
                name: "NewBook",
                component: CreatorBookNew
            },
            {
                path: "update/book",
                name: "EditBook",
                component: CreatorBookEdit
            },
            {
                path: "update/chapter",
                name: "EditChapter",
                component: CreatorChapterEditor
            },
            {
                path: "create/chapter",
                name: "CreateChapter",
                component: CreatorChapterEditor
            }
        ]
    },
    {
        path: "/reader/messages",
        component: ReaderListMessage,
        meta: { authorize: ['admin', 'reader', 'creator'] } ,
    },
    {
        path: "/reader/history",
        component: ReaderHistory,
        meta: { authorize: ['admin', 'reader', 'creator'] } ,
    },
    {
        path: "/reader/likes",
        component: ReaderHistory,
        meta: { authorize: ['admin', 'reader', 'creator'] } ,
    },
    {
        path: "/reader/apply",
        component: ReaderApply,
        meta: { authorize: ['admin', 'reader', 'creator'] } ,
    },
  
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => { 
    const user = store.state.user
    const { authorize } = to.meta;

    if(authorize) {
        console.log(user, authorize)
        if(!user) {
            return next({ path: '/login' })
        } else {
            if (authorize.includes(user.role.name)) {
                return next();
            } else {
                return next("error-permission")
            }
        }
    }
    return next();
     
})

export default router;