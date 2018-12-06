<template>
  <div class="editFilter">
    <!-- 输入框选择器 -->
    <div :class="{'filterWrap':true}">
      <div class="filterContainer">
        <el-input
          placeholder="请输入内容"
          v-model="editdata"
          class="input-with-select"
          clearable>
          <el-button slot="append" icon="el-icon-search" @click="todoSearch"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sclass: {
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
      editdata: '',
      doanima: false
    }
  },
  methods: {
    todoSearch () {
      if (this.editdata) {
        this.$emit('getFilterBridge', {
          key: this.filterkey,
          label: this.editdata,
          value: this.editdata,
          fn: this.fn
        })
        this.editdata = ''
      }
    }
  },
  mounted () {
    if (this.sclass) {
      setTimeout(() => {
        this.doanima = true
      }, 600)
    }
  }
}
</script>

<style scoped>
.filterWrap.show {
  opacity: 1;
  height: 100px;
}
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
  overflow: hidden;
  /* height: 0; */
  transition: all 0.5s;
  opacity: 1;
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
