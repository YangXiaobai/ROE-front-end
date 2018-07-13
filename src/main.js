// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import IP from './../config/ip'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import VueSocketio from 'vue-socket.io-extended';
// import socket from 'vue-socket.io';
import io from 'socket.io-client';

var _ip = 'http://' + IP.IP;

Vue.use(VueSocketio, io(_ip + ':3000'));

// Vue.use(socket, _ip + ':3000');

Vue.config.productionTip = false

Vue.prototype.$qs = qs

// axios.defaults.withCredentials = true
axios.defaults.baseURL = _ip + ':2000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
