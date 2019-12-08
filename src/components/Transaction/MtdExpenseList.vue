<template>
    <div class="mtd-container is-fluid container">
       <mtd-summary
         :month="statementMonth"
         :saving="saving"
         :expense="expenseTotal"/>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MtdSummary from './MtdSummary.vue';
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
