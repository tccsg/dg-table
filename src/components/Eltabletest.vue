<template>
  <div>
    <dgtag :size="'small'">lalalal</dgtag>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      mytable: null
    }
  },
  mounted () {
    this.reCreateElTable()
  },
  methods: {
    reCreateElTable () {
      let $props = this.$props
      this.mytable = Vue.extend({
        render: function (h) {
          return h('el-tag', {
            props: $props,
            on: {
              close: () => { console.log('close') }
            }
          }, ['hehe'])
        }
      })
    }
  }
}
</script>
