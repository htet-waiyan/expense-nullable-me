<template>
  <div>
    <navbar v-if="showNav"/>
    <div>
      <div class="columns is-centered">
        <div class="column is-half">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    showNav() {
      return this.$route.matched.length === 0
        || this.$route.matched[0].props.default.showNav;
    },
  },
};
</script>

<style>
  .input-error {
    border: 2px solid #ddd;
  }
</style>
