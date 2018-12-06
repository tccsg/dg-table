<template>
  <div class="filterWrap">
    <div class="filterContainer" :ref="refname">
      <div
        v-show="innerdata.length === 0"
        class="radioitems"
        v-for="(item, key, index) in data"
        :key="index"
        @click='checkchange(item)'>
        {{item.label}}
      </div>
      <div
        v-show="innerdata.length !== 0"
        class="radioitems"
        v-for="(item, key, index) in innerdata"
        :key="index"
        @click='checkchange(item)'>
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../js/Bus.js'
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    filterkey: {
      type: String,
      default: ''
    },
    listinfo: {
      type: Object,
      default: function () {
        return {
          handler: null,
          labelkey: 'label',
          valuekey: 'value'
        }
      }
    },
    refname: {
      type: String,
      default: ''
    },
    fn: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      radioData: {},
      innerdata: []
    }
  },
  computed: {
    loaddata () {
      return this.innerdata
    }
  },
  methods: {
    checkchange (value) {
      this.radioData = value
      this.$emit('getFilterBridge', {
        key: this.filterkey,
        label: value.label,
        value: value.value,
        fn: this.fn
      })
    },
    loadData () {
      if (!this.listinfo.handler) return
      let filter = {}
      if (this.listinfo.payload) {
        filter = this.listinfo.payload
      }
      this.listinfo.handler(filter).then(res => {
        this.innerdata = []
        for (let i = 0; i < res.length; i++) {
          var _t = {}
          _t.label = res[i][this.listinfo.labelkey]
          _t.value = res[i][this.listinfo.valuekey]
          this.innerdata.push(_t)
        }
      })
    }
  },
  mounted () {
    Bus.$on('loadradiodata', refname => {
      if (this.listinfo) {
        if (this.refname === refname) {
          this.loadData()
        }
      }
    })
  }
}
</script>

<style scoped>
.filterContainer .el-radio__label {
  font-size: 12px !important;
}
.editFilter {
  position: absolute;
  width: 300px;
}
.filterWrap {
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
  padding: 10px 0;
  max-height: 300px;
  overflow: scroll;
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
.radioitems {
  padding: 8px 30px;
  text-align: center;
  color: #303133;
  font-size: 12px;
  cursor: pointer;
}
.radioitems:hover {
  background-color: rgb(255, 247, 232);
  color: rgb(251, 191, 71);
}
</style>
