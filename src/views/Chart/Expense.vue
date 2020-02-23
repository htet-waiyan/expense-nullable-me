<template>
    <div class="container is-fluid">
      <monthly-expense-graph/>
    </div>
</template>

<script>
import MonthlyExpenseGraph from '../../components/Chart/MonthlyExpense.vue';

export default {
  name: 'ExpenseChart',
  components: {
    MonthlyExpenseGraph,
  },
};
</script>
