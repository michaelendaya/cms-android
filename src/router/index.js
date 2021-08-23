import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
    },
    meta: { requiresUnauth: true }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
    },
    meta: { requiresUnauth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: "/patient",
    name: "Patient",
    meta: { requiresAuth: true },
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Patient/Index.vue')
    },
    children: [
      {
        path: "home",
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/Patient/Home.vue')
        },
        name: "Home",
        // a meta field
        meta: { requiresAuth: true }
      
      },
      {
        path: "book",
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/Patient/Book.vue')
        },
        name: "Book",
        meta: { requiresAuth: true },
   
      },
      {
        path: "appointment",
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/Patient/Appointment.vue')
        },
        name: "Appointment",
   
      },
      {
        path: "profile",
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/Patient/Profile.vue')
        },
        name: "Profile",
        meta: { requiresAuth: true },
      },
    ]
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const auth_token = store.getters["authentication/token"];

  if (to.meta.requiresAuth && !auth_token) {
    next({ name: "SignIn" });
  } else if (to.meta.requiresUnauth  && auth_token) {
    next({ name: "Home" });
  } else {
    next();
  }
});
export default router