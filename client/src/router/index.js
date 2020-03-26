import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import UserCart from '../views/UserCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    meta: {open: true}
  },
  {
    path: '/products',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/cart',
    name: 'UserCart',
    component: UserCart,
    meta: {requiresAuth: true}
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
        path: '/products'
      })
    } else {
      next()
    }
  } else {
    next()
  }

  if (to.matched.some(record => record.meta.open)) {
    if (!localStorage.getItem('token') || localStorage.getItem('token')) {
      next({
        path: '/products'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
