<template>
  <section>
    <h1>
      Welcome <span v-if="currUser">{{ currUser.name }}</span>
    </h1>
    <p v-if="currUser">Your balance today is: {{ currUser.balance }} Bitcoin</p>
    <p>
      The current Bitcoin exchange rate:
      <span v-if="currRate">{{ currRate }}</span>
    </p>
  </section>
</template>
<script>
import { bitcoinService } from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      currRate: null,
    };
  },
  created() {
    this.getRate();
  },
  computed: {
    currUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async getRate() {
      try {
        this.currRate = await bitcoinService.getRate();
      } catch (err) {
        console.log("Cant load rate");
      }
    },
  },
};
</script>
