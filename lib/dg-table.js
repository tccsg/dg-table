import DgTableHeader from './components/table-header'
import TestFilter from './filters/test'
import DgTableDateFilter from './filters/date'
import Bus from './js/Bus'
import { Dom } from './js/utils'

const filtersData = {
  regFilters: {},
  filterComponents: {
    'test': TestFilter,
    'date': DgTableDateFilter
  },
  curFilterId: ''
}
const headClick = (filterId) => {
  const { regFilters } = filtersData
  const { type } = regFilters[filterId]
  filtersData.curFilterId = filterId
  if (type === 'date') {
    Bus.$emit('__OPEN_DGTABLE_DATE_FILTER__', filterId)
  }
}
// 规范化表格props 和 列配置 数据
const normalizeProps = (context) => {
  const props = JSON.parse(JSON.stringify(context.props || {}))
  delete props.configs
  const on = context.listeners
  const scopedSlots = context.scopedSlots
  const attrs = context.data.attrs

  return {
    on,
    scopedSlots,
    attrs,
    props
  }
}
const renderFilters = (h, configs) => {
  const { regFilters, filterComponents } = filtersData
  const { filterConfig = null, columnConfig } = configs

  let filter_id = 'null'
  if (filterConfig) {
    filter_id = `__${filterConfig.type}_${columnConfig.prop}__`
    if (!regFilters[filter_id]) {
      regFilters[filter_id] = filterConfig
    }
  }
  return (
    filterConfig
      ? <div data-id={filter_id}
          class={filterConfig.type === 'date'
            ? 'dg-table_filter-wrap dg-table_filter-hideBg'
            : 'dg-table_filter-wrap'}>
          {h(filterComponents[filterConfig.type], {
            props: {
              config: {refname: filter_id}
            },
            on: {
              __DGTABLE_GET_FILTER_DATA__: () => {
                hideAllFilter()
                // console.log(res)
              }
            }
          })}
        </div>
      : null
  )
}
const hideAllFilter = (e) => {
  const headerIconDoms = 
    document.querySelectorAll('.dg-header-icon')
  const filterDoms = 
    document.querySelectorAll('.dg-table_filter-wrap')
  const cellDom = e ? Dom.parents(e.target, '.cell') : null
  let id = ''
  const { regFilters } = filtersData
  
  if (cellDom) {
    id = cellDom.childNodes[0].getAttribute('id')
  }
  for (let i = 0, length = headerIconDoms.length; i < length; i++) {
    if (headerIconDoms[i].parentNode.getAttribute('id') !== id) {
      if (filtersData.curFilterId) {
        if(regFilters[filtersData.curFilterId].type === 'date') {
          Bus.$emit('__CLOSE_DGTABLE_DATE_FILTER__', filtersData.curFilterId)
        }
      }
      filtersData.curFilterId = ''
      filterDoms[i].style.display = 'none'
      headerIconDoms[i].style.transform = 'rotate(0deg)'
    }
  }
}

export default {
  props: {
    configs: Array,
    data: Array
  },
  name: 'dg-table',
  functional: true,
  inheritAttrs: false,
  methods: {},
  render (h, context) {
    const { on, scopedSlots, attrs, props } = normalizeProps(context)
    const configs = context.props.configs
    let filterVnodes = []
    const renderColumn = configs.map((item, index) => {
      const columnConfig = item.columnConfig || {}
      const filterConfig = item.filterConfig || null
      const component = item.component || null
      const curFilter = renderFilters(h, item)
      curFilter && filterVnodes.push(curFilter)
      return h('el-table-column',
        {
          props:columnConfig,
          scopedSlots: {
            default: ({row}) => {
              return h('div',
                {},
                [
                  component
                  ? h(component, {
                    props: {
                      row
                    }
                  })
                  : row[columnConfig.prop]
                ]
              )
            }
          },
          key: `__dg_column_${index}__`
        },
        [ h('template',
            {slot: 'header'},
            [
              h(DgTableHeader, {
                props: {
                  id: `__${filterConfig && filterConfig.type || 'null'}_${columnConfig.prop}__`,
                  label: columnConfig.label,
                  config: filterConfig || null,
                  cb: headClick
                }
              })
            ]
          ),
        ])
    })

    return h('div', [
      h(
        'el-table',
        {
          props: props,
          on,
          scopedSlots,
          attrs
        },
        renderColumn
      ),
      h('div', {
        'class': 'dg-filters_hidden-wrap',
        directives: [
          {
            name: 'dg_table_clickoutside',
            expression: hideAllFilter
          }
        ]
      }, filterVnodes)
    ])
  }
}

