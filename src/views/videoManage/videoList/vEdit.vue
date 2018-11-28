<template>
  <div class="info clearfix">
    <div class="leftBox">
      <div class="pic">
        <img v-bind:src="vimg" alt="">
      </div>
      <el-button type="primary" @click="upImg()">替换封面</el-button>
    </div>
    <div class="memberInfo">
      <p><span><span class="title">分类:</span><span class="innerText">
        <el-select v-model="vclass" placeholder="请选择">
          <el-option
            v-for="item in videoClass"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span></span>
        <span><span class="title">剧集:</span><span class="innerText">
          <el-select v-model="vdrama" placeholder="请选择">
            <el-option
              v-for="item in videoRank"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span></span>
      </p>
      <p><span><span class="title">视频标题:</span><span class="innerText"><el-input v-model="vtitle"
                                                                                 placeholder="请输入内容"></el-input></span></span><span><span
        class="title">播放媒资:</span><span class="vmeizi"><el-input v-model="vmeizi" placeholder="请输入内容"></el-input></span></span>
      </p>
      <p><span><span class="title">视频级别:</span><span class="innerText">
        <el-select v-model="vlevel" placeholder="请选择">
            <el-option
              v-for="item in videoLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </span></span><span><span class="title">上架时间:</span><span class="innerText">
        <!-- <el-input v-model="up_time" placeholder="请输入内容"></el-input> -->
        <el-date-picker
          v-model='up_time'
          type='date'
          placeholder='选择日期'>
            </el-date-picker>
        </span></span>
      </p>
      <p><span><span class="title">视频标签:</span><span class="innerText">
        <el-select v-model="vtags" multiple placeholder="请选择">
          <el-option
            v-for="item in videoTag"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </span></span>
      </p>
      <p>
        <span><span class="title">视频版权:</span><span class="innerText">
          <el-select v-model="copyright" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span></span>
      </p>
      <!--<p>-->
      <!--<span><span class='title'>创作老师:</span><span class='innerText'>-->
      <!--<el-select v-model='createTeacher' multiple placeholder='请选择'>-->
      <!--<el-option-->
      <!--v-for='item in teacherLists'-->
      <!--:key='item.value'-->
      <!--:label='item.label'-->
      <!--:value='item.value'>-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</span></span>-->
      <!--<span><span class="title">示范老师:</span>-->
      <!--<span class="innerText">-->
      <!--&lt;!&ndash; <el-input v-model="showTeacher"></el-input> &ndash;&gt;-->
      <!--<el-select v-model="showTeacher" multiple placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in teacherLists"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</span></span>-->
      <!--</p>-->
      <p>
        <span><span class='title'>创作老师:</span><span class='innerText'>
          <el-input @blur.prevent="checkCTeacher(createTeacher)" v-model="createTeacher"></el-input><span class="warning" v-if="showCWrong.length >0">未检索到{{showCWrong}}老师</span><span class="tishi" v-else>请输入创作教师名字,多个名字请以中文逗号隔开</span>
        </span></span>
        <span><span class="title">示范老师:</span><span class="innerText">
          <el-input @blur.prevent="checkSTeacher(showTeacher)" v-model="showTeacher"></el-input><span class="warning" v-if="showSWrong.length >0">未检索到{{showSWrong}}老师</span><span class="tishi" v-else>请输入示范教师名字,多个名字请以中文逗号隔开</span>
        </span></span>
      </p>
      <p>
        <span><span class="title">视频简介:</span><span class="innerText"><el-button type="primary"
                                                                                 @click="autoDesc">自动生成</el-button></span></span>
        <span class="bigInput">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="vinfo">
          </el-input>
        </span>
      </p>


      <p class='isUp '><span class='title'>降级时间:</span><span class='innerText'><span><el-checkbox
        v-model='downGroupStatus[10][0]' label='10' :disabled="downGroupStatus[10][2]==false">机构视频</el-checkbox>
        <!-- <el-input placeholder='请输入内容'></el-input> -->
      <el-date-picker
        v-model='downGroupStatus[10][1]'
        type='date'
        placeholder='选择日期' :disabled="downGroupStatus[10][0]==false">
            </el-date-picker>
        <!-- {{downGroupStatus[10][1]}} -->
        </span><span><el-checkbox v-model='downGroupStatus[9][0]' label='9' :disabled="downGroupStatus[9][2]==false">VIP视频</el-checkbox>
        <!-- <el-input v-model='input' placeholder='请输入内容'></el-input> -->
        <el-date-picker
          v-model='downGroupStatus[9][1]'
          type='date'
          placeholder='选择日期' :disabled="downGroupStatus[9][0]==false">
            </el-date-picker>
        </span><span><el-checkbox v-model='downGroupStatus[8][0]' label='8' :disabled="downGroupStatus[8][2]==false">普通视频</el-checkbox>
        <!-- <el-input v-model='input' placeholder='请输入内容'></el-input> -->
        <el-date-picker
          v-model='downGroupStatus[8][1]'
          type='date'
          placeholder='选择日期' :disabled="downGroupStatus[8][0]==false">
            </el-date-picker>
        </span></span></p>
      <p class='oneDemand'><span class='title'>单次点播:</span><span class='innerText'><span><el-radio v-model='oneShot'
                                                                                                   label='1'>支持</el-radio><el-radio
        v-model='oneShot' label='-1'>不支持</el-radio>
        <el-input v-if="oneShot==1" v-model="onePrice" placeholder='请输入内容'></el-input><span
          v-if="oneShot==1">元/人次</span></span></span></p>
      <p class='freeDown'><span class='title'>免费下载:</span><span class='innerText'><span><el-radio v-model='freeDown'
                                                                                                  label='1'>提供</el-radio><el-radio
        v-model='freeDown' label='-1'>不提供</el-radio>
        <el-select v-model='freeDownList' multiple placeholder='请选择' v-if="freeDown==1">
          <el-option
            v-for='item in userGroup'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
      </span></span></p>
      <p class='upFile'><span class='title'>视频链接:</span>{{vfile}}<span><el-button type='primary' @click='upFile()'>上传文件</el-button></span></p>
      <el-input type='file' id='upimgs' v-on:change='upImgs' hidden></el-input>
      <el-input type='file' id='upFile' v-on:change='upFiles' hidden></el-input>
      <p>
        <el-button type='success' @click='save'>保存</el-button>
        <el-button type='info' @click='quit'>取消</el-button>
      </p>

      <!-- <p class="isUp " ><span class="title">是否上架:</span><span class="innerText"><span><el-radio v-model="up" label="1">合作视频</el-radio><el-input placeholder="请输入内容"></el-input></span><span><el-radio v-model="up" label="2">VIP视频</el-radio><el-input v-model="input" placeholder="请输入内容"></el-input></span><span><el-radio v-model="up" label="3">普通视频</el-radio><el-input v-model="input" placeholder="请输入内容"></el-input></span></span></p>
      <p class="oneDemand" ><span class="title">单次点播:</span><span class="innerText"><span><el-radio v-model="up" label="1">支持</el-radio><el-radio v-model="up" label="2">不支持</el-radio><el-input placeholder="请输入内容"></el-input></span></span></p>
      <p class="freeDown" ><span class="title">免费下载:</span><span class="innerText"><span><el-radio v-model="up" label="3">提供</el-radio><el-radio v-model="up" label="2">不提供</el-radio>
        <el-select v-model="value5" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span></span></p>-->
      <!-- <p><el-button type='success' @click='save'>保存</el-button><el-button type='info' @
     <p><el-button type="success" @click="save">保存</el-button><el-button type="info" @click="quit">取消</el-button></p> -->
    </div>
  </div>
