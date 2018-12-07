<template>
  <div id="app">
    <dg-table
      :tableInfo='dgTable'
      @getFilter='getFilter'
      @getselect="getselect"
      @getpage="getpage"></dg-table>
  </div>
</template>

<script>
// import DgTable from './lib/dg-table.vue'
import cc from './components/columcomponent.vue'
import {
  searchdata,
  radiodata
} from './assets/js/simulationapi.js'
export default {
  name: 'app',
  data () {
    return {
      dgTable: {
        toolsConfig: { // 用于配置功能选项 包括 多选，筛选条，分页 默认都为true
          select: true,
          filterbar: true,
          pagination: true,
          pagenum: 1,
          curpage: 1,
          filters: {
            uid: {
              label: '天才',
              key: 'uid',
              value: 'uid_x89dj9vecx',
              fn: '姓名'
            }
          }
        },
        columConfig: { // 列的配置信息 包括每列的数据展示方式 和单击行为 单击返回当前行的数据信息
          onclick: (row) => {
            console.log('onclick colum :', row)
          },
          activeConfig: {
            type: 'button',
            label: '获取',
            handler: (scope) => {
              alert(JSON.stringify(scope.row))
            },
            width: '100'
          },
          config: [
            {
              prop: 'search',
              label: '搜索',
              component: cc,
              width: '80',
              filterConfig: {
                fn: '搜索',
                type: 'search',
                key: 'id',
                placeholder: '自定义placeholder',
                listinfo: {
                  handler: searchdata,
                  searchkey: 'id', // 用于搜索api对应的key
                  showkey: 'name' // 在列表中要显示的字段
                }
              }
            }, {
              prop: 'radio',
              label: '单选',
              filterConfig: {
                fn: '单选',
                type: 'radio',
                key: 'radioid',
                listinfo: {
                  handler: radiodata,
                  labelkey: 'label', // 用于搜索api对应的key
                  valuekey: 'value', // 在列表中要显示的字段
                  payload: null
                }
                // items: [
                //   { label: '项目1', value: 1 },
                //   { label: '项目2', value: 2 },
                //   { label: '项目3', value: 3 },
                //   { label: '项目4', value: 4 },
                //   { label: '项目5', value: 5 }
                // ]
              }
            }, {
              prop: 'cascader',
              label: '级联',
              processdata: (row) => {
                console.log('process data:', row) // 返回整行 便于 处理一些依赖其他列的数据
              }, // 数据的处理 默认提供一些 也可以自定义处理数据的函数
              component: cc,
              filterConfig: {
                fn: '级联',
                key: 'cascaderid',
                type: 'cascader',
                // props: {},
                options: [
                  {
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [{
                        value: 'yizhi',
                        label: '一致'
                      }, {
                        value: 'fankui',
                        label: '反馈'
                      }, {
                        value: 'xiaolv',
                        label: '效率'
                      }, {
                        value: 'kekong',
                        label: '可控'
                      }]
                    }, {
                      value: 'daohang',
                      label: '导航',
                      children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                      }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                      }]
                    }]
                  }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                      value: 'basic',
                      label: 'Basic',
                      children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                      }, {
                        value: 'color',
                        label: 'Color 色彩'
                      }, {
                        value: 'typography',
                        label: 'Typography 字体'
                      }, {
                        value: 'icon',
                        label: 'Icon 图标'
                      }, {
                        value: 'button',
                        label: 'Button 按钮'
                      }]
                    }, {
                      value: 'form',
                      label: 'Form',
                      children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                      }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                      }, {
                        value: 'input',
                        label: 'Input 输入框'
                      }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                      }, {
                        value: 'select',
                        label: 'Select 选择器'
                      }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                      }, {
                        value: 'switch',
                        label: 'Switch 开关'
                      }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                      }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                      }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                      }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                      }, {
                        value: 'upload',
                        label: 'Upload 上传'
                      }, {
                        value: 'rate',
                        label: 'Rate 评分'
                      }, {
                        value: 'form',
                        label: 'Form 表单'
                      }]
                    }, {
                      value: 'data',
                      label: 'Data',
                      children: [{
                        value: 'table',
                        label: 'Table 表格'
                      }, {
                        value: 'tag',
                        label: 'Tag 标签'
                      }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                      }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                      }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                      }, {
                        value: 'badge',
                        label: 'Badge 标记'
                      }]
                    }, {
                      value: 'notice',
                      label: 'Notice',
                      children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                      }, {
                        value: 'loading',
                        label: 'Loading 加载'
                      }, {
                        value: 'message',
                        label: 'Message 消息提示'
                      }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                      }, {
                        value: 'notification',
                        label: 'Notification 通知'
                      }]
                    }, {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                      }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                      }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                      }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                      }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                      }]
                    }, {
                      value: 'others',
                      label: 'Others',
                      children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                      }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                      }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                      }, {
                        value: 'card',
                        label: 'Card 卡片'
                      }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                      }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                      }]
                    }]
                  }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                      value: 'axure',
                      label: 'Axure Components'
                    }, {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    }, {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }]
                  }
                ]
              }
            }, {
              prop: 'date',
              label: '时间',
              filterConfig: {
                fn: '时间',
                type: 'date',
                key: 'dateid'
              },
              processdata: 'time2'
            }, {
              prop: 'edit',
              label: '纯文本',
              extra: { handler: () => {} },
              filterConfig: {
                fn: '纯文本',
                type: 'edit',
                key: 'editid'
              }
            }, {
              prop: 'range',
              label: '范围',
              width: '70',
              filterConfig: {
                fn: '范围',
                type: 'range',
                key: 'rangeid',
                unit: 'm'
              }
            }
          ]
        },
        data: []
      }
    }
  },
  components: {
    // DgTable
  },
  methods: {
    getpage (page) {
      console.log(page)
    },
    getFilter (val) {
      console.log(val)
    },
    getselect (val) {
      console.log(val)
    }
  }
}
</script>

<style>
</style>
