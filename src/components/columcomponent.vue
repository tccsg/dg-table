<template>
  <div>
    <span v-if="row.gender === '1'" class="male">{{gendermap[row.gender]}}</span>
    <span v-if="row.gender === '2'" class="female">{{gendermap[row.gender]}}</span>
  </div>
</template>
<script>
import { GENDER } from '../assets/js/datamap.js'
export default {
  props: ['row'],
  data () {
    return {
      gendermap: GENDER
    }
  }
}
</script>

<style scoped>
.female {
  color: #FFB6C1
}
.male {
  color: #4169E1
}
</style>
