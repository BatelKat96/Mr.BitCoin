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

<style>
.contact-preview-list {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
}
.contact-preview {
  border: 2px solid aliceblue;
  margin: 10px;
  padding: 15px;
  position: relative;
}
.btn-remove {
  position: absolute;
  right: 7px;
  top: 0px;
  color: aliceblue;
  font-size: 1.25em;
}
</style>