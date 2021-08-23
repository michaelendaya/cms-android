import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },


]

const router = new VueRouter({
  routes
})

export default router