<template>
  <span class="searchOne">
    <el-input v-model="keyword" placeholder="holder" @keyup.enter="search"></el-input>
    <el-button type="primary" v-on:click="search">搜索</el-button>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        holder: '用户名',
        keyword: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    },
    methods: {
      search:function(){
        console.log(this.keyword)
        this.$emit( "searchKey", [this.keyword])

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
  .searchOne{
    .el-input{
      width: 240px;
    }
    .el-button{
      margin: 0;
    }
  }
</style>
