import Layout from "@/layout/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";

// 라우트 배열에 타입 추가
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@pages/homepage/HomePage.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@pages/LoginPage.vue"),
      },
      {
        path: "signup",
        name: "signUp",
        component: () => import("@pages/SignUp.vue"),
      },
      {
        path: "admin",
        name: "adminPage",
        component: () => import("@pages/admin/AdminMainPage.vue"),
      },
    ],
  },
];

// 라우터 인스턴스 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
