<template>
    <div class="container-fluid has-text-grey-light">
        <div class="columns is-mobile is-vcentered">
            <div class="column is-one-fifth has-text-left">
                <span class="month-prev"
                  v-if="theYear >= minYear"
                  @click="prev()">
                  <v-icon name="caret-left" />
                </span>
            </div>
            <div class="column has-text-centered">
                {{ theYear }}
            </div>
            <div class="column is-one-fifth has-text-right">
                <span class="month-next"
                  @click="next()"
                  v-if="theYear < currentYear">
                  <v-icon name="caret-right" />
                </span>
            </div>
        </div>
        <div class="columns is-gapless is-mobile is-vcentered">
            <div class="column month has-text-centered">
              <span @click="selectMonth('01')">January</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('02')">February</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('03')">March</span>
            </div>
        </div>
        <div class="columns is-gapless is-mobile is-vcentered">
            <div class="column month has-text-centered">
              <span @click="selectMonth('04')">April</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('05')">May</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('06')">June</span>
            </div>
        </div>
        <div class="columns is-gapless is-mobile is-vcentered">
            <div class="column month has-text-centered">
              <span @click="selectMonth('07')">July</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('08')">August</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('09')">September</span>
            </div>
        </div>
        <div class="columns is-gapless is-mobile is-vcentered">
            <div class="column month has-text-centered">
              <span @click="selectMonth('10')">October</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('11')">November</span>
            </div>
            <div class="column month has-text-centered">
              <span @click="selectMonth('12')">December</span>
            </div>
        </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/caret-left';
import 'vue-awesome/icons/caret-right';

export default {
  name: 'CalendarMonth',
  props: {
    selectedYear: {
      type: Number,
      default: (() => new Date().getFullYear()),
    },
  },
  data() {
    return {
      theYear: this.selectedYear,
      minYear: 1900,
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    prev() {
      this.theYear = this.theYear - 1;
    },
    next() {
      this.theYear = this.theYear + 1;
    },
    selectMonth(month) {
      this.$emit('select-month', `${this.theYear}${month}`);
    },
  },
};
</script>

<style scoped>
  .month-selection-container {
    background-color: #fff;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .column.month:hover, span.month-prev, span.month-next {
    cursor: pointer;
  }
</style>
