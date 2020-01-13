<template>
  <div class="transaction-category">
    <div class="columns bd-b-1 is-mobile is-vcentered"
      v-for="(amount, category) in transactions"
      :key="category">
      <div class="column has-text-left is-three-quarters">
        {{ category }}
      </div>
      <div class="column has-text-right">${{ amount | to2Decimal }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtdTransactionCategory',
  props: ['transactions'],
};
</script>

<style scoped>
  .transaction-category {
    margin-bottom: 0.5em;
  }
</style>
