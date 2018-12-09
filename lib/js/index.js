
/* eslint-disable */
// 这个js文件是用于
// 从筛选器中得到的数据传输到你的page中
// 如果在多个组建中引用这个文件 要调用initFilterData
let _filters = {}
export const getFilter = val => {
  var _t = []
  var _ft = {}
  if (val.label) {
    _filters[val.key] = {
      label: val.label,
      ftn: val.ftn,
      value: val.value,
      key: val.key
    }
  } else {
    if (_filters.hasOwnProperty(val.key)) {
      delete _filters[val.key]
    }
  }
  for (var k in _filters) {
    _t.push(_filters[k])
    _ft[k] = _filters[k].value
  }
  return { showfilter: _t, dofilter: _ft }
}
export const doDeleteFilter = tag => {
  var dkey = tag.key
  delete _filters[dkey]
  var _ft = {}
  for (var k in _filters) {
    _ft[k] = _filters[k].value
  }
  return _ft
}
export const initFilterData = (inittags = {}) => {
  _filters = inittags
}
