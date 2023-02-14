<template>
  <header>
    <h1>Mr. BitCoin</h1>
    <p v-if="currUser" class="header-p">
      {{ currUser.name }}
      <span> <button @click="onLogout">Logout</button></span>
      <br />
    </p>
    <p>
      The current rate:
      <span v-if="currRate">{{ currRate }}</span>
    </p>

    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/statistics">Statistics</RouterLink>
    </nav>
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
