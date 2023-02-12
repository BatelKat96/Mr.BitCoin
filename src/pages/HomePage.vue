<template>
  <h1>
    Welcome <span>{{ user.name }}</span>
  </h1>
  <p>Your balance today is: {{ user.balance }} Bitcoin</p>
  <p>
    The current Bitcoin exchange rate:
    <span v-if="currRate">{{ currRate }}</span>
  </p>
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
