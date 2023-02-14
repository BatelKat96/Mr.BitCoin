<template>
  <div class="main-container">
    <h2>Your contacts</h2>
    <ContactFilter @filter="onSetFilterBy" />
    <RouterLink class="add-link" to="/contact/edit"
      ><button class="primary">Add a Contact</button></RouterLink
    >
    <ContactList v-if="contacts" @remove="removeContact" :contacts="contacts" />
  </div>
</template>

<script>
// import { contactService } from "@/services/contact.service.js";
import ContactList from "@/cmps/contact-list.vue";
import ContactFilter from "@/cmps/contact-filter.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export default {
  async created() {
    this.loadContact();
  },
  methods: {
    async loadContact() {
      this.$store.dispatch({ type: "loadContacts" });
    },
    async removeContact(contactId) {
      try {
        await this.$store.dispatch({ type: "removeContact", contactId });
        showSuccessMsg(`Contact ${contactId} removed`);
      } catch (err) {
        showErrorMsg(`Remove contact ${contactId} failed`);
      }
    },
    onSetFilterBy(filterBy) {
      this.$store.dispatch({ type: "loadContacts", filterBy });
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
  },
  components: {
    ContactList,
    ContactFilter,
  },
};
</script>

<style lang="scss">
.main-container {
  position: relative;
}
</style>
