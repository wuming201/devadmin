<template>
  <div class="level-bread" v-if="noTag != false" >
    <el-breadcrumb class="breadcrumb" separator="/" >
      <el-breadcrumb-item ><router-link to="/index">后台管理</router-link></el-breadcrumb-item>
      <el-breadcrumb-item
        v-for='(item,index) in levelList'
        :key='index'
        v-if='item.name'
        :to="item.path">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>
<script>
  export default {
    name: '',
    data() {
      return {
        levelList: null,
        noTag: ''
      }
    },
    created() {
      this.getBreadcrumb();

    },
    methods: {
      getBreadcrumb() {
        let a = this.$route.path
        if(a != '/documentation/index' && a != '/index') {
          this.noTag = true
        }
        console.log(this.levelList)
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        this.levelList = matched
      }
    },
    watch: {
      $route() {
        console.log('1111')
        this.getBreadcrumb();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .level-bread {
    padding: 30px 25px;
    background-color: #fff;
    .paths {
      font-size: 18px;
      font-weight: bold;
      span {
        font-size: 14px;
      }
    }
  }
</style>
