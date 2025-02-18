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
    {
      path: '/match/:id',
      name: 'match',
      component: () => import('../views/MatchView.vue'),
    },
    {
      path: '/matchlist',
      name: 'matchlist',
      component: () => import('../views/MatchListView.vue'),
    },
  ],
})

export default router
