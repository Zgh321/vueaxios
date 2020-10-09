import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import publicApi from './api/publicApi'
import './utils/request';
import VueCompositionApi from '@vue/composition-api'

Vue.config.productionTip = false
Vue.prototype.publicApi = publicApi
Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
