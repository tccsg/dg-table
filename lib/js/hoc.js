/**
 * 高阶组件函数对elmentui原本的组件进行二次包装
 * 来实现eui原本组件的属性和事件的支持
 */
// import Vue from 'vue'

const wrapElementUiComponents = (wrapedComponent) => {
  return {
    props: wrapedComponent.options.props || {},
    render: function (h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
      return h(wrapedComponent, {
        props: this.$props
      }, [slots])
    }
  }
}

export default wrapElementUiComponents
