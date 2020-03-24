import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta : {requiresAuth:true},
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta : {isLogin:true},
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta : {isLogin:true},
    component: Register
  },
]

const router = new VueRouter({
  mode : 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isLogin)) {
    if (localStorage.getItem('token')) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } 
  else {
    next()
  }
})

export default router
