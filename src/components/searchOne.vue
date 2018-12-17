<template>
  <span class="searchOne">
    <el-input v-model="keyword" :placeholder="holder" @keyup.enter="search"></el-input>
    <el-button type="primary" v-on:click="search">搜索</el-button>
  </span>
</template>

<script>
  export default {
    props: ['holder'],
    data() {
      return {
        // holder: '用户名',
        keyword: '',
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
