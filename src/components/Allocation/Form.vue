<template>
    <div class="planning-form-container">
        <!-- <form-button></form-button> -->
        <div class="columns bd-b-1 is-vcentered is-mobile">
            <div class="column is-two-thirds has-text-left
              is-size-5 has-text-weight-semibold">
                Income
            </div>
            <div class="column has-text-right">
                S${{ totalIncome }}
            </div>
        </div>
        <!-- <div class="field">
            <p v-if="!isValidSaving" :class="{'help is-danger': !isValidSaving}">
                Invalid saving amount</p>
        </div> -->
        <div class="field">
            <label for="saving" class="label">Save</label>
            <div class="control">
                <input type="number" class="input" id="saving" name="saving"
                  :class="{'is-danger': !isValidSaving}"
                  v-model="saving">
                <p v-if="!isValidSaving" :class="{'help is-danger': !isValidSaving}">
                  Invalid saving amount</p>
            </div>
        </div>
        <div class="field">
            <label for="saving" class="label">Expense</label>
            <div class="control">
                <input type="number" class="input" id="expense" name="expense"
                  :class="{'is-danger': !isValidExpense}"
                  v-model="expense">
                <p v-if="!isValidExpense" :class="{'help is-danger': !isValidExpense}">
                  Invalid expense amount</p>
            </div>
        </div>
        <!-- <div class="field">
            <label class="label">Month</label>
            <month-selection v-model="selectedMonth"/>
        </div> -->
        <div class="field mt-2 is-grouped">
            <div class="control is-expanded">
              <button class="button is-dark is-fullwidth"
                :disabled="!isValidForm"
                @click="allocate">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { http } from '../../http';

export default {
  name: 'PlanningForm',
  props: {
    totalIncome: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      saving: '',
      expense: '',
      selectedMonth: +moment().format('YYYYMM'),
    };
  },
  computed: {
    isValidSaving() {
      return +this.saving > 0;
    },
    isValidExpense() {
      return +this.expense > 0;
    },
    isValidAllocation() {
      return (this.saving || 0) + (this.expense || 0) <= this.income;
    },
    isValidForm() {
      return this.isValidSaving && this.isValidExpense;
    },
  },
  methods: {
    allocate() {
      const payload = {
        savingAmount: this.saving,
        expenseAmount: this.expense,
      };
      http.post('/allocation', payload);
    },
  },
};
</script>
