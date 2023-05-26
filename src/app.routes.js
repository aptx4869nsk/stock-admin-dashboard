import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView";
import AdminDashboard from "@/views/AdminDashboard";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: AdminDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
