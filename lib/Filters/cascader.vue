<template>
  <div v-if="options"
    ref='cascaderfilter'>
    <el-cascader
      style="width:0;height:0;padding:0;top:-10px"
      :options="data"
      :ref="refname"
      expand-trigger="hover"
      v-model="selectedOptions"
      @change="handleChange"
      :props="myprops">
    </el-cascader>
  </div>
</template>

<script>
import Bus from '../js/Bus.js'
export default {
  props: {
    ftn: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    refname: {
      type: String,
      default: ''
    },
    filterkey: {
      type: String,
      default: ''
    },
    myprops: {
      type: Object,
      default: function () {
        return {
          value: 'value',
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  data () {
    return {
      selectedOptions: [],
      options: [],
      cascaderVal: ''
    }
  },
  methods: {
    handleChange (value) {
      let label = this.getLabel(value, this.data)
      setTimeout(() => {
        this.$emit('getFilterBridge', {
          ftn: this.ftn,
          key: this.filterkey,
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
      for (let i = 0; i < d.length; i++) {
        if (d[i][this.myprops.value] === val) {
          if (d[i] && d[i][this.myprops.children]) {
            _value.splice(0, 1)
            labelstr += this.getLabel(_value, d[i][this.myprops.children])
            return d[i][this.myprops.label] + labelstr
          } else {
            return d[i][this.myprops.label]
          }
        }
      }
    }
  },
  mounted () {
    Bus.$on('OPEN_DGTABLE_CASCADER_FILTER', refname => {
      if (this.options && this.refname === refname && this.$refs[refname]) {
        this.$refs[refname].handleClick()
      }
    })
  }
}
</script>

<style scoped>
@import '../css/common.css';
.editFilter {
  position: absolute;
}
</style>
