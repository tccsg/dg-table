<template>
  <div>
    <el-date-picker
      v-model="filterdate"
      type="daterange"
      align="right"
      style="height:0;padding:0;top:-15px"
      unlink-panels
      :ref="config.refname"
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
  props: ['config'],
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
    const { refname = '' } = this.config || {}
    Bus.$on('__OPEN_DGTABLE_DATE_FILTER__', fid => {
      if (this.$refs[fid]) {
        if (refname === fid) this.$refs[fid].focus()
      }
    })
  },
  methods: {
    changeData (val) {
      const { key } = this.config || {}

      this.$emit('__DGTABLE_GET_FILTER_DATA__', {
        type: 'date',
        key,
        res: {
          value: val
        }
      })
    }
  }
}
</script>