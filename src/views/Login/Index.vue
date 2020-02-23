<template>
   <div class="container is-fluid">
     <login-form/>
   </div>
</template>

<script>
import LoginForm from '../../components/Home/LoginForm.vue';

export default {
  name: 'LoginIndex',
  components: {
    LoginForm,
  },
};
</script>
