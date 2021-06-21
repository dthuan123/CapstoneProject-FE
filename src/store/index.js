import { createStore } from 'vuex'

export const store =  createStore({
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

    }
})




