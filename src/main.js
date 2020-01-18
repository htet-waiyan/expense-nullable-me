import 'bulma/css/bulma.min.css';
import 'v-calendar/lib/v-calendar.min.css';
import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon.vue';
import Toasted from 'vue-toasted';
import VCalendar from 'v-calendar';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFormatter from './mixins/dateformatter';
import numberFormatter from './mixins/numberFormatter';
import util from './mixins/util';
import currency from './mixins/currency';
import './registerServiceWorker';

Vue.component('v-icon', Icon);
Vue.use(VCalendar);
Vue.use(Toasted);
Vue.mixin(dateFormatter);
Vue.mixin(numberFormatter);
Vue.mixin(util);
Vue.mixin(currency);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
