
<template>
  <div class="addMember clearfix">
    <div class="leftBox">
      <div class="pic">
        <img v-bind:src="uimg" alt="">
        <p><el-button type="primary" @click="upImg()">添加图片</el-button></p>
        <el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input>
      </div>
    </div>
    <div class="memberInfo">
      <p><span><span class="title">会员ID:</span><span class="innerText">{{uid}}</span></span><span><span class="title">注册时间:</span><span class="innerText">{{ucreateTime}}</span></span></p>
      <p><span><span class="title">密码:</span><span class="innerText"><el-input  v-model="password" placeholder="请输入内容"></el-input></span></span><span><span class="title">实名认证:</span><span class="innerText"><span v-if="urelStatus" style="color: green">已实名</span><span v-else style="color: red">未实名</span></span></span></p>
      <p>
        <span>
          <span class="title">绑定手机号:</span>
          <span class="innerText">
            <el-input  v-model="utelphone" placeholder="请输入内容" @blur="getPhone(utelphone)"></el-input></span>
        </span>
      </p>
      <p><span><span class="title">会员身份:</span><span class="innerText">
        <el-select v-model="ugroups"  placeholder="请选择">
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
            v-model="uendTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </span></span>
        <!--<el-button class="deleteBtn" type="danger" @click="delGroup(ugroups[index])">删除</el-button>-->
      </p>
      <!--<p class="addBtn"><el-button type="primary" @click="addGroup">添加</el-button></p>-->
      <p><span><span class="title">收益比例:</span><span class="innerText"><el-input  v-model="ugetMoney" placeholder="请输入内容"></el-input></span></span><span><span class="title">积分:</span><span class="innerText"><el-input  v-model="integral" placeholder="请输入内容"></el-input></span></span></p>
      <!--<p><span><span class="title">推广码:</span><span class="innerText"></span></span><span><span class="title">账户余额:</span><span class="innerText"></span></span></p>-->
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
      uid:"",
      uimg:"",
      password:"",
      username: '',
      utelphone:"",
      // ugroup:"",
      uendTime:"",
      ucreateTime:"",
      urelStatus:"",
      userStatus:[],
      integral: '',
      userLevelStatus:[],
      inputs:"",
      ulevel:"",
      ugetMoney: '',
      ugroups: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  methods: {

    getPhone(v) {
      console.log(v)
      var code = ''
      var codeLength = 4;//验证码的长度
      var random = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for(var i = 0; i < codeLength; i++) {
        //循环操作
        var index = Math.floor(Math.random()*26);//取得随机数的索引（0~35）
        code += random[index];//根据索引取得随机数加到code上
      }
      this.username = code + '_' + v
      console.log(code)
      console.log(this.username)
    },
    open() {
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
    setUser:function(){
      console.log(this.uendTime,this.ugroups )
      var _this=this
      PUBLIC.get("User.User.Adminreg",{password:this.password ,telphone:this.utelphone, username: this.username},(data) => {
        console.log(data)
        console.log(_this.ugetMoney)
        var bigUid=data
        PUBLIC.get("User.User.updateuser",{
          uid: data,
          // password: _this.password,
          telphone: _this.utelphone,
          header_img: _this.uimg
        },(data) => {
          var stime = PUBLIC.getTime()
          if(this.ugroups == 318) {
            // 添加团队
            let year = this.uendTime.getFullYear()
            let month = this.uendTime.getMonth()+1    //js从0开始取
            let date1 = this.uendTime.getDate()
            let hour = this.uendTime.getHours()
            let minutes = this.uendTime.getMinutes()
            let second = this.uendTime.getSeconds()
            let endTime = year+ "-" +month+ "-" +date1+ " " +'0'+hour+ ":" + '0'+minutes + ":" +'0'+second
            PUBLIC.get("Currency.receive.appenddis",{
              type: 'PromotionCode', uid: bigUid, item_id: 2, astype: '', reduce_num: this.ugetMoney, had_num: -1, time: this.uendTime, startTime: ''
            },(data) => {
              _this.code = data.key
              _this.ugetMoney = data.reduce_num
            })
            PUBLIC.get("Team.User.Add",{ tid: '318', uid: bigUid, end_time: endTime },(data) =>{
              console.log(data)
            })
            console.log(data.value)
            //设置收益比例
            PUBLIC.get("Configure.Configure.Addconfig",{type:"userGetMoneyFromSpread", key: bigUid, value:this.ugetMoney, on_status:1, statu:1 },(data) =>{
              console.log(data)
            })
            PUBLIC.get("Currency.receive.addcursd",{ uid: bigUid, money_type: '3', num: this.integral }, (data) => {
              console.log(data)
            })
            this.$router.go(-1)
          } else {
            this.$router.go(-1)
          }
        })
      })
    }
    // delGroup:function(id){
    //   var _this=this
    //   this.ugroups.shift([this.unewGroup,this.unewEndTime])
    //   console.log(this.ugroups)
    //   PUBLIC.get("Team.User.Del",{tid:id[0],uid:this.uid},function(data){
    //     console.log(data)
    //     _this.getMemberInfo(_this.uid)
    //   })
    // },
    // addGroup:function(){
    //   var _this=this
    //   this.ugroup.unshift([this.unewGroup,this.unewEndTime])
    //   let year = this.ugroup[0][1].getFullYear()
    //   let month = this.ugroup[0][1].getMonth()+1    //js从0开始取
    //   let date1 = this.ugroup[0][1].getDate()
    //   let hour = this.ugroup[0][1].getHours()
    //   let minutes = this.ugroup[0][1].getMinutes()
    //   let second = this.ugroup[0][1].getSeconds()
    //   let endTime = year+ "-" +month+ "-" +date1+ " " +'0'+hour+ ":" + '0'+minutes + ":" +'0'+second
    //   // console.log(endTime)
    //   this.ugroups.unshift([this.unewGroup, endTime])
    //   if(this.unewGroup === 318) {
    //     this.vipList.push(endTime)
        // PUBLIC.get("Currency.receive.appenddis",{
        //   type: 'PromotionCode', uid: this.uid, item_id: 2, astype: '', reduce_num: this.ugetMoney, num: -1, time: endTime, startTime: ''
        // },(data) => {
        //   _this.code = data.key
        //   _this.ugetMoney = data.reduce_num
        // })
      // }
      // console.log(this.vipList)
      // PUBLIC.get("Team.User.Add",{ tid:this.unewGroup,uid:this.uid,end_time: endTime},function(data){
      //   console.log(data)
      // })
    // }
  },
  mounted() {
    var id=this.$route.params.id

    DATAC.setConf(this)
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

