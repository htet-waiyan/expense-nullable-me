<template>
  <div class="currency-selection-container">
    <div class="columns is-mobile is-vcentered">
        <div class="column has-text-black-ter is-size-5">
            Available currencies
        </div>
    </div>
    <!-- <div class="columns is-mobile is-vcentered
      bd-b-1">
        <div class="column">
            {{ selectedBase.fullName }}
            <span class="tag is-light">
                {{ selectedBase.code }}
            </span>
        </div>
        <div class="column has-text-right">
            {{ selectedBase.symbol }}
        </div>
    </div>
    <div class="columns is-mobile is-vcentered
      bd-b-1">
        <div class="column has-text-grey-light">
          Please note that for now, changing the currency will not update
          the past expense, incomes and allocations with new currency exchange rate.
          (the feature is implementing in progress.)
        </div>
    </div> -->
    <div class="columns is-mobile is-vcentered
      bd-b-1"
      v-for="(currency, code) in currencies"
      :key="code"
      @click="selectCurrency(code)"
        style="cursor: pointer;">
        <div class="column">
            {{ currency.fullName }}
            <span class="tag is-light">
                {{ selectedBase.code }}
            </span>
        </div>
        <div class="column has-text-right">
            {{ currency.symbol }}
        </div>
    </div>
  </div>
</template>

<script>
import constant from '../../constant';

export default {
  name: 'CurrencySelection',
  props: {
    saveAndRedirect: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    currencies() {
      return constant.CURRENCIES;
    },
    baseCurrency() {
      return this.$store.state.profile.baseCurrency || 'SGD';
    },
    selectedBase() {
      return this.currencies[this.baseCurrency];
    },
  },
  methods: {
    selectCurrency(currency) {
      return this.$emit('currencySelected', currency);
    },
  },
};
</script>
