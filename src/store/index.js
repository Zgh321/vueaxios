import Vue from 'vue'
import Vuex from 'vuex'
//需要jq就单独引入不然打包会很大
import $ from 'jquery';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
// 分辨率响应
    responsePX: {
      tableHeight: $(window).outerHeight(),
      tableWidth: $(window).width(),
    },
  },
  mutations: {
    //监听可视窗口响应设置高度
    resizeHeight(state) {
      $(window).resize(function () {
        state.responsePX.tableHeight = $(window).outerHeight();
        state.responsePX.tableWidth = $(window).width();
      });
    },
  },
  actions: {
  },
  modules: {
  }
})

