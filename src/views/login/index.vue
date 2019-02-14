<template>
  <div class="login-container">
    <div class="header">
      <div class="headerBox">
        <div class="logo">
          <img src="../layout/components/logo.png" alt="">
        </div>
      </div>
      <a class="linkTo fr" href="http://www.yusj.vip/" target="_blank"><span>访问网站</span></a>
    </div>
    <div class="content">
      <el-form class="login-form" autoComplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">欢迎登录后台管理系统</h3>
          <lang-select class="set-language"></lang-select>
        </div>
        <el-form-item prop="telephone">
        <span class="svg-container svg-container_login">
          <i class="iconfont">&#xe60d;</i>
        </span>
          <el-input name="telephone" type="text" v-model="telephone" autoComplete="on" placeholder="用户名"/>
        </el-form-item>

        <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont">&#xe641;</i>
        </span>
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="password"
                    autoComplete="on" placeholder="登录密码"/>
          <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
        </el-form-item>

        <!--<el-form-item prop="numb" class="testNum">-->
        <!--<span class="svg-container">-->
          <!--<i class="iconfont">&#xe63e;</i>-->
        <!--</span>-->
          <!--&lt;!&ndash;<el-input name="test" type="text" v-model="test" disabled placeholder="验证码"/>&ndash;&gt;-->
        <!--</el-form-item>-->

        <el-button type="primary"
                   style="width:300px;margin-bottom:30px;margin-left:115px;height: 50px;font-size: 24px;margin-top: 20px"
                   @click.native.prevent="handleLogin">登&emsp;录
        </el-button>

      </el-form>

      <!--<el-dialog >-->
      <!--<br/>-->
      <!--<br/>-->
      <!--<br/>-->
      <!--<social-sign />-->
      <!--</el-dialog>-->
    </div>
    <div class="footer">
      <p>Copyright ©2018 四川派师信息科技股份有限公司， All rights reserved.</p>
    </div>
  </div>
</template>

