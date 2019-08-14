import DGTable from './dg-table'
import hoc from './js/hoc'

DGTable.install = (Vue) => {
  Vue.directive('dg_table_clickoutside', {
    bind: function (el, binding) {
      function documentHandler (e) {
        if (el.contains(e.target)) {
          return false
        }
        if (binding.expression && typeof binding.expression === 'function') {
          binding.expression(e)
        }
      }
      el.__vueClickOutside__ = documentHandler
      document.addEventListener('click', documentHandler)
    },
    unbind: function (el) {
      document.removeEventListener('click', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    }
  })
  Vue.component(
    DGTable.name,
    DGTable
  )
}
export default DGTable