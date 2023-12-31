import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueRouter from "vue-router";
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

// 创建vm
new Vue({
  el: '#app',
  render: h => h(App),
  router:router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})

