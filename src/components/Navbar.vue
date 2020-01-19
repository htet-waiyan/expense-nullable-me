<template>
    <div class="columns is-mobile spllit-navbar is-vcentered">
      <div class="column is-gapless is-one-fifth">
        <button class="button is-white"
          v-if="!hideBackButton"
          @click="back">
          <v-icon name="chevron-left" />
        </button>
      </div>
      <div class="column is-gapless has-text-centered">
        {{ navTitle }}
      </div>
      <div class="column is-gapless is-one-fifth has-text-right">
        <button class="button is-white"
          @click="goToProfile()">
          <v-icon name="user"/>
        </button>
      </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/chevron-left';
import 'vue-awesome/icons/user';

export default {
  name: 'Navbar',
  computed: {
    navTitle() {
      const route = this.$route.matched.find(r => r.name === this.$route.name);
      if (route) {
        return route.props.default.label;
      }
      return '';
    },
    hideBackButton() {
      const route = this.$route.matched.find(r => r.name === this.$route.name);
      if (route) {
        return route.props.default.hideBack;
      }
      return true;
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goToProfile() {
      this.$router.push('/profile');
    },
  },
};
</script>

<style scoped>
  .spllit-navbar {
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    z-index: 1030;
    background-color: #fff;
  }
</style>
