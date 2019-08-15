<template>
  <div>
    <dg-date-picker
      :config="config"
      type="daterange"
      align="left"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
    >
    </dg-date-picker>
  </div>
</template>

<script>
export default {
  props:['config'],
  mounted() {
    // console.log(this.config)
  }
}
</script>

