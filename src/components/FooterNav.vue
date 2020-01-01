<template>
    <div class="columns footer-nav is-mobile is-vcentered">
      <div class="column has-text-centered">
        <button class="button is-white"
          @click="goTo('/transaction')">
          <v-icon name="money-check-alt"/>
        </button>
      </div>
      <div class="column has-text-centered">
        <button class="button is-white">
          <v-icon name="coins"/>
        </button>
      </div>
      <div class="column has-text-centered">
        <button class="button is-white"
          @click="goTo('/transaction/new')">
          <v-icon name="plus"/>
        </button>
      </div>
      <div class="column has-text-centered">
        <button class="button is-white"
          @click="goTo('/allocation')">
          <v-icon name="wallet"/>
        </button>
      </div>
      <div class="column has-text-centered">
        <button class="button is-white">
          <v-icon name="chart-pie"/>
        </button>
      </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/chevron-left';
import 'vue-awesome/icons/user';
import 'vue-awesome/icons/money-check-alt';
import 'vue-awesome/icons/coins';
import 'vue-awesome/icons/chart-pie';
import 'vue-awesome/icons/wallet';

export default {
  name: 'Navbar',
  methods: {
    goTo(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
  .footer-nav {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
    padding-top: 10px;
    padding-bottom: 30px;
    background-color: #fff;
    border-top: 0.5px solid #ddd;
  }
</style>
