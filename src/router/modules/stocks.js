import Layout from "@/layout/index.vue";
import { createNameComponent } from "../createNode";
const route = [
  {
    path: "/stocks",
    component: Layout,
    redirect: "/stocks/cn-stocks-list",
    meta: {
      title: "message.menu.user",
      icon: "sfont system-document",
    },
    children: [
      {
        path: "cn-stocks-list",
        component: createNameComponent(() =>
          import("@/views/stocks/CnStocksList.vue")
        ),
        meta: { title: "message.menu.user" },
      },
      {
        path: "hk-stocks-list",
        component: createNameComponent(() =>
          import("@/views/stocks/HkStocksList.vue")
        ),
        meta: { title: "message.submenu.document.disclaimer" },
      },
    ],
  },
];

export default route;
