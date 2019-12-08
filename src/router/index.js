import Vue from 'vue';
import VueRouter from 'vue-router';
import Transaction from '../views/Transaction/Index.vue';
import TransactionNew from '../views/Transaction/New.vue';
import TransactionMtd from '../views/Transaction/MtdList.vue';
import IndexPage from '../views/Login/Index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: IndexPage,
    props: { showNav: false },
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
