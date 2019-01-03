<template>
  <div class="addMember clearfix">
    <div class="memberInfo">
      <p><span><span class="title">会员ID:</span><span class="innerText">{{info.problem_uid}}</span></span><span><span class="title">问题类型:</span><span class="innerText">{{info.problem_type}}</span></span></p>
      <p class="cerPic"><span><span class="title">问题截图:</span><img :src="info.problem_img" alt=""></span></p>
      <p class="addP"><span><span class="title">问题描述:</span><span class="personInfo">{{info.problem_ms}}</span></span></p>
      <p class="addP"><span><span class="title">回复内容:</span><span class="personInfo">{{info.problem_content}}</span></span></p>
      <p><span><span class="title">处理人:</span><span class="innerText">{{chuliren}}</span></span></p>
      <p>
        <el-button type="primary" @click="replay"  v-if="code == 2" >回复</el-button><el-button type="info" @click="quit">取消</el-button></p>
    </div>
    <div class="replay" v-show="replayBox">
      <h3>问题回复 <i class="fa fa-close" @click="replay"></i></h3>
      <div class="inner">
        <p></p>
        <p>处理人：{{hfr}}</p>
        <p>回复内容：
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="replayText">
          </el-input>
        </p>
        <p><el-button type="success" @click="save">回复</el-button><el-button type="info" @click="replay">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'addMember',
    data() {
      return {
        chuliren: '',
        hfuid:'',
        hfr: '',
        info: {},
        replayBox: false, //头像
        cers: [],            //证书
        replayText: '',
        otherCer: '',
        pics: [], //个人相册
        morepic: '',
        grands: '',
        user_status: '',
        videoProducing: '',
        kkip: '1',
        birth: '',
        addPic: '',
        message: '',
        cernum: '',
        worknum: '',
        stageName: '',
        uid: '',
        id: '',
        page: 0,
        code: '',
        multipleSelection: [],
        person: '',
        territory: '',
        showHome: '',
        cerData: '',
        cerPic: '',
        stopTime: '',
        entryTime: '',
        teacherLevel:{
          "1":"国际注册幼儿体智能初级教师",
          "2":"国际注册幼儿体智能中级教师",
          "3":"国际注册幼儿体智能高级教师",
        },
        teacherVideoFlag:{
          "1":"参与",
          "0":"不参与",
          "3":"国际注册幼儿体智能高级教师",
        },
        teacherStatusFlag:{
          "1":"有效",
          "0":"未审核",
          "-1":"无效",
        },
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
      showCer() {
        console.log(this)
        this.$refs.cer.click()
      },
      getInfo(id) {
        var _this=this
        PUBLIC.get('User.Problem.sel',{ id: id }, data =>{
          console.log(data)
          this.info = data
          PUBLIC.get('User.User.Userone', {uid: this.info.problem_huid}, v=>{
            this.chuliren = v.rel_name
          })
        })
      },
      quit(){
        this.$router.push({name:'消息反馈',query: { page: this.page }})
      },
      replay(){
        this.replayBox = !this.replayBox
        console.log(this.replayBox)
      },
      save() {
        PUBLIC.get('User.Problem.upd', {id: this.id, problem_content: this.replayText, problem_huid: this.hfuid}, data=> {
          console.log(data)
          this.quit()
        })
      }
    },
    mounted() {
      this.hfuid = JSON.parse(localStorage.userInfo).Id
      this.hfr = JSON.parse(localStorage.userInfo).rel_name
      console.log(this.hfr)
      var id=this.$route.query.id
      this.id = this.$route.query.id
      this.page = this.$route.query.page
      this.code = this.$route.query.code
      console.log(this.code)
      console.log(this.id)
      this.getInfo(id)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  #openWin{
    display: none;
  }
  .addMember{
    font-size: 14px;
    padding: 45px 62px;
    .leftBox{
      width: 140px;
      float: left;
      .pic{
        img{
          width: 140px;
          height: 140px;
          border: 1px seagreen solid;
        }
      }
    }
    .memberInfo{
      padding-left: 230px;
      p {
        text-align: left;
        span{
          display: inline-block;
          span{
            display: inline-block;
          }
          .title{
            width: 100px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText{
            width: 200px;
            .dzzs{
              color: #169BD5;
              margin-left: 30px;
            }
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 120px;
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
      .cerPic{
        span{
          img{
            width: 180px;
            height: 250px;
            display: inline-block;
            vertical-align: text-top;
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

    .replay{
      z-index: 100;
      width: 500px;
      height: 400px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -250px;
      h3{
        background-color: #E4E4E4;
        padding: 15px;
        .fa{
          float: right;
          font-size: 18px;
          padding: 0 10px;
        }
        .fa:hover{
          color: #518BBD;
        }
      }
      .inner{
        padding:26px 50px;
        p{
          padding-bottom: 30px;
          .el-input{
            width: 200px;
          }
          .el-textarea{
            width: 300px;
            vertical-align: top;
          }
        }
        p:last-of-type{
          text-align: center;
          margin-top: 10px;
          >button{
            width: 120px;
          }
        }
      }
    }
  }

</style>
