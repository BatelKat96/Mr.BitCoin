<template>
  <div v-if="car" class="car-details">
    contact details
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
  async created() {},
};
</script>

<style lang="scss"></style>
