import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from '../views/Admin.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Panel from '../views/Panel.vue';
import Add from '../views/AddProduct.vue';
import ViewProduct from '../views/Product.vue';
import Home from '../views/Home.vue';
import UserLogin from '../views/UserLogin.vue';

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
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/admin/panel',
    name: 'Panel',
    component: Panel,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/add',
    name: 'Add',
    component: Add,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/view',
    name: 'ViewProduct',
    component: ViewProduct,
    meta: { requiresAuth: true },
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
