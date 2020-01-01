<template>
  <div class="columns allocation div is-mobile is-vcentered">
      <div class="column is-one-quarter">
          <div class="save has-text-weight-bold">Save</div>
          <div class="expense has-text-weight-bold">Expense</div>
      </div>
      <div class="column">
          <div class="save">S$1000</div>
          <div class="expense">S$5000</div>
      </div>
      <div class="column has-text-right">
          <button class="button is-white">
              <v-icon name="search" @click="goToNew"/>
          </button>
      </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/search';

export default {
  name: 'AllocationIndex',
  methods: {
    goToNew() {
      this.$router.push('/allocation/new');
    },
  },
};
</script>

<style scoped>
  .allocation {
    border-bottom: 1px solid #666;
  }
</style>
