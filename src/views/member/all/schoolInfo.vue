<template>
  <div class="schoolInfo">
    <div class="memberInfo">
      <p><span><span class="title">幼儿园名称:</span><span class="innerText">{{allData.company_name}}</span></span><span><span class="title">创建者ID:</span><span class="innerText">{{allData.company_uid}}</span></span></p>
      <p><span><span class="title">负责人:</span><span class="innerText">{{allData.company_user}}</span></span><span><span class="title">联系电话:</span><span class="innerText">{{allData.company_phone}}</span></span></p>
      <!--<p><span><span class="title">合同编号:</span><span class="innerText">{{allData.contract_num}}</span></span><span><span class="title">合同文件:</span><span class="innerText">{{allData.contract_doc}}-->
      <p><span><span class="title">幼儿园地址:</span><span class="innerText">{{allData.company_adress}}</span></span><span><span class="title" style="color: #00a2d4">考勤地址列表</span></span></p>
        <!--<a :href="allData.contract_doc" download="">下载文件</a></span></span></p>-->
      <p><span><span class="title">授权类目:</span><span class="innerText"><span v-for="item in shouquan" style="display: inline-block;margin-bottom: 4px">{{item}}&emsp;</span></span></span><el-button type="primary" @click="addSQ">新增授权</el-button></p>
      <p><span><span class="title">认证状态:</span><span class="innerText"><span v-if="allData.company_statu == 0">未认证</span><span v-if="allData.company_statu == 1">普通认证</span><span v-if="allData.company_statu == 2">高级认证</span></span></span><span><span class="title">认证时间:</span><span class="innerText">{{allData.username}}</span></span></p>
      <p><span><span class="title">认证密钥 :</span><span class="innerText">{{allData.company_my}}</span></span></p>
      <p><span><span class="title">认证资料 :</span><img src="" alt=""></span></p>
      <p class="jianjie"><span><span class="title">园所简介 :</span><span class="text">{{allData.company_jj}}</span></span></p>
      <p><span><span class="title">园所相册 :</span><img v-for="item in JSON.parse(allData.company_xc)" :src="item" alt=""></span></p>

    </div>
    <div class="generateBox" v-show="showIt">
      <h3>信息编辑 <i class="fa fa-close" @click="addSQ"></i></h3>
      <div class="inner">
        <p></p>
        <p>有效期至：
          <el-date-picker
            v-model="end_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <p>授权类目：
          <el-select v-model="addName" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p><el-button type="success" @click="addCode">生成</el-button><el-button type="info" @click="cancel">取消</el-button></p>
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
      shouquan: [],
      options: [],
      addName: '',//添加授权名字
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
    cancel(){
      this.$router.go(-1)
    },
    addSQ() {
      this.showIt = !this.showIt
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
      PUBLIC.get('User.Company.seltid', { tid: id }, (data) => {
        console.log(data)
        this.allData = data
        // var newData = [];
        // var demo = {
        //   name: 'name',
        //   username:'username',
        //   rec_status: 'rec_status',
        //   user_phone: 'user_phone',
        //   contract_num: 'contract_num',
        //   contract_doc: 'contract_doc',
        //   auth_dir: 'auth_dir',
        //   use_state: 'use_state',
        //   subaccount_num: 'subaccount_num',
        //   generate_time: 'generate_time',
        //   end_time: 'end_time',
        //   time: 'time',
        //   code: 'code',
        //   on_statu:"on_statu",
        //   id:"id"
        // }
        // newData =  PUBLIC.formatObj(demo, data)
        // this.schoolInfo = newData
        // this.schoolGroup = this.schoolInfo
        // // console.log(this.allData)
        // //拉取历史授权码信息
        // PUBLIC.get("User.Mechanism.selhiscode",{fromid:id},function(data){
        //   var tmp=[]
        //   for(var n=0;n<data.length;n++){
        //     if(data[n].code!=newData.code){
        //       tmp.push(data[n])
        //     }
        //   }
        //   _this.codeHis=tmp
        // })
        // var shouquan = this.schoolInfo.auth_dir.split(',')
        // PUBLIC.get('Video.drama.classlist', data => {
        //   console.log(data)
        //   console.log(shouquan)
        //   for (var i in data) {
        //     // console.log(data[i].id)
        //     for (var a in shouquan) {
        //       if (data[i].id === shouquan[a]) {
        //         this.shouquan.push(data[i].class)
        //       }
        //     }
        //     console.log(this.shouquan)
        //   }
        // })

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
      // this.$router.push({name:'园所审核',query: { page: this.page }})
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
      /*p:last-of-type {*/
        /*padding-top: 100px;*/
        /*text-align: center;*/
        /*.el-button{*/
          /*margin: 0 8%;*/
          /*width: 100px;*/
        /*}*/
      /*}*/
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
  }

</style>
