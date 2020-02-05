<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: (() => ({})),
    },
    chartOption: {
      type: Object,
      default: (() => ({
        legend: { display: false },
        responsive: true,
      })),
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOption);
  },
}
</script>