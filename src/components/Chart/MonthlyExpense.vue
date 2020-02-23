<template>
   <div class="expense-chart-container">
      <h5 class="title">Monthly Expense Graph</h5>
      <h5 class="subtitle">Past 6 months</h5>
      <div class="columns is-mobile-is-vcentered">
          <div class="column">
              <span class="year has-text-center"
                v-for="(year) in availableYears" :key="year"
                @click="selectYear(year)"
                :class="{'selected': selectedYear === year}">
                  {{ year }}
              </span>
          </div>
      </div>
      <div class="columns is-vcentered is-centered"
        v-if="dataReady">
        <div class="column has-text-left">
          <div class="chart-container">
            <line-chart :chartData="chartDataSet"
              :chartOption="expenseChartOptions"/>
          </div>
        </div>
      </div>
      <hr/>
      <div class="columns is-vcentered has-text-weight-bold">
        <div class="column has-text-left">
          Your total expense<br/>
          <small>{{ asOf }}</small>
        </div>
        <div class="column has-text-right">
          {{ currencyCode }}{{ totalExpense | to2Decimal }}
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
import { createNamespacedHelpers } from 'vuex';
import LineChart from '../Graph/LineChart.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('transaction');

export default {
  name: 'MonthlyExpenseGraph',
  components: {
    LineChart,
  },
  data() {
    return {
      selectedYear: +moment().year(),
      dataReady: false,
    };
  },
  computed: {
    // TODO: free account can view last 3 years
    ...mapGetters(['transactions']),
    availableYears() {
      const current = +moment().year();
      return [current, current - 1, current - 2];
    },
    isCurrentYear() {
      const current = +moment().year();
      return current === this.selectedYear;
    },
    totalExpense() {
      return this.chartData.reduce((a, b) => a + b);
    },
    rawDataLabels() {
      // const rawMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      const rawMonths = ['07', '08', '09', '10', '11', '12'];
      if (this.isCurrentYear) {
        return rawMonths
          .map((m, index) => moment().subtract(index, 'months').format('YYYYMM'))
          .reverse();
      }
      return rawMonths
        .map(m => `${this.selectedYear}${m}`);
    },
    graphSubTitle() {
      if (this.isCurrentYear) return 'Past 6 months';
      return 'Average 6 months';
    },
    dataLabels() {
      return this.rawDataLabels
        .map((label) => {
          const year = label.substring(0, 4);
          // if current year, no year string
          if (year === moment().format('YYYY')) {
            return moment(label, 'YYYYMM').format('MMM');
          }
          return moment(label, 'YYYYMM').format('MMM YYYY');
        });
    },
    chartData() {
      return this.rawDataLabels
        .map(label => this.transactions[label] || 0);
    },
    expenseChartOptions() {
      return {
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        title: { text: 'Expense' },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 500,
            },
          }],
        },
      };
    },
    chartDataSet() {
      return {
        labels: this.dataLabels,
        datasets: [{
          backgroundColor: '#1F1E1E',
          fill: false,
          data: this.chartData,
        }],
      };
    },
    asOf() {
      if (this.isCurrentYear) {
        return `(As of ${moment().format('MMM YY')})`;
      }
      return '';
    },
  },
  methods: {
    ...mapActions(['fetchMtdTransactions']),
    selectYear(year) {
      this.selectedYear = year;
      this.getGraphTransactionData();
    },
    getFromTo() {
      if (this.isCurrentYear) {
        return {
          from: +moment().subtract(6, 'months').format('YYYYMM'),
          to: +moment().format('YYYYMM'),
        };
      }
      return { from: +`${this.selectedYear}01`, to: +`${this.selectedYear}12` };
    },
    getGraphTransactionData() {
      this.dataReady = false;
      const { from, to } = this.getFromTo();
      this.fetchMtdTransactions({ from, to, groupBy: 'MONTH_YEAR' })
        .then(() => {
          this.dataReady = true;
        });
    },
  },
  created() {
    this.getGraphTransactionData();
  },
};
</script>

<style scoped>
  .year {
    cursor: pointer;
    color: #fff;
    padding: 5px 10px;
    background-color: #ddd;
    margin-right: 10px;
    font-weight: bolder;
  }
  .year:hover, .year.selected {
    border-bottom: 1px solid #ddd;
    background-color: #666;
  }
  .expense-chart-container {
    margin-bottom: 10em;
  }
</style>
