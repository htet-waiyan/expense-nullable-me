<template>
  <div class="setup-container">
    <div class="currency-selection"
      v-if="position === 1">
        <div class="field">
            <label for="currency" class="label">
              Select Base Currency
            </label>
            <span class="has-text-grey is-size-7 mb-3">
                This currency will be used in recording expenses, allocation and income.
            </span>
            <div class="control">
              <select name="currency" id="currency" class="input"
                v-model="selectedCurrency">
                  <option value="USD">US Dollar USD</option>
                  <option value="SGD">Singapore Dollar SGD</option>
                  <option value="MMK">Myanmar Kyat MMK</option>
              </select>
            </div>
        </div>
        <div class="field">
            <div class="control is-expanded">
              <button class="button is-dark is-fullwidth"
                @click="setCurrency">Next</button>
            </div>
        </div>
    </div>
    <div v-if="position === 2">
        <p class="mb-2">
          Next, you need to define your income.
          You can update or record multiple incomes later at your profile setting.
          Incomes are to be allocated for saving and expense.
        </p>
        <button class="button"
          @click="previous">
          <span class="icon"><v-icon name="chevron-left"/></span>
          <span>Back</span>
        </button>&nbsp;&nbsp;
        <button class="button"
          @click="next">Record Income</button>
    </div>
    <div v-if="position === 3">
      <income-form @incomeSave="handleIncomeSave" :redirectOnSave="false"/>
    </div>
    <div v-if="position === 4">
        <p class="mb-2">
          Next, you need to allocate your income for saving and expense.
          Saving amount is how much you will save monthly from your income.
          Expense amount will be deducted in recording expenses.
        </p>
        <button class="button"
          @click="next">Allocate Income</button>
    </div>
    <div v-if="position === 5">
      <allocation-form @allocationSave="handleAllocationSave" :redirectOnSave="false"
        :totalIncome="saveIncome"/>
    </div>
  </div>
</template>

<script>
import { http } from '../../http';
import IncomeForm from '../Income/Form.vue';
import AllocationForm from '../Allocation/Form.vue';
import constant from '../../constant';

export default {
  name: 'ProfileSetup',
  props: ['newUserId'],
  components: {
    IncomeForm,
    AllocationForm,
  },
  data() {
    return {
      selectedCurrency: 'SGD',
      position: 1,
      saveIncome: 0,
    };
  },
  methods: {
    next() {
      this.position = this.position + 1;
    },
    previous() {
      this.position = this.position - 1;
    },
    setCurrency() {
      http.patch(`/user/patch/${this.newUserId}`, { baseCurrency: this.selectedCurrency })
        .then(() => {
          this.$emit('saveCurrency', this.selectedCurrency);
          this.next();
        });
    },
    handleIncomeSave(payload) {
      this.saveIncome = +payload.amount;
      this.next();
    },
    handleAllocationSave() {
      this.toast('Your profile has been setup successfully');
      this.$store.commit('SET_BASE_CURRENCY', this.selectedCurrency);
      this.$store.commit('SET_CURRENCY_CODE', constant.CURRENCIES[this.selectedCurrency].symbol);
      this.$router.push('/transaction');
    },
  },
};
</script>
