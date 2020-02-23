export default {
  filters: {
    to2Decimal(value) {
      return parseFloat(Math.round(value * 100) / 100).toFixed(2);
    },
  },
};
