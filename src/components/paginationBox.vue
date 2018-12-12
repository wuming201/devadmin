<template>
    <el-pagination
      @current-change='handleCurrentChange'
      layout='total, prev, pager, next, jumper'
      :total='data'
      :page-size='pageSize'
      :current-page.sync="page"
      >
      <!-- v-if=" data > pageSize " -->
    </el-pagination>
</template>

<script>
  export default {
    props: { 'data': {}, 'pageSize': { default: 40 }, 'page': 0},
    data() {
      return {
        // pageSize:40
        // pagesize: 40
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val)
        this.$emit('getCurrent', val)
        console.log(this.page)
      }
    },
    watch:{
      data:function(){
        console.log("正确接收到分页数"+this.data)
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
