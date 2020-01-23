<template>
  <div class="form-container">
    <h4 class="subtitle is-5">Create an account</h4>
    <div class="notification" v-if="registrationCompleted">
        <button class="delete"
          @click="registrationCompleted = false"></button>
          Activation email has been sent to {{ email }}.
          Please activate your account.
    </div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
          <input type="text" class="input" id="name"
            v-model="name"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
          <input type="email" class="input" id="email"
            v-model="email"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Currency</label>
      <div class="control">
        <select name="currency" id="" class="input"
         v-model="currency">
          <option
            v-for="curr in currencies"
            :key="curr.value"
            :value="curr.value">{{ curr.label }}</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
          <input type="password" class="input" id="amount"
            v-model="password"/>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control is-expanded">
        <button class="button is-dark is-fullwidth"
          @click="register">Create an account</button>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from '../../http';

export default {
  name: 'RegisterForm',
  data() {
    return {
      currencies: [
        {
          label: 'Singapore Dollar - SGD',
          value: 'SGD',
        },
        {
          label: 'Myanmar Kyat - MMK',
          value: 'MMK',
        },
      ],
      name: '',
      email: '',
      password: '',
      currency: '',
      registrationCompleted: false,
    };
  },
  methods: {
    register() {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        baseCurrency: this.currency,
      };
      http.post('/register', payload)
        .then(() => {
          this.registrationCompleted = true;
        });
    },
  },
};
</script>
