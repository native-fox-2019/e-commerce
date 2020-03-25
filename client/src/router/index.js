import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/product',
    name:'Product',
    component:Product
  },
  {
    path:'/product-detail',
    name:'ProductDetail',
    component:ProductDetail
  },
  {
    path:'/cart',
    name:'Cart',
    component:Cart
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/sign-up',
    name:'Login',
    component:SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
