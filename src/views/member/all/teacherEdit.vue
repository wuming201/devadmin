<template>
  <div class="teacherEdit clearfix">
    <div class="leftBox">
      <div class="pic">
        <img :src="uimg" alt="">
        <p>
          <el-button type="primary" @click="upHead()">上传图片</el-button>
        </p>
        <el-input type='file' id='upheads' v-on:change='upHeads' hidden></el-input>
      </div>
    </div>
    <div class="memberInfo">
      <!--<p><span><span class="title">uid:</span><span class="innerText"><el-input v-model="uid" disabled placeholder="请输入内容" ></el-input></span></span><span><span class="title">艺名:</span><span class="innerText"><el-input v-model="stageName" placeholder="请输入内容"></el-input></span></span></p>-->
      <!--<p><span><span class="title">出生日期:</span>-->
      <!--<span class="innerText">-->
      <!--<el-date-picker-->
      <!--v-model="birth"-->
      <!--type="date"-->
      <!--placeholder="选择日期" disabled>-->
      <!--</el-date-picker>-->
      <!--</span></span><span><span class="title">工号:</span><span class="innerText"><el-input v-model="worknum" placeholder="请输入内容"></el-input></span></span></p>-->
      <!--<p>-->
      <!--<span><span class="title">区域:</span>-->
      <!--<span class="innerText">-->
      <!--<div class="block">-->
      <!--<span class="demonstration"></span>-->
      <!--<el-cascader-->
      <!--:options="regionList"-->
      <!--v-model="region">-->
      <!--</el-cascader>-->
      <!--</div>-->
      <!--</span>-->
      <!--</span><span><span class="title">分会:</span><span class="innerText"><selectKuang :selectData="branchList" :value0="unit" @value="changeProvince"></selectKuang></span></span>-->
      <!--</p>-->
      <!--<p><span><span class="title">职称等级:</span><span class="innerText"><selectKuang @value="setGrand" :selectData="grand" :value0="grands"></selectKuang></span></span><span><span class="title">证书编号:</span><span class="innerText"><el-input v-model="cernum" disabled placeholder="请输入内容"></el-input></span></span></p>-->
      <!--<p><span><span class="title">状态:</span><span class="innerText"><selectKuang @value="setStatu" :selectData="status" :value0="state"></selectKuang></span></span><span><span class="title">视频制作:</span><span class="innerText"><selectKuang @value="setVP" :selectData="videoP" :value0="videoProducing"></selectKuang></span></span></p>-->

      <!--以上为改版超管前-->


      <p><span><span class="title">用户手机:</span><span class="innerText">{{person.telphone}}</span></span><span><span
        class="title">公司名称:</span><span class="innerText">{{compName}}</span></span></p>
      <p><span><span class="title">证书类型:</span><span class="innerText"><span v-if="certsData.cert_type == 0">平台证书</span><span v-else>企业证书</span></span></span>
        <span><span class="title">证书名称:</span><span class="innerText">{{certsData.cert_name}}</span></span></p>
        <!--<span class="innerText"><span v-if="grands == 1">国际注册幼儿体智能初级教师</span><span v-else-if="grands == 2">国际注册幼儿体智能中级教师</span><span v-else-if="grands == 3">国际注册幼儿体智能初级教师</span>-->

      <p>
        <span>
          <span class="title">证书编号:</span>
          <span class="innerText">{{cernum}}
          </span>
        </span>
        <span><span class="title">有效期:</span><span class="innerText">{{stopTime}}</span></span>
      </p>
      <p><span><span class="title">真实姓名:</span><span class="innerText">{{person.rel_name}}</span></span><span><span
        class="title">证书状态:</span><span class="innerText"><span v-if="certsData.pay_statu == 0">未审核</span><span v-else-if="certsData.pay_statu == 1">通过</span><span v-else-if="certsData.pay_statu == -1">未通过</span><span v-else-if="certsData.pay_statu == 2">已吊销</span></span></span></p>
      <p><span><span class="title">身份证号:</span><span class="innerText">{{person.rel_code}}</span></span><span><span
        class="title">艺名:</span><span class="innerText">{{certsData.stageName}}</span></span></p>
      <p>
        <span><span class="title">工号:</span><span class="innerText">{{worknum}}</span></span><span>
        <span class="title">视频制作:</span><span class="innerText">
        <!--<span v-if="videoProducing == 1">参与</span><span v-else>不参与</span>-->
        <el-select v-model="videoProducing" placeholder="请选择">
          <el-option
            v-for="item in producer"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
      </span>

      </p>
      <!--<p></p>-->
      <p class="addP"><span><span class="title">个人简介:</span><span class="personInfo"><el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="message"></el-input></span></span></p>

      <p class="addP"><span><span class="title">其他证书:</span>
        <span class="pics"><span class="picBox" v-for="(item,index) in cers"><img :src="item" alt=""><img
          src="../../../../src/assets/del.png" class="icon" alt="" @click="delCer(index)"></span></span>
        <span><el-button type="primary" @click="upCer()">添加照片</el-button></span>
      </span>
        <el-input type='file' id='upcers' v-on:change='upFileCer' hidden></el-input>
      </p>

      <p class="addP"><span><span class="title">个人相册:</span>
        <span class="pics"><span class="picBox" v-for="(item,index) in pics"><img :src="item" alt=""><img
          src="../../../../src/assets/del.png" class="icon" alt="" @click="delImg(index)"></span></span>
        <span><el-button type="primary" @click="upImg()">添加照片</el-button></span></span>
        <el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input>
      </p>
      <p><span><span class="title">kkip首页:</span><span class="innerText"><el-radio v-model="showHome" label="1">是</el-radio><el-radio
        v-model="showHome" label="0">否</el-radio></span></span></p>
      <p>
        <el-button type="primary" @click="saveTeacher">保存</el-button>
        <el-button type="info" @click="quit">取消</el-button>
      </p>
    </div>
  </div>
