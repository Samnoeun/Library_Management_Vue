import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/books",
      name: "books",
      component: () => import("../views/AboutView.vue")
    },
    { 
      path: "/members",
      name: "members",
      component: () => import("../views/MemberView.vue")
    },
    {
      path: '/borrowings',
      name: 'borrowings',
      component: () => import('../views/BorrowView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }

      
  ]
});

export default router;
