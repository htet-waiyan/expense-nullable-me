<template>
  <div>
    <navbar/>
    <div class="is-fluid container">
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
};
</script>
