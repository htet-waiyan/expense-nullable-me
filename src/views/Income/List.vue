<template>
  <div class="container is-fluid">
      <incomes />
  </div>
</template>

<script>
import Incomes from '../../components/Income/List.vue';

export default {
  name: 'IncomeList',
  components: {
    Incomes,
  },
};
</script>
