<template>
    <div class="columns is-vertical is-multiline is-mobile">
        <div class="column has-text-center" v-for="(digit, month) in displayMonths" :key="digit">
            <span class="month"
              :class="{'selected': selectedMonth === digit}"
              @click="selectMonth(digit)">
                {{ month }}
            </span>
        </div>
    </div>
</template>

<script>
/**
 *  Next 6 months
 */
import moment from 'moment';

export default {
  name: 'MonthSelection',
  props: {
    format: {
      type: String,
      default: 'MMM',
    },
    value: {
      type: Number,
    },
  },
  data() {
    return {
      MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      MM: ['Janury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      selectedMonth: this.value,
      monthData: moment(),
    };
  },
  computed: {
    /* eslint-disable no-param-reassign */
    displayMonths() {
      return this.MM.reduce((a) => {
        a[this.monthData.format('MMM')] = +this.monthData.format('YYYYMM');
        this.monthData.add(1, 'months');
        return a;
      }, {});
    },
  },
  methods: {
    selectMonth(month) {
      this.selectedMonth = month;
      this.$emit('input', month);
    },
  },
};
</script>

<style scoped>
  .month {
    cursor: pointer;
  }
  .month:hover, .month.selected {
    border-bottom: 1px solid #ddd;
    color: rgb(36, 35, 35);
    font-weight: bolder;
  }
</style>
