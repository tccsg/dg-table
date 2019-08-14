
import Bus from '../../../js/Bus.js'

export default  {
  name: 'DgDatePicker',
  props: ['config'],
  functional: false,
  mounted () {
    const { refname = '' } = this.config || {}
    Bus.$on('__OPEN_DGTABLE_DATE_FILTER__', fid => {
      if (this.$refs[fid]) {
        if (refname === fid) this.$refs[fid].focus()
      }
    })
  },
  methods: {
    changeData (val) {
      const { key } = this.config || {}
      this.$parent.$emit('__DGTABLE_GET_FILTER_DATA__', {
        type: 'date',
        key,
        value: val
      })
    }
  },
  render: function (h) {
    const { config, $attrs, $listeners } = this
    const props = JSON.parse(JSON.stringify(this.$props))
    // 合并自定义change函数
    const changeHandlers = (val) => {
      this.changeData(val)
      $listeners.change && $listeners.change(val)
    }
    return h('el-date-picker', {
      attrs: $attrs,
      on: Object.assign({}, $listeners, {
        change: changeHandlers,
        input: changeHandlers
      }),
      props,
      style: 'width:0;height:0;padding:0;top:-10px',
      ref: config.refname
    })
  }
}

