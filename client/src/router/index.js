import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Content from "../components/Content.vue";
import DetailProduct from "../components/DetailProduct.vue";
import Cart from "../components/Cart.vue";
import History from "../components/History.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "Content",
        component: Content
      },
      {
        path: "product/:id",
        name: "DetailProduct",
        component: DetailProduct
      },
      {
        path: "cart",
        name: "Cart",
        component: Cart
      },
      {
        path: "history",
        name: "History",
        component: History
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
