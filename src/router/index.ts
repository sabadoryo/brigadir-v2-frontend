import { useAuth } from '@/stores/authStore'
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
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/authenticate',
      name: 'authenticate',
      component: () => import('../views/AuthenticateView.vue'),
    },
    {
      path: '/lobby/:matchId',
      name: 'lobby',
      component: () => import('../views/LobbyView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/match/:matchId',
      name: 'match',
      component: () => import('../views/MatchView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/matchlist',
      name: 'matchlist',
      component: () => import('../views/MatchListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/players/:username',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuth()
  console.log('before each')
  console.log(to.name)
  if (to.meta.requiresAuth && !authStore.token) {
    console.log('requires auth')
    next('/login')
  } else if (to.name === 'not-found') {
    console.log('not found')
    next(authStore.token ? '/home' : '/login')
  } else {
    console.log('else')
    next()
  }
})

export default router
