export const Dom = {
  _selectType: {
    '.': 'class',
    '#': 'id'
  },
  parent: (node) => {
    return document.querySelector(node).parentNode
  },
  parents: (node, parentName) => {
    let pNode = typeof node === 'string' ? Dom.parent(node) : node.parentNode
    let type = parentName.substring(0, 1)
    let typeName = parentName.substring(1)

    if (pNode.nodeType !== 1) return null
    const curTypeName = pNode.nodeType === 1 ? pNode.getAttribute(Dom._selectType[type]) : ''
    const typeNames = curTypeName && curTypeName.split(" ") || []
    if (typeNames.includes(typeName)) {
      return pNode
    } else {
      if (pNode) {
        pNode = Dom.parents(pNode, parentName)
      } else {
        pNode = null
      }
    }
    return pNode
  } 
}