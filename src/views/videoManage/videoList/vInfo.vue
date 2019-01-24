<template>
  <div class="info clearfix">
    <div class="leftBox">
      <div class="pic">
        <img :src="vinfo.img" alt="">
      </div>
    </div>
    <div class="memberInfo">
      <p><span><span class="title">视频ID:</span><span class="innerText">{{vinfo.id}}</span></span><span><span
        class="title">级别:</span><span class="innerText">{{videoLevelList[vinfo.level] }}</span></span></p>
      <p><span><span class="title">分类:</span><span class="innerText">{{classname}}</span></span><span><span
        class="title">剧集:</span><span class="innerText">{{drama_name}}</span></span></p>
      <p><span><span class="title">视频标题:</span><span class="innerText">{{vinfo.title}}</span></span><span><span
        class="title">是否上架:</span><span class="innerText">
        <el-radio v-model="vinfo.on_status" label="1">是</el-radio>
        <el-radio v-model="vinfo.on_status" label="2">否</el-radio>
      </span></span></p>
      <p><span><span class="title">创作老师:</span><span class="innerText">{{createTeacher}}</span></span><span><span
        class="title">示范老师:</span><span class="innerText">{{showTeacher}}</span></span></p>
      <p><span><span class="title">视频版权:</span><span class="innerText">{{copyright}}</span></span>
        <!-- <span><span class="title">剧集:</span><span class="innerText">{{vinfo.drama_id}}</span></span> -->
      </p>
      <p class="intro"><span class="introduce">视频简介:</span><span class="text">{{vinfo.info}}</span></p>
      <p class="isUp "><span class="title">降级时间:</span><span class="innerText">
        <span v-if="downGroupStatus['10'][0]"><el-radio v-model="vinfo.url_type" label="2">合作视频</el-radio>{{downGroupStatus['10'][1]}}</span>
        <span v-if="downGroupStatus['9'][0]"><el-radio v-model="up" label="1">VIP视频</el-radio>{{downGroupStatus['9'][1]}}</span>
        <span v-if="downGroupStatus['8'][0]"><el-radio v-model="up" label="0">普通视频</el-radio>{{downGroupStatus['8'][1]}}</span>
        </span></p>
      <!--<p class="oneDemand" ><span class="title">单次点播:</span><span class="innerText"><span><el-radio v-model="up" disabled label="1">支持</el-radio>0.5元/人次</span></span></p>-->
      <!--<p class="freeDown" ><span class="title">免费下载:</span><span class="innerText"><span><el-radio v-model="up" label="3">提供</el-radio>合作会员</span><span class="downFile">下载文件</span></span></p>-->

      <p class='upFile'><span class='title'>视频链接:</span>{{vfile}}</p>
      <p>
        <el-button type="success" @click="toEdit">编辑</el-button>
        <el-button type="info" @click="quit">取消</el-button>
      </p>
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
        radio: '1',
        up: '1',
        multipleSelection: [],
        videoLevelList: {
          "8": "免费视频",
          "9": "VIP视频",
          "10": "机构视频",
          "11": "特权视频",
        },
        downGroupStatus: {
          "8": [false, ""],
          "9": [false, ""],
          "10": [false, ""],
          "11": [false, ""]
        },
        vinfo: {},
        classname: '',
        createTeacheruid: '',
        page: 0,
        showTeacheruid: '',
        createTeacher: '',
        showTeacher: '',
        copyright: "",
        videoDramaList: {}
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
      quit() {
        this.$router.push({name:'视频列表',query: { page: this.page }})
      },
      getDramaList() {
        var _this = this

      },
      getVideoInfo(vid) {
        var _this = this
        PUBLIC.get("User.certificate.certificateList", {videoProducing: 1,pay_statu:1}, (data) => {
          var demo = {
            value: "uid",
            label: "stageName"
          }
          var relData = PUBLIC.formatObj(demo, data)
          _this.teacherLists = relData
          PUBLIC.get("Video.drama.video", {id: vid}, data => {
            console.log(data)
            this.vinfo = data

            this.vfile = data.videofile
            var args = {}
            let teacher = JSON.parse(this.vinfo.desc ? this.vinfo.desc : "{}")
            // var tmp=JSON.parse()

            this.createTeacheruid = teacher.createTeacher
            this.showTeacheruid = teacher.showTeacher
            for (var i = 0; i < relData.length; i++) {
              if (this.createTeacheruid != undefined) {
                for (var n = 0; n < _this.createTeacheruid.length; n++) {
                  if (_this.createTeacheruid[n] == relData[i].value) {
                    _this.createTeacher = _this.createTeacher + ' ' + relData[i].label
                    console.log(_this.createTeacher)
                  }
                }
              }
              if (this.showTeacheruid != undefined) {
                for (var n = 0; n < _this.showTeacheruid.length; n++) {
                  if (_this.showTeacheruid[n] == relData[i].value) {
                    _this.showTeacher = _this.showTeacher + ' ' + relData[i].label
                    console.log(_this.showTeacher)
                  }
                }
              }
            }
            this.copyright = teacher.copyright
            args['id'] = data.drama_id
            console.log(teacher)
            PUBLIC.get("Video.drama.drama", {id: JSON.stringify(args)}, data => {
              let classId = data[0].class_id
              this.drama_name = data[0].title
              for (var i = 0; i < this.videoClass.length; i++) {
                if (this.videoClass[i].value === classId) {
                  this.classname = this.videoClass[i].label
                  console.log(this.classname)
                }
              }
              // this.videoClass
            })
          })
        })
      },
      loadDownStatus: function (id) {
        var _this = this
        PUBLIC.get("Video.drama.demotion", {select: JSON.stringify({res_id: id}), type: "select"}, function (data) {
          console.log(data)
          for (var n = 0; n < data.length; n++) {
            console.log(data[n].level)
            _this.downGroupStatus[data[n].level][0] = true
            _this.downGroupStatus[data[n].level][1] = data[n].time
          }
          console.log(_this.downGroupStatus)
          _this.downGroupStatus = JSON.parse(JSON.stringify(_this.downGroupStatus))
        })
      },
      toEdit() {
        this.$router.push({name: '视频编辑', params: {id: this.vid}})
      }
      // saveIt() {
      //   PUBLIC.get("Video.drama.upvideo", this.vinfo, (data) => {
      //     console.log(data)
      //   })
      // }
    },
    mounted() {
      let vid = this.$route.params.id
      this.page = this.$route.params.page
      this.vid = vid
      DATAC.setConf(this)
      this.getVideoInfo(vid)
      this.loadDownStatus(vid)
      this.getDramaList()
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
          }
        }
        > span {
          padding-bottom: 46px;
        }
        > span:first-of-type {
          margin-right: 70px;
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
        padding-top: 100px;
        text-align: center;
        .el-button {
          margin: 0 8%;
          width: 100px;
        }
      }
      .intro, .oneDemand, .freeDown, .isUp {
        line-height: 18px;
        padding-bottom: 46px;
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
          margin-top: -20px;
          margin-left: 100px;
          display: block;
          span {
            margin-right: 10%;
            .el-radio {
              width: 100px;
            }
          }
          .downFile {
            color: #409EFF;
          }
        }
      }

    }

  }

</style>
