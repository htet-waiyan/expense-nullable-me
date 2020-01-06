<template>
  <div class="transaction-list has-text-grey-dark is-fluid container">
      <div class="columns is-mobile is-vcentered">
            <div class="column">
                <h5 class="title is-5">Transactions</h5>
            </div>
            <div class="column is-one-fifth has-text-right">
                <button class="button is-white"
                  @click="rediectToForm">
                    <v-icon name="plus-circle"/>
                </button>
            </div>
      </div>
      <div class="transaction-container"
        v-for="(groupBy, date) in transactions"
        :key="date">
        <div class="columns bd-b-1 has-text-grey-light" v-if="isToday(date)">
          <div class="column is-size-6">Today</div>
        </div>
        <div class="columns bd-b-1 has-text-grey-light" v-else>
          <div class="column is-size-6">{{ date | weekDayDayMonth }}</div>
        </div>
        <div class="columns bd-b-l-1 is-mobile is-vcentered" v-for="trans in groupBy"
          :key="trans._id">
          <div class="column has-text-left is-three-quarters">
            <p>{{ trans.category.title }}</p>
            <p class="has-text-grey-light is-size-6">{{ trans.description }}</p>
          </div>
          <div class="column has-text-right">${{trans.amount | to2Decimal }}</div>
        </div>
      </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/plus-circle';
import moment from 'moment';

export default {
  name: 'MtdTransaction',
  props: ['transactions'],
  methods: {
    rediectToForm() {
      this.$router.push('/transaction/new');
    },
    isToday(value) {
      return +value === +moment().format('YYYYMMDD');
    },
  },
};
</script>

<style scoped>
  .transaction-list {
    margin-bottom: 10em;
  }
  .transaction-container {
    margin-bottom: 0.5em;
  }
</style>
