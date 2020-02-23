<template>
  <div class="container is-fluid">
    <div v-if="requiredRegistration">
      <profile-setup
        :newUserId="newUserId"/>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/chevron-left';
import ProfileSetup from '../components/Profile/Setup.vue';

export default {
  name: 'ConnectSocial',
  components: {
    ProfileSetup,
  },
  data() {
    return {
      requiredRegistration: false,
      position: 0,
      newUserId: '',
    };
  },
  methods: {
    next() {
      this.position = this.position + 1;
    },
  },
  created() {
    const { token, newUser } = this.$route.query;
    if (token) {
      localStorage.setItem('auth_token', token);
    }
    if (token && newUser) {
      this.requiredRegistration = true;
      this.newUserId = newUser;
    } else if (token && !newUser) {
      this.$router.push('/transaction');
    } else this.$router.push('/');
  },
};
</script>
