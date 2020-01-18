export default {
  computed: {
    baseCurrency() {
      return this.$store.state.baseCurrency;
    },
    currencyCode() {
      return this.$store.state.currencyCode;
    },
  },
};
