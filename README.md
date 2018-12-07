# dg-table

#### 项目介绍
基于element ui table二次开发的多功能实现远程筛选的表格

[demo地址](https://www.theputian.com/my-npm-module-test/dist/index.html)
[demo gitee地址](https://gitee.com/tccsg/my-npm-module-test)

已经发布到npm上 通过
```
npm i dg-table
```
安装
<br>
<br>
提供的筛选器：
  - 从服务器拉取匹配项列表
  - 单纯的文本搜索
  - 提供单选的列表
  - 联级选择器（可用于地区搜索）
  - 日期筛选
  - 范围筛选

<br>
提供分页，多选，自定义列等配置项

#### 部分截图

> 初始状态
> > ![初始状态](/images/dt1.png)

> 从服务器拉取匹配项列表
> > ![从服务器拉取匹配项列表](/images/dtsearch.png)

> 提供单选的列表
> > ![提供单选的列表](/images/dtradio.png)

> 联级选择器
> > ![联级选择器](/images/dtcascader.png)

> 日期筛选
> > ![日期筛选](/images/dtdate.png)

> 单纯的文本搜索
> > ![单纯的文本搜索](/images/dtedit.png)

> 范围筛选
> > ![范围筛选](/images/dtrange.png)

> 最终状态
> > ![最终状态](/images/dt2.png)

#### 用法说明

```html
<dg-table></dg-table>
```
```javascript
dgTable = {
  toolsConfig: { // 用于配置功能选项 包括 多选，筛选条，分页
    select: true, // 是否开启多选列
    filterbar: true, // 是否显示筛选条件
    pagination: true, // 是否提供翻页功能
    pagenum: 1, // 翻页的页数
    curpage: 1 // 当前页码
  },
  columConfig: { // 列的配置信息 包括每列的数据展示方式 和单击行为 单击返回当前行的数据信息
    onclick: (row) => { // 行的单击事件 返回当前行
      alert(JSON.stringify(row))
    },
    activeConfig: { // 最后的操作列 提供 默认提供文字和按钮的操作列
      type: 'button', // 默认有button 和 textbtn 还提供自定义操作样式
      label: '获取', // 按钮或者文字要显示的内容
      handler: (scope) => { // 回调
        alert(JSON.stringify(scope.row))
      },
      width: '100'
    },
    config: [ // 每列配置
      {
        prop: 'name', // 要显示内容的key
        label: '姓名', // 表头显示文案
        width: '80', // 列的宽度
        filterConfig: { // 筛选器配置
          fn: '姓名', // 用于在已筛选条件的tag 类型文案显示
          type: 'search', // 使用的筛选器类型
          key: 'uid', // 数据返回的时候 该值所对应的key
          placeholder: '输入姓名', // 设置默认提示内容
          listinfo: { // 搜索列表内容配置
            handler: searchdata, // 对应的搜索api
            searchkey: 'name', // 用于搜索api对应的key
            showkey: 'name' // 在列表中要显示的字段的key
          }
        }
      }, {
        prop: 'gender',
        label: '性别',
        component: cc, // 自定义列
        width: '80',
        filterConfig: {
          fn: '性别',
          type: 'radio',
          key: 'gender',
          listinfo: {
            // handler: radiodata,
            // [{label: '男', value: '1'}]
            labelkey: 'label',
            valuekey: 'value',
            payload: null // 保留属性
          },
          items: [
            { label: '男', value: 1 },
            { label: '女', value: 2 }
          ]
        }
      }, {
        prop: 'birthPlace',
        label: '出生地',
        processdata: (row, prop) => { // 提供 自定义 数据处理函数
          // console.log('process data:', row) // 返回整行 便于 处理一些依赖其他列的数据
          var space = ''
          if (!row.birthPlace) return '-'
          var curobj = row.birthPlace
          while (1) {
            if (curobj) {
              space += curobj.name
              curobj = curobj.child
            } else {
              break
            }
          }
          return space
        }, // 数据的处理 默认提供一些 也可以自定义处理数据的函数
        filterConfig: {
          fn: '出生地',
          key: 'birthPlace',
          type: 'cascader',
          props: { // 跟element cascader组件用法相似
            value: 'code',
            label: 'name',
            children: 'children'
          },
          options: cities() // 数据
        }
      }, {
        prop: 'birthDay',
        label: '出生日期',
        filterConfig: {
          fn: '生日',
          type: 'date',
          key: 'birthDay'
        },
        processdata: 'time' // 默认提供的时间数据处理函数 time 返回 YY—MM—DD 格式 time2 返回带有具体事件的数据
      }, {
        prop: 'phone',
        label: '手机号',
        extra: { handler: () => {} }, // 额外提供的数据
        filterConfig: {
          fn: '手机',
          type: 'edit',
          key: 'phone'
        }
      }, {
        prop: 'age',
        label: '年龄',
        filterConfig: {
          fn: '年龄',
          type: 'range',
          key: 'age',
          unit: '岁' // 显示的单位
        }
      }
    ]
  },
  data: []
}
```