</template>

<script>
  import {selectKuang} from '../../../components/index'

  export default {
    name: 'addMember',
    components: {
      selectKuang
    },
    data() {
      return {
        showCWrong: [],
        showSWrong: [],
        wrongTeacher: '',
        radio: '1',
        vfile: '',
        up: '1',
        input: "",
        options: [{
          value: '育视界',
          label: '育视界'
        }],
        userGroup: [
          {
            label: "vip会员",
            value: "318"
          },
          {
            label: "机构会员",
            value: "317"
          },
          {
            label: "特权会员",
            value: "316"
          },
        ],
        downGroupStatus: {
          "8": [false, "", false],
          "9": [false, "", false],
          "10": [false, "", false],
          "11": [false, "", false],
        },
        tags: '',
        showTeacher: "",
        showTeacheruid: '',
        createTeacher: "",
        createTeacheruid: [],
        userStatus: [],
        multipleSelection: [],
        videoLevel: [],
        videoClass: [],
        videoTag: [],
        videoDrama: [],
        videoRank: [],
        teacherLists: [],
        vimg: "",
        vclass: "",
        vclassId: '',
        vtags: "",
        vlevel: "",
        vdrama: "",
        up_time: "",
        vtitle: "",
        vinfo: "",
        value5: "",
        vmeizi: "",
        oneShot: "-1",
        freeDown: "-1",
        copyright: "",
        freeDownList:[],
        page: 0
      }
    },
    created() {
      // this.page = this.$route.params.page
      console.log(this)
    },
    methods: {
      //检查是否有相对应的老师
      checkCTeacher(a) {
        if(a == '') {
          this.createTeacheruid = ''
        }
        let ct = a.split("，")
        console.log(ct)
        console.log(this.teacherLists)
        let wrong =JSON.parse(JSON.stringify(ct))
        let right = []
        let wrongList=[]
        console.log(wrong)
        console.log(this.teacherDict)
        for(var n=0;n<wrong.length;n++){
          if(wrong[n]==undefined || wrong[n]==null || wrong[n]==""){
            continue
          }

          if(this.teacherDict[wrong[n]]==undefined){
            wrongList.push(wrong[n])
          }else{
            right.push(this.teacherDict[wrong[n]][0])
          }
        }

          this.showCWrong = wrongList
          this.createTeacheruid = right
          console.log(this.createTeacheruid)
      },
      checkSTeacher(a) {
        if(a == '') {
          this.showTeacheruid = ''
        }
        let ct = a.split("，")
        console.log(ct)
        console.log(this.teacherLists)
        let wrong =JSON.parse(JSON.stringify(ct))
        let right = []
        let wrongList=[]
        console.log(wrong)
        console.log(this.teacherDict)
        for(var n=0;n<wrong.length;n++){
          if(wrong[n]==undefined || wrong[n]==null || wrong[n]==""){
            continue
          }
          if(this.teacherDict[wrong[n]]==undefined){
            wrongList.push(wrong[n])
          }else{
            right.push(this.teacherDict[wrong[n]][0])
          }
        }
          this.showSWrong = wrongList
          this.showTeacheruid = right
      },
      autoDesc() {
        console.log(this.videoTag)

        this.vinfo = '欢迎加入育视界幼儿律动视频点播平台，' +
          this.vtitle + '是专门针对 '
          // for(var n=0;n<this.vtags.length;n++){
            this.vinfo +=this.vtags
          // }
          // this.vinfo=this.vinfo.substring(0,this.vinfo.length-1)
           this.vinfo+= ' 制作的参考视频，如果您喜欢的话，请收藏视频或者为我们点赞哦~'
      },
      quit() {
        this.$router.push({name:'视频列表',query: { page: this.page }})
        console.log(this.page)
      },
      save: function () {
        if (this.showCWrong.length > 0 || this.showSWrong.length > 0) {
          this.$alert('创作老师或示范老师输入有误，请重新输入', '错误', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'warning',
                message: `action: ${ action }`
              });
            }
          });
          return
        }
        var _this = this
        // var ta=this.vtags.split(",")
        // ta=JSON.stringify(ta)
        // console.log(ta)
        var ta = JSON.stringify(this.vtags)
        var desc = {
          'showTeacher': this.showTeacheruid,
          'createTeacher': this.createTeacheruid,
          "copyright": this.copyright,
          "freeDownList": this.freeDownList,
          "oneMoney": this.onePrice,
          "oneStatus": this.oneShot
        }
        console.log(desc)
        var data = {
          id: this.vid,
          title: this.vtitle,
          img: this.vimg,
          info: this.vinfo,
          url: this.vmeizi,
          videofile: this.vfile,
          url_type: 'baidu',
          level: this.vlevel,
          drama_id: this.vdrama,
          // tags: '['+this.vtags+']',
          tags:JSON.stringify(this.vtags),
          // up_time:this.vonTime,
          on_status: -1,
          con_status:this.oneShot,
          money:this.onePrice,
          desc: JSON.stringify(desc),

        }
        PUBLIC.get("Video.drama.upvideo", data, (data) => {
          console.log(data)
          var actNum = 0
          if (_this.up_time != _this.oldUpTime) {
            PUBLIC.get("Video.drama.demotion", {
              select: JSON.stringify({
                level: _this.vlevel,
                time: _this.up_time,
                res_id: _this.vid,
                on_status: 1,
                type: "1"
              }), type: "update"
            }, function (data1) {
              console.log(data1)
            })
          }

          for (var k in _this.downGroupStatus) {
            actNum += 1
            if (_this.downGroupStatus[k][0] == true) {
              var demstatus = 1
            } else {
              var demstatus = -1
            }
            PUBLIC.get("Video.drama.demotion", {
              select: JSON.stringify({
                level: k,
                time: _this.downGroupStatus[k][1],
                res_id: _this.vid,
                on_status: demstatus,
                type: "-1"
              }), type: "update"
            }, function (data1) {
              console.log(data1)
              actNum -= 1
              if (actNum == 0) {
                // _this.$router.go(-1)
                // _this.$router.push({ name: '视频列表',})
                _this.freeDownAct(_this.vid)
              }

            })

          }
          this.$router.push({name:'视频列表',query: { page: this.page }})
        })
      },
      upImg(tab) {
        this.upFileFor = tab
        document.getElementById('upimgs').click();
      },
      upImgs() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function (url) {
          console.log(url)
          _this.vimg = url
        })
      },
      upFile(tab) {
        this.upFileFor = tab
        document.getElementById('upFile').click();
        console.log(this.vfile)
      },
      upFiles() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upFile', function(url) {
          console.log(url)
          _this.vfile = url

          console.log(_this.vfile)
        })
      },
      getVideoInfo(id) {
        var _this = this
        _this.vid = id
        var relData
        PUBLIC.get("User.certificate.certificateList", {videoProducing: 1,pay_statu:1}, (data) => {
          var demo = {
            value: "uid",
            label: "stageName"
          }
          relData = PUBLIC.formatObj(demo, data)
          _this.teacherLists = relData
          _this.teacherDict={}
          for(var n=0;n<relData.length;n++){
            _this.teacherDict[relData[n]["label"]]=_this.teacherDict[relData[n]["label"]]==undefined?[relData[n]["value"]]:_this.teacherDict[relData[n]["label"]].push(relData[n]["value"])
          }
          console.log(_this.teacherDict)
        })
        PUBLIC.get("Video.drama.video", {id: id}, (data) => {
          console.log(data)
          // data=data.video
          console.log(data.tag)
          var ta = ""
          for (var i in data.tag) {
            console.log(i)
            ta += data.tag[i] + ","
          }
          if (ta != "") {
            ta = ta.substring(0, ta.length - 1)
          }
          console.log(ta)
          // this.up_time = data.up_time
          _this.vtitle = data.title
          _this.auth = data.author
          _this.vinfo = data.info
          _this.desc = data.desc
          _this.vlevel = data.level
          _this.vfile = data.videofile
          if(data.tag == ''){
            _this.vtags = []
          }else{
            _this.vtags = data.tag
            console.log(_this.vtags)
          }
          _this.vimg = data.img
          _this.vdrama = data.drama_id
          _this.oldVdrama = data.drama_id
          _this.vmeizi = data.url
          _this.url_type = data.url_type
          var desc = JSON.parse(data.desc ? data.desc : "{}")
          console.log(desc)
          _this.createTeacheruid = desc["createTeacher"]
          _this.showTeacheruid = desc["showTeacher"]
          _this.copyright = desc["copyright"]
          _this.oneShot = desc["oneStatus"]
          _this.onePrice = desc["oneMoney"]
          _this.freeDownList = desc["freeDownList"]?desc["freeDownList"]:[]
          _this.on_status = data.on_status
          console.log(_this.freeDownList)
          if (_this.freeDownList != undefined) {
            if (_this.freeDownList.length > 0) {
              _this.freeDown = 1
            }
          }
          console.log(_this.createTeacheruid)

          for (var i = 0; i < relData.length; i++) {
            if (this.createTeacheruid != undefined) {
              for (var n = 0; n < _this.createTeacheruid.length; n++) {
                if (_this.createTeacheruid[n] == relData[i].value) {
                  _this.createTeacher+=relData[i].label+"，"
                  console.log(_this.createTeacher)
                }
              }
            }
            if (this.showTeacheruid != undefined) {
              for (var n = 0; n < _this.showTeacheruid.length; n++) {
                if (_this.showTeacheruid[n] == relData[i].value) {
                  _this.showTeacher+=relData[i].label+"，"
                  console.log(_this.showTeacher)
                }
              }
            }
          }


          PUBLIC.get('Video.drama.drama', {id: '{ "id": ' + data.drama_id + ' }'}, data1 => {
            _this.oldClassId = data1[0].class_id
            PUBLIC.get('Video.drama.classlist', data2 => {
              for (var i in data2) {
                if (data1[0].class_id == data2[i].id) {
                  this.vclassId = data2[i].id
                  // this.vclass = data2[i].class
                  this.vclass = data2[i].id
                  console.log(this.vclass)
                }
              }
            })
          })
          PUBLIC.get('Configure.Configure.Selfig', {type: 'videoTag'}, data => {
            console.log(data)
            for (var i in data) {
              this.videoLevel.push(data[i].key)
            }
          })
        })
      },
      // loadTeacherList: function () {
      //   var _this = this
      //   PUBLIC.get("User.certificate.certificateList", {videoProducing: 1}, function (data) {
      //     var demo = {
      //       value: "uid",
      //       label: "stageName"
      //     }
      //     var relData = PUBLIC.formatObj(demo, data)
      //     _this.teacherLists = relData
      //   })
      // },
      loadDownStatus: function (id) {
        var _this = this
        PUBLIC.get("Video.drama.demotion", {select: JSON.stringify({res_id: id}), type: "select"}, function (data) {
          console.log(data)
          for (var n = 0; n < data.length; n++) {
            if (data[n].type == "-1") {
              _this.downGroupStatus[data[n].level][1] = data[n].time
              _this.downGroupStatus[data[n].level][0] = data[n].on_status == 1 ? true : false
            } else {
              _this.up_time = data[n].time
              _this.oldUpTime = data[n].time
            }

          }
          console.log(_this.downGroupStatus)
          _this.downGroupStatus = JSON.parse(JSON.stringify(_this.downGroupStatus))
        })
      },
      freeDownAct(id) {
        console.log("开始进行免费下载逻辑")
        var num = this.freeDownList.length
        console.log(this.freeDownList)
        var _this = this
        for (var n = 316; n < 319; n++) {
          if (this.freeDownList.indexOf(n.toString()) > -1) {
            var value = 1
          } else {
            var value = 0
          }
          PUBLIC.get("Auth.Resource.Set", {
            fid: n,
            ftype: "team",
            res_id: id,
            res_type: "video",
            server: "down",
            on_status: 1,
            statu: 1,
            value: value
          }, function (data) {
            console.log(data)
            num -= 1
            if (num == 0) {
              // _this.$router.go(-1)
              _this.$router.push({name: '视频列表',})
            }
          })
        }

      },
    },
    watch: {
      vclass: function () {
        var _this = this
        PUBLIC.get('Video.drama.showdrama', {class_id: _this.vclass}, function (data) {
          var demo = {
            value: 'id',
            label: 'title'
          }
          data = PUBLIC.formatObj(demo, data)
          _this.videoRank = data
          if (_this.vclass == _this.oldClassId) {

            _this.vdrama == _this.oldVdrama
            return
          } else {
            _this.vdrama = ""
          }
        })
      },
      vtags() {
        console.log(this.vtags)
      },
      createTeacher() {
        console.log(this.createTeacher)
      },
      vlevel() {
        var _this = this
        var level = this.vlevel
        console.log(level)
        for (var k in this.downGroupStatus) {
          if (parseInt(k) >= parseInt(level)) {
            this.downGroupStatus[k][0] = false
            this.downGroupStatus[k][2] = false
          } else {
            // this.downGroupStatus[k][0]=false
            this.downGroupStatus[k][2] = true
          }
        }
        console.log(this.downGroupStatus)
        this.downGroupStatus = JSON.parse(JSON.stringify(this.downGroupStatus))
      }
    },
    mounted() {
      DATAC.setConf(this)
      var ha = this.$route.params.id
      this.page = this.$route.params.page
      // this.loadTeacherList()
      // var _this = this
      this.getVideoInfo(ha)
      this.loadDownStatus(ha)
      this.checkCTeacher(this.createTeacher)
      this.checkSTeacher(this.showTeacher)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .info {
    padding: 70px 50px;
    .leftBox {
      width: 300px;
      float: left;
      .pic {
        img {
          width: 300px;
          height: 170px;
          border: 1px seagreen solid;
        }
      }
    }
    .memberInfo {
      font-size: 14px;
      padding-left: 400px;
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
            position: relative;
            .warning {
              position: absolute;
              width: 200px;
              left: 10px;
              bottom: -18px;
              font-size: 14px;
              color: red;
            }
            .tishi {
              position: absolute;
              width: 300px;
              left: 0px;
              bottom: -18px;
              font-size: 14px;
            }
          }
        }
        > span {
          padding-bottom: 40px;
        }
        > span:first-of-type {
          margin-right: 70px;
        }
        .bigInput {
          display: block;
          margin-left: 100px;
          margin-top: -40px;
          width: 575px;
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
      p:last-of-type {
        width: 80%;

        .el-button {
          margin: 0 8%;
          width: 100px;
        }
      }
      .intro, .oneDemand, .freeDown, .isUp {
        line-height: 18px;
        padding-bottom: 40px;
        .introduce, .title {
          width: 100px;
          text-align: right;
          padding-right: 10px;
          margin-right: 0;
          padding-bottom: 0;
        }
        .text {
          padding-bottom: 0;
          margin-left: 100px;
          margin-top: -20px;
        }
      }
      .oneDemand, .freeDown, .isUp {
        .innerText {
          padding-bottom: 0;
          margin-top: -27px;
          margin-left: 100px;
          display: block;
          > span {
            margin-right: 10%;
            margin-bottom: 20px;
            .el-radio {
              width: 100px;
            }
            .el-input {
              width: 200px;
            }
          }
          .downFile {
            color: #409EFF;
          }
        }
      }
      .upFile {
        width: 80%;
        margin-left: 30px;
        .el-button {
          margin-left: 60px;
        }
      }
    }
    #upFile{
      display: none;
    }

  }

</style>
