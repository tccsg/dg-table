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
      const { key } = this.config || {}
      this.$emit('__DGTABLE_GET_FILTER_DATA__', {
        type: 'custom',
        key,
        value: this.val
      })
    }
  }
}
</script>
