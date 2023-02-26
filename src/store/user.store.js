import { userService } from "../services/user.service.js"

export const userStore = {
    state: {
        user: null,
        // user: userService.getLoggedinUser(),
    },
    getters: {
        user({ user }) {
            return user
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
        setUserBalance(state, { balance }) {
            state.user.balance = balance
        }
    },
    actions: {
        async setLogginUser({ commit }) {
            try {
                const user = await userService.getLoggedinUser()
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('Failed to set user', err)
                throw err
            }
            // return currUser
        },
        async signup({ commit }, { credentials }) {
            try {
                const user = await userService.signup(credentials)
                commit({ type: 'setUser', user })
                return user
            } catch (err) {
                console.log('Failed to set user', err)
                throw err
            }
        },
        async login({ commit }, { credentials }) {
            try {
                const user = await userService.login(credentials)
                commit({ type: 'setUser', user })
                return user
            } catch (err) {
                console.log('Failed to set user', err)
                throw err
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                const empty = null
                commit({ type: 'setUser', empty })
            } catch (err) {
                console.log('Failed to set user', err)
                throw err
            }
        },
        async deposit({ commit }, { amount, currContact }) {
            try {
                const balance = await userService.updateBalance(amount, currContact)
                commit({ type: 'setUserBalance', balance })
                return balance
            }
            catch (err) {
                console.log('Failed to set user', err)
                throw err
            }
        },

    }
}