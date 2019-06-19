/**
 * vuex
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store=new Vuex.Store({
    state: {
      user:'',
      isLogin:''
    },
    getters: {
      getUsername(state) {
        return state.user;
      }
    },
    mutations: {
      //添加用户
      adduser(state,name){
        state.user = name;
        state.isLogin = '1';
      }
    }
});

export default store;