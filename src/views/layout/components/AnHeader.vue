<template>
  <div class="header">
    <div class="headerBox">
      <div class="logo">
        <img src="./logo.png" alt="">
      </div>
      <div class="users">
        <div class="userText">
          <p><span v-if="tid == 319">您好，管理员({{relName}})</span><span v-else-if="tid == 320">您好，超级管理员   {{relName}}</span><span v-else>您好，您不是管理员   {{relName}}</span><span>上次登录：{{lastLog}} </span><span>IP：{{ip}}</span></p>
        </div>
        <div class="rightBox">
          <p><a>访问网站</a><span class="cursor" @click="logout">退出</span>
            <button @click="resLoad" class="cursor">刷 &nbsp;新</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {removeToken} from '@/utils/auth'

  export default {
    data() {
      return {
        tid: '',
        relName: '',
        uid: '',
        lastLog: '',
        ip: ''
      }
    },
    created() {
      this.tid = localStorage.adminTid
      let aa = JSON.parse(localStorage.userInfo)
      this.relName = aa.name
      this.uid = aa.Id
      console.log(this.relName)
    },
    methods: {
      getInfo() {
        console.log(localStorage.ipinfo)
        if(localStorage.ipinfo == '') {
          PUBLIC.get('User.User.adminselenter',{uid: this.uid}, (data) => {
            console.log(data)
            this.lastLog = data[0].time
            this.ip = data[0].ip
            localStorage.ipinfo = JSON.stringify(data[0])
            console.log(localStorage.ipinfo)
          })
        }else{
          this.lastLog = JSON.parse(localStorage.ipinfo).time
          this.ip = JSON.parse(localStorage.ipinfo).ip
        }
      },
      logout: function () {
        removeToken()
        this.$router.push({path: '/'})
      },
      resLoad: function () {
        this.$router.go(0)
      }
    },
    mounted() {
      // console.log(this.tid)
      console.log("进入主页")
      console.log(location.hash)
      console.log(PUBLIC.token())
      if((PUBLIC.token()=="" || PUBLIC.token()==undefined ||PUBLIC.token()==null) && location.hash!="#/login"){
        removeToken()
        this.$router.go(0)
        return
      }
      this.getInfo()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .header {
    font-size: 14px;
    width: 100%;
    height: 80px;
    background-color: #6CBBDE;
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
            .cursor{
              cursor: pointer;
            }
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
</style>
