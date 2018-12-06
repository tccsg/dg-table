<template>
  <div class="filterWrap"  style="opacity:0;box-shadow:none;">
    <div class="filterContainer" style="padding:0">
      <el-date-picker
        v-model="filterdate"
        type="daterange"
        align="right"
        style="height:0;padding:0;top:-10px"
        unlink-panels
        :ref="refname"
        @change="changeData"
        range-separator=""
        start-placeholder=""
        end-placeholder=""
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import Bus from '../js/Bus.js'
export default {
  props: {
    refname: {
      type: String,
      default: ''
    },
    filterkey: {
      type: String,
      default: ''
    },
    fn: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      filterdate: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  mounted () {
    Bus.$on('openjobinterviewdate', refname => {
      if (this.$refs[refname]) {
        if (this.refname === refname) this.$refs[refname].focus()
      }
    })
  },
  methods: {
    changeData (val) {
      this.$emit('getFilterBridge', {
        type: 'date',
        key: this.filterkey,
        label: val[0] + ' , ' + val[1],
        value: 'date',
        fn: this.fn,
        date: { gt: val[0], lt: val[1] }
      })
    }
  }
}
</script>

<style scoped>
.filterWrap {
  min-width: 100px;
  border: 1px solid #ebeef5;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 2px 0;
  position: absolute;
  z-index: 9;
}
.filterWrap .filterContainer {
  padding: 10px;
}
.filterWrap .filterBottom {
  padding: 8px;
  border-top: 1px solid #ebeef5;
}
.filterWrap .filterBottom button {
  background: transparent;
  border: none;
  color: #606266;
  cursor: pointer;
  font-size: 13px;
  padding: 0 3px;
}
.filterWrap .filterBottom button.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>
