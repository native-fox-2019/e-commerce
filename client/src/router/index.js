import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Detail from "../views/detailCart.vue";
import Register from "../views/Register.vue";
import Transaction from "../views/TransactionList.vue"

Vue.use(VueRouter);

const beforeEnter = async (to, from, next) => {
  if (localStorage.getItem("token")) {
    next({
      name: "Home"
    })
  } else {
    next()
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
    beforeEnter
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transaction", 
    name: "Transaction",
    component: Transaction,
    meta: {
      requiresAuth: true
    }
  }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({
        name: "Home"
      });
    }
  } else {
    next();
  }
})


export default router;
