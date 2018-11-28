<template>
  <div class="activityInfo">
    <div class="memberInfo">
      <p><span><span class="title">活动ID:</span><span class="innerText"></span></span></p>
      <p>
        <span><span class="title">活动标题:</span>
        <span class="innerText">
          <el-input v-model="newTitle" placeholder="请输入内容"></el-input>
        </span></span>
        <span>
          <span class="title">活动类型:</span>
          <span class="innerText">
            <selectKuang :selectData="type" @value="actType"></selectKuang>
          </span>
        </span>
      </p>
      <p class="poster"><span class="mr0"><span class="title">活动海报:</span> <img :src="changeImg" alt=""><span
        class="imgBtn"><el-button type="primary" @click="upImg('changeImg')">替换图片</el-button>
      </span></span></p>
      <el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input>
      <p><span class="mr0"><span class="title">活动说明:</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </span></p>
      <p><span class="mr0"><span class="title">活动组别:</span>
        <span class="aGroups"
              v-for="( v, i ) in gList "
              :key="i"
        >
          <el-row>
            <el-col :span="4"><el-input v-model="gList[i].group" placeholder="组别"></el-input></el-col>
            <el-col :span="9">
              <span>
                <el-date-picker
                  v-model="gList[i]"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <!--<el-input v-model="gList[i].sTime" placeholder="开始时间"></el-input>至<el-input v-model="gList[i].eTime" placeholder="结束时间"></el-input>-->
              </span>
            </el-col>
            <el-col :span="3"><el-input v-model="gList[i].price" placeholder="价格"></el-input></el-col>
            <el-col :span="8" >
              <span class="stopTime">报名截止：</span>
              <!--<el-input v-model="gList[i].rndTime" placeholder="价格"></el-input>-->
              <el-date-picker
                v-model="gList[i].rndTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-row>

      <span><span class="title">报名表:</span><span class="innerText">{{gList[i].reg_file}}<button
        @click="openFile(gList[i])">上传文件</button></span></span>
        </span>
        <span><el-button class="addBtn" type="primary" @click="addList">添加</el-button></span>
        </span>
      </p>
      <input type="file" id="upFile" hidden @change="hadFile()">
      <p><span><span class="title">投递邮箱:</span><span class="innerText"><el-input v-model="address"
                                                                                 placeholder="请输入内容"></el-input></span></span>
      </p>

      <p><span><span class="title">活动详情:</span>
        <div class="editor-container">
          <UE :defaultMsg=defaultMsg :config=config ref="ue" v-model="newBody"></UE>
        </div>
        </span></p>
      <p>
        <el-button type="success" @click="addAct">保存</el-button>
        <el-button type="info" @click="quit">取消</el-button>
      </p>
    </div>
  </div>
</template>

