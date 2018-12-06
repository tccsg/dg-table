import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import DGTable from '../lib/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(DGTable)
const Bus = new Vue()
Vue.config.productionTip = false

new Vue({
  data: {
    Bus
  },
  render: h => h(App)
}).$mount('#app')
