<template>
  <div>
  <div class="filterbox">
    <div class="filter-with-count" v-if="bardata">
      <el-tag
        disable-transitions
        v-for="(item, index) in bardata"
        :key="index"
        closable
        style="margin-right:10px;"
        @close="handleClose(item)"
        size="small"
        type='info'>
        <span
          style="color:#bbb"
          v-if="item.ftn">
          {{item.ftn}}:
        </span>
        {{item.label}}
      </el-tag>
      <div class="count">
        <slot name="tip">
          <b><slot name="count"></slot></b>
        </slot>
      </div>
      <div class="count">
        <slot name="curnum">
          <b><slot name="curcount"></slot></b>
        </slot>
      </div>
      <div class="count">
        <slot name="selectnum">
          <b><slot name="selectcount"></slot></b>
        </slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
  <div style="position:relative" v-if="data">
    <el-table
      ref="eltable"
      v-loading="isloading"
      :data="data"
      style="width: 100%"
      :show-summary="summary"
      @row-click="rowClick"
      @selection-change='handleSelectChange'>
      <el-table-column
        type="selection"
        width="35"
        v-if="selection">
      </el-table-column>
      <template v-for="(item, index) in columnConfig">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="index"
          :width="item.width">
          <template
            slot="header"
            slot-scope="scope">
            <template v-if="item.filterConfig && item.filterConfig.type">
              <span
                @click='headerClick'
                class="customize_filter"
                :id='`${item.filterConfig.type}_${item.prop}`'
                style='cursor:pointer;display:inline-block'
              >
                <span style='padding-right:3px;'>{{item.label}}</span>
                <i class='el-icon-caret-bottom' />
              </span>
            </template>
            <template v-else>
              <span
                class="customize_filter"
                style='display:inline-block'>
                <span style='padding-right:3px;'>{{item.label}}</span>
              </span>
            </template>
          </template>
          <template slot-scope="{ row }">
            <template v-if="!item.component">
              <!-- 默认提供了时间转化列，获取数组数量列，数据映射列，提供以点的形式来获取对象数据，为空时返回 ‘-’ -->
              <span
                :style="item.style ? item.style : ''"
                v-if="item.processdata === 'time'">
                {{getTime(row[item.prop])}}</span>
              <span
                :style="item.style ? item.style : ''"
                v-else-if="item.processdata === 'time2'">
                {{getTime(row[item.prop], 'y-m-d h:s:m')}}</span>
              <span
                :style="item.style ? item.style : ''"
                v-else-if="typeof item.processdata === 'function'">
                {{item.processdata(row, item.prop)}}</span>
              <span
                v-else
                :style="item.style">
                {{getText({cc: item, s: row})}}</span>
            </template>
            <!-- 自定义组件来处理列的数据 -->
            <template v-if="item.component">
              <component
                :is="item.component"
                :row="row"
                :key="index"
                :extra="item.extra">
              </component>
            </template>
          </template>
        </el-table-column>
      </template>
      <!-- 具有菜单的按钮 -->
      <template v-if="actionConfig">
        <!-- 单个按键 -->
        <el-table-column
          :width="actionConfig.width"
          v-if="actionConfig.type === 'button'"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click.stop="actionConfig.handler(scope)">
              {{actionConfig.label}}</el-button>
          </template>
        </el-table-column>
        <!-- 文字按键 -->
        <el-table-column
          :width="actionConfig.width"
          v-if="actionConfig.type === 'textbtn'"
          label="操作">
          <template slot-scope="scope">
            <span
              @click.stop="actionConfig.handler(scope)"
              style="cursor:pointer;color: #ff0000;">
              {{actionConfig.label}}</span>
          </template>
        </el-table-column>
        <!-- 自定义操作区域 -->
        <el-table-column
          v-if="actionConfig.type === 'customize' && actionConfig.component"
          :width="actionConfig.width"
          :label="actionConfig.label ? actionConfig.label : '操作'">
          <template slot-scope="scope">
            <component
              :is="actionConfig.component"
              :row='scope.row'
              @commonHanlerBridge='commonHanlerBridge'
              @doactive='doactive'
              :handlers="actionConfig.handlers">
            </component>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 注册的筛选器 -->
    <div v-clickoutside='allfilterHide'>
      <template v-for="(item, key) in regfilters">
        <!-- 输入框选择器 -->
        <div :class="{'filterWrap': true, 'hideBg': item.hidebg}"
          v-show="filterAction[key]"
          :key="key"
          :style="item.position">
          <div class="filterContainer">
            <component
              :key="key"
              :is="item.component"
              :data="item.data"
              :filterkey="item.filterkey"
              :listinfo="item.listinfo"
              :refname="item.refname"
              :cdata="item.cdata"
              :myprops="item.myprops"
              :placeholderstr="item.myplaceholder"
              :unit="item.unit"
              :ftn="item.ftn"
              :customizedata="item.customizedata"
              @getFilterBridge="getFilterBridge">
            </component>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div
    v-if="pagination"
    class="paginationWrap">
    <el-pagination
      background
      :pager-count="7"
      layout="prev, pager, next"
      :page-count="pageConfig.pagenum"
      :current-page.sync="pageConfig.curpage"
      @current-change="clickpage">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import editFilter from './Filters/edit.vue'
