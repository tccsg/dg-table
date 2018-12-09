<template>
    <!-- 输入框选择器 -->
    <div style="padding:10px">
      <el-input
        :placeholder="placeholderstr"
        v-model="editdata"
        class="input-with-select"
        clearable>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="todoSearch"></el-button>
      </el-input>
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
    ftn: {
      type: String,
      default: ''
    },
    placeholderstr: {
      type: String,
      default: '请输入内容'
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
          ftn: this.ftn
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
@import '../css/common.css';
.filterWrap.show {
  opacity: 1;
  height: 100px;
}
.editFilter {
  position: absolute;
  width: 300px;
}
</style>
