<template>
  <section class="statistics-section">
    <h2>Statistics</h2>
    <PriceHistoryChart />

    <AvgChart />
  </section>
</template>

<script>
import PriceHistoryChart from "../cmps/price-history-chart.vue";
import AvgChart from "../cmps/avg-chart.vue";

export default {
  components: {
    PriceHistoryChart,
    AvgChart,
  },
};
</script>

<style>
</style>
