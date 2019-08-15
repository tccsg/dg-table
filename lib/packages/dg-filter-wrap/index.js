import DgFilterWrap from './src/filter-wrap'

DgFilterWrap.install = function install (Vue) {
  Vue.component(DgFilterWrap.name, DgFilterWrap)
}

export default DgFilterWrap