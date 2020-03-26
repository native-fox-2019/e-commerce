import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Product from '../views/Product.vue';
import Register from '../views/Register.vue';
import Cart from '../views/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
