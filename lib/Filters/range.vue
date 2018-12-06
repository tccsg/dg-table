<template>
  <!-- 输入框选择器 -->
  <div class="filterWrap">
    <div class="filterContainer">
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
    fn: {
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
          fn: this.fn
        })
      }
    }
  }
}
</script>

<style scoped>
.editFilter {
  position: absolute;
  width: 300px;
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
  font-size: 13px;
}
.filterWrap .filterBottom {
  padding: 8px;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: flex-end;
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
