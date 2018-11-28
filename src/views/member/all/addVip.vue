
<template>
  <div class="addMember clearfix">
    <div class="leftBox">
      <div class="pic">
        <img v-bind:src="uimg" alt="">
        <p><el-button type="primary" @click="upImg()">替换图片</el-button></p>
        <el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input>
      </div>
    </div>
    <div class="memberInfo">
      <p><span><span class="title">会员ID:</span><span class="innerText">{{uid}}</span></span><span><span class="title">注册时间:</span><span class="innerText">{{ucreateTime}}</span></span></p>
      <p><span><span class="title">密码:</span><span class="innerText"><el-input  v-model="uusername" placeholder="请输入内容"></el-input></span></span><span><span class="title">实名认证:</span><span class="innerText"><span v-if="urelStatus" style="color: green">已实名</span><span v-else style="color: red">未实名</span></span></span></p>
      <p><span><span class="title">绑定手机号:</span><span class="innerText"><el-input  v-model="utelphone" placeholder="请输入内容"></el-input></span></span></p>
      <p v-for="(item,index) in ugroups" :key="index"><span><span class="title">会员身份:</span><span class="innerText">
        <el-select v-model="ugroups[index][0]"  placeholder="请选择">
          <el-option
            v-for="item in userStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span></span><span><span class="title">到期时间:</span>
        <span class="innerText">
          <el-date-picker
            v-model="ugroups[index][1]"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </span></span><el-button class="deleteBtn" type="danger" @click="delGroup(ugroups[index])">删除</el-button></p>
      <p class="addP"><span><span class="title">会员身份:</span><span class="innerText">
        <el-select v-model="unewGroup" placeholder="请选择">
          <el-option
            v-for="item in userStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span></span><span><span class="title">到期时间:</span>
        <span class="innerText">
          <el-date-picker
            v-model="unewEndTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </span></span>
      <!-- <el-button class="deleteBtn" type="danger">删除</el-button> -->
      </p>
      <p class="addBtn"><el-button type="primary" @click="addGroup">添加</el-button></p>
      <p><span><span class="title">收益比例:</span><span class="innerText"><el-input  v-model="ugetMoney" placeholder="请输入内容"></el-input></span></span><span><span class="title">积分:</span><span class="innerText"><el-input  v-model="inputs" placeholder="请输入内容"></el-input></span></span></p>
      <p><span><span class="title">推广码:</span><span class="innerText"><el-input></el-input><el-button class="codeBtn" type="primary">生成</el-button></span></span><span><span class="title">账户余额:</span><span class="innerText"></span></span></p>
      <p><el-button type="success" @click="setUser">保存</el-button><el-button type="info">取消</el-button></p>
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
      tableData3: [],
      options: [],
      multipleSelection: [],
      uid: "",
      uimg: "",
      uusername: "",
      utelphone: "",
      ugroup: "",
      uendTime: "",
      ucreateTime: "",
      urelStatus: "",
      userStatus: [],
      userLevelStatus: [],
      inputs: "",
      ulevel: "",
      ugroups: [],
      unewGroup: "",
      unewEndTime: "",
      vipGetMoney: "",
      ugetMoney: "",
      value2: '',
      value1: ''
    }
  },
  methods: {
    open() {
      console.log('aaaaaaaaaa')
      var _this = this
      this.$alert('保存成功！', '保存', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
          _this.$router.push({ name: 'allMember'})
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    upImg(tab) {
        this.upFileFor = tab
        document.getElementById('upimgs').click();
      },
    upFile() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function(url) {
          console.log(url)
          _this.uimg = url
        })
      },
    getMemberInfo:function(id) {
      console.log(this)
      var _this = this
      var datas=""
      PUBLIC.get('User.User.Userone',{uid:id}, function(data) {
        console.log(data)
        data.level=parseInt(data.level)
        PUBLIC.merObj(_this,data,{
          uid:"Id",
          uusername:"username",
          uimg:"header_img",
          ucreateTime:"reg_time",
          utelphone:"telphone",
          urelStatus:"rel_status",
          ulevel:"level",
          uname:"name",
          ugetMoney:""
        })
        PUBLIC.get('Team.User.TeamList',{uid:data.Id},function(data){
          console.log(data)
          var ugroups=[]
          for(var i in data){
            ugroups.push([parseInt(data[i].id) ,data[i].end_time])
          }
          _this.ugroups=ugroups
        //   data=data[0]
        //   PUBLIC.merObj(_this,data,{
        //   ugroup:"id",
        //   uendTime:"end_time"
        // })
        _this.ugroup=parseInt(_this.ugroup)
        })
        console.log(_this)
      })
    },
    setUser:function(){
      var _this=this
      PUBLIC.get("User.User.Adminreg",{username:this.uusername,telphone:this.utelphone,password:123456},function(data){
        console.log(data)
        var bigUid=data
        PUBLIC.get("User.User.updateuser",{
        uid:data,
        name:_this.uusername,
        telphone:_this.utelphone,
        header_img:_this.uimg,
      },function(data){
          console.log(data)
          _this.open()
      })
      for(var i in _this.ugroups){
          PUBLIC.get("Team.User.Add",{tid:_this.ugroups[i][0],uid:data,end_time:_this.ugroups[i][1]},function(data){
          console.log(data)

        })
      }
      PUBLIC.get("Configure.Configure.Addconfig",{type:"userGetMoneyFromSpread",key:data,value:this.ugetMoney,on_status:1,statu:1},function(data){})
      setTimeout(function(){
        _this.getMemberInfo(bigUid)
      },4000)
      })

    },
    delGroup:function(id){
      var _this=this
      this.ugroups.shift([this.unewGroup,this.unewEndTime])
      PUBLIC.get("Team.User.Del",{tid:id[0],uid:this.uid},function(data){
        console.log(data)
        _this.getMemberInfo(_this.uid)
      })
    },
    addGroup:function(){
      var _this=this
      this.ugroups.push([this.unewGroup,this.unewEndTime])
      console.log(this.ugroups)
      // PUBLIC.get("Team.User.Add",{tid:this.unewGroup,uid:this.uid,end_time:this.unewEndTime},function(data){
      //   console.log(data)
      //   _this.getMemberInfo(_this.uid)
      // })
    },
     getVipGetMoney:function(){
        var _this=this
        PUBLIC.get("Configure.Configure.Selone",{type:"getMoneyFromPay",key:"vip"},function(data){
          _this.ugetMoney=data.value
          console.log(_this.ugetMoney)
        })
      }
  },
  mounted() {
    var id=this.$route.params.id
    DATAC.setConf(this)
    this.getVipGetMoney()
    // this.getMemberInfo(id)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .addMember{
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
        p{
          text-align: center;
          margin-top: 30px;
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
            position: relative;
            .codeBtn{
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 70px;
        }
      }
      .addBtn{
        margin-top: -47px;
        margin-left: 100px;
        .el-button{
          width: 200px;
          margin-bottom: 55px;
        }
      }
      .deleteBtn{
        width: 100px;
        margin-left: 20px;
      }
      p:last-of-type {
        padding-top: 100px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }

  }

</style>

