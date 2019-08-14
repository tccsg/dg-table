<template>
  <div>
    <span
      v-if="row.gender === '1'"
      class="male">
      {{gender[row['gender']]}}
    </span>
    <span
      v-if="row.gender === '2'"
      class="female">
      {{gender[row['gender']]}}
    </span>
  </div>
</template>

<script>
export default {
  props:['row', 'column'],
  data() {
    return {
      gender: Object.freeze({
        1: '男',
        2: '女'
      })
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

