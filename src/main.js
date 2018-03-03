import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueResource from 'vue-resource'
import './common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueResource)
Vue.use(VueLazyLoad, {
	loading: require('./common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
