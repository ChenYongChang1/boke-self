import Vue from "vue";
import VueRouter from "vue-router";
import basicLayout from "../layout/basicLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "basic",
    component: basicLayout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "首页",
        component: () => import("../views/index/index.vue"),
      },
    ],
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../layout/detailLayout.vue"),
    redirect: "/detail/:id",
    children: [
      {
        path: "/detail/:id",
        name: "详情",
        component: () => import("../views/detail/detail.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
