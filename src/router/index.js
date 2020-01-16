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

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: IndexPage,
    props: { showNav: false },
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction,
    props: { showNav: true },
    children: [
      {
        path: '/',
        name: 'TransactionMtd',
        component: TransactionMtd,
        props: { showNav: true },
      },
      {
        path: 'new',
        name: 'TransactionNew',
        component: TransactionNew,
        props: { showNav: true },
      },
    ],
  },
  {
    path: '/allocation',
    name: 'allocation',
    component: Allocation,
    props: { showNav: true },
    children: [
      {
        path: '',
        name: 'AllocationList',
        component: AllocationList,
        props: { showNav: true },
      },
      {
        path: 'new',
        name: 'AllocationNew',
        component: AllocationNew,
        props: { showNav: true },
      },
    ],
  },
  {
    path: '/income',
    name: 'income',
    component: Income,
    props: { showNav: true },
    children: [
      {
        path: '',
        name: 'IncomePage',
        component: IncomeList,
        props: { showNav: true },
      },
      {
        path: 'new',
        name: 'IncomeNew',
        component: IncomeNew,
        props: { showNav: true },
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileIndex,
    props: { showNav: true },
    children: [
      {
        path: '',
        name: 'ProfileSettingPage',
        component: ProfileSetting,
        props: { showNav: true },
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
