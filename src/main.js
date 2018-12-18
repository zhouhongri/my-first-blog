// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import querystring from 'querystring'
import moment from 'moment'

Vue.use(iView)
Vue.use(ElementUI)

/*import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'*/

import App from './App'
import router from './router'
import './css/main.css'
import './css/app-base.scss'
import '../static/css/icon.css'
import '../static/css/main.css'
import '../static/css/color-dark.css'
import "babel-polyfill";

Vue.config.productionTip = false
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.prototype.$qs = querystring
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api'
//axios.defaults.baseURL = 'http://94.191.96.136:8888/api'
axios.defaults.withCredentials = true;
Vue.prototype.$userInfo = null

import vUeditor from './install'
Vue.use(vUeditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

axios.interceptors.request.use((config) => {
  iView.LoadingBar.start()
  return config
}, (error) => {
  iView.LoadingBar.error()
  return Promise.reject(error)
})

axios.interceptors.response.use((config) => {
  iView.LoadingBar.finish()
  return config
}, (error) => {
  iView.LoadingBar.error()
  return Promise.reject(error)
})

