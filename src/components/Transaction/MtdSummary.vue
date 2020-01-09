<template>
    <div class="has-background-grey-darker mtd-container is-fluid container">
        <div class="columns">
          <div class="column">
            <h3 class="title is-5 has-text-white">
              {{ month }} Overview
            </h3>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Saving</div>
          <div class="column has-text-right"> ${{ saving | to2Decimal }}</div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Expense</div>
          <div class="column has-text-right"> ${{ expense | to2Decimal }}</div>
        </div>
        <div class="columns is-mobile">
          <div class="column">Total Spent</div>
          <div class="column has-text-right"> ${{ totalSpend | to2Decimal }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MtdExpenseSummary',
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
};
</script>
