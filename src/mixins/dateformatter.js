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
  },
};
