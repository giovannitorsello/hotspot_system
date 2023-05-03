import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Homepage.vue')
    
  },
  {
    path: '/home',
    name: 'dashboardHotel',
    component: () => import('../views/DashboardHotel.vue')
    
  },
  {
    path: '/ticket',
    name: 'ticketHotel',
    component: () => import('../views/TicketHotel.vue')
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('../views/Customers.vue')
  },
  {
    path: '/resellers',
    name: 'resellers',
    component: () => import('../views/Resellers.vue')
  },
  {
    path: '/websurfers',
    name: 'websurfers',
    component: () => import('../views/Websurfers.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: () => import('../views/Tickets.vue')
  },
  {
    path: '/radius',
    name: 'radius',
    component: () => import('../views/Radius.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
