<template>
  <span class="searchBox">
    <el-select v-model="values" :placeholder="holder">
      <el-option
        v-for="item in searchSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input  placeholder="请输入内容" v-model="keyword" @keyup.13.native="search"></el-input>
    <el-button type="primary" v-on:click="search">搜索</el-button>
  </span>

</template>

<script>
  export default {
    props: { searchSelect: Array },
    data() {
      return {
        holder: '用户名',
        keyword: '',
        value: '',
        values: ''
      }
    },
    methods: {
      dada() {
        console.log('cccccccccccccccccccccccccccccccccccccc')
      },
      search:function(){
        if (this.keyword === '') {
          this.$message({
            message: '搜索内容为空！',
            type: 'warning'
          });
          return
        }
        console.log(this.value, this.keyword)
        console.log(this.values, this.searchSelect[0].label)
        if(this.value != this.searchSelect[0].label) {
          console.log('1')
          this.$emit( "searchKey", [this.value, this.keyword])
        } else {
          console.log('2')
          this.$emit( "searchKey", [this.searchSelect[0].value, this.keyword])
        }

      }
    },
    watch: {
      values() {
        console.log(this.values, this.value)
        this.value = this.values
        console.log(this.value)
      }
    },
    mounted() {
      console.log(this.values, this.value)
      this.values = this.searchSelect[0].label
      this.value = this.searchSelect[0].value
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
  .searchBox{
    .el-select{
      .el-input--suffix {
        width: 110px;
      }
      .resize-triggers{
        width: 110px;
      }
    }
    .el-input{
      width: 240px;
    }
  }
</style>
