<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

=======
/**
 * @description 所有人可使用的参数配置列表
 * @params hideMenu: 是否隐藏当前路由结点不在导航中展示
 * @params alwayShow: 只有一个子路由时是否总是展示菜单，默认false
 */
import { reactive } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import NProgress from "@/utils/nprogress";
import { changeTitle } from "@/utils/title";

NProgress.configure({ showSpinner: false });

// 引入不需要权限的modules
import System from "@/router/modules/system";

// 引入modules
import Dashboard from "@/router/modules/dashboard";
import Document from "@/router/modules/document";

/**
 * @name 初始化必须要的路由
 * @description 使用reactive属性使得modules可以在路由菜单里面实时响应，搞定菜单回显的问题
 * @detail 针对modules的任何修改，均会同步至菜单级别，记住，是针对变量名为：moduels的修改
 **/
let modules = [...System];

const routes = modules;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let asyncRoutes = [...Dashboard, ...Document]; //

// 动态路由的权限新增，供登录后调用
export function addRoutes() {
  // 与后端交互的逻辑处理，处理完后异步添加至页面
  asyncRoutes.forEach((item) => {
    modules.push(item);
    router.addRoute(item);
  });
}

if (store.state.user.token) {
  addRoutes();
}

// 未授权时可访问的白名单
const whiteList = ["/login"];

// 路由跳转前的监听操作
router.beforeEach((to, _from, next) => {
  NProgress.start();
  if (store.state.user.token || whiteList.indexOf(to.path) !== -1) {
    to.meta.title ? changeTitle(to.meta.title) : ""; // 动态title
    next();
  } else {
    next("/login"); // 全部重定向到登录页
    to.meta.title ? changeTitle(to.meta.title) : ""; // 动态title
  }
});

// 路由跳转后的监听操作
/**
 * 根据路由的元数据中的 cache 属性判断是否需要缓存组件，并将需要缓存的组件名称添加到 Vuex store 的 keepAlive 模块中。
 * 这样可以在需要时保持这些组件的状态，以提高页面的加载性能和用户体验。
 */
router.afterEach((to, _from) => {
  // 从 Vuex store 的 keepAlive 模块的 getters 中获取 keepAliveComponentsName 数组。这个数组用于存储需要进行缓存的组件名称
  const keepAliveComponentsName =
    store.getters["keepAlive/keepAliveComponentsName"] || [];
  //  获取到当前路由匹配的组件，然后从中获取默认组件的名称。这个名称将用于判断是否需要缓存该组件
  const name = to.matched[to.matched.length - 1].components.default.name;
  // 是否需要将当前组件添加到缓存中
  if (
    to.meta &&
    to.meta.cache &&
    name &&
    !keepAliveComponentsName.includes(name)
  ) {
    store.commit("keepAlive/addKeepAliveComponentsName", name);
  }

  NProgress.done();
});

export { modules };

>>>>>>> dev
export default router;
