<template>
  <div class="teacherEdit clearfix">
    <div class="leftBox">
      <div class="pic">
        <img :src="uimg" alt="">
        <p><el-button type="primary" @click="upHead()">上传图片</el-button></p><el-input type='file' id='upheads' v-on:change='upHeads' hidden></el-input>
      </div>
    </div>
    <div class="memberInfo">
      <p><span><span class="title">实名拼音:</span><span class="innerText"><el-input v-model="spell" placeholder="请输入内容" ></el-input></span></span>
        <span><span class="title">证书截止日期:</span>
          <span class="innerText">
            <el-date-picker
              v-model="stopTime"
              type="date"
              placeholder="选择日期">
    </el-date-picker>
          </span></span></p>
      <p><span><span class="title">uid:</span><span class="innerText"><el-input v-model="uid" placeholder="请输入内容" ></el-input></span></span><span><span class="title">艺名:</span><span class="innerText"><el-input v-model="stageName" placeholder="请输入内容"></el-input></span></span></p>
      <p><span><span class="title">出生日期:</span>
        <span class="innerText">
          <el-date-picker
            v-model="birth"
            type="date"
            placeholder="选择日期">
    </el-date-picker>
        </span>
      </span><span><span class="title">工号:</span><span class="innerText"><el-input v-model="worknum" placeholder="请输入内容"></el-input></span></span></p>
      <p>
        <span><span class="title">区域:</span>
          <span class="innerText">
            <div class="block">
              <span class="demonstration"></span>
              <el-cascader
                :options="region"
                v-model="selectedOptions">
              </el-cascader>
            </div>
          </span>
        </span><span><span class="title">分会:</span><span class="innerText"><selectKuang :value0="province" @value="selProvince" :selectData="branchList"></selectKuang></span></span>
      </p>
      <p><span><span class="title">职称等级:</span><span class="innerText"><selectKuang @value="setGrand" :selectData="grand" :value0="grands"></selectKuang></span></span><span><span class="title">证书编号:</span><span class="innerText"><el-input v-model="cernum" placeholder="请输入内容"></el-input></span></span></p>
      <p><span><span class="title">状态:</span><span class="innerText"><selectKuang @value="setStatu" :selectData="status" :value0="user_status"></selectKuang></span></span><span><span class="title">视频制作:</span><span class="innerText"><selectKuang @value="setVP" :selectData="videoP" :value0="videoProducing"></selectKuang></span></span></p>
      <p>
        <span><span class="title">申请时间:</span>
        <span class="innerText">
          <el-date-picker
            v-model="entryTime"
            type="date"
            placeholder="选择日期">
    </el-date-picker>
        </span>
      </span>
      </p>
      <p class="addP"><span><span class="title">个人简介:</span><span class="personInfo"><el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="message">
</el-input></span></span></p>
      <p class="addP"><span><span class="title">其他证书:</span><span class="pics" v-html="otherCer"></span><span class="addP" v-html="addcer"></span><span><el-button type="primary" @click="upCer()">添加照片</el-button></span></span><el-input type='file' id='upcers' v-on:change='upFileCer' hidden></el-input></p>
      <p class="addP"><span><span class="title">个人相册:</span><span class="pics" v-html="morepic"></span><span class="addP" v-html="addPic"></span><span><el-button type="primary" @click="upImg()">添加照片</el-button></span></span><el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input></p>
      <p><span><span class="title">kkip首页:</span><span class="innerText"><el-radio v-model="kkip" label="1">是</el-radio><el-radio v-model="kkip" label="2" >否</el-radio></span></span></p>
      <p><el-button type="primary" @click="addTeacher">保存</el-button><el-button type="info">取消</el-button></p>
    </div>
  </div>
</template>

<script>
import { selectKuang } from '../../../components/index'

