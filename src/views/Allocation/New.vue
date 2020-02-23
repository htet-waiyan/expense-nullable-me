/* eslint-disable import/no-cycle */
<template>
  <div class="container is-fluid">
      <allocation-form :totalIncome="totalIncome"/>
  </div>
</template>

<script>
import AllocationForm from '../../components/Allocation/Form.vue';
// eslint-disable-next-line import/no-cycle
import { http } from '../../http';

export default {
  name: 'NewPlanning',
  components: {
    AllocationForm,
  },
  data() {
    return {
      totalIncome: 0,
    };
  },
  created() {
    http.get('/income/total')
      .then((response) => {
        this.totalIncome = response.data.totalIncome;
      });
  },
};
</script>
