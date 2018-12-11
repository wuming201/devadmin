<template>
  <div class="schoolInfo">
    <div class="memberInfo">
      <p class="name"><span><span class="title">机构名称:</span><el-input v-model="sname"></el-input></span></p>
      <p><span><span class="title">机构简称:</span><span class="innerText"><el-input v-model="company_jc"></el-input></span></span><span><span class="title">创建者ID:</span><span class="innerText"><el-input v-model="uid"></el-input></span></span></p>
      <p><span><span class="title">联系电话:</span><span class="innerText"><el-input v-model="stelphone"></el-input></span>{{phoneStatusText}}</span>
        <span><span class="title">负责人:</span><span class="innerText"><el-input v-model="susername"></el-input></span></span></p>
      <baidu @getJW ="baiduIinfo" @getAddress ="baiduIinfo"></baidu>      <div id="allmap"></div>
      <p><el-button type="success" @click="save1">保存</el-button><el-button type="info" @click="quit">取消</el-button></p>
    </div>
    <div class="generateBox" v-show="showIt">
      <h3>信息编辑 <i class="fa fa-close" @click="generateCode"></i></h3>
      <div class="inner">
        <p></p>
        <p>&emsp;有效期至：<el-input></el-input></p>
        <p>子账号个数：<el-input></el-input></p>
        <p><el-button type="success" >生成</el-button><el-button type="info" @click="generateCode">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { baidu } from '../../../components/index'
export default {
  name: 'schoolEntry',
  components: {
    baidu
  },
  data() {
    return {
      uid: '',
      company_jc: '',
      multipleSelection: [],
      videoClass: [],
      isIndeterminate: true,
      checkedAuthorize: [],
      city: '',
      address_detail: '', //详细地址
      userlocation: {x: "", y: ""},
      sname:"",
      susername:"",
      stelphone:"",
      scontractFile:"",
      scontractId:"",
      showIt:"",
      region:[],
      selectedOptions: '',
      phoneStatusText:""
    }
  },
  created() {
    // this.getInfo()
  },
  methods: {
    baiduIinfo(val){
      // console.log(val)
      if(typeof(val) === 'string') {
        let arr = JSON.parse(val)
        this.address_detail = arr[0]
        this.city = arr[1]
      } else{
        this.userlocation.x = val.lng
        this.userlocation.y = val.lat
      }
      // console.log(this.address_detail, this.userlocation)
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
    generateCode() {
      this.showIt = !this.showIt
    },
    getInfo() {
      PUBLIC.get("Configure.Configure.Selone",{type:"quyuliebiao",key:"quyuliebiao"},(data) => {
        console.log("区域数据载入完毕")
        console.log(data)
        this.region=data?JSON.parse(data.value):[]
        console.log(this.region)
      })
    },
    save1() {
      var _this = this
      // PUBLIC.get("User.Mechanism.Melist",{user_phone:this.stelphone}, (data) => {
      //   if(data.length>0){
      //     _this.phoneStatusText="手机号已存在"
      //     PUBLIC.toa("手机号已存在")
      //   }else{
          let data = {
            uid: this.uid,
            city: this.city,
            adress: this.address_detail,
            gps: JSON.stringify(this.userlocation),
            name:this.sname,
            mall:this.stelphone,
            user:this.susername,
            type: 0,
            // user: this.
            name_jc: this.company_jc
          }
          console.log(data)
          PUBLIC.get("User.Appuser.createqy",data, function(data){
            console.log(data)
            _this.$router.go(-1)
          })
      //   }
      // })
    },
    upFile:function(){
      console.log("触发上传")
      document.getElementById("upFileForm").click();
    },
    upFileChange:function(){
      var _this=this
      console.log("开始上传文件")
      PUBLIC.postFile("upFileForm",function(data){
        _this.scontractFile=data
      })
    },
    quit:function(){
      this.$router.go(-1)
    }
  },
  mounted() {
    // DATAC.setConf(this)
    // this.getRegionList()
    // console.log(this)
  },
  watch: {
    checkedAuthorize() {
      console.log(this.checkedAuthorize)
    },
    selectedOptions() {
      console.log(this.selectedOptions[0])
    },
    stelphone(){
      this.phoneStatusText=""
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .schoolInfo{
    padding: 120px 470px;
    .memberInfo{
      font-size: 14px;
      p {
        text-align: left;
        span{
          display: inline-block;
          .title{
            width: 110px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText{
            width: 200px;
            a{
              margin-left: 40px;
              color: #169BD5;
            }
          }
          .el-checkbox{
            width: 146px;
            margin-left: 0;
          }
        }
        >span{
          padding-bottom: 55px;
          height: 80px;
          >span{
            width: 80%;
            line-height: 30px;
          }
        }
        >span:first-of-type{
          margin-right: 70px;
        }
      }
      .name{
        .el-input{
          width: 400px;
        }
      }
      .address{
        .city{
          width: 120px;
        }
        .info{
          width: 435px;
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
      .duoxuan{
        >span:first-of-type{
          margin-right: 0;
        }
        .title{
          vertical-align: top;
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
  }

</style>
