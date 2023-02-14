
import { userStore } from './user.store.js'
import { contactStore } from './contact.store.js'

export const myStore = Vuex.createStore({
    strict: true,
    modules: {
        userStore,
        contactStore
    }
})

myStore.subscribe((cmd, state) => {
    console.log('**** Store state changed: ****')
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
    console.log('*******************************')
})

