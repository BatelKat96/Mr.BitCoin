<template>
  <section class="home-page-section">
    <div class="home-page-container">
      <h2>
        Welcome <span v-if="currUser">{{ currUser.name }}</span>
      </h2>

      <p v-if="currUser">
        Your balance in dollars is ${{ currUser.balance }}
        <br />
        Your balance in Bitcoin is
        <span v-if="currRate">{{ currUser.balance * currRate }} BTC</span>
      </p>
      <br />
      <p>
        The exchange rate is
        <span v-if="currRate">{{ currRate }} </span>
      </p>
    </div>
  </section>
</template>
<script>
import { bitcoinService } from "@/services/bitcoin.service.js";
import PriceHistoryChart from "../cmps/price-history-chart.vue";

export default {
  components: { PriceHistoryChart },
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
