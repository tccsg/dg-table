const anyType = [String, Number, Boolean, Function, Object, Array, Symbol]
export default {
  name: 'DgFilterWrap',
  props: {
    filterHandler: Function,
    value: anyType,
    label: String
  },
  functional: false,
  render (h) {
    console.log(this)

    const { $slots } = this

    return h('div', $slots.default)
  },
  mounted () {
    this.$on('__CUSTOM_FILTER_DATA__', res => {
      console.log(res)
    })
  }
}