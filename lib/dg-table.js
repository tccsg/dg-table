import DgTableHeader from './components/table-header'
import DgTableDateFilter from './filters/date'
import DgTableCascader from './filters/cascader'
import Bus from './js/Bus'
import { Dom } from './js/utils'

// 私有函数的集合 相当于注册函数
const privateHandlers = [
  'filter-change'
]

// 私有属性
const privateProps = [
  'tableId'
]

// 筛选器点击 部分 特殊筛选器 对应的事件
const headClickEven = {
  'date': '__OPEN_DGTABLE_DATE_FILTER__',
  'cascader': '__OPEN_DGTABLE_CASCADER_FILTER__'
}

const filtersData = {
  regFilters: {},
  filterComponents: {
    'date': DgTableDateFilter,
    'cascader': DgTableCascader
  },
  curFilterId: ''
}

const createFilterId = (UNID, ft, p) => {
  return `__${UNID}_${ft}_${p}__`
}

const headClick = (filterId) => {
  const { regFilters } = filtersData
  const { type } = regFilters[filterId]
  filtersData.curFilterId = filterId
  if (headClickEven[type]) {
    Bus.$emit(headClickEven[type], filterId)
  }
}

// 规范化表格props 和 列配置 数据
const normalizeProps = (context) => {
  const props = JSON.parse(JSON.stringify(context.props || {}))
  
  for (let k in props) {
    if (privateProps.includes(k)) {
      delete props[k]
    }
  }
  delete props.configs
  const on = context.listeners
  const scopedSlots = context.scopedSlots
  const attrs = context.data.attrs

  let privateOn = Object.create(null)
  for (let k in on) {
    if (privateHandlers.includes(k)) {
      privateOn[k] = on[k]
      delete on[k]
    }
  }

  return {
    on,
    scopedSlots,
    attrs,
    props,
    privateOn
  }
}
// 渲染 需要的筛选器
const renderFilters = (h, configs, on, UNID) => {
  const { regFilters, filterComponents } = filtersData
  const { filterConfig = null, columnConfig } = configs

  let filter_id = 'null'
  let willRenderFilter = null
  if (filterConfig) {
    filter_id = createFilterId(
      UNID,
      filterConfig.type,
      columnConfig.prop
    )
    if (!regFilters[filter_id]) {
      regFilters[filter_id] = filterConfig
    }
    if (filterComponents[filterConfig.type]) {
      if (!filterConfig.component) {
        willRenderFilter = filterComponents[filterConfig.type]
      } else {
        willRenderFilter = filterConfig.component
      }
    } else if(filterConfig.component
        && filterConfig.type === 'customize'
      ) {
      willRenderFilter = filterConfig.component
    }
  }

  return (
    filterConfig
      ? <div data-id={filter_id}
          class={filterComponents[filterConfig.type]
            ? 'dg-table_filter-wrap dg-table_filter-hideBg'
            : 'dg-table_filter-wrap'}>
          {
            h(willRenderFilter, {
            props: {
              config: Object.assign({}, {
                refname: filter_id,
                key: columnConfig.prop,
              }, filterConfig.props || {})
            },
            on: {
              __DGTABLE_GET_FILTER_DATA__: (res) => {
                hideAllFilter(null, UNID)
                if (typeof on['filter-change'] === 'function') {
                  on['filter-change'](res)
                }
              }
            }
          })}
        </div>
      : null
  )
}
const hideAllFilter = (e, UNID) => {
  const headerIconDoms = 
    document.querySelectorAll(`#__${UNID}_DGTABLE__ .dg-header-icon`)
  const filterDoms = 
    document.querySelectorAll(`#__${UNID}_DGTABLE__ .dg-table_filter-wrap`)
  const cellDom = e ? Dom.parents(e.target, '.cell') : null
  let id = ''
  
  if (cellDom) {
    id = cellDom.childNodes[0].getAttribute('id')
  }
  for (let i = 0, length = headerIconDoms.length; i < length; i++) {
    if (headerIconDoms[i].parentNode.getAttribute('id') !== id) {
      filterDoms[i].style.display = 'none'
      headerIconDoms[i].style.transform = 'rotate(0deg)'
    }
  }
}

export default {
  props: {
    configs: Array,
    data: Array,
    tableId: String
  },
  name: 'dg-table',
  functional: true,
  inheritAttrs: false,
  methods: {},
  render (h, context) {
    const UNID = context.props.tableId || 'DGTABLE'
    const { on,
      scopedSlots,
      attrs,
      props,
      privateOn } = normalizeProps(context)
    const configs = context.props.configs
    let filterVnodes = []
    // 渲染列
    const renderColumn = configs => configs.map((item, index) => {
      const columnConfig = item.columnConfig || {}
      const children = item.children;
      const filterConfig = item.filterConfig || null
      const component = item.component || null
      const curFilter = renderFilters(h, item, privateOn, UNID)
      curFilter && filterVnodes.push(curFilter)

      // 如果有自定义 列 标记有作用域槽
      let renderScopedSlots = {}
      if (component) {
        renderScopedSlots = {
          default: ({row, column}) => {
            return h('div',
              {},
              [
                component
                ? h(component, {
                  props: {
                    row,
                    column
                  }
                })
                : row[columnConfig.prop]
              ]
            )
          }
        }
      }
      return h('el-table-column',
        {
          props:columnConfig,
          scopedSlots: renderScopedSlots,
          key: `__dg_column_${index}__`
        },
        [ children && children.length > 0 ? renderColumn(children) : null,
          filterConfig ? h('template',
            {slot: 'header'},
            [
              h(DgTableHeader, {
                props: {
                  id: createFilterId(
                    UNID,
                    filterConfig && filterConfig.type || 'null',
                    columnConfig.prop
                  ),
                  label: columnConfig.label,
                  config: filterConfig || null,
                  cb: headClick,
                  UNID: UNID
                }
              })
            ]
          ) : null,
        ])
    })

    return h('div', {
      attrs: {
        id: `__${UNID}_DGTABLE__`
      }
    }, [
      h(
        'el-table',
        {
          props: props,
          on,
          scopedSlots,
          attrs
        },
        renderColumn(configs)
      ),
      h('div', {
        'class': 'dg-filters_hidden-wrap',
        directives: [
          {
            name: 'dg_table_clickoutside',
            expression: (e) => {
              hideAllFilter(e, UNID)
            }
          }
        ]
      }, filterVnodes)
    ])
  }
}

