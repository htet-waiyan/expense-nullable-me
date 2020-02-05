<template>
  <div>
  <div class="columns">
    <div class="column">
      <mtd-summary
        :month="statementMonth"
        :saving="saving"
        :totalSpend="expenseTotal"
        :expense="expense"
        @select-month="handleMonthSelection"/>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <mtd-transactions
        :transactions="transactions"
        :totalSpend="expenseTotal"
        @toggleView="handleToggleView"
        @deleted="handleDelete"/>
    </div>
  </div>
  </div>
</template>

<script>
import moment from 'moment';
import { createNamespacedHelpers } from 'vuex';
import MtdSummary from './MtdSummary.vue';
import MtdTransactions from './MtdTransactions.vue';
import constant from '../../constant';

const { mapActions, mapGetters } = createNamespacedHelpers('transaction');

export default {
  name: 'MtdExpenseList',
  data() {
    return {
      monthMapping: constant.RAW_DATE_MONTHS,
      mode: 'DATE',
      rawDate: moment(),
      from: moment().startOf('month').format('YYYYMM'),
      to: moment().endOf('month').format('YYYYMM'),
    };
  },
  components: {
    MtdSummary,
    MtdTransactions,
  },
  computed: {
    ...mapGetters(['expenseTotal', 'saving', 'transactions', 'expense']),
    statementMonth() {
      const currentYear = new Date().getFullYear();
      const monthYear = +this.rawDate.year();
      const month = this.monthMapping[this.rawDate.month()];
      if (currentYear === monthYear) {
        return month;
      }
      return `${month} ${monthYear}`;
    },
  },
  methods: {
    ...mapActions(['fetchMtdTransactions', 'fetchAllCategories']),
    handleToggleView(mode) {
      this.mode = mode;
      this.fetchMtdTransactions({ from: this.from, to: this.to, groupBy: this.mode });
    },
    handleMonthSelection(yyyyMM) {
      this.rawDate = moment(yyyyMM, 'YYYYMM');
      this.from = yyyyMM;
      this.to = yyyyMM;
      this.fetchMtdTransactions({ from: this.from, to: this.to, groupBy: this.mode });
    },
    handleDelete() {
      this.fetchMtdTransactions();
    },
  },
  created() {
    this.fetchMtdTransactions();
    if (Object.keys(this.$store.state.profile.profile).length === 0) {
      this.$store.dispatch('profile/fetchProfile');
    }
  },
};
</script>
