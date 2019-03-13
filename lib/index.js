import DGTable from './dg-table'
import hoc from './js/hoc'

DGTable.install = (Vue) => {
  Vue.component('dgtag', hoc(Vue.component('ElTag')))
  Vue.component(DGTable.name, DGTable)
}
export default DGTable
