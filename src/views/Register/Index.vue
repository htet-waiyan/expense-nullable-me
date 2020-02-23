<template>
    <div class="container is-fluid">
        <register-form/>
    </div>
</template>

<script>
import RegisterForm from '../../components/Profile/Register.vue';

export default {
  name: 'RegisterIndex',
  components: {
    RegisterForm,
  },
};
</script>
