import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Login from "../views/Login";
import Add from "../views/Add"
import Register from "../views/Register"
import Edit from "../views/Edit"
import Cart from "../views/Cart"
import Admin from "../views/Admin"
import Thankyou from "../views/Thankyou"

Vue.use(VueRouter);

const beforeEnter = async (to, from, next) => {
  if (localStorage.getItem("tokenAdmin") || (localStorage.getItem("tokenCustomer"))) {
    next()
  } else {
    next({
      path: '/login'
    })
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // beforeEnter
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    // beforeEnter
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: { requiresAuth: true }
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
    meta: { requiresAuth: true }
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    // meta: { requiresAuth: true },
    beforeEnter
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: "/thankyou",
    name: "Thankyou",
    component: Thankyou,
  }

];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let tokenAdmin = localStorage.getItem('tokenAdmin')
    if (tokenAdmin) {
      next()
    } else {
      next({ name: "Login" })
    }
  }
  else {
    next()
  }
})
export default router;
