<template>
  <div class="radioWrap" :ref="refname">
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
    ftn: {
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
        ftn: this.ftn
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
    Bus.$on('LOAD_DGTABLE_RADIO_DATA', refname => {
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
@import '../css/common.css';
.editFilter {
  position: absolute;
  width: 300px;
}
.radioWrap{
  padding: 10px 0;
  max-height: 300px;
  overflow-y: visible;
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
