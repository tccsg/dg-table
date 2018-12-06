<template>
  <div>
  <div v-if="tableInfo.toolsConfig.filterbar" class="filterbox">
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
        <span style="color:#bbb" v-if="item.fn">{{item.fn}}:</span>
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
  <div style="position:relative" v-if="tableInfo">
    <el-table
      :cell-style="{'cursor':tableInfo.columConfig.onclick ? 'pointer' : ''}"
      v-loading="isloading"
      :data="tableInfo.data"
      style="width: 100%"
      :show-summary="tableInfo.summary"
      @row-click="tableInfo.columConfig.onclick"
      @selection-change='handleSelectChange'>
      <el-table-column
        type="selection"
        width="35"
        v-if="tableInfo.toolsConfig.select">
      </el-table-column>
      <template v-for="(item, index) in tableInfo.columConfig.config">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="index"
          :width="item.width"
          :render-header="item.filterConfig.type ? (h, obj, scope) => renderTableHeader(h, obj, item.filterConfig.type, item) : null">
          <template slot-scope="{ row }">
            <template v-if="!item.component">
              <!-- 默认提供了时间转化列，获取数组数量列，数据映射列，提供以点的形式来获取对象数据，为空时返回 ‘-’ -->
              <span :style="item.style ? item.style : ''" v-if="item.processdata === 'time'">{{getTime(row[item.prop])}}</span>
              <span :style="item.style ? item.style : ''" v-else-if="item.processdata === 'time2'">{{getTime(row[item.prop], 'y-m-d h:s:m')}}</span>
              <span :style="item.style ? item.style : ''" v-else-if="item.processdata === 'count'">{{getCount(row[item.prop])}}</span>
              <span :style="item.style ? item.style : ''" v-else-if="item.processdata === 'map'">{{getTextmap(row[item.prop], item.map)}}</span>
              <span :style="item.style ? item.style : ''" v-else-if="item.processdata === 'maparr'">{{getmaparr(row[item.prop], item.kname)}}</span>
              <span :style="item.style ? item.style : ''" v-else-if="typeof item.processdata === 'function'">{{item.processdata(row, item.prop)}}</span>
              <span v-else :style="item.style">{{getText({cc: item, s: row})}}</span>
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
      <template v-if="tableInfo.columConfig.activeConfig">
        <el-table-column
          v-if="tableInfo.columConfig.activeConfig.type === 'menu'"
          label="操作">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.status !== '12'"
              trigger="click">
              <component
                :is="tableInfo.columConfig.activeConfig.component"
                :row='scope.row'
                @doactive='doactive'>
              </component>
              <el-button
                size="mini"
                slot="reference"
                icon="el-icon-more">
                <!-- {{tableInfo.activeConfig.label}} -->
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <!-- 单个按键 -->
        <el-table-column
          :width="tableInfo.columConfig.activeConfig.width"
          v-if="tableInfo.columConfig.activeConfig.type === 'button'"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="tableInfo.columConfig.activeConfig.handler(scope)">{{tableInfo.columConfig.activeConfig.label}}</el-button>
          </template>
        </el-table-column>
        <!-- 文字按键 -->
        <el-table-column
          :width="tableInfo.columConfig.activeConfig.width"
          v-if="tableInfo.columConfig.activeConfig.type === 'textbtn'"
          label="操作">
          <template slot-scope="scope">
            <span @click="tableInfo.columConfig.activeConfig.handler(scope)" style="cursor:pointer;color: #ff0000;">{{tableInfo.columConfig.activeConfig.label}}</span>
          </template>
        </el-table-column>
        <!-- 自定义操作区域 -->
        <!-- handler 即将弃用 -->
        <el-table-column
          v-if="tableInfo.columConfig.activeConfig.type === 'customize'"
          :width="tableInfo.columConfig.activeConfig.width"
          label="操作">
          <template slot-scope="scope">
            <component
              :is="tableInfo.columConfig.activeConfig.component"
              :row='scope.row'
              @commonHanlerBridge='commonHanlerBridge'
              @doactive='doactive'
              :handlers="tableInfo.columConfig.activeConfig.handlers"
              :handler="tableInfo.columConfig.activeConfig.handler">
            </component>
          </template>
        </el-table-column>
      </template>
      <template v-if="tableInfo.additionalRow">
        <!-- 额外的非操作的列 -->
        <el-table-column
          v-if="tableInfo.additionalRow.have"
          :width="tableInfo.additionalRow.width"
          :label="tableInfo.additionalRow.headerlabel ? tableInfo.additionalRow.headerlabel : '自定义label'">
          <template slot-scope="scope">
            <component
              :is="tableInfo.additionalRow.component"
              :row="scope.row"
              :scopee="scope"
              :extra="tableInfo.additionalRow.extra">
            </component>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 注册的筛选器 -->
    <div v-clickoutside='allfilterHide'>
      <template v-for="(item, key) in regfilters">
          <component
            :key="key"
            :is="item.component"
            v-show="filterAction[key]"
            :style="item.position"
            :data="item.data"
            :filterkey="item.filterkey"
            :listinfo="item.listinfo"
            :refname="item.refname"
            :cdata="item.cdata"
            :myprops="item.myprops"
            :placeholderstr="item.myplaceholder"
            :filterconfig="item.filterconfig"
            :unit="item.unit"
            :fn="item.fn"
            @getFilterBridge="getFilterBridge">
          </component>
      </template>
    </div>
  </div>
  <div
    v-if="tableInfo.toolsConfig.pagination"
    style="display:flex;justify-content: center;margin-top:20px">
    <el-pagination
      background
      :pager-count="7"
      layout="prev, pager, next"
      :page-count="tableInfo.toolsConfig.pagenum"
      :current-page.sync="tableInfo.toolsConfig.curpage"
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
export default {
  name: 'dg-table',
  destroyed () {
    initFilterData()
    curFilterCount = {
      edit: 0,
      date: 0,
      cascader: 0,
      search: 0,
      radio: 0,
      range: 0
    }
    _regFilter = {}
    _filterAction = {}
    _curFilter = ''
    _filterbar = null
  },
  props: ['tableInfo', 'isloading'],
  data () {
    return {
      data: [],
      bardata: [],
      regfilters: {},
      filterAction: {},
      filtericon: {}
    }
  },
  methods: {
    // 点击分页
    clickpage (val) {
      this.$emit('getpage', val)
      // console.log(val)
    },
    // 删除条件
    handleClose (tag) {
      this.bardata.splice(this.bardata.indexOf(tag), 1)
      var dofilter = doDeleteFilter(tag)
      this.$emit('getFilter', dofilter)
    },
    // 之后引入自定义获取数据的方式
    getmaparr (arr, k) {
      var data = {
        current: 0,
        total: 0
      }
      for (var i = 0; i < arr.length; i++) {
        data.current += arr[i][k].current
        data.total += arr[i][k].total
      }
      return data.current + '/' + data.total
    },
    getTextmap (n, mapobj) {
      return mapobj[n]
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
    getCount (val) {
      return val.length
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
      // console.log(d.func)
      this.$emit(d.func, d.args)
    },
    getFilterBridge (val) {
      // console.log(val)
      let formatdata = getFilter(val)
      this.bardata = formatdata.showfilter
      // console.log(formatdata)
      this.$emit('getFilter', formatdata.dofilter)
      this.allfilterHide('none')
    },
    // 函数通讯桥梁
    // func---》页面要执行的函数名字
    // data---》需要的数据
    commonHanlerBridge ({ func, data }) {
      this.$emit(func, data)
    },
    renderTableHeader (h, { column }, ftype, config) {
      var filtertag = this.doRegFilters(ftype, config)
      return (
        <span
          onClick={this.headerClick}
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
      // 设置filter标志
      var filtertag = ftype + '_' + curFilterCount[ftype]
      curFilterCount[ftype] += 1
      // 解决vue在 以索引的情况赋值 页面不刷新的问题
      let configs = {
        component: myFilterComponts[ftype],
        show: false,
        position: { top: 0, left: 0 },
        refname: filtertag,
        filterconfig: columconfig.filterConfig,
        data: columconfig.filterConfig.items,
        myprops: columconfig.filterConfig.props,
        cdata: columconfig.filterConfig.options,
        filterkey: columconfig.filterConfig.key,
        listinfo: columconfig.filterConfig.listinfo,
        myplaceholder: columconfig.filterConfig.placeholder,
        unit: columconfig.filterConfig.unit,
        fn: columconfig.filterConfig.fn
      }
      this.$set(_regFilter, filtertag, configs)
      this.regfilters = _regFilter
      this.filterAction = JSON.parse(JSON.stringify(_filterAction))
      return filtertag
    },
    headerClick (e) {
      e.cancelBubble = true
      this.allfilterHide(e.currentTarget.id)
      this.filterPosition(
        e.currentTarget.parentElement.parentElement,
        e.currentTarget.id
      )
      this.$set(
        _filterAction,
        e.currentTarget.id,
        !_filterAction[e.currentTarget.id]
      )
      this.filterAction = _filterAction
      var type = e.currentTarget.id.split('_')[0]
      _curFilter = e.currentTarget.id
      _filterbar = e.currentTarget.parentElement.parentElement
      if (type === 'date' && _filterAction[_curFilter]) {
        Bus.$emit('openjobinterviewdate', e.currentTarget.id)
      }
      if (type === 'cascader' && _filterAction[_curFilter]) {
        Bus.$emit('openjobinterviewcascader', e.currentTarget.id)
      }
      if (type === 'sselect' && _filterAction[_curFilter]) {
        Bus.$emit('loaddata', e.currentTarget.id)
      }
      if (type === 'radio' && _filterAction[_curFilter]) {
        Bus.$emit('loadradiodata', e.currentTarget.id)
      }
    },
    handleSelectChange (val) {
      // 解决选择 页面重新渲染的问题
      _regFilter = {}
      _filterAction = {}
      this.regfilters = _regFilter
      this.$emit('getselect', val)
    },
    filterPosition (filterbar, filtertag) {
      var offsetLeft = filterbar.offsetLeft
      var offsetHeight = filterbar.offsetHeight
      this.$set(_regFilter[filtertag].position, 'top', offsetHeight - 10 + 'px')
      this.$set(_regFilter[filtertag].position, 'left', offsetLeft + 'px')
      this.regfilters = _regFilter
    },
    allfilterHide (cfilter) {
      for (var k in _filterAction) {
        if (k !== cfilter) this.$set(_filterAction, k, false)
      }
      this.filterAction = _filterAction
    },
    hideOtherFilter () {
      if (_curFilter) {
        this.$set(_filterAction, _curFilter, false)
        this.filterAction = _filterAction
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
    window.onresize = () => {
      setTimeout(() => {
        if (_filterbar) this.filterPosition(_filterbar, _curFilter)
      }, 0)
    }
  }
}
</script>

<style scoped>
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
.filter-with-count {
  display: flex;
  align-items: center;
}
.count {
  color: #909399;
  font-size: 12px;
}
</style>
