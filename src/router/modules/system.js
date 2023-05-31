import Layout from "@/layout/index.vue";
import { createNameComponent } from "../createNode";
const route = [
  {
    path: "/system",
    component: Layout,
    redirect: "/404",
    hideMenu: true,
    meta: { title: "message.system.name" },
    children: [
      {
        path: "/404",
        component: createNameComponent(() =>
          import("@/views/auth/PageNotFound.vue")
        ),
        meta: {
          title: "message.system.statusCode.pageNotFound",
          hideTabs: true,
        },
      },
      {
        path: "/redirect/:path(.*)",
        component: createNameComponent(() =>
          import("@/views/auth/PageRedirect.vue")
        ),
        meta: { title: "message.system.statusCode.redirect", hideTabs: true },
      },
    ],
  },
  {
    path: "/login",
    component: createNameComponent(() => import("@/views/auth/LoginView.vue")),
    hideMenu: true,
    meta: { title: "message.system.login", hideTabs: true },
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    component: Layout,
    redirect: "/404",
    hideMenu: true,
    meta: { title: "" },
  },
];

export default route;