</template>

<script>
  import {selectKuang} from '../../../components/index'

  export default {
    name: 'teacherEdit',
    components: {
      selectKuang
    },
    data() {
      return {
        certsData: {},
        producer: [
          {
            value: '1',
            label: '参与'
          },
          {
            value: '0',
            label: '不参与'
          }
        ],
        branchList: [],
        grand: [
          {
            value: '1',
            label: '初级'
          },
          {
            value: '2',
            label: '中级'
          },
          {
            value: '3',
            label: '高级'
          }
        ],
        status: [
          {
            value: '1',
            label: '在职'
          },
          {
            value: '0',
            label: '离职'
          }
        ],
        videoP: [
          {
            value: '1',
            label: '参与'
          },
          {
            value: '0',
            label: '不参与'
          }
        ],
        multipleSelection: [],
        uimg: '', //头像
        cers: [],            //证书
        addcer: '',
        otherCer: '',
        pics: [], //个人相册
        morepic: '',
        grands: '',
        person: '',
        user_status: '',
        videoProducing: '',
        showHome: '',
        birth: '',
        addPic: '',
        message: '',
        cernum: '',
        worknum: '',
        stageName: '',
        uid: '',
        id: '',
        stopTime: '',
        page: 0,
        compName: ''
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      getInfo(id) {
        var _this = this
        this.id = id
        PUBLIC.get('User.certificate.finds', {id: id}, data => {
          let tid = data.cert_tid != null ? data.cert_tid : ''
          PUBLIC.get('User.Appuser.selcompany',{ tid: tid }, v => {
            console.log(v)
            this.compName = v.company_name
          })
          console.log(data)
          this.certsData = data
          this.uimg = data.identityUrl
          this.uid = data.uid
          this.entryTime = data.entryTime
          this.showHome = data.showHome
          console.log(this.showHome)
          this.birth = data.dateBirth
          this.worknum = data.jobnumber
          this.grands = data.grade
          this.cernum = data.licenceNum
          this.state = data.state
          this.stopTime = data.stopTime.slice(0,10)
          this.videoProducing = data.videoProducing
          this.message = data.message
          this.territory = data.territory ? data.territory.split(',') : []
          this.unit = data.unit
          this.cers = data.certificates ? data.certificates.split(',') : []
          this.pics = data.personalAlbum ? data.personalAlbum.split(',') : []

          let region = JSON.stringify(this.territory).toString()
          for (let i = 0; i < this.cers.length; i++) {
            let htmls = '<span class="picBox"><img src = "' + this.cers[i] + '" alt=""></span>'
            this.otherCer = this.otherCer + htmls
          }
          for (let i = 0; i < this.pics.length; i++) {
            let htmls = '<span class="picBox"><img src = "' + this.pics[i] + '" alt=""></span>'
            this.morepic = this.morepic + htmls
          }

          PUBLIC.get("Configure.Configure.Selone", {type: "branch", key: this.unit}, function (data) {
            if (data) {
              data = JSON.parse(data.value)
              console.log(data)
              _this.region = data.region
              PUBLIC.get('Configure.Configure.region', {region: JSON.stringify(_this.region)}, data => {

                var brankList = []
                var temp
                for (var n = 0; n < data.length; n++) {
                  temp = JSON.parse(data[n].value)
                  brankList.push({value: data[n].key, label: temp.name})
                }
                _this.branchList = brankList
                console.log(_this.branchList)
              })
            }
          })
          PUBLIC.get('User.User.Userone', {uid: data.uid}, data => {
            console.log(data)
            this.person = data
            console.log(this.person)
          })

        })
      },
      upHead(tab) {
        this.upFileFor = tab
        document.getElementById('upheads').click();
      },
      upHeads() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upheads', function (url) {
          console.log(url)
          _this.uimg = url
        })
      },
      setGrand(e) {
        this.grands = e
      },
      setStatu(e) {
        this.user_status = e
      },
      setVP(e) {
        this.videoProducing = e
      },
      upCer(tab) {
        console.log('填图')
        this.upFileFor = tab
        document.getElementById('upcers').click()
        console.log('填图1')
        // console.log(this.cers)
      },
      upFileCer() {
        console.log('填图22')
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upcers', function (url) {
          console.log(url)
          _this.cers.push(url)
          console.log(_this.cers)
          // let htmls = '<span class="picBox"><img src = "' + url + '" alt=""></span>'
          // _this.otherCer = _this.otherCer + htmls
          // console.log(_this.otherCer)
        })
      },
      delCer(index) {
        this.cers.splice(index, 1)
      },
      upImg(tab) {
        this.upFileFor = tab
        document.getElementById('upimgs').click()
      },
      upFile() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function (url) {
          console.log(url)
          _this.pics.push(url)
          console.log(_this.pics)
        })
      },
      delImg(index) {
        this.pics.splice(index, 1)
      },
      saveTeacher() {
        console.log(this.unit)
        let datas = {
          id: this.certsData.id,
          applyTime: this.certsData.applyTime,
          identityUrl: this.certsData.identityUrl,
          entryTime: this.certsData.entryTime,
          applicationRestult: this.certsData.applicationRestult,
          pay_statu: this.certsData.pay_statu,
          statu: this.certsData.statu,
          linkman: this.certsData.linkman,
          tell: this.certsData.tell,
          spell: this.certsData.spell,
          stageName: this.certsData.stageName,
          dateBirth: this.certsData.dateBirth,
          jobnumber: this.certsData.jobnumber,
          stopTime: this.stopTime,
          territory: this.certsData.region,//区域
          province: this.province,
          unit:this.certsData.unit,
          grade: this.grands,
          licenceNum: this.cernum,
          state: this.certsData.state,
          videoProducing: this.videoProducing,
          message: this.message,
          certificates: this.cers,
          personalAlbum: this.pics,
          showHome: this.showHome
        }
        PUBLIC.get('User.certificate.applyFor', datas, data =>{
          console.log(data)
          this.$router.push({name: '教师管理', query: {page: this.page}})
        })
      },
      changeProvince: function (e) {
        this.unit = e
      },
      loadConf: function () {
        var _this = this
        PUBLIC.get("Configure.Configure.Selone", {type: "quyuliebiao", key: "quyuliebiao"}, function (data) {
          console.log("区域数据载入完毕")
          console.log(data)
          _this.regionList = data ? JSON.parse(data.value) : []
          // _this.showList()
        })
      },
      // loadBrank:function(){
      //   var _this=this
      //   PUBLIC.get("Configure.Configure.Selfig",{type:"branch"},function(data){
      //     // data=JSON.parse(data.value)
      //     var brankList=[]
      //     var temp
      //     for(var n=0;n<data.length;n++){
      //       temp=JSON.parse(data[n].value)
      //       brankList.push({value:data[n].key,label:temp.name})
      //     }
      //     _this.branchList=brankList
      //     console.log(_this.branchList)
      //   })
      // },
      quit: function () {
        // this.$router.go(-1)
        this.$router.push({name: '教师管理', query: {page: this.page}})
      }
    },
    mounted() {
      var id = this.$route.query.id
      this.page = this.$route.query.page
      this.person = this.$route.query.person
      console.log(this.person)
      this.loadConf()
      // this.loadBrank()
      this.getInfo(id)
    },
    watch: {
      region() {
        var _this = this
        console.log(this.territory)
        PUBLIC.get('Configure.Configure.region', {region: JSON.stringify(_this.region)}, data => {

          var brankList = []
          var temp
          for (var n = 0; n < data.length; n++) {
            temp = JSON.parse(data[n].value)
            brankList.push({value: data[n].key, label: temp.name})
          }
          _this.branchList = brankList
          console.log(_this.branchList)
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .teacherEdit {
    font-size: 14px;
    padding: 45px 140px;
    #upheads, #upcers {
      display: none;
    }
    .leftBox {
      width: 140px;
      float: left;
      .pic {
        img {
          width: 140px;
          height: 140px;
          border: 1px seagreen solid;
        }
        p {
          text-align: center;
          margin-top: 30px;
        }
      }
    }
    .memberInfo {
      padding-left: 230px;
      p {
        text-align: left;
        span {
          display: inline-block;
          span {
            display: inline-block;
          }
          .title {
            width: 100px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText {
            width: 200px;
            .dzzs {
              color: #169BD5;
              margin-left: 30px;
            }
          }
        }
        > span {
          padding-bottom: 55px;
        }
        > span:first-of-type {
          margin-right: 120px;
        }
      }
      .addP {
        > span {
          position: relative;
          width: 100%;
          .title {
            position: absolute;
            top: 0;
            left: 0;
          }
          .pics {
            margin-left: 100px;
            vertical-align: bottom;
            .el-button {
              margin-top: -15px;
            }
            > span {
              position: relative;
              img {
                margin: 0 10px 10px;
                width: 176px;
                height: 100px;
              }
              .icon {
                position: absolute;
                top: -10px;
                right: -14px;
                width: 30px;
                height: 30px;
              }
            }

          }
          .personInfo {
            margin-left: 100px;
            width: 100%;
            .el-textarea {
              width: 60%;
            }
          }
        }
      }
      p:last-of-type {
        width: 80%;
        padding-top: 60px;
        text-align: center;
        .el-button {
          margin: 0 8%;
          width: 100px;
        }
      }
    }

  }

</style>
