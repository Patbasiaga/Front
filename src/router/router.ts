import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Navigation from '@/components/Navigation/setup.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    components: {
      content: () => import('@/views/Home.vue'),
      navigation: Navigation
    }
  },
  {
    path: '/mqtt',
    name: 'MQTT',
    components: {
      content: () => import('@/views/MQTT.vue'),
      navigation: Navigation
    }
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      content: () => import('@/views/Login.vue'),
      navigation: Navigation
    },
    meta: {
      authenticationRequired: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
