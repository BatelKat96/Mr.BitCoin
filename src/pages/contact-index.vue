<template>
  <div class="main-container">
    <h2>Your contacts</h2>
    <ContactList v-if="contacts" @remove="removeContact" :contacts="contacts" />
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import ContactList from "@/cmps/contact-list.vue";

export default {
  data() {
    return {
      contacts: null,
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
  },
  computed: {},
  components: {
    ContactList,
  },
};
</script>

<style lang="scss">
.main-container {
  position: relative;
}
</style>
