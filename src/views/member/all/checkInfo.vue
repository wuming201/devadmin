<template>
  <div class="compInfo">
    <div class="memberInfo">
      <p><span><span class="title">单位类型:</span><span class="innerText"><span v-if="compInfo.user_type == 0">幼儿园</span><span v-else>执教机构</span></span></span><span><span class="title">单位名称:</span><span class="innerText">{{compInfo.company_name}}</span></span></p>

      <p><span><span class="title">单位简称:</span><span class="innerText">{{compInfo.company_jc}}</span></span><span><span class="title">单位地址</span><span class="innerText">{{compInfo.adress}}</span></span></p>
      <p><span><span class="title">负责人:</span><span class="innerText">{{compInfo.company_user}}</span></span><span><span class="title">联系电话:</span><span class="innerText">{{compInfo.company_mall}}</span></span></p>
      <p><span><span class="title">创建者实名:</span><span class="innerText">{{compInfo.shenq_name}}</span></span><span><span class="title">身份证号码:</span><span class="innerText">{{compInfo.name}}</span></span></p>
      <p><span><span class="title">认证密钥 :</span><span class="innerText">{{compInfo.username}}</span></span></p>
      <p class="rzzl"><span><span class="title">认证资料 :</span><img :src="JSON.parse(this.compInfo.user_zl)['yyzz']" alt=""><img :src="JSON.parse(this.compInfo.user_zl)['khxk']" alt=""></span></p>
      <p><el-button type="info" @click="cancelIt">返回</el-button></p>
    </div>
  </div>
</template>

<script>
  import { selectKuang } from '../../../components/index'

  export default {
    name: 'compInfo',
    components: {
      selectKuang
    },
    data() {
      return {
        id: '',
        showIt: false,
        showPass: false,
        showReject: false,
        successDesc: '',
        rejectDesc: '',
        allData: [],
        compInfo: [],
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
      getcompInfo(id) {
        PUBLIC.get('User.Examine.selinfo', { id: id }, (data) => {
          console.log(data)
          this.compInfo = data
          console.log(JSON.parse(this.compInfo.user_zl)['yyzz'])
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
          // this.compInfo = newData
          // this.schoolGroup = this.compInfo
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
          // var shouquan = this.compInfo.auth_dir.split(',')
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
      setCodeStatus(id, status){
        var _this=this
        PUBLIC.get("User.Mechanism.jycode",{id:id,on_statu:status},function(data){
          _this.getcompInfo(id)
        })
      },
      cancelIt() {
        this.$router.go(-1)
      }
    },
    mounted() {
      DATAC.setConf(this)
      this.page = this.$route.params.page
      this.id = this.$route.params.id
      this.getcompInfo(this.id)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .compInfo{
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
      .rzzl{
        img{
          width: 220px;
          height: 120px;
          margin-right: 20px;
          vertical-align: text-top;
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

