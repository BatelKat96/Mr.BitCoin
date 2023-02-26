<template >
  <header>
    <h1>Mr. <br />₿itCoin</h1>
    <p class="rate">
      The current rate:
      <br />
      <span v-if="currRate"> ₿{{ currRate }}</span>
    </p>
    <p v-if="currUser" class="header-p">
      Hi {{ currUser.name }}
      <span> <button @click="onLogout">Logout</button></span>
    </p>
  </header>
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
    this.$store.dispatch({ type: "setLogginUser" });
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
    async onLogout() {
      try {
        await this.$store.dispatch({ type: "logout" });
        // this.$router.push("/home");
      } catch (err) {
        showErrorMsg(`Logout failed`);
      }
    },
  },
};
</script>

<style lang="sass">
</style>
