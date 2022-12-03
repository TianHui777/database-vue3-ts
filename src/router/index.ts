import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requireAuth: true,
      },
    },

    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/course",
      name: "course",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CourseView.vue"),
    },
    {
      path: "/study",
      name: "study",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/StudyView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AdministratorView.vue"),
      redirect: "adminHome",
      children: [
        {
          path: "/admin",
          name: "adminHome",
          component: () => import("../components/adminLayout/AdminHome.vue"),
        },
        {
          //课程资料管理
          path: "/fileManagement",
          name: "fileManagement",
          component: () =>
            import("../components/adminLayout/Management/FileManagement.vue"),
        },
        {
          //课程分类管理
          path: "/typeManagement",
          name: "typeManagement",
          component: () =>
            import("../components/adminLayout/Management/TypeManagement.vue"),
        },
        {
          //课程信息管理
          path: "/infoManagement",
          name: "infoManagement",
          component: () =>
            import("../components/adminLayout/Management/InfoManagement.vue"),
        },
      ],
    },
  ],
});

//登录权限设置
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.localStorage.getItem("token")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
