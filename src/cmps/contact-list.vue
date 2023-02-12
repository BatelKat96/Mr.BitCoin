<template>
  <section>
    <ul class="contact-preview-list">
      <li
        class="contact-preview"
        v-for="contact in contacts"
        :key="contact._id"
      >
        <ContactPreview :contact="contact" />
      </li>
    </ul>
    <!-- <pre>{{ contacts }}</pre> -->
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
  methods: {},
  components: {
    ContactPreview,
  },
};
</script>

<style>
.contact-preview {
  border: 2px solid aliceblue;
  margin: 10px;
  padding: 15px;
}

.contact-preview-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
}
</style>