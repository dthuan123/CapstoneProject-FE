import { createStore } from 'vuex'

export const store =  createStore({
    state() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            roleName: null,
            bookId: null
        }
    },
    mutations: {
        setRole(state, roleName) {
            state.roleName = roleName;
        },
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

    },
    getters: {
        getUser: state => {
            return state.user;
        }
    }
})




