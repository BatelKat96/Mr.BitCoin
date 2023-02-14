import { contactService } from "../services/contact.service"


export const contactStore = {
    state: {
        contacts: [],
    },

    getters: {
        contacts({ contacts }) {
            return contacts
        },
    },
    mutations: {
        setContacts(state, { contacts }) {
            // console.log('payload: ', payload)
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(p => p._id === contactId)
            state.contacts.splice(idx, 1)
        },
        addContact(state, { contact }) {
            state.contacts.push(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(p => p._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },

    },
    actions: {
        loadContacts({ commit }) {
            contactService.query()
                .then((contacts) => {
                    commit({ type: 'setContacts', contacts })
                })
        },
        async removeContact({ commit }, payload) {
            commit(payload)
            try {
                await contactService.remove(payload.contactId)
                commit({ type: 'removeContact' })
            } catch (err) {
                throw err
            }
        },
        saveContact({ commit }, { contact }) {
            const actionType = (contact._id) ? 'updateContact' : 'addContact'
            return contactService.save(contact)
                .then((savedContact) => {
                    commit({ type: actionType, contact: savedContact })
                    return savedContact
                })
        },
    }
}