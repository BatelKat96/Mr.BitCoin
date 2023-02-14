<template>
  <div v-if="contact" class="contact-edit-selection">
    <h1>{{ getTitle }}</h1>
    <div class="contact-edit-container">
      <form @submit.prevent="onSave" v-if="contact">
        <input
          type="text"
          v-model="contact.name"
          placeholder="Enter contact name..."
        />
        <input
          type="text"
          v-model="contact.email"
          placeholder="Enter contact email..."
        />
        <input
          type="text"
          v-model.number="contact.phone"
          placeholder="Enter contact phone..."
        />
        <button class="btn-save">Save</button>
      </form>
      <img
        v-if="contact._id"
        :src="'https://robohash.org/' + contact._id"
        alt=""
      />
    </div>
    <RouterLink to="/contact">
      <button class="btn-back">Back</button>
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
    if (contactId) {
      this.contact = await contactService.getById(contactId);
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    async onSave() {
      await contactService.save(this.contact);
      this.$router.push("/contact");
    },
  },
  computed: {
    getTitle() {
      return (this.contact._id ? "Edit" : "Add") + " Contact";
    },
  },
};
</script>

<style lang="scss"></style>
