<template>
  <div class="main-container">contact</div>
  <pre>{{ contacts }}</pre>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { eventBus } from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      contacts: null,
    };
  },
  async created() {
    this.contacts = await contactService.getContacts();
  },
  methods: {},
  computed: {},
  components: {},
};
</script>

<style lang="scss">
.main-container {
  position: relative;
}
</style>
