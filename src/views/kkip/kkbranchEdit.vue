<template>
  <div class="schoolInfo">
    <div class="memberInfo">
      <p><span><span class="title">分会ID:</span><span class="innerText">{{id}}</span></span><span><span class="title">成立时间:</span><span
        class="innerText"></span></span></p>
      <p><span><span class="title">地区:</span>
        <span class="innerText">
          <el-cascader
            :options="options"
            v-model="region">
          </el-cascader>
        </span></span><span><span class="title">分会名称:</span><span class="innerText"><el-input
        v-model="regionName"></el-input></span></span></p>
      <p><span><span class="title">负责人:</span><span class="innerText"><el-input v-model="boss"></el-input></span></span><span><span
        class="title">联系方式:</span><span class="innerText"><el-input v-model="phone"></el-input></span></span></p>
      <p><span><span class="title">关联会员ID:</span><span class="innerText"><el-input
        v-model="mid"></el-input></span></span><span><span class="title">分成比例:</span><span class="innerText"><el-input
        v-model="percent"></el-input></span></span></p>
      <p class="duoxuan"><span><span class="title">授权类目:</span>
        <span>
          <!-- <el-checkbox-group v-model="checkedAuthorize">
            <el-checkbox v-for="authorize in videoClass" :label="authorize.value" :key="authorize.value">{{authorize.label}}</el-checkbox>
          </el-checkbox-group> -->
          <el-checkbox-group v-model="checkedAuthorize">
            <el-checkbox v-for="authorize in videoClass" :label="authorize.value" :key="authorize.value">{{authorize.label}}</el-checkbox>
          </el-checkbox-group>
        </span>
      </span></p>
      <p>
        <el-button type="primary" @click="saveEdit">保存</el-button>
        <el-button type="info" @click="quit">取消</el-button>
      </p>
    </div>
  </div>
</template>

