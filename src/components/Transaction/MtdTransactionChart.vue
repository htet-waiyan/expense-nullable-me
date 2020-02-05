<template>
  <div class="transaction-chart-container"
    v-if="hasData">
    <div class="columns is-mobile is-vcentered is-centered">
      <div class="column is-half has-text-left is-three-quarters">
        <pie-chart :chartData="chartData" />
      </div>
    </div>
    <div class="columns bd-b-1 is-mobile is-vcentered">
      <div class="column has-text-left">
        <span class="legend-box"
          v-for="(tr, category) in transactions"
          :key="category">
          <div>{{ category }}</div>
          <div class="color-line" :style="{'background-color': tr.category.colorLabel}"></div>
          <div>{{ currencyCode }}{{ tr.amount | to2Decimal }}</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from '../Graph/PieChart.vue';

export default {
  name: 'MtdTransactionChart',
  props: ['transactions'],
  components: {
    PieChart,
  },
  computed: {
    hasData() {
      return Object.keys(this.transactions).length;
    },
    chartData() {
      return {
        labels: Object.keys(this.transactions),
        datasets: [{
          // backgroundColor: ['#665', '#666'],
          backgroundColor: Object.values(this.transactions)
            .map(tr => tr.category.colorLabel.toLowerCase()),
          data: Object.values(this.transactions).map(tr => tr.amount),
        }],
      };
    },
  },
};
</script>

<style scoped>
  .transaction-chart-container {
    margin-bottom: 0.5em;
  }
  .legend-box {
    display: inline-block;
    padding: 5px;
    margin-right: 3px;
    font-size: 0.8em;
  }
  .legend-box div.color-line {
    width: 100%;
    padding: 3px;
  }
</style>
