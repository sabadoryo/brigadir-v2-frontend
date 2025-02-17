import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/authenticate',
      name: 'authenticate',
      component: () => import('../views/AuthenticateView.vue'),
    },
  ],
})

export default router
