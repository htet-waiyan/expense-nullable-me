<template>
  <div>
    <navbar v-if="showNav"/>
    <div class="all-main-content">
      <div class="columns is-centered">
        <div class="column is-half">
          <router-view/>
        </div>
      </div>
    </div>
    <footer-nav v-if="showNav" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import FooterNav from './components/FooterNav.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    FooterNav,
  },
  computed: {
    showNav() {
      return this.$route.matched.length === 0
        || this.$route.matched[0].props.default.showNav;
    },
  },
  created() {
    const isAuth = localStorage.getItem('auth_token');
    if (isAuth) {
      this.$store.dispatch('profile/fetchProfile');
    }
  },
};
</script>

<style>
  html,body {
    height: 100%;
  }
  .input-error {
    border: 2px solid #ddd;
  }
  .bd-b-1 {
    border-bottom: 1px solid #ddd;
  }
  .mt-2 {
    margin-top: 2em;
  }
  .mb-2 {
    margin-bottom: 2em;
  }
  .mb-3 {
    margin-bottom: 3em;
  }
  .mb-5 {
    margin-bottom: 5em;
  }
  .mb-7 {
    margin-bottom: 7em;
  }
  .bd-b-l-1:last-of-type {
    border-bottom: 1px solid #ddd;
  }

  .all-main-content {
    margin-top: 5em;
  }
</style>
