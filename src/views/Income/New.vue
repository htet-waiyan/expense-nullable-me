<template>
    <div class="container is-fluid">
      <income-form></income-form>
    </div>
</template>

<script>
import IncomeForm from '../../components/Income/Form.vue';

export default {
  name: 'IncomeNew',
  components: {
    IncomeForm,
  },
};
</script>
