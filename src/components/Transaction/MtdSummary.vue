<template>
    <div class="has-background-grey-darker mtd-container is-fluid container">
        <div class="columns is-mobile is-vcentered">
          <div class="column">
            <div class="has-text-white">
              {{ month }} Overview
              <span class="month-select"
                @click="toggleMonthSelection">
                <v-icon name="calendar" />
              </span>
            </div>
          </div>
        </div>
        <div class="columns is-mobile" v-if="showMonthSelection">
          <div class="column">
            <calendar-month
              @select-month="onSelectMonth"
              :selectedYear="selectedYear"/>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Saving</div>
          <div class="column has-text-right"> {{ currencyCode }}{{ saving | to2Decimal }}</div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Expense</div>
          <div class="column has-text-right"> {{ currencyCode }}{{ expense | to2Decimal }}</div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Total Spent</div>
          <div class="column has-text-right"> {{ currencyCode }}{{ totalSpend | to2Decimal }}</div>
        </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/calendar';
import CalendarMonth from '../CalendarMonth.vue';

export default {
  name: 'MtdExpenseSummary',
  components: {
    CalendarMonth,
  },
  props: {
    month: {
      type: String,
    },
    saving: {
      type: Number,
      default: 0,
    },
    expense: {
      type: Number,
      default: 0,
    },
    totalSpend: {
      type: Number,
      default: 0,
    },
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showMonthSelection: false,
      selectedYear: new Date().getFullYear(),
    };
  },
  methods: {
    toggleMonthSelection() {
      this.showMonthSelection = !this.showMonthSelection;
    },
    onSelectMonth(yyyyMM) {
      this.selectedYear = +yyyyMM.substring(0, 4);
      this.showMonthSelection = false;
      this.$emit('select-month', yyyyMM);
    },
  },
};
</script>

<style scoped>
  .month-select {
    margin-left: 5px;
  }
  .month-select:hover {
    cursor: pointer;
  }
</style>
