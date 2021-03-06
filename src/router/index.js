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
        path: "/receiveAward",
        name: "receiveAward",
        component: () => import("../views/receiveAward/index.vue"),
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
        path: "/notice-detail",
        name: "noticeDetail",
        component: () => import("../views/noticeCenter/detail.vue"),
      },
      {
        path: "/sellerEntery",
        name: "sellerEntery",
        component: () => import("../views/sellerEntery/index.vue"),
      },
      {
        path: "/drop-activity",
        name: "DropActivity",
        component: () => import("../views/dropActivity/index.vue"),
      },
      {
        path: "/drop-activity-detail",
        name: "DropActivityDetail",
        component: () => import("../views/dropActivity/detail.vue"),
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

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
