<template>
    <div class="planning-form-container mb-7">
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
        <div class="field">
            <p v-if="!isValidAllocation" :class="{'help is-danger': !isValidSaving}">
                You are allocating more than total income</p>
        </div>
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
                @click="handleAllocation">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('allocation');

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
      formDataForEdit: {},
    };
  },
  computed: {
    ...mapGetters(['selectedAllocation']),
    isValidSaving() {
      return +this.saving > 0;
    },
    isValidExpense() {
      return +this.expense > 0;
    },
    isValidAllocation() {
      return (+this.saving || 0) + (+this.expense || 0) <= this.totalIncome;
    },
    isValidForm() {
      return this.isValidSaving && this.isValidExpense && this.isValidAllocation;
    },
    isUpdating() {
      return this.$route.query.action === 'edit';
    },
  },
  methods: {
    ...mapActions(['allocate', 'updateAllocation']),
    handleAllocation() {
      if (this.isUpdating) {
        return this.update();
      }
      return this.save();
    },
    save() {
      const payload = {
        savingAmount: this.saving,
        expenseAmount: this.expense,
      };
      this.allocation(payload)
        .then(() => {
          this.toast('Successfully allocated income');
          this.$router.push('/allocation');
        });
    },
    update() {
      this.formDataForEdit.savingAmount = +this.saving;
      this.formDataForEdit.expenseAmount = +this.expense;
      this.updateAllocation(this.formDataForEdit)
        .then(() => {
          this.toast('Successfully updated allocation');
          this.$router.push('/allocation');
        });
    },
  },
  created() {
    if (this.$route.query.action === 'edit') {
      this.formDataForEdit = { ...this.selectedAllocation };
      this.saving = this.formDataForEdit.savingAmount;
      this.expense = this.formDataForEdit.expenseAmount;
    }
    if (this.$route.query.action === 'edit' && Object.keys(this.selectedAllocation).length === 0) {
      this.$router.push('/allocation');
    }
  },
};
</script>
