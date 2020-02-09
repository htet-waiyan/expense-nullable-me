<template>
  <div class="mtd-transaction-details">
    <div class="columns is-vcentered is-mobile bd-b-1">
        <div class="column">
            <h5 class="title is-5">Transaction Detail</h5>
            <h5 class="subtitle is-6">{{ selectedTransaction.timestamp | DDMMMYYYYfromX }}</h5>
        </div>
    </div>
    <div class="columns is-vcentered is-mobile">
        <div class="column">
          {{ selectedTransaction.category.title }}
        </div>
        <div class="column has-text-right">
            {{ currencyCode }}{{ selectedTransaction.amount }}
        </div>
    </div>
    <div class="columns is-vcentered is-mobile bd-b-1">
        <div class="column">
            <p>
                {{ selectedTransaction.description }}
            </p>
        </div>
    </div>
    <!-- <div class="columns is-vcentered is-mobile .bd-b-1">
        <div class="column has-text-centered">
            <button class="button is-dark is-fullwidth">
                <span>Modify</span>
                <span class="icon is-small">
                  <v-icon name="edit"/>
                </span>
            </button>
        </div>
    </div> -->
    <div class="columns is-vcentered is-mobile .bd-b-1">
        <div class="column has-text-centered">
            <button class="button is-dark is-fullwidth"
              @click="handleRemoveTransaction">
                <span>Delete</span>
                <span class="icon is-small">
                  <v-icon name="trash-alt"/>
                </span>
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/trash-alt';
import 'vue-awesome/icons/edit';
import moment from 'moment';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('transaction');

export default {
  name: 'MTDDetail',
  computed: {
    ...mapGetters(['selectedTransaction']),
  },
  methods: {
    ...mapActions(['removeTransaction']),
    handleRemoveTransaction() {
      const isCurrentMonth = moment(this.selectedTransaction.timestamp, 'X')
        .format('YYYYMM') === moment().format('YYYYMM');
      if (!isCurrentMonth) {
        alert('Not allowed to remove past expenses');
        return;
      }
      // eslint-disable-next-line no-restricted-globals
      const result = confirm('Are you sure to remove this expense record');
      if (result) {
        this.removeTransaction(this.selectedTransaction._id)
          .then(() => {
            this.toast('Successfully deleted an expense record');
            this.$emit('deleted', this.selectedTransaction);
            this.$router.push('/transaction');
          });
      }
    },
  },
  created() {
    if (Object.keys(this.selectedTransaction).length === 0) {
      this.$router.push('/transaction');
    }
  },
};
</script>;
