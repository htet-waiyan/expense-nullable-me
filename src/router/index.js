/* eslint-disable no-param-reassign */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Transaction from '../views/Transaction/Index.vue';
import TransactionNew from '../views/Transaction/New.vue';
import TransactionMtd from '../views/Transaction/MtdList.vue';
import Allocation from '../views/Allocation/Index.vue';
import AllocationNew from '../views/Allocation/New.vue';
import AllocationList from '../views/Allocation/List.vue';
import Income from '../views/Income/Index.vue';
import IncomeNew from '../views/Income/New.vue';
import IncomeList from '../views/Income/List.vue';
import IndexPage from '../views/Login/Index.vue';
import ProfileIndex from '../views/Profile/Index.vue';
import ProfileSetting from '../views/Profile/Setting.vue';
import ConnectSocial from '../views/Connect.vue';

Vue.use(VueRouter);

const protectRoute = (to, from, next) => {
  const token = localStorage.getItem('auth_token');
  if (!token) return next('/');
  return next();
};

const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: IndexPage,
    props: { showNav: false },
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('auth_token');
      if (token) return next('/transaction');
      return next();
    },
  },
  {
    path: '/connect',
    name: 'ConnectSocial',
    component: ConnectSocial,
    props: { showNav: false },
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction,
    props: { showNav: true, label: 'Transaction' },
    children: [
      {
        path: '/',
        name: 'TransactionMtd',
        component: TransactionMtd,
        props: { showNav: true, label: 'Transaction', hideBack: true },
        beforeEnter: protectRoute,
      },
      {
        path: 'new',
        name: 'TransactionNew',
        component: TransactionNew,
        props: { showNav: true, label: 'Transaction', hideBack: true },
        beforeEnter(to, from, next) {
          if (from.name === 'TransactionMtd') {
            to.matched.forEach((r) => {
              if (r.name === to.name) {
                r.props.default.hideBack = false;
              }
            });
          } else {
            to.matched.forEach((r) => {
              if (r.name === to.name) {
                r.props.default.hideBack = true;
              }
            });
          }
          protectRoute(to, from, next);
        },
      },
    ],
  },
  {
    path: '/allocation',
    name: 'allocation',
    component: Allocation,
    props: { showNav: true, label: 'Allocation', hideBack: true },
    children: [
      {
        path: '',
        name: 'AllocationList',
        component: AllocationList,
        props: { showNav: true, label: 'Allocation', hideBack: true },
        beforeEnter: protectRoute,
      },
      {
        path: 'new',
        name: 'AllocationNew',
        component: AllocationNew,
        props: { showNav: true, label: 'Allocation' },
        beforeEnter: protectRoute,
      },
    ],
  },
  {
    path: '/income',
    name: 'income',
    component: Income,
    props: { showNav: true, label: 'Income' },
    children: [
      {
        path: '',
        name: 'IncomePage',
        component: IncomeList,
        props: { showNav: true, label: 'Income' },
        beforeEnter: protectRoute,
      },
      {
        path: 'new',
        name: 'IncomeNew',
        component: IncomeNew,
        props: { showNav: true, label: 'Income' },
        beforeEnter: protectRoute,
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileIndex,
    props: { showNav: true, label: 'Setting' },
    children: [
      {
        path: '',
        name: 'ProfileSettingPage',
        component: ProfileSetting,
        props: { showNav: true, label: 'Setting', hideBack: true },
        beforeEnter: protectRoute,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
