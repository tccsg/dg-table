<template>
  <div id="app">
    <dg-table
      :data="tableData"
      :configs="configs"
      :row-class-name="tableRowClassName"
    ></dg-table>
    <!-- <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker> -->
  </div>
</template>

<script>
import Test from './components/HelloWorld'
export default {
  name: "app",
  components: {},
  data() {
    return {
      value1: '',
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: "",
      configs: [
        {
          columnConfig: {
            prop: "address",
            label: "地址"
          },
          filterConfig: {
            type: 'test'
          }
        },
        {
          columnConfig: {
            prop: "name",
            label: "姓名"
          },
          component: Test,
          filterConfig: {
            type: 'test'
          }
        },
        {
          columnConfig: {
            prop: "date",
            label: "时间"
          },
          filterConfig: {
            type: 'date'
          }
        }
      ]
    };
  },
  methods: {
    rclick (row) {
      alert(JSON.stringify(row))
    },
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  }
};
</script>

<style>
body{
  padding-top: 1px;
}
#app {
  margin-top: 60px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
