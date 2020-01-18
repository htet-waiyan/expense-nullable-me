<template>
  <div class="income-container"
    v-if="incomes.length > 0">
    <div class="notification" v-if="errorMessage">
      <button class="delete"></button>
      {{ errorMessage }}
    </div>
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
        <div class="column is-one-fifth  has-text-right">
          <button class="button is-small is-white"
            @click="onRemoveIncome(income._id)">
            <v-icon name="trash-alt"/>
          </button>
        </div>
    </div>
    <div class="columns is-mobile is-vcentered">
      <div class="column save has-text-weight-bold">
        Total Income
      </div>
      <div class="column has-text-right">
        {{ totalIncome }}
      </div>
      <div class="column is-one-fifth">&nbsp;</div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/trash-alt';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'Incomes',
  data() {
    return {
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters(['incomes', 'totalIncome']),
  },
  methods: {
    ...mapActions(['fetchAllIncomes', 'fetchTotalIncome', 'removeIncome']),
    goToNew() {
      this.$router.push('/income/new');
    },
    onRemoveIncome(id) {
      this.removeIncome(id)
        .then(() => {
          this.toast('Successfully remove income');
        })
        .catch((error) => {
          if (error.response.data.error.customCode === 2100) {
            this.errorMessage = 'Expense allocation is more than new total income. Please adjust the expense amount and remove the income again.';
          }
        });
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
