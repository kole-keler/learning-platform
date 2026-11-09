import { createRouter, createWebHistory } from 'vue-router'
import Assignment3 from '../views/Assignment3.vue'

const routes = [
  {
    path: '/',
    redirect: '/assignment3'
  },
  {
    path: '/assignment3',
    name: 'Assignment3',
    component: Assignment3,
    meta: { title: '智学云课堂' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
