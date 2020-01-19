/* eslint-disable no-alert */
/* eslint-disable no-alert */
/* eslint-disable no-alert */
<template>
    <div class="transaction-container">
      <div
        v-for="(groupBy, date) in transactions"
        :key="date"
        class="trasaction-group">
        <div class="columns bd-b-1 has-text-grey-light" v-if="isToday(date)">
          <div class="column is-size-6">Today</div>
        </div>
        <div class="columns bd-b-1 has-text-grey-light" v-else>
          <div class="column is-size-6">{{ date | weekDayDayMonth }}</div>
        </div>
        <div class="columns bd-b-l-1 is-mobile is-vcentered transaction-row"
          v-for="trans in groupBy"
          :key="trans._id"
          @dblclick="removeExpense(trans)">
          <div class="column has-text-left">
            <p>{{ trans.category.title }}</p>
            <p class="has-text-grey-light is-size-6">{{ trans.description }}</p>
          </div>
          <div class="column has-text-right">
            <span>{{ currencyCode }}{{trans.amount | to2Decimal }}</span>
            <!-- <span class="tag">
              {{ currencyCode }}{{trans.amount | to2Decimal }}
              <button class="delete is-small"></button>
            </span> -->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/times-circle';
import moment from 'moment';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('transaction');

export default {
  name: 'MtdTransactionDate',
  props: ['transactions'],
  methods: {
    ...mapActions(['fetchMtdTransactions', 'fetchAllCategories', 'removeTransaction']),
    isToday(value) {
      return +value === +moment().format('YYYYMMDD');
    },
    removeExpense(expense) {
      const isCurrentMonth = moment(expense.timestamp, 'X').format('YYYYMM') === moment().format('YYYYMM');
      if (!isCurrentMonth) {
        alert('Not allowed to remove past expenses');
        return;
      }
      // eslint-disable-next-line no-restricted-globals
      const result = confirm('Are you sure to remove this expense record');
      if (result) {
        this.removeTransaction(expense._id)
          .then(() => {
            this.toast('Successfully deleted an expense record');
            this.$emit('deleted', expense);
          });
      }
    },
  },
};
</script>

<style scoped>
  .transaction-container, .trasaction-group {
    margin-bottom: 0.5em;
  }
  .tag:not(body) {
    background-color: none;
    font-size: inherit;
  }
  .delete {
    background-color: #666;
    color: #fff;
  }
  .transaction-row:hover {
    cursor: pointer;
  }
</style>
