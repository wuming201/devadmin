<template>
  <div class="addMember">
    <div class="memberInfo">
      <p><span><span class="title">用户手机:</span><span class="innerText">{{person.name}}</span></span><span><span class="title">申请时间:</span><span class="innerText">{{newData.create_time}}</span></span></p>
      <p><span><span class="title">公司名称:</span><span class="innerText">{{newData.region}}</span></span><span><span class="title">证书名称:</span><span class="innerText">{{newData.unit}}</span></span></p>
      <p><span><span class="title">证书类型:</span><span class="innerText">{{person.rel_code}}</span></span><span><span class="title">有效期:</span><span class="innerText">{{person.rel_code}}</span></span></p>
      <p><span><span class="title">真实姓名:</span><span class="innerText">{{person.rel_name}}</span></span><span><span class="title">姓名拼音:</span><span class="innerText">{{newData.spell}}</span></span></p>
      <p><span><span class="title">身份证号:</span><span class="innerText">{{person.rel_code}}</span></span><span><span class="title">艺名:</span><span class="innerText">{{person.rel_code}}</span></span></p>
      <p><span><span class="title">工号:</span><span class="innerText">{{newData.jobnumber}}</span></span><span><span class="title">入职时间:</span><span class="innerText">{{newData.entryTime.slice(0,10)}}</span></span></p>
      <p class="pic"><span><span class="title">证书图片:</span><span class="pics"><img :src="newData.certificates" alt=""></span></span><span><span class="title">寸照:</span><span class="pics"><img :src="newData.identityUrl" alt=""></span></span></p>
      <p><span><span class="title">首次发证时间:</span><span class="innerText">{{newData.applyTime.slice(0,10)}}</span></span><span><span class="title">证书编号:</span><span class="innerText">{{newData.applyTime.slice(0,10)}}</span></span></p>
      <p><span><span class="title">联系手机:</span><span class="innerText">{{newData.tell}}</span></span><span><span class="title">处理状态:</span><span class="innerText" v-if="newData.pay_statu === '0'">审核中</span><span class="innerText" v-else-if="newData.pay_statu === '-1'">未通过</span><span class="innerText" v-else-if="newData.pay_statu === '1'">通过</span></span></p>
      <p><span><span class="title">处理备注:</span><span class="innerText">{{newData.tell}}</span></span></p>
    </div>
    <p class="buttons"><el-button @click="passIt" passIt type="success" v-if="newData.pay_statu === '0'">通过</el-button><el-button type="danger" @click="rejectIt" v-if="newData.pay_statu === '0'">拒绝</el-button><el-button type="info" @click="cancel">取消</el-button></p>
    <div class="pass" v-show="showPass">
      <h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人：  {{admin}}</p>
        <p>到期时间：
          <el-date-picker
            v-model="stopTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker></p>
        <p>处理备注：
          <el-input
            v-model="whySuccess"
            type="textarea"
            :rows="2"
            placeholder="请输入通过原因！">
          </el-input>
        </p>

        <p><el-button type="success" @click="success">提交</el-button><el-button type="info" @click="passIt">取消</el-button></p>
      </div>
    </div>
    <div class="reject" v-show="showReject">
      <h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人：  {{admin}}</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="2"
            v-model="whyReject"
            placeholder="请输入拒绝原因！">
          </el-input>
        </p>
        <p><el-button type="danger" @click="reject" >拒绝</el-button><el-button type="info" @click="rejectIt">取消</el-button></p>
      </div>
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
      showPass: false,
      showReject: false,
      newData: [],
      person: [],
      id: '',
      whyReject: '',
      whySuccess: '',
      stopTime: '',
      admin: ''
    }
  },
  created() {
    this.admin = JSON.parse(localStorage.userInfo).name
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    passIt() {
      this.showPass = !this.showPass
    },
    rejectIt() {
      this.showReject = !this.showReject
    },
    getInfo(id) {
      console.log(id)
      var _this=this
      PUBLIC.get('User.certificate.finds',{ id: id }, data =>{
        console.log(data)
        if(data.stopTime !== null) {
          this.stopTime=data.stopTime.slice(0, 10)
        } else {
          this.stopTime=data.stopTime
        }
        this.newData = data
        PUBLIC.get("Configure.Configure.Selone",{type:"branch",key:data.unit},function(data){
          if(data){
            data=JSON.parse(data.value)
            console.log(data)
            _this.newData.region=data.region
            _this.newData=JSON.parse(JSON.stringify(_this.newData))
          }
        })
        PUBLIC.get('User.User.Userone' ,{ uid: data.uid }, data =>{
          console.log(data)
          this.person = data
        })
      })
    },
    success() {
      console.log(this.stopTime)
      let years = this.stopTime.getFullYear()
      let months = this.stopTime.getMonth()+1    //js从0开始取
      let date1s = this.stopTime.getDate()
      let stopTime = years+ "-" +months+ "-" +date1s
      console.log(this.person.rel_code.slice(13, 18))

      //生成证书号码
      let cerNum1 = this.person.rel_code.slice(13, 18)
      let cerNum2 = this.person.rel_code.slice(0, 2)
      if ( this.newData.grade === '1') {
        var cerLevel = 'C'
      } else if(this.newData.grade === '2') {
        var cerLevel = 'Z'
      } else if(this.newData.grade === '3') {
        var cerLevel = 'G'
      }
      let cerNum = cerLevel + cerNum1.split('').reverse().join('') + cerNum2
      console.log(cerNum)
      // PUBLIC.get('User.User.Watermark', dataa, data => {
      //   let dataa = {
      //     level: this.grands,
      //     name: this.person.rel_name,
      //     pyname: this.cerData.spell,
      //     idnum: this.person.rel_code,
      //     cernum: this.cernum,
      //     pushtime: this.cerData.applyTime.slice(0, 10),
      //     yxtime:  this.cerData.applyTime.slice(0, 10)+ '  TO  ' + this.cerData.stopTime.slice(0, 10),
      //     photo: this.cerData.identityUrl,
      //     islizhi: this.user_status,
      //     stopTime: this.stopTime.slice(0, 10)
      //   }
      //   console.log(dataa)
      //   this.cerPic = data
        PUBLIC.get('User.certificate.applyFor', { pay_statu: 1, id: this.id, entryTime: this.newData.entryTime ,applicationRestult: this.whySuccess ,stopTime: stopTime.slice(0, 10), licenceNum: cerNum }, data1 => {
          console.log(data1)

          this.$router.push({ name: '教师管理'})
        })
      // })
    },
    reject() {
      PUBLIC.get('User.certificate.applyFor',{ pay_statu: -1, id: this.id, applicationRestult: this.whyReject }, data => {
        console.log(data)

        this.$router.push({ name: '教师管理'})
      })
    }
  },
  mounted() {
    var id = this.$route.query.id
    this.id = id
    this.getInfo(id)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .addMember{
    font-size: 14px;
    padding: 45px 62px;
    .memberInfo{
      padding-left: 300px;
      p {
        text-align: left;
        span{
          position: relative;
          display: inline-block;
          span{
            display: inline-block;
          }
          .title{
            width: 100px;
            text-align: right;
            padding-right: 10px;
          }
          .pics{
            width: 200px;
            position: absolute;
            top: 0;
            left: 100px;
            width: 250px;
            .el-button{
              margin-left: 10px;
            }
            img{
              height: 245px;
              width: 175px;
            }
          }
          .innerText{
            width: 200px;
          }
        }
        >span{
          padding-bottom: 70px;
        }
        >span:first-of-type{
          margin-right: 120px;
        }
      }
      .pic{
        height: 340px;
        >span{
          width: 300px;
        }
      }

    }
    .buttons{
      width: 80%;
      padding-top: 100px;
      text-align: center;
      .el-button{
        margin: 0 8%;
        width: 100px;
      }
    }
    .reject,.pass{
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
        padding:36px 16px;
        p{
          padding-bottom: 30px;
          .el-textarea{
            vertical-align: top;
            width: 300px;
            display: inline-block;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }
    .reject {
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:red;

      }
    }
  }

</style>