export default {
  name: 'teacherEdit',
  components: {
    selectKuang
  },
  data() {
    return {
      region:[],
      entryTime: '',
      grand: [
        {
          value: '1',
          label: '一级'
        },
        {
          value: '2',
          label: '二级'
        },
        {
          value: '3',
          label: '三级'
        }
      ],
      status: [
        {
          value: '1',
          label: '有效'
        },
        {
          value: '-1',
          label: '无效'
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
      branchList:[],
      uimg: '', //头像
      cers: [],            //证书
      addcer: '',
      otherCer: '',
      pics: [], //个人相册
      morepic: '',
      grands: '',
      user_status: '',
      videoProducing: '',
      kkip: '1',
      birth: '',
      addPic: '',
      message: '',
      cernum: '',
      worknum: '',
      stageName: '',
      uid: '',
      province: " ",
      stopTime: " ",
      selectedOptions: ''
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // getInfo() {
    //   console.log('dadada')
    //   PUBLIC.get('User.User.Userone',{ uid: this.uid}, data =>{
    //     console.log(data)
    //   })
    // },
    upHead(tab) {
      this.upFileFor = tab
      document.getElementById('upheads').click();
    },
    upHeads() {
      var _this = this
      var tab = this.upFileFor
      console.log('触发上传')
      PUBLIC.postFile('upheads', function(url) {
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
        let htmls = '<span class="picBox"><img src = "' + url + '" alt=""></span>'
        _this.otherCer = _this.otherCer + htmls
        console.log(_this.otherCer)
      })
    },
    upImg(tab) {
      this.upFileFor = tab
      document.getElementById('upimgs').click()
    },
    upFile() {
      var _this = this
      var tab = this.upFileFor
      console.log('触发上传')
      PUBLIC.postFile('upimgs', function(url) {
        console.log(url)
        _this.pics.push(url)
        console.log(_this.pics)
        let htmls = '<span class="picBox"><img src = "' + url + '" alt=""></span>'
        _this.morepic = _this.morepic + htmls
        console.log(_this.morepic)
      })
    },
    addTeacher() {
      let years = this.entryTime.getFullYear()
      let months = this.entryTime.getMonth()+1    //js从0开始取
      let date1s = this.entryTime.getDate()
      let stopTime = years+ "-" +months+ "-" +date1s


      //entryTime
      let year = this.entryTime.getFullYear()
      let month = this.entryTime.getMonth()+1    //js从0开始取
      let date1 = this.entryTime.getDate()
      let endTime = year+ "-" +month+ "-" +date1
      let datas = {
        identityUrl: this.uimg,
        uid: this.uid,
        stageName: this.stageName,
        dateBirth: this.birth,
        jobnumber: this.worknum,
        territory: this.selectedOptions,
        province: this.province,
        grade: this.grands,
        cernum: this.cernum,
        state: this.user_status,
        videoProducing: this.videoProducing,
        message: this.message,
        certificates: this.cers,
        personalAlbum: this.pics,
        linkman: '',
        tell: '',
        spell: this.spell,
        unit: this.province,
        stopTime: stopTime,
        entryTime: endTime
      }
      PUBLIC.get('User.certificate.applyFor', datas, data =>{
        console.log(data)
        this.$router.go(-1)
      })
    },
    loadConf:function(){
        var _this=this
        PUBLIC.get("Configure.Configure.Selone",{type:"quyuliebiao",key:"quyuliebiao"},function(data){
          console.log("区域数据载入完毕")
          console.log(data)
          _this.region=data?JSON.parse(data.value):[]
          // _this.showList()
        })
      },
    loadBrank:function(){
      var _this=this
      PUBLIC.get("Configure.Configure.Selfig",{type:"branch"},function(data){
        // data=JSON.parse(data.value)
        var brankList=[]
        var temp
        for(var n=0;n<data.length;n++){
          temp=JSON.parse(data[n].value)
          brankList.push({value:data[n].key,label:temp.name})
        }
        _this.branchList=brankList
      })
    },
    selProvince:function(da){
      this.province=da
    }
  },
  mounted() {
    this.loadConf()
    this.loadBrank()
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .teacherEdit{
    font-size: 14px;
    padding: 45px 140px;
    #upheads,#upcers{
      display: none;
    }
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
            .dzzs{
              color: #169BD5;
              margin-left: 30px;
            }
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 120px;
        }
      }
      .addP{
        >span{
          position: relative;
          width: 100%;
          .title{
            position: absolute;
            top: 0;
            left: 0;
          }
          .pics{
            margin-left: 100px;
            vertical-align: bottom;
            .el-button{
              margin-top: -15px;
            }
            >span{
              img{
                margin: 0 10px 10px;
                width: 176px;
                height: 100px;
              }
            }

          }
          .personInfo{
            margin-left: 100px;
            width: 100%;
            .el-textarea{
              width: 60%;
            }
          }
        }
      }
      p:last-of-type {
        width: 80%;
        padding-top: 60px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }

  }

</style>
