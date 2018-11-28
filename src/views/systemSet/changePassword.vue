<template>
  <div class="addMember clearfix">
    <div class="memberInfo">
      <p><span>&emsp;&emsp;旧密码：</span><el-input v-model="oldP"></el-input></p>
      <p><span>&emsp;&emsp;新密码：</span><el-input v-model="newP"></el-input></p>
      <p><span>确认新密码：</span><el-input v-model="checkNew"></el-input></p>
      <p><el-button type="success" @click="changePwd">保存</el-button><el-button type="info">取消</el-button></p>
    </div>
  </div>
</template>

<script>
import { selectKuang } from '../../components/index'

export default {
  name: 'addMember',
  components: {
    selectKuang
  },
  data() {
    return {
      oldP: ' ',
      newP: '',
      checkNew: ''
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    changePwd() {
      var _this = this
      if(_this.checkNew === _this.newP) {
        console.log('一样')
      } else{
        console.log("不一样")
        return
      }
      PUBLIC.get('User.User.Userupdpwd', { oldpwd: _this.oldP, newpwd: _this.checkNew }, function (data) {
        console.log(data)
      })
    }
    // getPwd() {
    //   var _this = this
    //   PUBLIC.get('User.User.Userone', { oldpwd: _this.oldP, newpwd: _this.checkNew }, function (data) {
    //     console.log(data)
    //   })
    // }
  },
  mounted() {
    // this.getPwd()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .addMember{
    font-size: 14px;
    padding: 190px 62px;
    .memberInfo{
      padding-left: 230px;
      p {
        text-align: center;
        padding-bottom: 50px;
        width: 80%;
        .el-input{
          width: 300px;
        }
      }
      .addP{
        >span{
          position: relative;
          .title{
            position: absolute;
            top: 0;
            left: 0;
          }
          .personInfo,.pics{
            margin-left: 100px;
            >span{
              padding:0 10px 20px;
              img{
                width: 180px;
                height: 100px;
              }
            }
          }
        }
      }
      p:last-of-type {
        width: 80%;
        padding-top: 60px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }

  }

</style>
