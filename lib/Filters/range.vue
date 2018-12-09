<template>
  <!-- 输入框选择器 -->
  <div>
    <div style="padding:10px">
      <div style="display:flex;align-items:center">
        <div>
          <el-input placeholder="" v-model="value1" style="width:120px;" size="small">
            <template slot="append">{{unit}}</template>
          </el-input>
        </div>
        <span style="padding:0 10px">至</span>
        <div>
          <el-input placeholder="" v-model="value2" style="width:120px;" size="small">
            <template slot="append">{{unit}}</template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="filterBottom">
      <button :class="{'is-disabled': !(value1 && value2)}" @click="todoFilter">筛选</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterkey: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: 'unit'
    },
    ftn: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value1: '',
      value2: ''
    }
  },
  methods: {
    todoFilter () {
      if (this.value1 && this.value2) {
        this.$emit('getFilterBridge', {
          key: this.filterkey,
          label: this.value1 + '-' + this.value2 + this.unit,
          value: this.value1 + ',' + this.value2,
          ftn: this.ftn
        })
      }
    }
  }
}
</script>

<style scoped>
@import '../css/common.css';
.editFilter {
  position: absolute;
  width: 300px;
}
.filterWrap .filterBottom {
  padding: 8px;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: flex-end;
}
</style>
