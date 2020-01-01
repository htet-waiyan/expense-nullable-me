<template>
    <div class="income-form-container">
        <div class="field">
            <label for="title" class="label">
                Title
            </label>
            <div class="control">
                <input type="text" class="input"
                  :class="{'is-danger': !title}"
                  placeholder="e.g Salary"
                  v-model="title">
                <p v-if="!title" :class="{'help is-danger': !title}">Title is required</p>
            </div>
        </div>
        <div class="field">
            <label for="amount" class="label">
                Amount
            </label>
            <div class="control">
                <input type="number" class="input"
                  :class="{'is-danger': !isValidAmount}"
                  v-model="amount">
                <p v-if="!isValidAmount" :class="{'help is-danger': !isValidAmount}">
                    Invalid amount</p>
            </div>
        </div>
        <div class="field mt-2 is-grouped">
            <div class="control is-expanded">
              <button class="button is-dark is-fullwidth"
                :disabled="!isValidForm"
                  @click="recordNewIncome">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { http } from '../../http';

export default {
  name: 'IncomeForm',
  data() {
    return {
      title: '',
      amount: '',
    };
  },
  computed: {
    isValidAmount() {
      return +this.amount > 0;
    },
    isValidForm() {
      return this.title && this.isValidAmount;
    },
  },
  methods: {
    recordNewIncome() {
      const payload = {
        title: this.title,
        amount: this.amount,
      };
      http.post('/income', payload)
        .then(() => {
          // TODO: redirect to profile
        });
    },
  },
};
</script>
