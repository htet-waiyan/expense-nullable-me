import moment from 'moment';

export default {
  filters: {
    MMMFromX(value) {
      return moment(value, 'X').format('MMM');
    },
    DDFromX(value) {
      return moment(value, 'X').format('DD');
    },
    weekDayDayMonth(value) {
      return moment(value, 'YYYYMMDD').format('dddd, DD MMM YYYY');
    },
    MMMYYYYFromNum(value) {
      return moment(value, 'YYYYMM').format('MMM YYYY');
    },
    DDMMMYYYYfromX(value) {
      return moment(value, 'X').format('DD MMM YYYY');
    },
  },
};
