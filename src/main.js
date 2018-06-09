import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(require('./App').default)
})
