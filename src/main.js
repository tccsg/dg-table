import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import DGTable from '../lib'
import DgDatePicker from '../lib/packages/date-picker'
import DgCascader from '../lib/packages/cascader'
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/css/index.css'

Vue.use(ElementUI)
Vue.use(DGTable)
Vue.use(DgDatePicker)
Vue.use(DgCascader)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
