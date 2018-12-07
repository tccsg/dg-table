# dg-table

#### 项目介绍
基于element ui table二次开发的多功能实现远程筛选的表格

[demo地址](https://www.theputian.com/my-npm-module-test/dist/index.html)

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
dgTable: {
  toolsConfig: { // 用于配置功能选项 包括 多选，筛选条，分页 默认都为true
    select: true,
    filterbar: true,
    pagination: true,
    pagenum: 1,
    curpage: 1
  },
  columConfig: { // 列的配置信息 包括每列的数据展示方式 和单击行为 单击返回当前行的数据信息
    onclick: (row) => {
      alert(JSON.stringify(row))
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
        prop: 'name',
        label: '姓名',
        width: '80',
        filterConfig: {
          fn: '姓名',
          type: 'search',
          key: 'uid',
          placeholder: '输入姓名',
          listinfo: {
            handler: searchdata,
            searchkey: 'name', // 用于搜索api对应的key
            showkey: 'name' // 在列表中要显示的字段
          }
        }
      }, {
        prop: 'gender',
        label: '性别',
        component: cc,
        width: '80',
        filterConfig: {
          fn: '性别',
          type: 'radio',
          key: 'gender',
          listinfo: {
            // handler: radiodata,
            labelkey: 'label', // 用于搜索api对应的key
            valuekey: 'value', // 在列表中要显示的字段
            payload: null
          },
          items: [
            { label: '男', value: 1 },
            { label: '女', value: 2 }
          ]
        }
      }, {
        prop: 'birthPlace',
        label: '出生地',
        processdata: (row, prop) => {
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
          props: {
            value: 'code',
            label: 'name',
            children: 'children'
          },
          options: cities()
        }
      }, {
        prop: 'birthDay',
        label: '出生日期',
        filterConfig: {
          fn: '生日',
          type: 'date',
          key: 'birthDay'
        },
        processdata: 'time'
      }, {
        prop: 'phone',
        label: '手机号',
        extra: { handler: () => {} },
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
          unit: '岁'
        }
      }
    ]
  },
  data: []
}
```