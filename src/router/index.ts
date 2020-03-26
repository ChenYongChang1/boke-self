import Vue from 'vue';
import VueRouter from 'vue-router';
import basicLayout from '../layout/basicLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'basic',
    component: basicLayout,
    redirect: "/index",
    children: [
      {
        path:'/index',
        name:'首页',
        component:(resolve:any) => require(['../views/index/index.vue'], resolve)
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
