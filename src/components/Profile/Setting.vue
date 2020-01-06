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
            <router-link :to="{ name: '' }">
              {{ currencies[profile.baseCurrency].code }}
            </router-link>
        </div>
    </div>
    <div class="columns is-mobile is-vcentered setting-row">
        <div class="column save has-text-weight-bold">
            Total Income
        </div>
        <div class="column has-text-right">
            <router-link :to="{ name: '' }">
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
    ...mapGetters(['profile', 'totalIncome']),
  },
  methods: {
    ...mapActions(['fetchProfile', 'fetchTotalIncome']),
  },
  created() {
    if (Object.keys(this.profile).length === 0) {
      this.fetchProfile()
        .then(() => {
          this.profileFetchReady = true;
        });
    }
    if (this.totalIncome < 0) {
      this.fetchTotalIncome();
    }
  },
};
</script>

<style scoped>
  .setting-row {
    border-bottom: 1px solid #ddd;
  }
</style>
