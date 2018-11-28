<template>
  <div class="oneTime">
    <el-date-picker
      v-model="otvalue"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        otvalue: '',
        value: ''
      }
    },
    watch:{
      otvalue:function(){
        this.value=PUBLIC.dateFtt("yyyy-MM-dd hh:mm:ss",this.otvalue)
        console.log(this.value)
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
  .oneTime{
    margin-left: 10px;
    display: inline-block;
    .el-date-editor{
      width: 160px !important;
    }
  }
</style>
