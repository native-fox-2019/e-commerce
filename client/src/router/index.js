import Vue from 'vue'
import VueRouter from 'vue-router'
import { generatingJWT, veryfingJWT } from '../components/helper/jwt'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/404.vue'
import Login from '../components/Login.vue'
import ListProduct from '../components/customer/ListProduct.vue'
import Detail from '../components/customer/DetailProduct.vue'
import Cart from '../components/customer/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: '/',
        name: 'ListProduct',
        component: ListProduct
      }
    ]

  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next('/NotFound')
      } else {
        const token = localStorage.getItem('token')
        const user = veryfingJWT(token)
        next()
        if (user.role == 'admin') {
          next()
        } else if (user.role !== 'admin') {
          // console.log('404')
          // next('/menu/baju')
          next('/')
        } else {
          next('/NotFound')
        }
      }
    },
    children: [
      {
        path: ':category',

      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
