import Bus from '../../../js/Bus.js'

export default {
  name: 'DgCascader',
  props: ['config'],
  functional: false,
  methods: {
    handleChange (value) {
      const { key } = this.config || {}
      const { options } = this.$attrs
      let label = this.getLabel(value, options)
      setTimeout(() => {
        this.$parent.$emit('__DGTABLE_GET_FILTER_DATA__', {
          key,
          label: label,
          value: value[value.length - 1],
          type: 'cascader'
        })
      }, 0)
    },
    getLabel (value, d) {
      if (!d) return
      let _value = JSON.parse(JSON.stringify(value))
      let labelstr = ''
      let val = value[0]
      const { props } = this.$attrs
      
      for (let i = 0; i < d.length; i++) {
        if (d[i][props.value] === val) {
          if (d[i] && d[i][props.children]) {
            _value.splice(0, 1)
            labelstr += this.getLabel(_value, d[i][props.children])
            return d[i][props.label] + labelstr
          } else {
            return d[i][props.label]
          }
        }
      }
    }
  },
  mounted () {
    const { refname = '' } = this.config || {}
    Bus.$on('__OPEN_DGTABLE_CASCADER_FILTER__', fid => {
      if (refname === fid && this.$refs[fid]) {
        this.$refs[fid].handleInput()
      }
    })
  },
  render: function (h) {
    const { config, $attrs, $listeners } = this
    const props = JSON.parse(JSON.stringify(this.$props))

    return h('el-cascader', {
      attrs: JSON.parse(JSON.stringify($attrs)),
      on: Object.assign({}, $listeners, {
        change: this.handleChange
      }),
      props,
      style: 'height:0;padding:0;top:-15px',
      ref: config.refname
    })
  }
}