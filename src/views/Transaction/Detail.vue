<template>
    <div class="is-fluid container">
        <transaction-detail/>
    </div>
</template>

<script>
import TransactionDetail from '../../components/Transaction/MtdDetail.vue';

export default {
  name: 'TransactionDetailPage',
  components: {
    TransactionDetail,
  },
};
</script>
