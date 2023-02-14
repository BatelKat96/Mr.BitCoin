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
import { contactService } from "@/services/contact.service.js";
import ContactList from "@/cmps/contact-list.vue";
import ContactFilter from "@/cmps/contact-filter.vue";

export default {
  data() {
    return {
      contacts: null,
      filterBy: {},
    };
  },
  async created() {
    this.loadContact();
  },
  methods: {
    async loadContact() {
      this.contacts = await contactService.query(this.filterBy);
    },
    async removeContact(contactId) {
      await contactService.remove(contactId);
      this.contacts = this.contacts.filter(
        (contact) => contact._id !== contactId
      );
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy;
      this.loadContact();
    },
  },
  computed: {},
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
