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

const beforeEnter = async (to, from, next) => {
  if (localStorage.getItem("token")) {
    next({
      path: "/"
    });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter
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
        component: Cart,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "history",
        name: "History",
        component: History,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/"
      });
    }
  } else {
    next();
  }
});

export default router
