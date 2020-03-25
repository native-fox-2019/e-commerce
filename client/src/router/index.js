import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginCust from '../views/LoginCust.vue'
import RegisterCust from '../views/RegisterCust.vue'
import Custproduct from '../views/CustProduct.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import MyProduct from '../views/MyProduct.vue'
import Add from '../views/Add.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/logincust',
    name: 'LoginCust',
    component: LoginCust
  },
  {
    path: '/registercust',
    name: 'RegisterCust',
    component: RegisterCust
  },
  {
    path: '/custproduct',
    name: 'Custproduct',
    component: Custproduct
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/myproduct',
    name: 'MyProduct',
    component: MyProduct,
    // children: [
    //   {
    //     path: '/edit/:id',
    //     name: 'Edit',
    //     component: Edit,
    //   }
    // ]
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
