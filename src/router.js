//Vanessa Gutierrez 03/06/2021
import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Secret from './views/Secret.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'

import { isAuthenticated } from './helpers/useAuth'

const routes = [
  { path: '/', component: Home },
  {
    path: '/secret',
    component: Secret,
    beforeEnter: (to, from) => {
      if (isAuthenticated.value) return true
      return '/login'
    },
  },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
