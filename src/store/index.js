import { createStore } from 'vuex'

export const store =  createStore({
    state() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            bookId: null
        }
    },
    mutations: {
        setBookId(state, bookId) {
            state.bookId = bookId;
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




