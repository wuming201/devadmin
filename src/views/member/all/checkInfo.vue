<template>
  <div class="schoolInfo">
    <div class="memberInfo">
      <p><span><span class="title">单位类型:</span><span class="innerText">{{schoolInfo.name}}</span></span><span><span class="title">单位名称:</span><span class="innerText">{{schoolInfo.name}}</span></span></p>

      <p><span><span class="title">单位简称:</span><span class="innerText">{{schoolInfo.username}}</span></span><span><span class="title">单位地址</span><span class="innerText">{{schoolInfo.user_phone}}</span></span></p>
      <p><span><span class="title">负责人:</span><span class="innerText">{{schoolInfo.username}}</span></span><span><span class="title">联系电话:</span><span class="innerText">{{schoolInfo.user_phone}}</span></span></p>
      <!--<p><span><span class="title">合同编号:</span><span class="innerText">{{schoolInfo.contract_num}}</span></span><span><span class="title">合同文件:</span><span class="innerText">{{schoolInfo.contract_doc}}-->
      <!--<a :href="schoolInfo.contract_doc" download="">下载文件</a></span></span></p>-->
      <p><span><span class="title">创建者实名:</span><span class="innerText">{{schoolInfo.username}}</span></span><span><span class="title">身份证号码:</span><span class="innerText">{{schoolInfo.name}}</span></span></p>
      <p><span><span class="title">认证密钥 :</span><span class="innerText">{{schoolInfo.username}}</span></span></p>
      <p><span><span class="title">认证资料 :</span><img src="" alt=""></span></p>
      <p class="jianjie"><span><span class="title">园所简介 :</span><span class="text">此处为园长填写的园所简介，此处为园长填写的园所简介，此处为园长填写的园所简介，此处为园长填写的园所简介，此处为园长填写的园所简介，此处为园长填写的园所简介，此处为园长填写的园所简介，
        此处为园长填写的园所简介，</span></span></p>
      <p><span><span class="title">园所相册 :</span><img src="" alt=""></span></p>
      <!--<p><span><span class="title">邀请码 :</span><el-button @click="generateCode" type="primary" slot="append">生成优惠码</el-button></span></p>-->
      <!--<div class="code">-->
        <!--<table>-->
          <!--<tr>-->
            <!--&lt;!&ndash; <td>邀请类型</td> &ndash;&gt;-->
            <!--<td>邀请码</td>-->
            <!--<td>生成时间</td>-->
            <!--<td>到期时间</td>-->
            <!--<td>子账号个数</td>-->
            <!--<td>使用状态</td>-->
            <!--<td>管理操作</td>-->
          <!--</tr>-->
          <!--<tr v-if="welCode">-->
            <!--&lt;!&ndash; <td >当前邀请码</td> &ndash;&gt;-->
            <!--&lt;!&ndash; <td v-if="this.welCode === ''">{{schoolInfo.code}}</td> &ndash;&gt;-->
            <!--<td >{{welCode}}</td>-->

            <!--&lt;!&ndash; <td v-if="this.addTime === ''">{{schoolInfo.time}}</td> &ndash;&gt;-->
            <!--<td>{{addTime}}</td>-->

            <!--&lt;!&ndash; <td  v-if="this.end_time === ''">{{schoolInfo.end_time}}</td> &ndash;&gt;-->
            <!--<td >{{end_time}}</td>-->

            <!--&lt;!&ndash; <td v-if="this.child_account === ''">{{schoolInfo.subaccount_num}}</td> &ndash;&gt;-->
            <!--<td >{{child_account}}</td>-->

            <!--&lt;!&ndash; <td v-if="this.use_state === ''">{{use_status_dict[schoolInfo.use_state]}}</td> &ndash;&gt;-->
            <!--<td >未保存</td>-->
            <!--<td >-->
              <!--&lt;!&ndash; <span v-if="schoolInfo.code && use_state=='0'"><button v-if="schoolInfo.on_statu==0" @click="setCodeStatus(schoolInfo.id,1)">禁用</button><button v-else @click="setCodeStatus(schoolInfo.id,0)">启用</button></span> &ndash;&gt;-->
              <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--&lt;!&ndash; <td >当前邀请码</td> &ndash;&gt;-->
            <!--<td >{{schoolInfo.code}}</td>-->
            <!--&lt;!&ndash; <td v-else>{{welCode}}</td> &ndash;&gt;-->

            <!--<td >{{schoolInfo.generate_time}}</td>-->
            <!--&lt;!&ndash; <td v-else>{{addTime}}</td> &ndash;&gt;-->

            <!--<td  >{{schoolInfo.end_time}}</td>-->
            <!--&lt;!&ndash; <td v-else>{{end_time}}</td> &ndash;&gt;-->

            <!--<td >{{schoolInfo.subaccount_num}}</td>-->
            <!--&lt;!&ndash; <td v-else>{{child_account}}</td> &ndash;&gt;-->

            <!--<td >{{use_status_dict[schoolInfo.use_state]}}</td>-->
            <!--&lt;!&ndash; <td v-else>{{use_status_dict[use_state]}}</td> &ndash;&gt;-->
            <!--<td >-->
              <!--<span v-if="schoolInfo.code && schoolInfo.use_state=='0'"><button v-if="schoolInfo.on_statu==0" @click="setCodeStatus(schoolInfo.id,1)">禁用</button><button v-else @click="setCodeStatus(schoolInfo.id,0)">启用</button></span>-->
              <!--</td>-->
          <!--</tr>-->
          <!--<tr v-for="item in codeHis">-->
            <!--&lt;!&ndash; <td >历史邀请码</td> &ndash;&gt;-->
            <!--<td >{{item.code}}</td>-->
            <!--<td >{{item.time}}</td>-->

            <!--<td  >{{item.end_time}}</td>-->

            <!--<td >{{item.subaccount_num}}</td>-->

            <!--<td >{{use_status_dict[item.use_state]}}</td>-->
            <!--<td></td>-->

          <!--</tr>-->
        <!--</table>-->
      <!--</div>-->
      <p><el-button type="success" @click="passIt">通过</el-button><el-button type="danger" @click="rejectIt">拒绝</el-button><el-button type="info" @click="cancelIt">取消</el-button></p>

      <div class="pass" v-show="showPass">
        <h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>
        <div class="inner">
          <p>&emsp;处理人：  {{admin}}</p>
          <p>处理备注：
            <el-input
              type="textarea"
              v-model="successDesc"
              :rows="2"
              placeholder="请输入通过原因！">
            </el-input>
          </p>
          <p><el-button type="success" @click="passUp">提交</el-button><el-button type="info" @click="passIt">取消</el-button></p>
        </div>
      </div>
      <div class="reject" v-show="showReject">
        <h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>
        <div class="inner">
          <p>&emsp;处理人： {{admin}} </p>
          <p>处理备注：
            <el-input
              type="textarea"
              :rows="2"
              v-model="rejectDesc"
              placeholder="请输入拒绝原因！">
            </el-input>
          </p>
          <p><el-button type="danger" @click="rejectUp">拒绝</el-button><el-button type="info" @click="rejectIt">取消</el-button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectKuang } from '../../../components/index'

