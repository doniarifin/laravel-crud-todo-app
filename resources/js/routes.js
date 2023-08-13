import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '/resources/views/pages/NotFound.vue';
import { useStore } from 'vuex';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('/resources/views/pages/Login.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('/resources/views/pages/Home.vue'),
            meta: { requiresAuth: true },
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
router.beforeEach((to, from, next) => {
    const store = useStore();
    const authUser = store.getters.getToken;
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login" };
    if (reqAuth && (authUser == "" || authUser == null)) {
        next(loginQuery);
    } else {
        next();
    }
});

export default router;