import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icon/iconfont.css';
import VueRouter from 'vue-router'
import routes from './router/router.js'
import axios from 'axios';
import App from './App.vue'

Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.prototype.Global = {
  baseUrl:'http://106.13.177.169:9099',
  baseUrl2:'http://106.13.177.169:8001',
};



const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
