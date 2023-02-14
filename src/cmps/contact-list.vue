<template>
  <section>
    <ul class="contact-preview-list">
      <li
        class="contact-preview"
        v-for="contact in contacts"
        :key="contact._id"
      >
        <button
          class="clean-btn btn-remove"
          @click="onRemoveContact(contact._id)"
        >
          x
        </button>
        <ContactPreview :contact="contact" />
        <RouterLink :to="`/contact/${contact._id}`">
          <button>Details</button>
        </RouterLink>
        <RouterLink :to="`/contact/edit/${contact._id}`">
          <button>Edit</button>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script>
import ContactPreview from "@/cmps/contact-preview.vue";
export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onRemoveContact(contactId) {
      this.$emit("remove", contactId);
    },
  },
  components: {
    ContactPreview,
  },
};
</script>
