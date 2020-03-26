import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Product from '../views/MainPage.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import Order from '../views/Order.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/login',
        name: 'Login',
        meta: {
            isAlreadyLogin: true
        },
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            isAlreadyLogin: true
        },
        component: Register
    },
    {
        path: '/',
        name: 'MainPage',
        component: Product
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        meta: {
            requireLogin: true
        },
        component: ProductDetail
    },
    {
        path: '/cart',
        name: 'Cart',
        meta: {
            requireLogin: true
        },
        component: Cart
    },
    {
        path: '/order',
        name: 'Order',
        meta: {
            requireLogin: true
        },
        component: Order
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin)) {
        if (!localStorage.getItem('access_token')) {
            next({
                path: '/login'
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.isAlreadyLogin)) {
        if (localStorage.getItem('access_token')) {
            next({
                path: '/'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;