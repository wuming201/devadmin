<template>
  <div class="schoolInfo">
    <div class="memberInfo">
      <p class="name"><span><span class="title">机构名称:</span><el-input v-model="sname" v-if="company_statu == 0" ></el-input><el-input v-model="sname" v-else disabled></el-input></span></p>
      <p><span><span class="title">机构简称:</span><span class="innerText"><el-input
        v-model="company_jc"></el-input></span></span><span><span class="title">创建者ID:</span><span class="innerText"><el-input
        v-model="company_uid" disabled></el-input></span></span></p>
      <p><span><span class="title">联系电话:</span><span class="innerText"><el-input v-model="company_phone"></el-input></span></span>
        <span><span class="title">负责人:</span><span class="innerText"><el-input
          v-model="company_user"></el-input></span></span></p>
      <p class="address"><span><span class="title">机构地址:</span><el-input class="city" placeholder="城市"
                                                                          v-model="city" disabled></el-input><el-input
        class="info" placeholder="详细地址" v-model="adress" disabled></el-input></span></p>
      <p class="name">
        <span>
          <span class="title">企业类型:</span>
            <el-radio-group v-model="compType" :disabled="jinyong">
              <el-radio label="0">执教机构</el-radio>
              <el-radio label="3">分子公司</el-radio>
              <el-radio label="4">分会及代理商</el-radio>
            </el-radio-group>
        </span>
      </p>
      <p>
        <el-button type="success" @click="upSchoolInfo">保存</el-button>
        <el-button type="info" @click="quit">取消</el-button>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'schoolEdit',
    data() {
      return {
        jinyong: false,
        compType: 1, //企业类型
        showIt: false,
        multipleSelection: [],
        isIndeterminate: true,
        checkedAuthorize: [],
        videoClass: [],
        schoolInfo: [],
        yname: "",
        id: '',
        page: 0,
        region: [],
        allData: {},
        company_statu: '',
        company_user: '',
        company_uid: '',
        company_phone: '',
        company_jc: '',
        sname: '',
        adress: '',
        city: ''
      }
    },
    methods: {
      generateCode() {
        this.showIt = !this.showIt
      },
      getSchoolInfo(id) {
        PUBLIC.get('User.Company.seltid', { tid: id, page: '1' }, (data) => {
          if (data.company_type === '2') {
            this.jinyong = true
          }
          this.allData = data
          this.sname = data.company_name
          this.company_statu = data.company_statu
          this.company_user = data.company_user
          this.company_phone = data.company_phone
          this.company_uid = data.company_uid
          this.company_jc = data.company_jc
          this.city = data.city
          this.compType = data.company_type
          console.log(this.compType)
          this.adress = data.company_adress
        })
      },
      upSchoolInfo() {
        var _this = this
        PUBLIC.get('User.Appuser.updateqy', {
          tid: this.id,//
          type: this.compType,//
          name: this.sname,//
          name_jc: this.company_jc,//
          mall: this.company_phone,//
          user: this.company_user,//
          city: this.allData.city,
          adress: this.allData.company_adress,
          logo: this.allData.company_logo,
          gps: this.allData.company_gps,
          jianje: this.allData.company_jj,
          xiangce: this.allData.company_xc,
          rzzl: this.allData.company_zj
        }, function (data) {
          if (data != false) {
            _this.$router.push({name: '机构资料', query: {page: _this.page}})
          }
        })
        // }
        // })
      },
      upFile: function () {
        console.log("触发上传")
        document.getElementById("upFileForm").click();
      },
      upFileChange: function () {
        var _this = this
        console.log("开始上传文件")
        PUBLIC.postFile("upFileForm", function (data) {
          _this.schoolInfo.contract_doc = data
        })
      },
      quit: function () {
        this.$router.push({name: '机构资料', query: {page: this.page}})
      },
      getRegionList: function () {
        // var _this=this
        // //构建address数据树形结构
        // var addIndex=0
        // for(var n=0;n<this.region1.length;n++){
        //   addIndex++
        //   this.region1[n].id=addIndex
        //   this.region1[n].value=this.region1[n].label
        //   this.region1[n].children=this.region1[n].children?this.region1[n].children:[]
        //   for(var i=0;i<this.region1[n].children.length;i++){
        //     addIndex++
        //     this.region1[n].children[i].id=addIndex
        //     this.region1[n].children[i].value=this.region1[n].children[i].label
        //     this.region1[n].children[i].parentId=this.region1[n].id
        //     this.region1[n].children[i].children=this.region1[n].children[i].children?this.region1[n].children[i].children:[]
        //     for(var x=0;x<this.region1[n].children[i].children.length;x++){
        //       addIndex++
        //       this.region1[n].children[i].children[x].id=addIndex
        //       this.region1[n].children[i].children[x].value=this.region1[n].children[i].children[x].label
        //       // this.region1[n].children[i].children[x].children=[]
        //       delete this.region1[n].children[i].children[x].children
        //       this.region1[n].children[i].children[x].parentId=this.region1[n].children[i].id
        //
        //     }
        //   }
        // }
        //
        // this.region = JSON.parse(JSON.stringify(this.region1))
        // console.log(this.region)
        // // this.oldOptions=JSON.parse(JSON.stringify(this.testAddress))
      },
    },
    mounted() {
      this.page = this.$route.params.page
      this.id = this.$route.params.id
      DATAC.setConf(this)
      this.getSchoolInfo(this.id)
      this.getRegionList()
    },
    watch: {
      compType() {
        console.log(this.compType)
      },
      checkedAuthorize() {
        console.log(this.checkedAuthorize)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .schoolInfo {
    padding: 120px 470px;
    .memberInfo {
      font-size: 14px;
      p {
        text-align: left;
        span {
          display: inline-block;
          .title {
            width: 110px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText {
            width: 200px;
          }
          .el-checkbox {
            width: 146px;
            margin-left: 0;
          }
        }
        > span {
          padding-bottom: 55px;
          height: 80px;
          > span {
            width: 80%;
            line-height: 30px;
          }
        }
        > span:first-of-type {
          margin-right: 70px;
        }
      }
      .name {
        .el-input {
          width: 400px;
        }
      }
      .address {
        .city {
          width: 120px;
        }
        .info {
          width: 435px;
        }
      }
      .addBtn {
        margin-top: -47px;
        margin-left: 100px;
        .el-button {
          width: 200px;
          margin-bottom: 55px;
        }
      }
      .duoxuan {
        > span:first-of-type {
          margin-right: 0;
        }
        .title {
          vertical-align: top;
        }
      }
      p:last-of-type {
        padding-top: 100px;
        text-align: center;
        .el-button {
          margin: 0 8%;
          width: 100px;
        }
      }
    }
    .generateBox {
      z-index: 100;
      width: 500px;
      height: 400px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -250px;
      h3 {
        background-color: #E4E4E4;
        padding: 15px;
        .fa {
          float: right;
          font-size: 18px;
          padding: 0 10px;
        }
        .fa:hover {
          color: #518BBD;
        }
      }
      .inner {
        padding: 36px 80px;
        p {
          padding-bottom: 30px;
          .el-input {
            width: 200px;
          }
        }
        p:last-of-type {
          text-align: center;
          margin-top: 40px;
          > button {
            width: 120px;
          }
        }
      }
    }
  }

</style>
