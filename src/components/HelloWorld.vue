<template>
  <div class="hello">
    {{row['name']}}
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    row: Object
  },
  mounted() {
    // console.log(this.row)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
