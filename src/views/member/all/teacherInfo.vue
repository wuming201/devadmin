<template>
  <div class="addMember clearfix">
    <div class="leftBox">
      <div class="pic">
        <img :src="uimg" alt="">
      </div>
    </div>
    <div class="memberInfo">
      <p><span><span class="title">用户手机:</span><span class="innerText">{{person.telphone}}</span></span><span><span class="title">公司名称:</span><span class="innerText">{{person.rel_name}}</span></span></p>
      <!--<p><span><span class="title">出生日期:</span><span class="innerText">{{birth}}</span></span></p>-->
      <!--<p><span><span class="title">区域:</span><span class="innerText">{{region}}</span></span><span><span class="title">分会:</span><span class="innerText">{{unit}}</span></span></p>-->
      <p><span><span class="title">证书类型:</span><span class="innerText">{{grands}}</span></span><span><span class="title">证书名称:</span><span class="innerText">{{grands}}</span></span></p>
      <p>
        <span>
          <span class="title">证书编号:</span>
          <span class="innerText">{{cernum}}</span>
        </span>
        <span><span class="title">有效期:</span><span class="innerText">{{stopTime}}</span></span>
      </p>
      <p><span><span class="title">真实姓名:</span><span class="innerText">{{person.rel_name}}</span></span><span><span class="title">证书状态:</span><span class="innerText">{{user_status}}</span></span></p>
      <p><span><span class="title">身份证号:</span><span class="innerText">{{person.rel_code}}</span></span><span><span class="title">艺名:</span><span class="innerText">{{stageName}}</span></span></p>
      <p><span><span class="title">工号:</span><span class="innerText">{{worknum}}</span></span><span><span class="title">入职时间:</span><span class="innerText">{{entryTime}}</span></span></p>
      <!--<p><span><span class="title">视频制作:</span><span class="innerText">{{videoProducing}}</span></span></p>-->
      <p class="cerPic"><span><span class="title">证书照片:</span><img :src="mycer" alt=""></span></p>
      <p class="addP"><span><span class="title">个人简介:</span><span class="personInfo">{{message}}</span></span></p>
      <p class="addP"><span><span class="title">其他证书:</span><span class="pics" v-html="otherCer"></span></span></p>
      <p class="addP"><span><span class="title">个人相册:</span><span class="pics" v-html="morepic"></span></span></p>
      <p><span><span class="title">kkip首页:</span><span class="innerText">{{showHome}}</span></span></p>
      <p>
        <el-button type="primary" @click="edit">编辑</el-button><el-button type="info" @click="quit">取消</el-button></p>
    </div>
  </div>
</template>

<script>
import { selectKuang } from '../../../components/index'

export default {
  name: 'addMember',
  components: {
    selectKuang
  },
  data() {
    return {
      uimg: '', //头像
      cers: [],            //证书
      addcer: '',
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
      PUBLIC.get('User.certificate.finds',{ id: id }, data =>{
        if(data != false) {
          this.cerData = data
          this.uimg = data.identityUrl
          this.uid = data.uid
          this.id = data.id
          this.entryTime = data.entryTime
          this.stageName = data.stageName
          this.birth = data.dateBirth
          this.worknum = data.jobnumber
          this.grands = this.teacherLevel[data.grade]
          this.cernum = data.licenceNum
          this.territory = data.territory
          this.user_status = this.teacherStatusFlag[data.pay_statu]
          this.videoProducing = this.teacherVideoFlag[data.videoProducing]
          this.message = data.message
          this.certificates=data.certificates
          this.personalAlbum=data.personalAlbum
          this.province=data.province
          this.mycer=data.mycer
          this.unit=data.unit
          this.stopTime = data.stopTime?data.stopTime.slice(0, 10):""
          console.log(this.stopTime)
          if(data.certificates !== null) {
            console.log('aaaaaa')
            this.cers = data.certificates.split(',')
          }
          if(data.personalAlbum !==  null) {
            console.log(data.personalAlbum)
            this.pics = data.personalAlbum.split(',')
          }
          // for(let i = 0; i < this.cers.length; i++) {
          //     let htmls = '<span class="picBox"><img src = "' + this.cers[i] + '" alt=""></span>'
          //     this.otherCer = this.otherCer + htmls
          //   }
          //   for(let i = 0; i < this.pics.length; i++) {
          //     let htmls = '<span class="picBox"><img src = "' + this.pics[i] + '" alt=""></span>'
          //     this.morepic = this.morepic + htmls
          //   }
          if(data.showHome = 1) {
            this.showHome = '是'
          } else{
            this.showHome = '否'
          }
          PUBLIC.get('User.User.Userone' ,{ uid: data.uid }, data =>{
            console.log(data)
            this.person = data
            console.log(this.person)
          })

          PUBLIC.get("Configure.Configure.Selone",{type:"branch",key:this.unit},function(data){
            if(data){
              data=JSON.parse(data.value)
              console.log(data)
              _this.region=data.region
            }
          })
          // console.log(this.cers)
          for(let i = 0; i < this.cers.length; i++) {
            let htmls = '<span class="picBox"><img src = "' + this.cers[i] + '" alt=""></span>'
            this.otherCer = this.otherCer + htmls
          }
          for(let i = 0; i < this.pics.length; i++) {
            let htmls = '<span class="picBox"><img src = "' + this.pics[i] + '" alt=""></span>'
            this.morepic = this.morepic + htmls
          }
        }

        })
    },
    quit:function(){
      this.$router.push({name:'教师管理',query: { page: this.page }})
    },
    edit:function(){
      this.$router.push({name:'教师编辑',query: { page: this.page, id: this.id }})
    }
  },
  mounted() {
    var id=this.$route.query.id
    this.id = this.$route.query.id
    this.page = this.$route.query.page
    console.log()
    console.log(id)
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
            width: 240px;
            height: 140px;
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

  }

</style>
