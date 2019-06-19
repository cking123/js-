import Vue from 'vue'
import { Message } from 'element-ui';
import Home from '@/views/home/home';
import Chart from '@/views/chart/chart';
import User from '@/views/user/user';
import Activity from '@/views/activity/activity';
import Food from '@/views/food/food';
import Login from '@/views/login/login';
import Log from '@/views/log/log';
import Order from '@/views/order/order';
import Router from 'vue-router'
Vue.use(Router)
Vue.config.productionTip = false

let router = new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: { auth: true },
      children: [
        { path: 'chart', component: Chart, name: 'chart' },
        { path: 'user', component: User, name: 'usesr' },
        { path: 'activity', component: Activity, name: 'activity' },
        { path: 'food', component: Food, name: 'food' },
        { path: 'log', component: Log, name: 'log' },
        { path: 'order', component: Order, name: 'order' },

      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
});


//全局守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (window.sessionStorage.user != undefined) {

    } else if (to.path !== '/') {
      Message.error({
        message: '请先登录',
        type: 'error',
        showClose:false
      });
      return next({ path: '/' });
    }
  };
  next();
});

export default router;
