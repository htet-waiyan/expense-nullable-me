<template>
  <div class="income-container"
    v-if="incomes.length > 0">
    <div class="columns">
      <div class="column">
        <button class="button"
          @click="goToNew">
          <span>Add</span>
          <span class="icon">
            <v-icon name="plus"/>
          </span>
        </button>
      </div>
    </div>
    <div class="columns is-mobile is-vcentered setting-row"
      v-for="income in incomes"
        :key="income._id">
        <div class="column save has-text-weight-bold">
            {{ income.title }}
        </div>
        <div class="column has-text-right">
            {{ income.amount }}
        </div>
    </div>
    <div class="columns is-mobile is-vcentered setting-row">
      <div class="column save has-text-weight-bold">
        Total Income
      </div>
      <div class="column has-text-right">
        {{ totalIncome }}
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'Incomes',
  computed: {
    ...mapGetters(['incomes', 'totalIncome']),
  },
  methods: {
    ...mapActions(['fetchAllIncomes', 'fetchTotalIncome']),
    goToNew() {
      this.$router.push('/income/new');
    },
  },
  created() {
    this.fetchAllIncomes();
    if (this.totalIncome < 0) {
      this.fetchTotalIncome();
    }
  },
};
</script>

<style scoped>
  .setting-row {
    border-bottom: 1px solid #ddd;
  }
</style>
