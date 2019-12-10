import 'bulma/css/bulma.min.css';
import 'v-calendar/lib/v-calendar.min.css';
import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon.vue';
import VCalendar from 'v-calendar';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFormatter from './mixins/dateformatter';
import './registerServiceWorker';

Vue.component('v-icon', Icon);
Vue.use(VCalendar);
Vue.mixin(dateFormatter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
