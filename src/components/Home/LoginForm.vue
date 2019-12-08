<template>
  <div class="form-container">
    <div class="login-form" v-if="isLoginForm">
      <h3 class="subtitle is-4">Enter email or phone to get OTP</h3>
      <h4 class="subtitle is-5">e.g +655745675656 or jon@gmail.com</h4>
      <div class="field">
          <label for="phoneOrEmail" class="label">Email or Phone</label>
          <div class="form-control">
              <input type="number" class="input" id="phoneOrEmail"
                v-model="phoneOrEmail"/>
          </div>
      </div>
      <div class="field">
        <button class="button is-black"
          @click="sendOtp">Send OTP</button>
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
