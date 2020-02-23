<template>
  <div>
    <div class="columns">
      <div class="column">
        <button class="button"
          @click="goToNew">
          <span>Add</span>
          <span class="icon">
            <v-icon name="plus"/>
          </span>
        </button>
      </div>
    </div>
    <div class="columns">
      <div class="column has-text-grey-light is-size-7">
        Click to edit the allocation.
        Past allocation are not allowed to modify.
      </div>
    </div>
    <div class="columns allocation div is-mobile is-vcentered"
      v-for="(period) in mapSorted"
      :key="period">
      <div class="column">
        <span class="has-text-grey-light">
          {{ period | MMMYYYYFromNum }}
        </span>
        <div class="columns is-mobile allocation"
          @click="onSelectAllocation(periodMaps[period])">
          <div class="column is-one-quarter">
            <div class="save has-text-weight-bold">Save</div>
            <div class="expense has-text-weight-bold">Expense</div>
          </div>
          <div class="column has-text-right">
            <div class="save">{{ currencyCode }}{{ periodMaps[period].savingAmount }}</div>
            <div class="expense">{{ currencyCode }}{{ periodMaps[period].expenseAmount }}</div>
          </div>
        </div>
      </div>
      <!-- <div class="column has-text-right">
          <button class="button is-white">
              <v-icon name="search" @click="goToNew"/>
          </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/search';
import moment from 'moment';
import { http } from '../../http';

export default {
  name: 'AllocationIndex',
  data() {
    return {
      periodMaps: {},
    };
  },
  computed: {
    mapSorted() {
      if (Object.keys(this.periodMaps).length > 0) {
        return Object.keys(this.periodMaps).sort((a, b) => b - a);
      }
      return {};
    },
  },
  methods: {
    goToNew() {
      this.$router.push('/allocation/new');
    },
    getAllocationByMonth() {
      return http.get('/allocation')
        .then((response) => {
          this.periodMaps = response.data;
        });
    },
    onSelectAllocation(allocation) {
      if (+moment().format('YYYYMM') !== allocation.period) return;
      this.$store.commit('allocation/SET_ALLOCATION', allocation);
      this.$router.push('/allocation/new?action=edit');
    },
  },
  created() {
    this.getAllocationByMonth();
  },
};
</script>

<style scoped>
  .allocation {
    border-bottom: 1px solid #ddd;
  }
  .allocation:last-of-type {
    border-bottom: none;
  }
</style>
