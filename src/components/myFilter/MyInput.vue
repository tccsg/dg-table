<template>
  <div style="padding: 10px;width:200px">
    <el-input placeholder="请输入内容" v-model="val" class="input-with-select">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="confirm">
      </el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {
      val: ''
    }
  },
  methods: {
    confirm () {
      this.$emit('__CUSTOM_FILTER_DATA__', {
        value: this.val
      })
    }
  }
}
</script>
