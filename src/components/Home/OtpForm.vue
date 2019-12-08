<template>
    <div>
        <h3 class="subtitle is-5">
            Please enter otp sent to your email or phone
        </h3>
        <div class="field">
            <label for="otp" class="label">OTP</label>
            <div class="control">
                <input type="number" class="input"
                  v-model="otp">
            </div>
        </div>
        <div class="field">
           <button class="button is-black"
             @click="login">Login</button>
        </div>
    </div>
</template>

<script>
import { auth } from '../../http';

export default {
  name: 'OtpForm',
  props: ['user', 'phoneOrEmail'],
  data() {
    return {
      otp: '',
    };
  },
  methods: {
    login() {
      const payload = {
        user: this.user,
        phoneOrEmail: this.phoneOrEmail,
        otp: this.otp,
      };
      auth.post('/auth', payload)
        .then((response) => {
          localStorage.setItem('auth_token', response.data.token);
          this.$router.push('/transaction');
        });
      // TODO: catch error
    },
  },
};
</script>
