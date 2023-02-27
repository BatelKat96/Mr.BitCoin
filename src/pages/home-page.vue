<template>
  <section class="home-page-section">
    <div class="home-page-container">
      <h2>
        Welcome <span v-if="currUser">{{ currUser.name }}</span>
      </h2>
      <div v-if="currUser">
        <h3>Your balance</h3>
        <p>
          USD:<span class="value"> ${{ currUser.balance }}</span>
        </p>
        <p v-if="currUser">
          Bitcoin:
          <span class="value"> {{ currUser.balance * currRate }} BTC </span>
        </p>
      </div>
      <p>
        Current BTC USD:
        <br />
        <span v-if="currRate">$1 = {{ currRate }} BTC </span>
      </p>
    </div>
    <img src="../../public/bitcoin-icon.svg" alt="" srcset="" />
    <TansferList v-if="currUser" />
  </section>
</template>
<script>
import { bitcoinService } from "@/services/bitcoin.service.js";
import PriceHistoryChart from "../cmps/price-history-chart.vue";
import TansferList from "../cmps/tansfer-list.vue";

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
  components: {
    PriceHistoryChart,
    TansferList,
  },
};
</script>
