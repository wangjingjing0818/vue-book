// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//导入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
//使用swiper插件
Vue.use(VueAwesomeSwiper)
require('swiper/dist/css/swiper.css')
//图片懒加载
import VueLazyload from 'vue-lazyload'
import err from './img/err.jpg'
import load from './img/load.gif'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: err,
  loading: load,
  attempt: 1
})

//在进入路由之前每一次都会执行此方法
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(to.path==='/list'){
    // next({path:'/add'});
    next();
  }else{
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
