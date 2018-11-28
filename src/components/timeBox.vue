<template>
  <div class="timeBox">
    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value6: '',
        value7: '',
        value:[0,0]
      }
    },
    watch:{
      value6:function(){
        this.value[0]=PUBLIC.dateFtt("yyyy-MM-dd hh:mm:ss",this.value6[0])
        this.value[1]=PUBLIC.dateFtt("yyyy-MM-dd hh:mm:ss",this.value6[1])
        this.$emit('value',this.value)
      },
      // value7:function(){
      //   this.value[1]=this.value7
      //   this.$emit('value',this.value)
      // },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .timeBox{
    margin-left: 10px;
    display: inline-block;
    .el-range-separator{
      width: 20px;
    }
  }
</style>