import dateFilter from './Filters/date.vue'
import cascaderFilter from './Filters/cascader.vue'
import searchFilter from './Filters/search.vue'
import radiosFilter from './Filters/radio.vue'
import rangeFilter from './Filters/range.vue'
import Bus from './js/Bus.js'
import {
  getFilter,
  doDeleteFilter,
  initFilterData
} from './js/index.js'
var myFilterComponts = {
  edit: editFilter,
  date: dateFilter,
  cascader: cascaderFilter,
  search: searchFilter,
  radio: radiosFilter,
  range: rangeFilter
}

// 渲染出来后各种类型筛选器的数量 对应的filter的key
// 因为可能有多个一样类型的筛选器
var curFilterCount = {
  edit: 0,
  date: 0,
  cascader: 0,
  search: 0,
  radio: 0,
  range: 0
}
var _regFilter = {}
var _filterAction = {}
// 存放当前显示的 filter数据 e--》filter的header  filter--》filter的对象映射
var _curFilter = ''
var _filterbar = null
var _regfilterarr = []
export default {
  name: 'dg-table',
  destroyed () {
    initFilterData()
    for (let k in curFilterCount) {
      curFilterCount[k] = 0
    }
    _regFilter = {}
    _filterAction = {}
    _curFilter = ''
    _filterbar = null
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    selection: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default: function () {
        return { pagenum: 1, curpage: 1 }
      }
    },
    filterInit: Array,
    rowClick: {
      type: Function,
      default: function () {
        return () => {}
      }
    },
    summary: {
      type: Boolean,
      default: false
    },
    actionConfig: Object,
    actionCompoent: {
      validator: function (vm) {
        return vm._isVue ? vm._isVue : null
      }
    },
    columnConfig: Array,
    isloading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      t_headre: {
        props: ['item', 'headerClick', 'f_id'],
        render: function () {
          return (
            <span
              onClick={ this.headerClick }
              class="customize_filter"
              id={ this.f_id }
              style='cursor:pointer;display:inline-block'
            >
              <span style='padding-right:3px;'>{ this.item.label }</span>
              <i class='el-icon-caret-bottom'/>
            </span>
          )
        }
      },
      bardata: [],
      regfilters: {},
      filterAction: {},
      filtericon: {}
    }
  },
  methods: {
    // 点击分页
    clickpage (val) {
      this.$emit('page-change', val)
    },
    // 删除tag
    handleClose (tag) {
      this.bardata.splice(this.bardata.indexOf(tag), 1)
      var dofilter = doDeleteFilter(tag)
      this.$emit('filter-change', dofilter)
    },
    getTime (UTCDateString, type = 'Y-M-D') {
      if (!UTCDateString) {
        return '-'
      }
      function formatFunc (str) {
        return str > 9 ? str : '0' + str
      }
      var date2 = new Date(UTCDateString)
      var year = date2.getFullYear()
      var mon = formatFunc(date2.getMonth() + 1)
      var day = formatFunc(date2.getDate())
      var hour = date2.getHours()
      hour = formatFunc(hour)
      var min = formatFunc(date2.getMinutes())
      var dateStr
      if (type === 'Y-M-D') dateStr = year + '.' + mon + '.' + day
      else dateStr = year + '.' + mon + '.' + day + '   ' + hour + ':' + min
      return dateStr
    },
    getText (val) {
      var attarr = val.cc.prop.split('.')
      var curobj = val.s
      for (var i = 0; i < attarr.length; i++) {
        if (!curobj[attarr[i]] && curobj[attarr[i]] !== 0) {
          return '-'
        }
        curobj = curobj[attarr[i]]
      }
      if (val.cc.cb) {
        return val.cc.cb(curobj)
      }
      return curobj
    },
    doactive (d) {
      this.$emit(d.func, d.args)
    },
    getFilterBridge (val) {
      let formatdata = getFilter(val)
      this.bardata = formatdata.showfilter
      this.$emit('filter-change', formatdata.dofilter)
      this.allfilterHide('none')
    },
    // 函数通讯桥梁
    // func---》页面要执行的函数名字
    // data---》需要的数据
    commonHanlerBridge ({ func, data }) {
      this.$emit(func, data)
    },
    renderTableHeader (column, ftype, config) {
      var filtertag = this.doRegFilters(ftype, config)
      return (
        <span
          onClick={this.headerClick}
          class="customize_filter"
          id={filtertag}
          style='cursor:pointer;display:inline-block'
        >
          <span style='padding-right:3px;'>{column.label}</span>
          <i class='el-icon-caret-bottom' />
        </span>
      )
    },
    // 注册筛选器
    // 根据已经注册的该类型的筛选器的个数来确定
    // 筛选器的标志
    // 成功注册后该类型的筛选器 +1
    doRegFilters (ftype, columconfig) {
      // 注册自定义筛选器
      if (!myFilterComponts[ftype]) this.regCustomizeFilter(ftype, columconfig.filterConfig)
      // 设置filter标志
      var filtertag = `${ftype}_${columconfig.prop}`
      if (_regfilterarr.indexOf(filtertag) !== -1) return
      curFilterCount[ftype] += 1
      const _filterConfig = columconfig.filterConfig
      if (!_filterConfig) return
      _regfilterarr.push(filtertag)
      // 解决vue在 以索引的情况赋值 页面不刷新的问题
      let configs = {
        component: myFilterComponts[ftype],
        show: false,
        position: { top: 0, left: 0 },
        refname: filtertag,
        data: _filterConfig.items,
        myprops: _filterConfig.props,
        cdata: _filterConfig.options,
        filterkey: _filterConfig.key,
        listinfo: _filterConfig.listinfo,
        myplaceholder: _filterConfig.placeholder,
        unit: _filterConfig.unit,
        ftn: _filterConfig.ftn,
        hidebg: _filterConfig.hidebg,
        customizedata: _filterConfig.customizedata
      }
      this.$set(_regFilter, filtertag, configs)
      this.regfilters = _regFilter
      this.filterAction = JSON.parse(JSON.stringify(_filterAction))
      return filtertag
    },
    regCustomizeFilter (ftype, fconfig) {
      if (curFilterCount.hasOwnProperty(ftype)) {
        curFilterCount[ftype] = 0
      }
      const customizeFilter = {}
      customizeFilter[ftype] = fconfig.component
      myFilterComponts = Object.assign({}, myFilterComponts, customizeFilter)
    },
    headerClick (e) {
      e.cancelBubble = true
      const curfilterId = e.currentTarget.id
      if (_filterAction[curfilterId]) {
        document.querySelector(`#${curfilterId} i`) &&
        document.querySelector(`#${curfilterId} i`).setAttribute('class', 'el-icon-caret-bottom')
      } else {
        document.querySelector(`#${curfilterId} i`) &&
        document.querySelector(`#${curfilterId} i`).setAttribute('class', 'el-icon-caret-top')
      }
      this.allfilterHide(curfilterId)
      this.filterPosition(
        e.currentTarget.parentElement.parentElement,
        curfilterId
      )
      this.$set(
        _filterAction,
        curfilterId,
        !_filterAction[curfilterId]
      )
      this.filterAction = _filterAction
      var type = curfilterId.split('_')[0]
      _curFilter = curfilterId
      _filterbar = e.currentTarget.parentElement.parentElement
      if (type === 'date' && _filterAction[_curFilter]) {
        Bus.$emit('OPEN_DGTABLE_DATE_FILTER', curfilterId)
      }
      if (type === 'cascader' && _filterAction[_curFilter]) {
        Bus.$emit('OPEN_DGTABLE_CASCADER_FILTER', curfilterId)
      }
      if (type === 'radio' && _filterAction[_curFilter]) {
        Bus.$emit('LOAD_DGTABLE_RADIO_DATA', curfilterId)
      }
    },
    handleSelectChange (val) {
      // 解决选择 页面重新渲染的问题
      // _regFilter = {}
      // _filterAction = {}
      // this.regfilters = _regFilter
      this.$emit('select-change', val)
    },
    filterPosition (filterbar, filtertag) {
      var offsetLeft = filterbar.offsetLeft
      var offsetHeight = filterbar.offsetHeight
      if (_regFilter[filtertag]) {
        this.$set(_regFilter[filtertag].position, 'top', offsetHeight - 10 + 'px')
        this.$set(_regFilter[filtertag].position, 'left', offsetLeft + 'px')
      }
      this.regfilters = _regFilter
    },
    allfilterHide (cfilter) {
      for (var k in _filterAction) {
        if (k !== cfilter) {
          this.$set(_filterAction, k, false)
          if (document.querySelector(`#${k} i`)) document.querySelector(`#${k} i`).setAttribute('class', 'el-icon-caret-bottom')
        }
      }
      this.filterAction = _filterAction
    },
    // 用于初始化 filters bar
    initFilterBar () {
      let initfilters = this.tableInfo.toolsConfig.filters
      if (typeof initfilters === 'object' && typeof initfilters.length !== 'number') {
        let tags = []
        initFilterData(initfilters)
        for (let k in initfilters) {
          tags.push(initfilters[k])
        }
        this.bardata = tags
      }
    }
  },
  directives: {
    clickoutside: {
      bind: function (el, binding) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind: function (el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  },
  mounted: function () {
    // this.initFilterBar()
    this.columnConfig.forEach(e => {
      if (e.filterConfig) {
        this.doRegFilters(e.filterConfig.type, e)
      }
    })
    window.onresize = () => {
      setTimeout(() => {
        if (_filterbar) this.filterPosition(_filterbar, _curFilter)
      }, 0)
    }
  }
}
</script>

<style scoped>
@import './css/common.css';
.filterbox {
  height: 50px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  background: #f9f9f9;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  justify-content: space-between;
}
.paginationWrap {
  display:flex;
  justify-content: center;
  margin-top:20px
}
.filter-with-count {
  display: flex;
  align-items: center;
}
.count {
  color: #909399;
  font-size: 12px;
}
</style>
