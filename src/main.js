import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import './styles/reset.css'
import App from './App'
import router from './router/index'
import store from './store'

import i18n from './lang' // Internationalization
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data
import 'font-awesome/css/font-awesome.css'
import * as filters from './filters' // global filters
import echarts from 'echarts'

//excel
import './excel/Blob.js'
import './excel/Expor2Excal'

//富文本
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

import treeTransfer from "el-tree-transfer";
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
