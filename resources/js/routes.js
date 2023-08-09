import {createRouter, createWebHistory} from 'vue-router';
import NotFound from '/resources/views/pages/NotFound.vue'; 

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('/resources/views/pages/Login.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('/resources/views/pages/Home.vue'),
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('/resources/views/pages/Register.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound,
        },
    ],
});

export default router;