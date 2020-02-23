export default {
  computed: {
    baseCurrency() {
      return this.$store.state.profile.baseCurrency;
    },
    currencyCode() {
      return this.$store.state.profile.currencyCode;
    },
  },
};
