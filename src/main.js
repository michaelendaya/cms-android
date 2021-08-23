import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios"


Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:8000/api'
});
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
