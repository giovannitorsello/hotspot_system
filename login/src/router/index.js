import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/HomePage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/register',
        name: 'register',
        component: () => import ("../views/Register.vue")
    },
    {
        path: '/success',
        name: 'success',
        component: () => import ("../views/Success.vue")
    },
    {
        path: '/login_SMS',
        name: 'login_SMS',
        component: () => import ("../views/Login_SMS.vue")
    }, 
    {
        path: '/success_social',
        name: 'success_social',
        component: () => import ("../views/SuccessSocial.vue")
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
