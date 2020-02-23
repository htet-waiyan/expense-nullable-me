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
            <span class="has-text-grey" style="cursor: pointer;">
              {{ currencies[profile.baseCurrency].code }}
            </span>
        </div>
    </div>
    <div class="columns is-mobile is-vcentered setting-row">
        <div class="column save has-text-weight-bold">
            Total Income
        </div>
        <div class="column has-text-right has-text-grey-light">
            <router-link to="/income"
              class="has-text-grey">
              {{ currencyCode }}{{ totalIncome }}
              <v-icon name="chevron-right" scale="0.7"/>
            </router-link>
        </div>
    </div>
    <!-- <div class="columns is-mobile is-vcentered setting-row">
        <div class="column save has-text-grey">
            Logout
        </div>
        <div class="column has-text-right has-text-grey-light">
            <button class="button is-white has-text-grey"
              @click="logout">
              <v-icon name="sign-out-alt"/>
            </button>
        </div>
    </div> -->
  </div>
</template>

<script>
import 'vue-awesome/icons/chevron-right';
import 'vue-awesome/icons/sign-out-alt';
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
    ...mapActions(['fetchProfile', 'fetchTotalIncome', 'setBaseCurrency']),
    selectBaseCurrency(base) {
      this.setBaseCurrency(base);
      this.$router.push('/currency');
    },
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
