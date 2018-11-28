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
      <p><span><span class="title">用户密码:</span><span class="innerText"><el-input disabled v-model="password" placeholder="请输入内容"></el-input></span></span><span><span class="title">实名认证:</span><span class="innerText"><span v-if="urelStatus" style="color: green">已实名</span><span v-else style="color: red">未实名</span></span></span></p>
      <p><span><span class="title">绑定手机号:</span><span class="innerText"><el-input  v-model="utelphone" placeholder="请输入内容"></el-input></span></span></p>
      <p v-for="(item,index) in ugroups" :key="index">
        <span><span class="title">会员身份:</span><span class="innerText">
        <el-select v-model="ugroups[index][0]"  placeholder="请选择">
          <el-option
            v-for="item in userStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span></span>
      <span><span class="title">到期时间:</span>
        <span class="innerText">
          <el-date-picker
            v-model="ugroups[index][1]"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </span></span>
      <el-button type="primary" @click="upGroup(ugroups[index])">保存</el-button>
      <el-button class="deleteBtn" type="danger" @click="delGroup(ugroups[index][0])">删除</el-button></p>
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
      <el-button type="primary" @click="addGroup">添加</el-button>
      </p>
      <!-- <p class="addBtn"><el-button type="primary" @click="addGroup">添加</el-button></p> -->
      <p><span><span class="title">收益比例:</span><span class="innerText"><el-input  v-model="ugetMoney" placeholder="请输入内容"></el-input></span></span><span><span class="title">积分:</span><span class="innerText"><el-input  v-model="inputs" placeholder="请输入内容"></el-input></span></span></p>
      <p><span><span class="title">推广码:</span><span class="innerText">{{code}}</span></span><span><span class="title">账户余额:</span><span class="innerText"></span></span></p>
      <p><el-button type="success" @click="setUser">保存</el-button><el-button type="info" @click="cancel">取消</el-button></p>
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
      uid:"",
      uimg:"",
      password:"********",
      utelphone:"",
      ugroup:"",
      uendTime:"",
      ucreateTime:"",
      urelStatus:"",
      userStatus:[],
      userLevelStatus:[],
      inputs:"",
      ulevel:"",
      ugroups:[],
      code: '',
      unewGroup:"",
      unewEndTime:"",
      ugetMoney:""
    }
  },
  methods: {
    //取消
    cancel() {
      this.$router.push({ name:'VIP会员',query: { page: this.page }})
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
      // console.log(this.ugetMoney)
      id=id==undefined?this.id:id
      var _this = this
      var datas=""
      PUBLIC.get('User.User.Userone',{uid:id}, function(data) {
        console.log(data)
        data.level=parseInt(data.level)
        PUBLIC.merObj(_this,data,{
          uid: "Id",
          uusername: "username",
          uimg: "header_img",
          ucreateTime: "reg_time",
          utelphone: "telphone",
          urelStatus: "rel_status",
          ulevel: "level",
          uname: "name"
        })
        PUBLIC.get('Team.User.TeamList',{uid:data.Id},function(data){
          console.log(data)
          var ugroups=[]
          for(var i in data){
            ugroups.push([parseInt(data[i].id) ,data[i].end_time,data[i].tid,data[i].uid])
          }
          _this.ugroups=ugroups
          console.log(ugroups)
        //   data=data[0]
        //   PUBLIC.merObj(_this,data,{
        //   ugroup:"id",
        //   uendTime:"end_time"
        // })
        _this.ugroup=parseInt(_this.ugroup)
        })
        PUBLIC.get('Currency.receive.findUidPro', { type: 'PromotionCode',uid: _this.uid },function(data){
          _this.code = data[0].key
          _this.ugetMoney = data[0].reduce_num
        })
        PUBLIC.get("Configure.Configure.Selone",{type:"userGetMoneyFromSpread",key:_this.uid},function(data){
          console.log(data)
          _this.ugetMoney =data.value
        })

        console.log(_this)
      })
    },
    setUser:function(){
      var _this = this
      PUBLIC.get("User.User.updateuser",{
        uid:this.uid,
        name:this.uname,
        telphone:this.utelphone,
        header_img:this.uimg,
      },function(){

      })
      PUBLIC.get("Configure.Configure.Addconfig",{type:"userGetMoneyFromSpread",key:this.uid,value: _this.ugetMoney,on_status:1,statu:1},function(data){
        console.log(data)
      })
      this.$router.push({name:'VIP会员',query: { page: this.page }})
    },
    delGroup:function(id){
      var _this=this
      PUBLIC.get("Team.User.Del",{tid:id,uid:this.uid},function(data){
        console.log(data)
        _this.getMemberInfo(_this.uid)
      })
    },
    addGroup() {
      var _this=this
      console.log(this.ugetMoney)
      this.ugroups.unshift([this.unewGroup,this.unewEndTime])
      console.log(this.ugroups)
      let year = this.ugroups[0][1].getFullYear();
      let month = this.ugroups[0][1].getMonth()+1;    //js从0开始取
      let date1 = this.ugroups[0][1].getDate();
      let hour = this.ugroups[0][1].getHours();
      let minutes = this.ugroups[0][1].getMinutes();
      let second = this.ugroups[0][1].getSeconds();
      let endTime = year+ "-" +month+ "-" +date1+ " " +'0'+hour+ ":" + '0'+minutes + ":" +'0'+second
      //若为添加会员身份则请求优惠码
      // if(this.unewGroup == 318) {
      //   console.log('这是318')
      //   PUBLIC.get("Currency.receive.appenddis",{type: 'PromotionCode', uid: this.uid, item_id: 2, astype: '', reduce_num: this.ugetMoney, num: -1, time: endTime, startTime: '' },function(data){
      //     _this.code = data.key
      //     _this.ugetMoney = data.reduce_num
      //   })
      // }
      PUBLIC.get("Team.User.Add",{tid:this.unewGroup,uid:this.uid,end_time: endTime},function(data){
        console.log(data)
        _this.getMemberInfo(_this.uid)
      })
    },
    upGroup:function(data){
      var _this=this
      let year = data[1].getFullYear();
      let month = data[1].getMonth()+1;    //js从0开始取
      let date1 = data[1].getDate();
      let hour = data[1].getHours();
      let minutes = data[1].getMinutes();
      let second = data[1].getSeconds();
      let endTime = year+ "-" +month+ "-" +date1+ " " +'0'+hour+ ":" + '0'+minutes + ":" +'0'+second
      PUBLIC.get("Team.User.Update",{tid:data[2],uid:data[3],end_time:endTime},function(){
        _this.getMemberInfo()
      })
    }
  },
  mounted() {
    this.page = this.$route.params.page
    var id=this.$route.params.id
    this.id=id
    console.log(id)
    DATAC.setConf(this)
    this.getMemberInfo(id)
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
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 70px;
        }
        >.el-button--medium{
          margin-left: 20px;
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
