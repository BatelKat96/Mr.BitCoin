import { contactService } from "../services/contact.service"


export const contactStore = {
    state: {
        contacts: [],
        // lastRemovedContact: null
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
            state.contacts.unshift(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(p => p._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },

    },
    actions: {
        async loadContacts({ commit }, { filterBy }) {
            try {
                const contacts = await contactService.query(filterBy)
                commit({ type: 'setContacts', contacts })
            } catch (err) {
                throw err
            }
        },
        async removeContact({ commit }, payload) {
            try {
                await contactService.remove(payload.contactId4)
                commit(payload)
            } catch (err) {
                throw err
            }
        },
        async saveContact({ commit }, { contact }) {
            const actionType = (contact._id) ? 'updateContact' : 'addContact'
            try {
                const savedContact = await contactService.save(contact)
                commit({ type: actionType, contact: savedContact })
                return savedContact
            } catch (err) {
                throw err
            }
        }
    }
}