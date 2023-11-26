import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/content",
    component: Home,
    meta: {
      title: "首页",
    },

    children: [
      {
        path: "content",
        name: "Content",
        component: () => import("../views/home/Content.vue"),
      },
      {
        path: "pins",
        name: "Pins",
        component: () => import("../views/pins/Pins.vue"),
      },

      {
        path: "search",
        name: "Search",
        meta: {
          title: "搜索",
        },
        component: () => import("../views/search/Search.vue"),
      },
      {
        path: "post/:id",
        name: "Post",
        meta: {
          title: "文章",
        },
        component: () => import("../views/post/Post.vue"),
      },
      {
        path: "user/:id",
        name: "Me",
        meta: {
          title: "个人主页",
        },
        component: () => import("../views/me/Me.vue"),
      },
      {
        path: "write",
        name: "Write",
        meta: {
          title: "创作",
        },
        component: () => import("../views/write/Write.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
