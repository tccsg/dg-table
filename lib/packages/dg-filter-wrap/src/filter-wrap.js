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
    // console.log(this.$parent.$options.methods['confirmFilter'])
    const { $slots } = this
    return h('div', {}, $slots.default)
  },
  mounted() {
    
  }
}