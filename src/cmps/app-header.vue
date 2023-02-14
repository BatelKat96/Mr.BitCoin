<template >
  <header class="main-container">
    <div class="header-container">
      <div class="nav-container">
        <h1>Mr. <br />BitCoin</h1>

        <nav>
          <RouterLink to="/home">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/statistics">Statistics</RouterLink>
          <RouterLink v-if="!currUser" to="/"> Login</RouterLink>
        </nav>
      </div>
      <p class="rate">
        The current rate:
        <br />
        <span v-if="currRate">{{ currRate }}</span>
      </p>
      <p v-if="currUser" class="header-p">
        Hi {{ currUser.name }}
        <!-- <br /> -->
        <span> <button @click="onLogout">Logout</button></span>
      </p>
    </div>
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
