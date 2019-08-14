<template>
  <div>
    <dg-cascader
    :options='options'
    :config='config'
    :props='myprops'
    ></dg-cascader>
  </div>
</template>

<script>
import {
  cities
} from '../assets/js/simulationapi.js'
export default {
  props: ['config'],
  data() {
    return {
      options: cities(),
      myprops: {
        value: 'code',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover'
      }
    }
  }
}
</script>
