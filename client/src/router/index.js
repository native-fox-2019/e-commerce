import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from '../views/Admin.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Panel from '../views/Panel.vue';
import Add from '../views/AddProduct.vue';
import ViewProduct from '../views/ViewProduct.vue';
import Home from '../views/Home.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Confirm from '../views/Confirm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true },
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/admin/panel',
    name: 'Panel',
    component: Panel,
    meta: { requiresAuthAdmin: true },
  },
  {
    path: '/admin/add',
    name: 'Add',
    component: Add,
    meta: { requiresAuthAdmin: true },
  },
  {
    path: '/admin/view',
    name: 'ViewProduct',
    component: ViewProduct,
    meta: { requiresAuthAdmin: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        name: 'UserLogin',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuthAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        name: 'Login',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});
export default router;
