<template>
  <div>
  <div class="columns">
    <div class="column">
      <mtd-summary
        :month="statementMonth"
        :saving="saving"
        :expense="expenseTotal"/>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <mtd-transactions
        :transactions="transactions"/>
    </div>
  </div>
  </div>
</template>

<script>
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
    };
  },
  components: {
    MtdSummary,
    MtdTransactions,
  },
  computed: {
    ...mapGetters(['expenseTotal', 'saving', 'transactions']),
    statementMonth() {
      const rawMonth = new Date().getMonth();
      return this.monthMapping[rawMonth];
    },
  },
  methods: {
    ...mapActions(['fetchMtdTransactions']),
  },
  created() {
    this.fetchMtdTransactions();
  },
};
</script>
