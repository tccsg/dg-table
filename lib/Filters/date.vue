<template>
  <div>
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
    ftn: {
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
    Bus.$on('OPEN_DGTABLE_DATE_FILTER', refname => {
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
        value: { gt: val[0], lt: val[1] },
        ftn: this.ftn,
        date: { gt: val[0], lt: val[1] }
      })
    }
  }
}
</script>

<style scoped>
@import '../css/common.css';
</style>
