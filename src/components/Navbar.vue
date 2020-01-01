<template>
    <div class="columns is-mobile is-vcentered">
      <div class="column is-one-fifth">
        <button class="button is-white"
          @click="back">
          <v-icon name="chevron-left" />
        </button>
      </div>
      <div class="column has-text-centered">
        Transaction
      </div>
      <div class="column is-one-fifth has-text-right">
        <button class="button is-white">
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
  },
};
</script>
