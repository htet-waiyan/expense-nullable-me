<template>
  <div class="profile-container" v-if="profileFetchReady">
    <div class="columns setting-row">
        <div class="column">
            <div class="save has-text-weight-bold">{{ profile.name }}</div>
            <div>{{ profile.email }}</div>
        </div>
    </div>
    <div class="columns is-mobile is-vcentered setting-row">
        <div class="column save has-text-weight-bold">
            Base Currency
        </div>
        <div class="column has-text-right">
            <router-link :to="{ name: '' }"
              class="has-text-grey">
              {{ currencies[profile.baseCurrency].code }}
            </router-link>
        </div>
    </div>
    <div class="columns is-mobile is-vcentered setting-row">
        <div class="column save has-text-weight-bold">
            Total Income
        </div>
        <div class="column has-text-right has-text-grey-light">
            <router-link to="/income"
              class="has-text-grey">
              {{ currencies[profile.baseCurrency].symbol }}{{ totalIncome }}
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import constant from '../../constant';

const { mapActions, mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'ProfileSetting',
  data() {
    return {
      currencies: constant.CURRENCIES,
      profileFetchReady: false,
    };
  },
  computed: {
    ...mapGetters(['profile', 'totalIncome', 'baseCurrency']),
  },
  methods: {
    ...mapActions(['fetchProfile', 'fetchTotalIncome']),
  },
  created() {
    this.fetchProfile()
      .then(() => {
        this.profileFetchReady = true;
      });
    this.fetchTotalIncome();
  },
};
</script>

<style scoped>
  .setting-row {
    border-bottom: 1px solid #ddd;
  }
</style>
