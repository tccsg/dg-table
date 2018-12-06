<template>
  <div class="filterWrap" ref='searchfilter'>
    <div class="filterContainer">
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="searchdata"
        :fetch-suggestions="querySearchAsync"
        :placeholder="placeholderstr"
        @select="handleSelect">
        <template slot-scope="{ item }">
          <div class="name">{{ item[showkey] }}</div>
        </template>
      </el-autocomplete>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterkey: {
      type: String,
      default: ''
    },
    listinfo: {
      type: Object,
      default: function () {
        return {
          handler: null,
          showkey: '',
          searchkey: ''
        }
      }
    },
    placeholderstr: {
      type: String,
      default: '请输入内容'
    },
    fn: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchdata: '',
      showkey: 'name'
    }
  },
  methods: {
    querySearchAsync (queryString, cb) {
      if (queryString) {
        if (typeof this.listinfo.handler === 'function') {
          var _searchkey = {}
          if (!this.listinfo.searchkey) return
          _searchkey[this.listinfo.searchkey] = queryString
          this.listinfo.handler(_searchkey).then(res => {
            var showlist = res
            if (Array.isArray(showlist)) {
              if (showlist.length === 0) showlist = [{ [this.showkey]: '暂无数据' }]
              cb(showlist)
            }
          })
        }
      } else {
        var t = []
        cb(t)
      }
    },
    handleSelect (item) {
      this.$emit('getFilterBridge', {
        key: this.filterkey,
        label: item[this.showkey],
        value: item[this.filterkey],
        fn: this.fn
      })
    }
  },
  mounted () {
    this.showkey = this.listinfo.showkey ? this.listinfo.showkey : 'name'
  }
}
</script>

<style scoped>
.my-autocomplete .li {
  line-height: normal;
    padding: 7px;
}
.editFilter {
  position: absolute;
  width: 300px;
}
.my-autocomplete .li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete .li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete .li .highlighted .addr {
  color: #ddd;
}
.filterWrap {
  min-width: 100px;
  border: 1px solid #ebeef5;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 2px 0;
  position: absolute;
  z-index: 9;
}
.filterWrap .filterContainer {
  padding: 10px;
}
.filterWrap .filterBottom {
  padding: 8px;
  border-top: 1px solid #ebeef5;
}
.filterWrap .filterBottom button {
  background: transparent;
  border: none;
  color: #606266;
  cursor: pointer;
  font-size: 13px;
  padding: 0 3px;
}
.filterWrap .filterBottom button.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>