<script>
  import {selectKuang, timeBox, UE} from '../../components/index'

  export default {
    name: 'activityEdit',
    components: {
      selectKuang,
      timeBox,
      UE
    },
    data() {
      return {
        showPass: false,
        showReject: false,
        defaultMsg: '这里是UE测试',
        changeImg: '',//添加
        newTitle: '',
        img: '',
        newBody: '',
        reTime: '',
        startTime: '',
        endTime: '',
        address: '',
        value6: '',
        file: '',
        price: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        type: [
          {
            label: '类型1',
            value: '类型1'
          },
          {
            label: '类型2',
            value: '类型2'
          },
          {
            label: '类型3',
            value: '类型3'
          }
        ],
        gList: [
          {
            group: '',
            sTime: '',
            eTime: '',
            price: '',
            rndTime: '',
            reg_file: ""
          }
        ],
        multipleSelection: [],
        upfileUrl: ""
      }
    },
    methods: {
      actType(e) {
        this.type = e
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
      passIt() {
        console.log(this.showPass)
        this.showPass = !this.showPass
      },
      rejectIt() {
        this.showReject = !this.showReject
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        })
        console.log(content)
      },
      addList() {
        console.log(this.gList)
        this.gList.push({group: '', sTime: '', eTime: '', price: '', rndTime: '', reg_file: ""})   //添加行
      },
      upImg(tab) { //  绑数据
        this.upFileFor = tab
        document.getElementById("upimgs").click();
      },
      upFile() {
        var _this = this
        var tab = this.upFileFor
        console.log("触发上传")
        PUBLIC.postFile("upimgs", function (url) {
          _this[tab] = url
        })
      },
      addAct() {
        var _this = this
        var startTime = []
        var endTime = []
        var reTime = []
        var price = []
        for (var i = 0; i < _this.gList.length; i++) {
          startTime.push(_this.gList[i][0])
          endTime.push(_this.gList[i][1])
          reTime.push(_this.gList[i]['rndTime'])
          price.push(_this.gList[i]['price'])
        }
        // console.log(_this.gList)
        // return
        startTime = _this.startTime
        endTime = _this.endTime
        reTime = _this.reTime
        price = _this.price
        let content = this.$refs.ue.getUEContent();
        this.newBody = content
        // this.getUEContent()
        // return
        PUBLIC.get('Active.actives.publish', {
          title: this.newTitle,
          body: this.newBody,
          img: this.changeImg
        }, function (data) {
          console.log(data)
          var groupFlag = _this.gList.length
          var groupFlagHad = 0
          for (var n = 0; n < _this.gList.length; n++) {
            (function (id, data) {
              console.log(data)
              PUBLIC.get('Active.actives.publigrop', {
                id: id,
                end_time: data.eTime,
                start_time: data.sTime,
                reg_end_time: data.rndTime,
                address: _this.address,
                reg_file: data.reg_file,
                money: data.price
              }, function (data) {
                groupFlagHad += 1
                if (groupFlagHad >= groupFlag) {
                  _this.$router.push({path: '/activity/activity-list'})
                }
                ``
              })
            })(data.id, _this.gList[n])
          }

        })
      },
      quit: function () {
        this.$router.push({path: '/activity/activity-list'})
      },
      openFile: function (data) {
        document.getElementById('upFile').click();
        this.selectGroup = data
        console.log("点击")
      },
      hadFile: function () {
        var _this = this
        PUBLIC.postFile("upFile", function (data) {
          _this.selectGroup.reg_file = data
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .activityInfo {
    padding: 120px 400px;
    .memberInfo {
      font-size: 14px;
      p {
        text-align: left;
        .el-row {
          margin-left: 80px;
          margin-top: -15px;
          .el-col-8 {
            .el-input {
              width: 150px;
            }
            .stopTime{
              margin-left: 10px;
            }
            .stopTime+.el-date-editor{
              width: 150px;
            }
          }
          .el-col-4 {
            .el-input {
              width: 150px;
            }
          }
        }
        .el-table {
          margin-left: 80px;
          margin-top: -15px;
        }
        .el-textarea {
          width: 80%;
        }

        .mr0 {
          width: 100%;
          .aGroups {
            display: block;
            height: 90px;
            .el-row {
              /*display: initial;*/
              width: 110%;
            }
          }
          .title {
            vertical-align: top;
          }
          span {
            display: inline;
          }
        }
        > span {
          display: inline-block;
          span {
            display: inline-block;
          }
          .title {
            width: 80px;
            text-align: right;
            padding-right: 10px;
          }
          img {
            height: 170px;
          }
          .innerText {
            width: 200px;
          }
          .longText {
            width: 80%;
          }
        }
        > span {
          padding-bottom: 55px;
        }
        > span:first-of-type {
          margin-right: 150px;
        }
      }
      .addBtn {
        margin: 10px 0 0 80px;
        width: 100px;
      }
      .poster {
        .el-button {
          vertical-align: bottom;
          margin-left: 20px;
        }
      }
      p:last-of-type {
        padding-top: 60px;
        text-align: center;
        .el-button {
          margin: 0 8%;
          width: 100px;
        }
      }
    }
    .editor-container {
      margin-left: 80px;
      margin-top: -15px;
      width: 100%;
    }
  }
  .editor-container {
    margin-left: 80px;
    margin-top: -15px;
    width: 100%;
  }
</style>
