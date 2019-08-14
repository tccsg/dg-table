<template>
  <div v-if="options"
    ref='cascaderfilter'>
    <el-cascader
      style="width:0;height:0;padding:0;top:-10px"
      :options="config.data"
      :ref="config.refname"
      v-model="selectedOptions"
      @change="handleChange"
      :props="config.myprops">
    </el-cascader>
  </div>
</template>

<script>
import Bus from '../js/Bus.js'
export default {
  props: ['config'],
  data () {
    return {
      selectedOptions: [],
      options: [],
      cascaderVal: ''
    }
  },
  methods: {
    handleChange (value) {
      const { key } = this.config || {}
      let label = this.getLabel(value, this.config.data)
      setTimeout(() => {
        this.$emit('__DGTABLE_GET_FILTER_DATA__', {
          key,
          label: label,
          value: value[value.length - 1],
          type: 'cascader'
        })
      }, 0)
    },
    getLabel (value, d) {
      let _value = JSON.parse(JSON.stringify(value))
      let labelstr = ''
      let val = value[0]
      const { config } = this
      for (let i = 0; i < d.length; i++) {
        if (d[i][config.myprops.value] === val) {
          if (d[i] && d[i][config.myprops.children]) {
            _value.splice(0, 1)
            labelstr += this.getLabel(_value, d[i][config.myprops.children])
            return d[i][config.myprops.label] + labelstr
          } else {
            return d[i][config.myprops.label]
          }
        }
      }
    }
  },
  mounted () {
    const { refname = '' } = this.config || {}
    Bus.$on('__OPEN_DGTABLE_CASCADER_FILTER__', fid => {
      if (refname === fid && this.$refs[fid]) {
        this.$refs[fid].handleInput()
      }
    })
  }
}
</script>

