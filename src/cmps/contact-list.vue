<template>
  <section>
    <TransitionGroup name="list" tag="ul" class="contact-preview-list">
      <li
        class="contact-preview"
        v-for="contact in contacts"
        :key="contact._id"
      >
        <button
          @click="onRemoveContact(contact._id)"
          class="material-symbols-outlined btn-remove"
          title="Remove"
        >
          delete
        </button>

        <ContactPreview :contact="contact" />
        <div class="preview-actions">
          <RouterLink :to="`/contact/${contact._id}`">
            <button class="material-symbols-outlined" title="Details">
              info
            </button>
          </RouterLink>
          <RouterLink :to="`/contact/edit/${contact._id}`">
            <button class="material-symbols-outlined" title="Edit">Edit</button>
          </RouterLink>
        </div>
      </li>
    </TransitionGroup>
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
