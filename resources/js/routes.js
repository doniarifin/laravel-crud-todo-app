import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '/resources/views/pages/NotFound.vue';
import { useStore } from 'vuex';
import { useToast } from "vue-toast-notification";
import { nextTick } from 'vue';
const toast = useToast();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
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
        axios.get('/api/user')
            .then((r) => {
                next();
            },
            (e) => {
                toast.error(e.response.data.message, {
                    position: 'top'
                });
                nextTick(()=>{
                    next(loginQuery);
                })
            });
    } else {
        next();
    }
});

export default router;