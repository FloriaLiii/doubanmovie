import home from '../views/home/home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter ({
    history: createWebHistory(),
    routes:[
        { path: '/' , redirect: '/home' },
        { path: '/home' , component: home },
        { path: '/login' , component: () => import('../views/login/login.vue') },
        { path: '/detail' , component: () => import('../views/detail/detail.vue') },
        { path: '/publish' , component: () => import('../views/publish/publish.vue') },
        { path: '/search' , component: () => import('../views/search/search.vue') },
    ]
})

export default router;