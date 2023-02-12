<template>
  <div class="main-container">
    <h2>Your contacts</h2>
    <ContactFilter @filter="onSetFilterBy" />
    <ContactList
      v-if="contacts"
      @remove="removeContact"
      :contacts="filteredContact"
    />
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
    this.contacts = await contactService.getContacts();
  },
  methods: {
    async removeContact(contactId) {
      await contactService.deleteContact(contactId);
      this.contacts = this.contacts.filter(
        (contact) => contact._id !== contactId
      );
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    filteredContact() {
      const regex = new RegExp(this.filterBy.txt, "i");
      return this.contacts.filter((contact) => regex.test(contact.name));
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