<script>
  // import { isvalidUsername } from '@/utils/validate'
  // import LangSelect from '@/components/LangSelect'
  // import SocialSign from './socialsignin'
  // import user from '@/store/modules/user'
  import '@/store/modules/user'
  import {loginByUsername} from '@/api/login'
  import {setToken} from '@/utils/auth'

  export default {
    // components: { LangSelect, SocialSign },
    name: 'loginBox',
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error('Please enter the correct user name'))
      //   } else {
      //     callback()
      //   }
      // }
      // const validatePassword = (rule, value, callback) => {
      //   if (value.length < 6) {
      //     callback(new Error('The password can not be less than 6 digits'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        telephone: '',
        password: '',
        // loginRules: {
        //   telephone: [{ required: true, trigger: 'blur', validator: validatetelephone }],
        //   password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        // },
        passwordType: 'password',
        loading: false,
        showDialog: false,
        phone: false,
        pwd: false
      }
    },
    created() {
      PUBLIC.token('')
      console.log("回到了首页")
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin() {
        if (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.telephone) == false) {
          console.log('电话号码错误')
          this.phone = true;
        } else {
          this.phone = false;
        }
        if (this.password.length < 6 || this.password.length > 20) {
          console.log('密码错误')
          this.pwd = true;
        } else {
          this.pwd = false;
        }
        if (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.telephone) == true && this.password.length >= 6 && this.password.length <= 20) {
          this.phone = false;
          this.pwd = false;
          this.setlogin(this.telephone, this.password)
          // loginByUsername(this.telephone, this.password)
          // this.loginForm={"username":this.telephone,"password":this.password}
          // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          //   console.log("登陆完毕")
          //   this.loading = false
          //   this.$router.push({path: '/'})
          //   console.log("2222222222")
          // }).catch((e) => {
          //   console.log(e)
          //   this.loading = false
          // })
        }
        //   this.$refs.loginForm.validate(valid => {
        //   if (valid) {
        //     this.loading = true
        //     this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
        //       this.loading = false
        //       this.$router.push({path: '/'})
        //     }).catch(() => {
        //       this.loading = false
        //     })
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })
      },
      // 登录调用的接口
      setlogin(phone, pwd) {
        console.log('触发')
        this.loading = true
        PUBLIC.get('User.User.userpwd', {telphone: phone, pwd: pwd, type: 3}, (data) => {
          console.log(data)
          PUBLIC.get('Team.User.TeamList', {uid: data.Id}, datas => {
            if (datas.length > 0) {
              for (var i = 0; i < datas.length; i++) {
                if (datas[i].tid == 319 || datas[i].tid == 320) {
                  console.log(data.token)
                  PUBLIC.token(data.token)
                  PUBLIC.cache('userInfo', data);
                  setToken(data.token);
                  console.log('chufadaozheli')
                  this.loading = false
                  console.log(data.Id)
                  this.$router.push({name: 'documentation', params: {id: data.Id, tid: datas[i].tid}})
                  console.log('chufadaozheli222')
                  return localStorage.adminTid = datas[i].tid
                }


              }
              console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                  this.$alert('您还不是管理员', '登录失败', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                      });
                      this.$router.go(0)
                    }
                  })
            }else{
              console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              this.$alert('您还不是管理员', '登录失败', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                  this.$router.go(0)
                }
              })
            }
          })
        })
      },

      // }
      // }

      // 15680098167
      afterQRScan() {
        // const hash = window.location.hash.slice(1)
        // const hashObj = getQueryObject(hash)
        // const originUrl = window.location.origin
        // history.replaceState({}, '', originUrl)
        // const codeMap = {
        //   wechat: 'code',
        //   tencent: 'code'
        // }
        // const codeName = hashObj[codeMap[this.auth_type]]
        // if (!codeName) {
        //   alert('第三方登录失败')
        // } else {
        //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //     this.$router.push({ path: '/' })
        //   })
        // }
        // }
      },
      created() {
        // window.addEventListener('hashchange', this.afterQRScan)
      },
      destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
      },
      showIt() {
        console.log(this)
      }
    },
    watch: {},
    mounted() {
      console.log("回到了首页")
      this.showIt()
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $blue: #337AB7;
  $light_blue: #AFDDF0;
  $light_gray: #eee;
  $dark_gray: #333333;

  /* reset element-ui css */
  .login-container {
    position: relative;
    height: 1030px;
    width: 100%;
    .header{
      z-index: 2;
    }
    .content {
      z-index: 1;
      margin-top: -2px;
      height: 850px;
      background: url("./wallpaper.png");
      .iconfont {
        font-size: 20px;
      }
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: black;
          height: 47px;
          font-size: 14px;
          &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        }
      }
      .el-form-item {
        margin-top: 30px;
        border: 1px solid $blue;
        border-radius: 5px;
        background-color: #fff;
        width: 450px;
        height: 50px;
        margin-left: 40px;
      }
      .testNum {
        width: 200px;
        background-color: white;

        .el-form-item__content {
          border-radius: 5px;
          background-color: white;
          height: 100%;
          .el-input {
            width: 160px;
            background-color: white;
          }
        }
      }
    }
    .footer {
      background-color: #F2F2F2;
      position: absolute;
      bottom: 0;
      height: 100px;
      width: 100%;
      p {
        text-align: center;
        font-size: 14px;
        line-height: 100px;
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $blue: #337AB7;
  $light_blue: #AFDDF0;
  $light_gray: #eee;
  $dark_gray: #333333;

  .login-container {
    .header {
      font-size: 14px;
      width: 100%;
      height: 80px;
      background-color: #6CBBDE;
      .linkTo {
        color: white;
        padding: 20px 80px;
      }
      .headerBox {
        padding: 5px 25px;
        position: relative;
        .logo {
          position: absolute;
          top: 7px;
          img {
            width: 190px;
          }
        }
        .users {
          height: 80px;
          color: #ffffff;
          width: 100%;
          padding-left: 230px;
          box-sizing: border-box;
          line-height: 40px;
          .userText {
            width: 650px;
            display: inline-block;
            p {
              text-align: left;
              span {
                padding: 0 14px;
              }
              :nth-of-type(2) {
                border-left: 1px solid #fff
              }
            }
          }
          .rightBox {
            float: right;
            p {
              a {
                padding: 0 10px;
                border-right: 1px solid #ffffff;
              }
              span {
                padding: 0 10px;
              }
              button {
                background-color: #F7B500;
                padding: 12px 50px;
                border: none;
                border-radius: 6px;
                color: #fff;
                margin-left: 30px;
              }
            }
          }
        }
      }
    }
    .login-form {
      border: 2px solid #337AB7;
      border-radius: 10px;
      position: absolute;
      top: 240px;
      right: 200px;
      width: 600px;
      height: 500px;
      padding: 35px 35px 15px 35px;
      background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(182, 224, 241, 1));
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title-container {
      position: relative;
      .title {
        padding: 20px 0;
        font-size: 26px;
        font-weight: 400;
        color: $blue;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
