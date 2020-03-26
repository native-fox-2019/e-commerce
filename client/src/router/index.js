import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AllCategory from '../views/AllCategory'
import Login from '../views/Login'
import Register from '../views/Register'
import Admin from '../views/Admin'
import AdminPage from '../views/AdminPage'
import Edit from '../views/Edit'
import Detail from '../components/Detail'
import Checkout from '../views/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/allCategory',
    name: 'AllCategory',
    component: AllCategory,
    meta: { requiresAuth: true }
  },
  {
    path : '/login',
    name : "Login",
    component : Login
  },
  {
    path : '/register',
    name : "Register",
    component : Register
  },
  {
    path : '/admin',
    name :'Admin',
    component : AdminPage
  },
  {
    path : '/adminpage',
    name :'AdminPage',
    component : Admin
  },
  {
    path : '/edit/:id',
    name : 'Edit',
    component : Edit
  },
  {
    path : '/detail/:id',
    name : 'Detail',
    component : Detail
  },
  {
    path : '/checkout',
    name : 'Checkout',
    component : Checkout
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})



export default router
