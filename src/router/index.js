import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Options from '@/components/Options'
import Check from '@/components/Check'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/options',
      name: 'Options',
      component: Options
    },
    {
      path: '/check',
      name: 'Check',
      component: Check
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
