import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("../views/routerView/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "/date",
        name: "date",
        component: () => import("../views/date/index.vue"),
      },
      {
        path: "/myOrder",
        name: "myOrder",
        component: () => import("../views/myOrder/index.vue"),
      },
      {
        path: "/helpCenter",
        name: "helpCenter",
        component: () => import("../views/helpCenter/index.vue"),
      },
      {
        path: "/noticeCenter",
        name: "noticeCenter",
        component: () => import("../views/noticeCenter/index.vue"),
      },
      {
        path: "/sellerEntery",
        name: "sellerEntery",
        component: () => import("../views/sellerEntery/index.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;
