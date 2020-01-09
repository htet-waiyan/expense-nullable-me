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
      <div class="columns is-mobile is-vcentered">
        <div class="column">
          <div class="tabs is-toggle is-small">
            <ul>
              <li :class="{'is-active': viewMode === 1}"
                @click="toggleView(1)">
                <a>
                  <span class="icon is-small">
                    <v-icon name="calendar-week" aria-hidden="true"></v-icon>
                  </span>
                  <span>Date</span>
                </a>
              </li>
              <li :class="{'is-active': viewMode === 2}"
                @click="toggleView(2)">
                <a>
                  <span class="icon is-small">
                    <v-icon name="folder" aria-hidden="true"></v-icon>
                  </span>
                  <span>Category</span>
                </a>
              </li>
              <li :class="{'is-active': viewMode === 3}"
                @click="toggleView(3)">
                <a>
                  <span class="icon is-small">
                    <v-icon name="chart-pie" aria-hidden="true"></v-icon>
                  </span>
                  <span>Chart</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <transaction-date :transactions="transactions"/>
      <div class="columns transaction-summary is-mobile is-vecentered">
        <div class="column has-text-weight-semibold">
          Total
        </div>
        <div class="column is-one-fifth has-text-right has-text-weight-semibold">
          ${{ totalSpend | to2Decimal }}
        </div>
      </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/plus-circle';
import 'vue-awesome/icons/calendar-week';
import 'vue-awesome/icons/folder';
import 'vue-awesome/icons/chart-pie';
import TransactionDate from './MtdTransactionDate.vue';

export default {
  name: 'MtdTransaction',
  props: ['transactions', 'totalSpend'],
  components: {
    TransactionDate,
  },
  data() {
    return {
      viewMode: 1,
    };
  },
  methods: {
    rediectToForm() {
      this.$router.push('/transaction/new');
    },
    toggleView(mode = 1) {
      this.viewMode = mode;
      this.$emit('toggleView', this.viewMode);
    },
  },
};
</script>

<style scoped>
  .transaction-list {
    margin-bottom: 10em;
  }
  li.is-active a{
    background-color: #363636 !important;
    border-color:#363636 !important;
  }
</style>
