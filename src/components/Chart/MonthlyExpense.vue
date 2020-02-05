<template>
   <div class="expense-chart-container">
      <h3 class="title is-5">Monthly Expense Graph</h3>
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
    </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MonthlyExpenseGraph',
  data() {
    return {
      selectedYear: +moment().year(),
    };
  },
  computed: {
    // TODO: free account can view last 3 years
    availableYears() {
      const current = +moment().year();
      return [current, current - 1, current - 2];
    },
  },
  methods: {
    selectYear(year) {
      this.selectedYear = year;
    },
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
</style>
