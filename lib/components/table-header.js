/**
 * @param {*} e 
 */
let _fbd = null
let _curShowFilter = null
const iconChange = (e, cb, UNID) => {

  e.cancelBubble = true
  let iconDom = 
    document.querySelector(`#${e.currentTarget.id} i`)
  _fbd = iconDom
  const filterDoms = 
    document.querySelectorAll(`#__${UNID}_DGTABLE__ .dg-table_filter-wrap`)
  const headerIconDoms = 
    document.querySelectorAll(`#__${UNID}_DGTABLE__ .el-table__header-wrapper .dg-header-icon`)

  const fixed_doms = document.querySelectorAll(`#__${UNID}_DGTABLE__ .el-table__fixed .dg-header-icon`)

  for (let i = 0, length = filterDoms.length; i < length; i++) {
    const filterId = filterDoms[i].getAttribute('dataId')
    if (filterId === e.currentTarget.id) {
      filterDoms[i].style.display = 'inline-block'
      _curShowFilter = filterDoms[i]
      setFiltersPosition(iconDom, filterDoms[i])
      typeof cb === 'function' && cb(filterId)
    } else {
      filterDoms[i].style.display = 'none'
    }
    if (iconDom === headerIconDoms[i]) {
      if (fixed_doms[i]) fixed_doms[i].style.transform = 'rotate(-180deg)'
      headerIconDoms[i].style.transform = 'rotate(-180deg)'
    } else {
      if (fixed_doms[i]) fixed_doms[i].style.transform = 'rotate(0deg)'
      headerIconDoms[i].style.transform = 'rotate(0deg)'
    }
  }
}

function setFiltersPosition (fbd, fd) {
  if (!fbd) return
  const div_cell = fbd.offsetParent
  const th = div_cell.offsetParent
  const table_wrap = th.offsetParent

  let offsetLeft = th.offsetLeft
  let offsetTop = table_wrap.offsetTop + th.offsetHeight - 10
  fd.style.top = offsetTop + 'px'
  fd.style.left = offsetLeft + 'px'
}

export default {
  name: 'DgTableHeader',
  props: {
    id: String,
    label: String,
    config: Object,
    cb: Function,
    UNID: String
  },
  functional: false,
  mounted() {
    if (!window.onresize) {
      window.onresize = () => {
        setTimeout(() => {
          if (_fbd && _curShowFilter)
            setFiltersPosition(_fbd, _curShowFilter)
        }, 0)
      }
    }
  },
  methods: {},
  render (h) {
    const { id, config, label, cb, UNID } = this
    return (
      config
        ? h('span', {
            'class': 'customize_filter',
            style: 'cursor:pointer;display:inline-block',
            attrs: {
              id: id
            },
            on: {
              click: (e) => {
                iconChange(e, cb, UNID)
              }
            }
          }, [
            h('span', {
              style: 'padding-right:3px;'
            }, [label]),
            h('i', {
              'class': 'dg-header-icon el-icon-caret-bottom',
              style: 'transition: all .3s'
            })
          ])
        : h('span', {
            attrs: {
              'class': 'customize_filter',
              style: 'display:inline-block'
            }
          }, [
            h('span', {
              attrs: {
                style: 'padding-right:3px;'
              }
            }, [label])])
    )
  }
}