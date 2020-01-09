<template>
    <div class="columns is-mobile spllit-navbar is-vcentered">
      <div class="column is-gapless is-one-fifth">
        <button class="button is-white"
          @click="back">
          <v-icon name="chevron-left" />
        </button>
      </div>
      <div class="column is-gapless has-text-centered">
        Transaction
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
