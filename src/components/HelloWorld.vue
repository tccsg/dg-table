<template>
  <div class="hello">
    {{getPlace(row, 'birthPlace')}}
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
  },
  methods: {
    getPlace (row) {
       var space = ''
        if (!row.birthPlace) return '-'
        var curobj = row.birthPlace
        while (curobj) {
          if (curobj) {
            space += curobj.name
            curobj = curobj.child
          } else {
            break
          }
        }
        return space
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
