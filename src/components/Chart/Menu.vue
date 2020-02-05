<template>
  <div class="chart-menu-container">
    <div class="columns is-mobile is-vcentered menu-row"
       @click="goTo('/chart/expense')"
       style="cursor: pointer;">
        <div class="column">
            Expense Graph
        </div>
        <div class="column has-text-right">
            <span class="has-text-grey" style="cursor: pointer;">
              <v-icon name="chevron-right" scale="0.7"/>
            </span>
        </div>
    </div>
    <div class="columns is-mobile is-vcentered menu-row"
       style="cursor: pointer;">
        <div class="column">
            Saving Graph
        </div>
        <div class="column has-text-right">
            <span class="has-text-grey">
              <v-icon name="chevron-right" scale="0.7"/>
            </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartMenu',
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
  .menu-row {
    border-bottom: 1px solid #ddd;
  }
</style>
