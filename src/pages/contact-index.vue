<template>
  <div class="main-container">contact index</div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { eventBus } from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {},
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
