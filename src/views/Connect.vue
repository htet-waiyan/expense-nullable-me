<template>
  <div class="container is-fluid">
    Connecting......
  </div>
</template>

<script>
export default {
  name: 'ConnectSocial',
  created() {
    const { token } = this.$route.query;
    if (token) {
      localStorage.setItem('auth_token', token);
      return this.$router.push('/transaction');
    }
    return this.router.push('/');
  },
};
</script>
