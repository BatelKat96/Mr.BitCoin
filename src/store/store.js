import { createStore } from 'vuex'

import { userStore } from './user.store.js'
import { contactStore } from './contact.store.js'

export const store = createStore({
    strict: true,
    modules: {
        userStore,
        contactStore
    }
})

store.subscribe((cmd, state) => {
    console.log('**** Store state changed: ****')
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
    console.log('*******************************')
})

