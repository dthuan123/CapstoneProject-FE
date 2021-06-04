import { createStore } from 'vuex'

export const store =  createStore({
    state() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            roleName: null
        }
    },
    mutations: {
        setRole(state, roleName) {
            state.roleName = roleName;
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




