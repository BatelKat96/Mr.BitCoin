<template>
  <div class="chart-container">
    <Line v-if="avgs" :options="chartOptions" :data="getChartData" />
  </div>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service.js";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      avgs: null,
      chartOptions: {
        responsive: true,
      },
    };
  },
  async created() {
    this.avgs = await bitcoinService.getAvgBlockSize();
  },
  computed: {
    getChartData() {
      return {
        labels: this.getDataLabels,
        datasets: [
          {
            label: "Avarage block size (in MB)",
            backgroundColor: "#ffc107",
            borderColor: "#ffc107",
            pointRadius: 0,
            lineTension: 0.2,
            data: this.getDatasetData,
          },
        ],
      };
    },
    getDataLabels() {
      return this.avgs.values.map((value) => {
        const date = new Date(value.x * 1000);
        return `${date.getDate() + 1}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
      });
    },
    getDatasetData() {
      return this.avgs.values.map((value) => value.y);
    },
  },
};
</script>
