# dg-table

#### 项目介绍
基于ElementUI + Vue 开发的强大表头筛选器的表格，同时提供用户自定义筛选器
<br>
默认提供的筛选器：
  - 从服务器拉取匹配项列表
  - 单纯的文本搜索
  - 提供单选的列表
  - 联级选择器（可用于地区搜索）
  - 日期筛选
  - 范围筛选
<br>
除了以上6种默认的筛选器外还提供开发者自定义筛选器，组件会提供自定义筛选器的容器，开发者不用另外定位筛选器位置，组件将会自动定位，只需要按照规定的数据格式来传输数据即可，目前版本为最小可用版本暂不支持配置ElementUI框架组件本身的大部分属性，事件以及方法，所以大部分样式是该组件写死的，后续版本将会退出对原框架属性以及事件和方法的配置需求
<br>
配置项参考下面的表格

#### dg-table编写的Demo
[demo地址](https://www.theputian.com/my-npm-module-test/dist/index.html)
<br>
demo也已经上传在gitee上
[demo的gitee地址](https://gitee.com/tccsg/my-npm-module-test)

开发者可以通过npm安装
```
npm i dg-table
```

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
---
(其中类型显示.isVue 则为vue对象类型)
#### 表格属性
参数      | 说明 | 类型 | 可选值 | 默认值
----     |---- |----- |----- |------
data | 要显示的数据| array | - | -
selection | 是否显示多选框 | boolean | - | false
pagination | 是否显示翻页栏 | boolean | - | true
page-config | 翻页的配置数据，仅在pagination为true有效<br>格式为{pagenum: 1, curpage: 1} pagenum为总页数，curpage为当前页数 | obj | - | {pagenum: 1, curpage: 1}
row-click | 行单击事件所绑定的函数 | function | - | () => {}
action-config | 操作列（设定为最后一列）具体请查看action-config对象表格 | object | - | -
column-config | 除了操作列其他数据列配置，具体请查看column-config表格 | array | - | -

##### action-config说明
参数      | 说明 | 类型 | 可选值 | 默认值
----     |---- |----- |----- |------
type | 有三种类型<br>默认提供的有单个按钮（值为'button'）<br>文字操作（值为'textbtn'）<br>自定义操作对象（值为'customize'）|string | - | -
label | 要操作对象上显示的文字 仅在非自定义操作对象时候可用| string | - | -
handler | 操作对象绑定的函数 仅在非自定义操作对象时候可用 | handler | - | -
width | 操作列的框度 | string |- | -
component | 自定义操作对象组件，仅在type为customize时可用 | ._isVue | - | -
handlers | 自定义组件中所用到的函数，以key：value的形式传到 自定义操作组件内部通过key引用函数 | object | - | -

##### column-config说明
参数      | 说明 | 类型 | 可选值 | 默认值
----     |---- |----- |----- |------
prop | 对应列内容的字段名，可以采用链式字段（比如：user.school.name） | string | - | -
label | 显示的标题 | string | - | -
width | 列的框度 | string | - | -
extra | 额外的数据可以是任何类型 | object |- | -
component | 自定义组件来处理列数据，默认会向组件中传入row该列数据，和extra属性<br>在组件中通过props接收 | .isVue | - | -
processdata | 提供数据处理的方式而非组件 默认提供 日期处理（值为'time', 处理后的格式为 YY-MM-DD）<br>时间处理（值为'time2', 处理后的格式为 YY-MM-DD HH:MM:SS）<br>还有默认的文本处理 如果prop对应的数据为空则返回 - <br>最后我们还提供自定义数据处理方式，传入一个函数 参数为row，和 prop 通过自己的处理函数后return结果 | string/function | 'time'/'time2'/function | -
filterConfig | 对于的筛选器的配置，如果没有则表头不提供筛选，配置内容如下表 | object | - | -

##### filterConfig说明
公共：
参数      | 说明 | 类型 | 可选值 | 默认值
----     |---- |----- |----- |------
type | 筛选器的类型 | string | cascader（联级选择器）<br>date（日期选择器）<br>edit（纯文本选择器）<br>radio（单项选择器）<br>range（范围选择器）<br>search（搜索选择器）<br>自定义类型的选择器 值除了以上六种 | -
key | 筛选后返回的数据对象中对应该值的key | string | - | -
ftn | 已经筛选的条件中项目名称（在tag开头显示的项目名称）| string | - | -
placeholder | 文本框默认展示的文案，对带有文本框类型的筛选器比较有用，默认选择器中edit和search可用<br>自定义筛选器也可以通过props引用| string | - | 请输入内容
listinfo | 在带有列表的筛选器中，可以设置数据来源函数(下个版本中优化)<br>默认选择器中search和radio用到该属性，当然开发者自定义的筛选器中可以自定义数据结构，说明如下表 | object| - | -
itmes | 列表数据来源 | 在组件中对于的props为data | array | - | -
props | 默认筛选器中针对 cascader 的配置，用法和Elementui cascader的props属性一样,自定义用户可以自行构造数据 | object | - | {value: 'value',label: 'label',children: 'children'}
nuit | 针对默认选择器中range，单位的配置
component | 仅针对type为customize，用户自定义筛选器组件 | ._isVue | - | -
hidebg | 自定义筛选器组件的容器的背景设置，默认显示有阴影的背景 | boolean | true/false | false
customizedata | 自定义筛选器需要的数据内容没限制组件中通过props同名引用 | object | - | -

#### 表格事件
事件名      | 说明 | 参数 
----     |---- |----- 
filter-change | 筛选条件改变时触发 | filters
select-change | 多选场景下勾选条件改变触发 | selecs
page-change | 点击翻页页码改变触发 | page