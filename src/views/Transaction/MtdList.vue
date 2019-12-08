<template>
    <div class="has-background-grey-dark mtd-container">
      <mtd-expense-list></mtd-expense-list>
    </div>
</template>

<script>
import MtdExpenseList from '../../components/Transaction/MtdExpenseList.vue';

export default {
  name: 'MtdList',
  components: {
    MtdExpenseList,
  },
};
</script>

<style>
  .mtd-container {
    color: #fff;
  }
</style>