<script>
  const authorizesOption = ['篮球', '律师', '123123', '111111', '1233213', '1234', '小朋友', '1231']
  export default {
    name: 'schoolEdit',
    data() {
      return {
        showIt: false,
        multipleSelection: [],
        checkedAuthorize: [],
        videoClass: [],
        isIndeterminate: true,
        options: [],
        selectedOptions2: [],
        datas: [],
        region: [],
        regionName: '',
        boss: '',
        phone: '',
        mid: '',
        oldMid: '',
        percent: ''
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
      getBranchOne() {
        PUBLIC.get('Configure.Configure.Selone', {type: 'branch', key: this.key}, (data) => {
          this.id = data.id
          var newData = JSON.parse(data.value ? data.value : '{}')
          this.datas = newData
          this.regionName = newData.name
          this.oldregionName = newData.name
          this.boss = newData.boss
          this.phone = newData.phone
          this.mid = newData.mid
          this.oldMid = newData.mid
          this.percent = newData.percent
          this.branchOld = data.key
          console.log(this.datas)
          this.region = newData.region
          // this.checkedAuthorize = newData.authorize
          PUBLIC.get('Video.drama.seltqlistexa', {uid: this.mid}, v=> {
            console.log(v[0])
            let arr = []
            for(let i in v[0]) {
              // console.log()
              arr.push(v[0][i].video_list_id)
              if(i == v[0].length -1){
                this.checkedAuthorize = arr
                console.log(this.checkedAuthorize)
              }
            }
          })
        })
      },
      edit(row) {
        this.key = row.name
        this.$router.push({name: 'branchEdit', params: {'key': this.key}})
      },
      getRegionList() {
        PUBLIC.get("Configure.Configure.Selone", {type: "quyuliebiao", key: "quyuliebiao"}, (data) => {
          console.log(JSON.parse(data.value))
          this.options = JSON.parse(data.value)
        })
      },
      saveEdit() {
        var _this = this
        console.log(this.phone)
        if (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phone) != false) {
          PUBLIC.get("Configure.Configure.isseluser", {
            uid: this.mid,
          },  (data1) => {
            for (var n = 0; n < data1.length; n++) {
              if (data1[n].id != _this.id) {
                PUBLIC.toa("用户已被使用")
                return
              }
            }
            console.log(_this.oldregionName, _this.regionName)
            if (_this.oldregionName != _this.regionName) {
              PUBLIC.post("Configure.Configure.Addconfig", {
                type: 'branch',
                key: _this.oldregionName,
                statu: -1
              }, function (data) {
              })
            }
            console.log(_this.datas)
            var data = JSON.parse(JSON.stringify(_this.datas))
            data.uid = _this.id
            data.name = _this.regionName
            data.authorize = _this.checkedAuthorize
            data.region = _this.region
            data.boss = _this.boss
            data.phone = _this.phone
            data.mid = _this.mid
            data.boss = _this.boss
            data.percent = _this.percent
            console.log(data)
            PUBLIC.post('Configure.Configure.Addconfig', {
              type: 'branch',
              key: _this.regionName,
              value: JSON.stringify(data),
              on_status: 1,
              statu: 1
            }, (data) => {
              PUBLIC.get('Video.drama.addtqlistexa', {uid: _this.mid, video_list_id: _this.checkedAuthorize }, v=> {
                console.log(v)
              })
              console.log("编辑成功")
              _this.$message({
                message: '保存成功！',
                type: 'success'
              })
              if(this.mid !== this.oldMid && this.mid != '') {
                PUBLIC.get('Team.User.Del', {tid: 316, uid: _this.oldMid}, data => {
                  console.log('删除' + data)
                  PUBLIC.get('Team.User.Add', {tid: 316, uid: _this.mid, end_time: "2030-12-31 00:00:00"}, data => {
                    console.log('删除后添加')
                    console.log(data)
                    var checkClass = _this.checkedAuthorize
                    console.log(checkClass)
                    var getNum = 0
                    for (var i = 9; i < 12; i++) {
                      for (var n = 0; n < checkClass.length; n++) {
                        getNum += 1
                        PUBLIC.get('Auth.Resource.Set', {
                          "value": 1,
                          "ftype": "user",
                          "fid": _this.mid,
                          "res_type": "videoClassLevel",
                          "res_id": checkClass[n] + "-" + i,
                          "server": "read"
                        }, function (data) {
                          getNum -= 1
                          if (getNum == 0) {
                            _this.$router.push({name: '分会管理', query: { 'page': _this.page}})
                          }
                        })
                      }
                    }
                  })
                })
              }
              else if(this.oldMid != '' && this.mid == '') {
                PUBLIC.get('Team.User.Del', {tid: 316, uid: _this.oldMid}, data => {
                  console.log('直接删除' + data)
                  _this.$router.push({name: '分会管理', query: { 'page': _this.page }})
                })
              }
              else {
                _this.$router.push({name: '分会管理', query: { 'page': _this.page}})
              }


              //关闭未勾选的权限
              var checkClass = []
              for (var n = 0; n < _this.videoClass.length; n++) {
                if (_this.checkedAuthorize.indexOf(_this.videoClass[n].value) == -1) {
                  checkClass.push(_this.videoClass[n].value)
                  // console.log(checkClass)
                  // console.log(_this.videoClass[n].value)
                  // console.log(_this.checkedAuthorize)
                  // console.log( _this.checkedAuthorize.indexOf(_this.videoClass[n].value ))
                }
              }
              for (var i = 9; i < 12; i++) {
                for (var n = 0; n < checkClass.length; n++) {
                  PUBLIC.get('Auth.Resource.Set', {
                    "value": 0,
                    "ftype": "user",
                    "fid": _this.mid,
                    "res_type": "videoClassLevel",
                    "res_id": checkClass[n] + "-" + i,
                    "server": "read"
                  }, function (data) {

                  })
                }
              }
              // this.$router.go(-1)
            })
            // } else {
            //
            // }
          })
        } else {
          this.$alert('手机号码输入错误', '错误', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }
      },
      quit() {
        this.$router.push({name: '分会管理', query: { 'page': this.page}})
      }
    },
    mounted() {
      this.page = this.$route.params.page
      this.key = this.$route.params.key
      console.log(this)
      this.getBranchOne()
      this.getRegionList()
      DATAC.setConf(this)
    },
    watch: {
      region() {
        console.log(this.region)
      },
      datas() {
        console.log(this.datas)
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
            width: 120px;
            text-align: right;
            padding-right: 10px;
          }
          .el-table {
            margin-left: 60px;
            margin-right: -60px;
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
  }

</style>
