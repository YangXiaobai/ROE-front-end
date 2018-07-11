// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import IP from './../config/ip'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import socket from 'vue-socket.io';

let _ip = 'https://' + IP.IP;

// Vue.use(socket, _ip + ':3000');

Vue.config.productionTip = false

Vue.prototype.$qs = qs

// axios.defaults.withCredentials = true
axios.defaults.baseURL = _ip + ':17270';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
