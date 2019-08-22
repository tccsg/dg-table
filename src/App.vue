<template>
  <div id="app">
    <dg-table
      :configs="configs"
      tableId='account'
      @filter-change="filterChange"

      :data="tableData"
      @row-click='rowClick'
      @selection-change="handleSelectionChange"
      stripe
    ></dg-table>
    <Test2 :filters="filters"></Test2>
    <div>
      <div>
        {{selects}}
      </div>
      <div>
        <div v-for="(val, key, index) in filters" :key="index">
          <div><span>{{key}}：</span><span>{{val}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Test from './components/HelloWorld'
import Gender from './components/Gender'
import MyDatePicker from './components/MyDatePicker'
import MyCascader from './components/MyCascader'
import MyInput from './components/myFilter/MyInput'
import MyInput2 from './components/myFilter/MyInput2'
import Test2 from './components/test'
import {
  createTableDataByRandom
} from './assets/js/simulationapi.js'
export default {
  name: "app",
  components: {
    Test2
  },
  mounted() {
    const res = createTableDataByRandom(203)
    this.tableData = res.data
  },
  data() {
    return {
      selects: [],
      filters: {},
      value1: '',
      tableData: [],
      search: "",
      configs: [
        {
          columnConfig: {
            type: 'selection',
            wdith: '55'
          }
        },
        {
          columnConfig: {
            prop: "name",
            label: "姓名"
          }
        },
        {
          columnConfig: {
            prop: "gender",
            label: "性别",
            filters: [
              {text: '男', value: '1'},
              {text: '女', value: '2'}
            ],
            filterMethod: (value, row, column) => {
              const property = column['property'];
              return row[property] === value;
            }
          },
          component: Gender,
        },
        {
          columnConfig: {
            prop: "birthPlace",
            label: "出生地"
          },
          component: Test,
          filterConfig: {
            type: 'cascader',
            component: MyCascader
          }
        },
        {
          columnConfig: {
            prop: "birthDay",
            label: "出生日期",
            fixed: true
          },
          filterConfig: {
            type: 'date',
            component: MyDatePicker
          }
        },
         {
          columnConfig: {
            prop: "time",
            label: "时间"
          },
          filterConfig: {
            type: 'date'
          }
        },
        {
          columnConfig: {
            prop: "phone",
            label: "手机号"
          },
          filterConfig: {
            type: 'custom',
            component: MyInput
          }
        },
        {
          columnConfig: {
            prop: "age",
            label: "年龄"
          },
          filterConfig: {
            type: 'custom',
            component: MyInput2
          }
        }
      ]
    };
  },
  methods: {
    rowClick (row, column) {
      console.log(row, column)
    },
    filterChange (d) {
      this.$set(this.filters, d.key, d.res.value)
      console.log(d)
    },
    handleSelectionChange(val) {
      this.selects = val
      console.log(val)
    }
  }
};
</script>

<style>
body{
  padding-top: 1px;
}
#app {
  margin-top: 80px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