export default {
  name: 'schoolInfo',
  components: {
    selectKuang
  },
  data() {
    return {
      showIt: false,
      allData: [],
      schoolInfo: [],
      schoolGroup: [],
      codeGroup: [],
      child_account: '',
      end_time: '',
      addTime: '',
      generate_time: '',
      welCode: '',
      use_state: '',
      multipleSelection: [],
      codeHis:[],
      use_status_dict:{
        "0":"未使用",
        "1":"已使用",
        "-1":"已过期",
      },
      shouquan: []
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
    generateCode() {
      this.showIt = !this.showIt
    },
    passIt() {
      this.showPass = !this.showPass
    },
    passUp() {
      PUBLIC.get('User.Mechanism.Updauth', { id: this.id, status: 1, beizhu: this.successDesc }, (data) => {
        if(data == true) {
          this.$message('审核提交成功！');
          this.$router.push({name:'园所审核',query: { page: this.page }})
        } else  {
          this.$message('该视频已为通过状态，请勿重复操作！');
        }
      })
    },
    rejectIt() {
      this.showReject = !this.showReject
    },
    rejectUp() {
      PUBLIC.get('User.Mechanism.Updauth', { id: this.id, status: -1, beizhu: this.rejectDesc }, data => {
        console.log(data)
        if(data == true) {
          this.$message('拒绝审核成功！');
          setTimeout(() =>{
            console.log( this.page)
            this.$router.push({name:'园所审核',query: { page: this.page }})
          }, 1000)
        } else {
          this.$message('该视频已为拒绝状态，请勿重复操作！');
        }
        console.log(data)
      })

    },
    addCode() {
      this.addTime = PUBLIC.getTime()
      // this.use_state = 0
      this.welCode=""
      var chars = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9','0']
      for(var i = 0; i < 8; i ++) {
        var code = Math.ceil(Math.random() * 10)
        console.log(code)
        console.log(this.welCode)
        this.welCode += chars[code]
      }
      // return
      let year = this.end_time.getFullYear();
      let month = this.end_time.getMonth()+1;    //js从0开始取
      let date1 = this.end_time.getDate();
      let hour = this.end_time.getHours();
      let minutes = this.end_time.getMinutes();
      let second = this.end_time.getSeconds();
      let endTime = year+ "-" +month+ "-" +date1+ " " +'0'+hour+ ":" + '0'+minutes + ":" +'0'+second
      this.end_time = endTime
      console.log(this.end_time)
      var codes = { time: this.addTime, end_time: this.end_time, child_account: this.child_account }
      this.codeGroup.push(codes)
      this.showIt = !this.showIt
    },
    getSchoolInfo(id) {
      var _this=this
      this.shouquan=[]
      PUBLIC.get('User.Mechanism.Selauth', { id: id }, (data) => {
        console.log(data)
        this.allData = data
        var newData = [];
        var demo = {
          name: 'name',
          username:'username',
          rec_status: 'rec_status',
          user_phone: 'user_phone',
          contract_num: 'contract_num',
          contract_doc: 'contract_doc',
          auth_dir: 'auth_dir',
          use_state: 'use_state',
          subaccount_num: 'subaccount_num',
          generate_time: 'generate_time',
          end_time: 'end_time',
          time: 'time',
          code: 'code',
          on_statu:"on_statu",
          id:"id"
        }
        newData =  PUBLIC.formatObj(demo, data)
        this.schoolInfo = newData
        this.schoolGroup = this.schoolInfo
        // console.log(this.allData)
        //拉取历史授权码信息
        PUBLIC.get("User.Mechanism.selhiscode",{fromid:id},function(data){
          var tmp=[]
          for(var n=0;n<data.length;n++){
            if(data[n].code!=newData.code){
              tmp.push(data[n])
            }
          }
          _this.codeHis=tmp
        })
        var shouquan = this.schoolInfo.auth_dir.split(',')
        PUBLIC.get('Video.drama.classlist', data => {
          console.log(data)
          console.log(shouquan)
          for (var i in data) {
            // console.log(data[i].id)
            for (var a in shouquan) {
              if (data[i].id === shouquan[a]) {
                this.shouquan.push(data[i].class)
              }
            }
            console.log(this.shouquan)
          }
        })

      })
    },
    saveIt() {
      PUBLIC.get('User.Mechanism.Updatecode', {
        id: this.allData.id, code: this.welCode, generate_time: this.addTime, end_time: this.end_time, subaccount_num: this.child_account, use_state: 0
      }, (data) => {
        // _this.code = data.key
        // _this.ugetMoney = data.reduce_num
        this.getSchoolInfo(this.allData.id)
        // this.$router.push({name:'园所审核',query: { page: this.page }})
        this.$router.go(-1)
        console.log(data)
      })
      // this.$router.go(-1)
    },
    cancelIt() {
      this.$router.go(-1)
    },
    setCodeStatus(id,status){
      var _this=this
      PUBLIC.get("User.Mechanism.jycode",{id:id,on_statu:status},function(data){
        _this.getSchoolInfo(id)
      })
    }
  },
  mounted() {
    DATAC.setConf(this)
    this.page = this.$route.params.page
    var id = this.$route.params.id
    // console.log(this)
    this.getSchoolInfo(id)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .schoolInfo{
    padding: 120px 430px;
    .memberInfo{
      font-size: 14px;
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
            width: 260px;
            vertical-align: top;
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 70px;
        }
      }
      .jianjie{
        .text{
          display: inline-block;
          margin-left: 100px;
          margin-top: -30px;
        }
      }
      .code{
        margin-left: 80px;
        table{
          tr{
            background-color: #fff;
            td{
              border: 1px solid #ccc;
              width: 150px;
              text-align: center;
              line-height: 40px;
            }
            td:nth-of-type(5),td:nth-of-type(4){
              width: 100px;
            }
          }
          tr:first-of-type{
            background-color: #F5FAFE;
          }

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
      p:last-of-type {
        padding-top: 100px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }
    .generateBox{
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
        padding:36px 80px;
        p{
          padding-bottom: 30px;
          .el-input{
            width: 200px;
          }
        }
        p:last-of-type{
          text-align: center;
          margin-top: 40px;
          >button{
            width: 120px;
          }
        }
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
