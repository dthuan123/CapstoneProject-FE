import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export const store =  createStore({
    plugins: [createPersistedState()],
    state() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            bookId: null,
            chapterId: null
        }
    },
    mutations: {
        setBookId(state, bookId) {
            state.bookId = bookId;
        },
        setChapterId(state, chapterId) {
            state.chapterId = chapterId;
        },
        setUser(state, user) {
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user;
        },
        removeUser(state) {
            localStorage.clear();
            state.user = null;
        }
    },
    actions: {
        
    }
})




