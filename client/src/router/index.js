import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthPage from '../views/AuthPage.vue'
import MainPage from '../views/MainPage.vue'
import CartPage from '../views/CartPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/auth',
    name: 'AuthPage',
    meta: { isLogin: true },
    component: AuthPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    meta: { requiresAuth: true },
    component: CartPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.access_token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isLogin)) {
    if (localStorage.access_token) {
      next({
        path: '/cart'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
