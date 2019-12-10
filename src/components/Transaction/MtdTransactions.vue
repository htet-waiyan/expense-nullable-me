<template>
  <div class="transaction-list has-text-grey-dark is-fluid container">
      <div class="columns bd-b-1 is-mobile is-vcentered">
            <div class="column">
                <h5 class="title is-5">Transactions</h5>
            </div>
            <div class="column is-one-fifth has-text-right">
                <button class="button is-white">
                    <v-icon name="plus-circle"/>
                </button>
            </div>
      </div>
      <div class="columns bd-b-1 is-mobile is-vcentered"
        v-for="trans in transactions"
        :key="trans._id">
          <div class="column has-text-grey-light has-text-weight-medium has-text-left is-one-fifth">
              <p>{{ trans.timestamp | MMMFromX }}</p>
              <p>{{ trans.timestamp | DDFromX }}</p>
          </div>
          <div class="column has-text-left">
              <p>{{ trans.category.title }}</p>
              <p class="has-text-grey-light is-size-6">{{ trans.description }}</p>
          </div>
          <div class="column has-text-right">${{trans.amount}}</div>
      </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/plus-circle';

export default {
  name: 'MtdTransaction',
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
