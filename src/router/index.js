import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    alias: '/channels',
    name: 'channels',
    component: () => import('../pages/channels.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login.vue')
  },
  {
    path: '/channel/new',
    name: 'new channel',
    component: () => import('../pages/channel/new.vue')
  },
  {
    path: '/channel/info/:id',
    name: 'info channel',
    component: () => import('../pages/channel/info.vue')
  },
  {
    path: '/channel/team/:id',
    name: 'team channel',
    component: () => import('../pages/channel/team.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
