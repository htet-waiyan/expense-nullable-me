<template>
  <div class="form-container">
    <div class="login-form" v-if="isLoginForm">
      <h3 class="subtitle is-4">Spllit</h3>
      <h4 class="subtitle is-5">A simple way to track all your expenses at one place.</h4>
      <div class="field">
        <a href="http://localhost:3001/auth/connect"
          class="button is-dark is-fullwidth">Login with Google</a>
      </div>
    </div>
    <div class="otp-form" v-if="isOtpForm">
      <otp-form
        :user="userId"
        :phoneOrEmail="phoneOrEmail"/>
    </div>
  </div>
</template>

<script>
import OtpForm from './OtpForm.vue';
import { auth } from '../../http';

export default {
  name: 'LoginForm',
  components: {
    OtpForm,
  },
  data() {
    return {
      currentForm: 'Login',
      phoneOrEmail: '',
      userId: '',
    };
  },
  computed: {
    isLoginForm() {
      return this.currentForm === 'Login';
    },
    isOtpForm() {
      return this.currentForm === 'OTP';
    },
    isSignupForm() {
      return this.currentForm === 'SignUp';
    },
  },
  methods: {
    sendOtp() {
      auth.post('/auth/otp', { phoneOrEmail: this.phoneOrEmail })
        .then((response) => {
          if (response.data.registeredRequired) {
            this.currentForm = 'SignUp';
          } else {
            this.currentForm = 'OTP';
            this.userId = response.data.user._id;
          }
        });
      // TODO: catch error and toast
    },
  },
};
</script>

<style scoped>
  .form-container {
    margin-top: 2em;
  }
</style>
