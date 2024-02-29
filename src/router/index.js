import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index";

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
    meta: { auth: "required" },
    component: () => import('../pages/channel/new.vue')
  },
  {
    path: '/channel/info/:uid',
    name: 'info channel',
    meta: { auth: "requiredTeam" },
    component: () => import('../pages/channel/info.vue')
  },
  {
    path: '/channel/team/:uid',
    name: 'team channel',
    meta: { auth: "requiredTeam" },
    component: () => import('../pages/channel/team.vue')
  },
  {
    path: '/channel/new/player',
    name: 'new player',
    meta: { auth: "requiredTeam" },
    component: () => import('../pages/channel/players/new.vue')
  },
  {
    path: '/channel/player/:uid',
    name: 'player info',
    meta: { auth: "requiredTeam" },
    component: () => import('../pages/channel/players/info.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../pages/404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const logged = store.state.logged;
  const team = store.state.team;
  if (to.meta.auth == "requiredTeam" && team) {
    next();
  } else if (to.meta.auth == "requiredTeam" && !team) {
    next({ path: "/" });
  } else {
    to.meta.auth == "required" && !logged ? next({ path: "/login" }) : next();    
  }
});

export default router
