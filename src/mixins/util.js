export default {
  methods: {
    toast(message) {
      this.$toasted.show(message, {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 5000,
        fullWidth: true,
        fitsToScreen: true,
        Icon: 'check-circle',
      });
    },
  },
};
