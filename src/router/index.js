import Vue from "vue";
import VueRouter from "vue-router";
//import Login from "../views/Login/index.vue";
Vue.use(VueRouter);

// 路由
const routes = [
  {
    // 根目录
    path: "/",
    redirect: "login",
  },
  {
    // 配置路由
    path: "/login",
    name: "Login",
    // component: Login, // 引用组件，需要在上面配置
    component: () => import("../views/Login/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
