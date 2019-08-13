import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import DGTable from '../lib'
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/css/index.css'

Vue.use(ElementUI)
Vue.use(DGTable)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
