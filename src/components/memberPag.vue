<template>
    <el-pagination
      @current-change='handleCurrentChange'
      layout='total, prev, pager, next, jumper'
      :total='data.length'
      :page-size='pageSize'
      v-if=" data.length> pageSize "
      >
      <!-- v-if=" data > pageSize " -->
    </el-pagination>
</template>

<script>
  export default {
    props: {'data':{},'pageSize':{default:8}},
    data() {
      return {
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val)
        this.$emit('getCurrent', val)
      }
    },
    watch:{
      data:function(){
        console.log("正确接收到分页数"+this.data.length)
        console.log(this.data)
      },
      pageSize:function(){
        console.log("接收到每页数据量")
        console.log(this.pageSize)
      }
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .timeBox{
    margin-left: 10px;
    display: inline-block;
    .el-range-separator{
      width: 20px;
    }
  }
</style>
