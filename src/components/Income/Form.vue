<template>
    <div class="income-form-container">
        <div class="notification" v-if="errorMessage">
        <button class="delete"
          @click="errorMessage = ''"></button>
          {{ errorMessage }}
        </div>
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
        <div class="field mt-2 mb-2 is-grouped">
            <div class="control is-expanded">
              <button class="button is-dark is-fullwidth"
                :disabled="!isValidForm"
                  @click="recordNewIncome">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { http } from '../../http';

const { mapGetters } = createNamespacedHelpers('profile');

// TODO: http method to move to vuex action

export default {
  name: 'IncomeForm',
  data() {
    return {
      title: '',
      amount: '',
      formDataForEdit: {},
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters(['selectedIncome']),
    isValidAmount() {
      return +this.amount > 0;
    },
    isValidForm() {
      return this.title && this.isValidAmount;
    },
    isUpdating() {
      return this.$route.query.action === 'edit';
    },
  },
  methods: {
    recordNewIncome() {
      if (this.isUpdating) return this.update();
      return this.save();
    },
    save() {
      const payload = {
        title: this.title,
        amount: this.amount,
      };
      http.post('/income', payload)
        .then(() => {
          this.toast('New income recorded');
          this.$router.push('/income');
        });
    },
    update() {
      this.formDataForEdit.title = this.title;
      this.formDataForEdit.amount = +this.amount;
      http.put(`/income/${this.formDataForEdit._id}`, this.formDataForEdit)
        .then(() => {
          this.toast('Updated successfully');
          this.$router.push('/income');
        })
        .catch((error) => {
          if (error.response.data.error.customCode === 2100) {
            this.errorMessage = 'Expense allocation is more than new total income. Please adjust the expense amount and update the income again.';
          }
        });
    },
  },
  created() {
    if (this.$route.query.action === 'edit') {
      this.formDataForEdit = { ...this.selectedIncome };
      this.title = this.formDataForEdit.title;
      this.amount = this.formDataForEdit.amount;
    }
    if (this.$route.query.action === 'edit' && Object.keys(this.selectedIncome).length === 0) {
      this.$router.push('/income');
    }
  },
};
</script>
