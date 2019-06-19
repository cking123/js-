// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';
import store from './vuex';

// 引入自己的css
import '@/assets/css/index.css'
import router from './router'
Vue.prototype.$axios = axios
Vue.use(router)
Vue.use(ElementUI)
Vue.filter('dataFormat', function (datastr, pattern = "YYYY-MM-DD hh:mm:ss") {
  return moment(datastr).format(pattern);
});
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  render: h => h(App),
  store
});


