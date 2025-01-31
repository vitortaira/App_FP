import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddTransactionView from '../views/AddTransactionView.vue';
import ChartView from '../views/ChartView.vue';
import SummaryView from '../views/SummaryView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/add',
    name: 'AddTransaction',
    component: AddTransactionView,
    meta: { title: 'Add Transaction' },
  },
  {
    path: '/summary',
    name: 'Summary',
    component: SummaryView,
    meta: { title: 'Summary Report' },
  },
  {
    path: '/',
    redirect: '/summary',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
