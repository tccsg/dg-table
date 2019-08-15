import DGTable from './dg-table'

DGTable.install = (Vue) => {
  Vue.directive('dg_table_clickoutside', {
    bind: function (el, binding) {
      function documentHandler (e) {
        // console.log(e)
        if (el.contains(e.target)) {
          return false
        }
        if (binding.expression && typeof binding.expression === 'function') {
          binding.expression(e)
        }
      }
      el.__vueClickOutside__ = documentHandler
      document.addEventListener('mousedown', documentHandler)
    },
    unbind: function (el) {
      document.removeEventListener('mousedown', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    }
  })
  Vue.component(
    DGTable.name,
    DGTable
  )
}
export default DGTable