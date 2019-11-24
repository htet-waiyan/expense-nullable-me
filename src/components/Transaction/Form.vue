<template>
    <div>
    <div class="category-form-container" v-if="showCategoryForm">
        <category-form
          @cancel="hideCategoryForm"/>
    </div>
    <div class="form-container" v-else>
        <div class="field">
            <label class="label">Amount</label>
            <div class="control">
                <input type="number" class="input" id="amount" placeholder="Expense Amount"
                  v-model="expenseForm.amount"/>
            </div>
        </div>
        <div class="field">
            <label for="category" class="label">Category</label>
            <div class="columns is-mobile">
                <div class="column control">
                    <select name="category" id="category" class="input"
                      v-model="expenseForm.category">
                        <option>Transportation</option>
                        <option>Food & Drink</option>
                    </select>
                </div>
                <div class="column is-one-fifth control">
                    <button class="button"
                      @click="goToCategoryForm">
                        <v-icon name="plus"/>
                    </button>
                </div>
            </div>
        </div>
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
                  v-model="expenseForm.description"></textarea>
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
              <button class="button is-dark">Submit</button>
            </div>
            <div class="control">
              <button class="button">Cancel</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/plus';
import 'vue-awesome/icons/calendar-plus';
import CategoryForm from './CategoryForm.vue';

export default {
  name: 'TransactionForm',
  components: {
    CategoryForm,
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
      expenseForm: {
        amount: '',
        category: '',
        description: '',
        timestamp: '',
      },
    };
  },
  methods: {
    goToCategoryForm() {
      this.showCategoryForm = true;
    },
    hideCategoryForm() {
      this.showCategoryForm = false;
    },
  },
};
</script>
