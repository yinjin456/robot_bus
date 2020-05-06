import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@/assets/icon/iconfont.css';
import VueRouter from 'vue-router'
import routes from './router/router.js'
import axios from 'axios';
import App from './App.vue'
import Cookie from "js-cookie"


Vue.use(VueRouter);
Vue.use(ElementUI);

//js-cookie
Vue.prototype.Cookie = Cookie;

//生产提示
Vue.config.productionTip = false

//axios后端连接设置
Vue.prototype.axios = axios;
Vue.prototype.Global = {
  baseUrl:'http://106.13.177.169:9099',
  baseUrl2:'http://106.13.177.169:8001',
  baseUrl3:'http://106.13.177.169:8181',
};


const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

//进度条
NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});

//路由调用进度条
router.beforeEach((to, from , next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done()
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
