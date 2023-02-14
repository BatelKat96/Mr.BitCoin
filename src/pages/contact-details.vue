<template>
  <div v-if="contact" class="contact-details-selection">
    <div class="contact-details-container">
      <div>
        <h2>{{ contact.name }}</h2>
        <p>Email: {{ contact.email }}</p>
        <p>Phone: {{ contact.phone }}</p>
      </div>
      <img :src="`https://robohash.org/${contact._id}.png`" />
    </div>
    <RouterLink to="/contact">
      <button>Back</button>
    </RouterLink>
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getById(contactId);
  },
};
</script>

<style lang="scss">
</style>
