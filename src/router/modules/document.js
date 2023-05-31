import { Route } from "../index.type";
import Layout from "@/layout/index.vue";
import { createNameComponent } from "../createNode";
const route = [
  {
    path: "/document",
    component: Layout,
    redirect: "/document/copyright",
    meta: {
      title: "message.menu.document",
      icon: "sfont system-document",
    },
    children: [
      {
        path: "copyright",
        component: createNameComponent(() =>
          import("@/views/docs/SiteInfo.vue")
        ),
        meta: { title: "message.submenu.document.copyright" },
      },
      {
        path: "disclaimer",
        component: createNameComponent(() =>
          import("@/views/docs/SiteInfo.vue")
        ),
        meta: { title: "message.submenu.document.disclaimer" },
      },
    ],
  },
];

export default route;
