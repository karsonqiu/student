import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import cookie from './utils/cookie'
import showToast from './utils/toast/index.js'

Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$cookie = cookie;
Vue.prototype.$showToast = showToast;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
