<template>
  <div ref='searchfilter' style="padding:10px">
    <div>
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
    ftn: {
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
        ftn: this.ftn
      })
    }
  },
  mounted () {
    this.showkey = this.listinfo.showkey ? this.listinfo.showkey : 'name'
  }
}
</script>

<style scoped>
@import '../css/common.css';
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
</style>
