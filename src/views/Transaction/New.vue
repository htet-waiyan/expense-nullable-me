<template>
    <div>
        <transaction-form></transaction-form>
    </div>
</template>

<script>
import TransactionForm from '../../components/Transaction/Form.vue';

export default {
  name: 'TransactionNew',
  components: {
    TransactionForm,
  },
};
</script>
