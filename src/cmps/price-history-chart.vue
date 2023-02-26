<template>
  <div class="chart-container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { bitcoinService } from "@/services/bitcoin.service.js";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: null,
    };
  },
  async mounted() {
    this.loaded = false;

    try {
      const priceHistory = await bitcoinService.getMarketPriceHistory();
      this.chartData = priceHistory;

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
