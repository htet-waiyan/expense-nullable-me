<template>
  <div class="container is-fluid">
      <allocation-index />
  </div>
</template>

<script>
import AllocationIndex from '../../components/Allocation/Index.vue';

export default {
  name: 'AllocationListView',
  components: {
    AllocationIndex,
  },
};
</script>
