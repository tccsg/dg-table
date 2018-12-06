<template>
  <div v-if="options" class="filterWrap" ref='cascaderfilter' style="opacity:0;box-shadow:none;">
    <div class="filterContainer" style="padding:0">
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
  </div>
</template>

<script>
import Bus from '../js/Bus.js'
export default {
  props: {
    fn: {
      type: String,
      default: ''
    },
    cdata: {
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
      data: [],
      cascaderVal: ''
    }
  },
  methods: {
    handleChange (value) {
      let label = this.getLabel(value, this.data)
      setTimeout(() => {
        this.$emit('getFilterBridge', {
          fn: this.fn,
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
    Bus.$on('openjobinterviewcascader', refname => {
      if (this.options && this.refname === refname && this.$refs[refname]) {
        this.$refs[refname].handleClick()
        this.data = this.cdata
      }
    })
  }
}
</script>

<style scoped>
.editFilter {
  position: absolute;
}
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
