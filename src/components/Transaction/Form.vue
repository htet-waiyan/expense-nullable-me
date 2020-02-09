<template>
    <div>
    <div class="category-form-container" v-if="showCategoryForm">
        <category-form
          @created="handleNewCategory"
          @cancel="hideCategoryForm"/>
    </div>
    <div class="form-container" v-else>
        <div class="field">
            <label class="label">Amount</label>
            <div class="control">
                <span v-if="invalidExpenseAmount"
                  :class="form-error-text">Invalid expense amount</span>
                <input type="number" class="input" id="amount" placeholder="Expense Amount"
                  :class="{'is-danger': invalidExpenseAmount}"
                  @input="handleExpenseAmount"
                  v-model="amount"/>
            </div>
        </div>
        <div class="field">
            <label for="category" class="label">Category</label>
            <div class="columns is-mobile">
                <div class="column control">
                    <select name="category" id="category" class="input"
                      v-model="category">
                        <option v-for="category in categories"
                          :key="category._id"
                          :value="category._id">
                          {{ category.title }}
                        </option>
                    </select>
                </div>
                <div class="column is-one-fifth control">
                  <button class="button is-white"
                    @click="goToCategoryForm">
                      <v-icon name="plus"/>
                  </button>
                </div>
            </div>
        </div>
        <!-- <div class="field">
          <label for="tags" class="label">
            Label
          </label>
          <div class="control">
            <tag-cloud v-model="tags" multiple/>
          </div>
        </div> -->
        <div class="field">
            <label class="label">Date</label>
            <div class="columns is-vcentered is-mobile">
                <div class="column">
                    <v-date-picker
                      :select-attribute="attrs"
                      mode="single"
                      is-expanded
                      v-model="selectedDate"
                      color="grey"
                      is-inline/>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="note" class="label">Note</label>
            <div class="control">
                <textarea class="textarea"
                  v-model="description"></textarea>
            </div>
        </div>
        <div class="field mb-7 is-grouped">
            <div class="control is-expanded">
              <button class="button is-dark is-fullwidth"
                :disabled="hasFormError"
                @click="saveNewExpense">Submit</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import 'vue-awesome/icons/plus';
import 'vue-awesome/icons/calendar-plus';
import moment from 'moment';
import { createNamespacedHelpers } from 'vuex';
import CategoryForm from './CategoryForm.vue';
// import TagCloud from '../TagCloud.vue';
import { http } from '../../http';

const { mapGetters, mapActions } = createNamespacedHelpers('transaction');

export default {
  name: 'TransactionForm',
  components: {
    CategoryForm,
    // TagCloud,
  },
  data() {
    return {
      selectedDate: new Date(),
      showCategoryForm: false,
      attrs: {
        highlight: {
          backgroundColor: '#666',
          // Other properties are available too, like `height` & `borderRadius`
        },
        contentStyle: {
          color: '#fafafa',
        },
      },
      amount: '',
      category: '',
      description: '',
      timestamp: '',
      tags: [],
      invalidExpenseAmount: false,
    };
  },
  computed: {
    ...mapGetters({ categories: 'all' }),
    hasFormError() {
      return this.invalidExpenseAmount;
    },
  },
  methods: {
    ...mapActions(['fetchAllCategories']),
    goToCategoryForm() {
      this.showCategoryForm = true;
    },
    hideCategoryForm() {
      this.showCategoryForm = false;
    },
    /* eslint no-underscore-dangle: 0 */
    handleNewCategory(newCategory) {
      this.showCategoryForm = false;
      this.category = newCategory._id;
    },
    handleExpenseAmount(e) {
      const expenseAmount = +e.target.value;
      if (expenseAmount < 0) {
        this.invalidExpenseAmount = true;
      } else {
        this.invalidExpenseAmount = false;
      }
    },
    saveNewExpense() {
      const payload = {
        amount: this.amount,
        category: this.category,
        description: this.description,
        timestamp: moment(this.selectedDate).unix(),
      };

      return http.post('/expense', payload)
        .then(() => {
          // TODO: redirect to MTD list
          this.toast('Expense recorded');
          this.goBackToMtdList();
        });
    },
    goBackToMtdList() {
      this.$router.push('/transaction');
    },
  },
  created() {
    this.fetchAllCategories();
  },
};
</script>

<style>
  .form-error-text {
    font-size: 12px;
    font-style: italic;
  }
</style>
