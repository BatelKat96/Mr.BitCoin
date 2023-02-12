<template>
  <header>
    <h1>Mr. BitCoin</h1>
    <p class="header-p">
      {{ user.name }}
      <br />
      The current rate:
      <span v-if="currRate">{{ currRate }}</span>
    </p>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/statistics">Statistics</RouterLink>
    </nav>
  </header>
</template>

<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      user: null,
      currRate: null,
    };
  },
  async created() {
    this.user = userService.getUser();
    this.currRate = await bitcoinService.getRate();
  },
};
</script>

<style lang="sass">
</style>
