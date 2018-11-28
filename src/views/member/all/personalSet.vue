<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="identity"
        label="用户身份">
      </el-table-column>
      <el-table-column
        prop="des"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="powerShow(scope.row)">权限查看</el-button>
          <el-button type="text" size="small" @click="powerSet(scope.row)">权限设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="power" v-show="showPower">
      <h3>权限查看 <i class="fa fa-close" @click="powerShow"></i></h3>
      <div class="inner">
        <p>用户身份： {{identity}}</p>
        <div>
          <span>权限查看：</span>
          <div class="checkBox">
            <div>
              <div class="all">
                <el-checkbox :indeterminate="isIndeterminate" disabled v-model="checkAll">观看权限</el-checkbox>
                <!--//@change="handleCheckAllChange"-->
              </div>
              <div class="checks">
                <el-checkbox-group v-model="checkedCities" disabled>
                  <!--@change="handleCheckedCitiesChange"-->
                  <el-checkbox v-for="tags in classList" :label="tags.value" :key="tags.value">{{tags.label}}
                  </el-checkbox>
                  <!--//@change='changeOne(tags.value),change'-->
                </el-checkbox-group>
              </div>
            </div>
            <div>
              <div class="all">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll2" disabled>个人中心
                </el-checkbox>
              </div>
              <div class="checks">
                <el-checkbox-group v-model="personCent" disabled>
                  <el-checkbox v-for="items in personCents" :label="items.label" :key="items.value">{{items.label}}
                               <!--@change='changeOnePage(items.value)'>-->
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <p>
          <el-button type="success" v-show="false">提交</el-button>
          <el-button type="info" @click="powerShow">取消</el-button>
        </p>
      </div>
    </div>
    <div class="power" v-show="setPower">
      <h3>个人中心设置 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p>用户身份： {{identity}}</p>
        <div>
          <span>页面设置：</span>
          <div class="checkBox">
            <div>
              <div class="all">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll2" @change="handleCheckAllChange">观看权限
                </el-checkbox>
              </div>
              <div class="checks">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="tags in classList" :label="tags.value" :key="tags.value"
                               @change='changeOne(tags.value),change'>{{tags.label}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div>
              <div class="all">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll2" @change="handleCheckAllChange2">个人中心
                </el-checkbox>
              </div>
              <div class="checks">
                <el-checkbox-group v-model="personCent" @change="handlepersonCheckChange">
                  <el-checkbox v-for="items in personCents" :label="items.label" :key="items.value" @change='changeOnePage(items.value)'>{{items.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <p>
          <el-button type="success" @click='closeIt'>提交</el-button>
          <el-button type="info" @click="closeIt">取消</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {addClassify, changeClassify, tagChange} from '../../../components/VideoCom/index'

  const cityOptions = ['上海', '北京', '广州', '深圳']
  export default {
    name: 'allMember',
    components: {
      addClassify,
      changeClassify,
      tagChange
    },
    data() {
      return {
        showPower: false,
        setPower: false,
        checkAll: false,
        checkAll2: false,
        checkedCities: [],
        isIndeterminate: true,
        personAllcheck: true,
        tableData3: [],
        identity: '',
        personCent: [],
        classList: [],
        pageStatus: [],
        personCents: [
          {
            label: '区域数据',
            value: '区域数据'
          },
          {
            label: '园所列表',
            value: '园所列表'
          },
          {
            label: '我的区域',
            value: '我的区域'
          }, {
            label: '我的分享',
            value: '我的分享'
          }, {
            label: '我的作品',
            value: '我的作品'
          }, {
            label: '播放记录',
            value: '播放记录'
          },
          {
            label: '我的收藏',
            value: '我的收藏'
          },
          {
            label: '我的证书',
            value: '我的证书'
          },
          {
            label: '账户记录',
            value: '账户记录'
          },
          {
            label: '子账号管理',
            value: '子账号管理'
          }
        ],
        ctags: [],
        videoGroup:{
          "318":"9",
          "317":"10",
          "316":"11",
          "315":"9"
        },
        cvalue: [],
        PCvalue: [],
        allSelect: [],
        allSelect2: [],
        fid: '',
        status: [],
        zhege: ''
      }
    },
    methods: {
      //首行获取数据
      powerSet(row) {
        // PUBLIC.get('Auth.Resource.Check', {fid: this.fid, ftype: 'team', res_type: 'personPage', res_id: this.personCents[i].value, server: 'read'}, data => {
        //   console.log(data)
        //   this.pageStatus['"' + zhege + '"'] = data
        //   //被选中的
        //   if (data === true) {
        //     this.personCent.push(this.personCents[i].value)
        //   }
        // })
        this.checkedCities = []
        this.classList = []
        this.setPower = !this.setPower
        this.identity = row.identity
        this.fid = row.id
        if (this.setPower !== false) {
          this.getPowerInfo()
        }
      },
      // PUBLIC.get('Video.drama.classlist', (data) => {
      //   var _this = this
      //   console.log(this.videoClass)
      //   // _this.videoClass[i].value = _this.videoClass[i].value + '_9'
      //   for (var i = 0; i < this.videoClass.length; i++) {
      //     (function(i) {
      //       _this.classList.push(_this.videoClass[i])
      //       // console.log(_this.classList[i])
      //       _this.ctags.push(_this.classList[i].label)
      //       _this.cvalue.push(_this.classList[i].value)
      //        _this.videoClass[i].value=_this.videoClass[i].value.indexOf("_")!=-1?_this.videoClass[i].value: _this.videoClass[i].value + '_9'
      //       var zhege = _this.classList[i].value
      //       console.log(_this.classList[i].value)
      //       PUBLIC.get('Auth.Resource.Check', {fid: _this.fid, ftype: 'team', res_type: 'videoClassLevel', res_id: _this.classList[i].value, server: 'read'}, data => {
      //         // console.log(zhege)
      //         _this.status['"' + zhege + '"'] = data
      //         console.log(_this.checkedCities)
      //         // console.log(_this.status)
      //         if (data === true) {
      //           _this.checkedCities.push(_this.classList[i].value)
      //           console.log(_this.checkedCities)
      //         }
      //         console.log(_this.checkedCities)
      //       })
      //     })(i)
      //   }
      //
      // })

      closeIt() {
        this.setPower = !this.setPower
        this.classList = []
      },
      powerShow(row) {
        this.showPower = !this.showPower
        this.identity = row.identity
        this.fid = row.id
        console.log(this.showPower)
        console.log(this.classList)
        this.classList = []
        this.checkedCities = []
        if (this.showPower !== false) {
          this.getPowerInfo()
        }
      },
      getPowerInfo() {
        PUBLIC.get('Video.drama.classlist', (data) => {
          var _this = this
          // console.log(this.videoClass);
          for (let i = 0; i < this.videoClass.length; i++) {
            (function (i) {
              _this.tmpVideoClass=JSON.parse(JSON.stringify(_this.videoClass))
              _this.tmpVideoClass[i].value = _this.videoClass[i].value.indexOf("_") != -1 ? _this.videoClass[i].value : _this.videoClass[i].value + '_'+_this.videoGroup[_this.fid]
              console.log(_this.videoClass[i].value)
              //  _this.videoClass[i].value = _this.videoClass[i].value.indexOf("_") != -1 ? _this.videoClass[i].value : _this.videoClass[i].value + '_'+_this.videoGroup[_this.fid]
              console.log(_this.videoClass[i].value)
              _this.classList.push(_this.tmpVideoClass[i])
              // _this.ctags.push(_this.classList[i].label)
              // _this.cvalue.push(_this.classList[i].value)
              var zhege = _this.classList[i].value

              PUBLIC.get('Auth.Resource.Check', {fid: _this.fid, ftype: 'team', res_type: 'videoClassLevel', res_id: _this.classList[i].value, server: 'read'}, data => {
                // console.log(zhege)
                _this.status['"' + zhege + '"'] = data
                console.log(_this.checkedCities)
                // console.log(_this.status)
                if (data === true) {
                  _this.checkedCities.push(_this.classList[i].value)
                  console.log(_this.checkedCities)
                }
                console.log(_this.checkedCities)
              })
              PUBLIC.get('Auth.Resource.Check', {
                fid: _this.fid,
                ftype: 'team',
                res_type: 'personPage',
                res_id: _this.personCents[i].value,
                server: 'read'
              }, data => {
                // console.log(data)
                _this.pageStatus['"' + zhege + '"'] = data
                //被选中的
                if (data === true) {
                  _this.personCent.push(_this.personCents[i].value)
                }
              })
              // PUBLIC.get('Auth.Resource.Check', {
              //   fid: _this.fid,
              //   ftype: 'team',
              //   res_type: 'videoClass',
              //   res_id: _this.classList[i].value,
              //   server: 'read'
              // }, data => {
              //   console.log(data)
              //   _this.status['"' + zhege + '"'] = data
              //   //被选中的
              //   if (data === true) {
              //     _this.checkedCities.push(_this.classList[i].value)
              //   }
              // })
            })(i)
          }
          _this.personCent = []
          for (let a = 0; a < this.personCents.length; a++) {
            (function (a) {
              // classList 和personCents 一样
              var zhege1 = _this.personCents[a].value
              PUBLIC.get('Auth.Resource.Check', {
                fid: _this.fid,
                ftype: 'team',
                res_type: 'personPage',
                res_id: _this.personCents[a].value,
                server: 'read'
              }, data => {
                console.log(data)
                _this.pageStatus['"' + zhege1 + '"'] = data
                // console.log(_this.checkedCities)
                // // console.log(_this.status)
                if (data === true) {
                  _this.personCent.push(_this.personCents[a].value)
                  console.log(_this.personCent)
                }
              })
            })(a)
          }
        })
      },
      changeTag() {
        console.log(this.tagChange)
        this.tagChange = !this.tagChange
      },
      //第一行全选
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cvalue : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        this.allSelect = value
        let checkedCount = value.length
        this.checkAll = checkedCount === this.classList.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.classList.length
      },
      //第二行全选
      handleCheckAllChange2(val) {
        this.personCent = val ? this.PCvalue : []
        this.isIndeterminate = false
      },
      handlepersonCheckChange(value) {
        console.log(value)
        this.allSelect2 = value
        let checkedCount = value.length
        this.checkAll2 = checkedCount === this.personCents.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.personCents.length
      },
      //修改数据
      changeOne(value) {
        console.log(this.status)
        var _this=this
        var tmp=value.split("_")
        tmp=tmp[0]
        for(var n=9;n<=_this.videoGroup[_this.fid];n++){
          var relValue=tmp+"_"+n.toString()
          if (this.status['"' + value + '"'] === true) {
            console.log('true')
            PUBLIC.get('Auth.Resource.Set', {
              fid: this.fid, ftype: 'team', res_type: 'videoClassLevel', res_id: relValue, server: 'read', value: 0
            }, data => {
              console.log(data)
            })
          } else if (this.status['"' + value + '"'] === false) {
            PUBLIC.get('Auth.Resource.Set', {
              fid: this.fid, ftype: 'team', res_type: 'videoClassLevel', res_id: relValue, server: 'read', value: 1
            }, data => {
              console.log(data)
            })
          } else if (this.status['"' + value + '"'] === 1) {
            PUBLIC.get('Auth.Resource.Set', {
              fid: this.fid, ftype: 'team', res_type: 'videoClassLevel', res_id: relValue, server: 'read', value: 1
            }, data => {
              console.log(data)
            })
          } else if (this.status['"' + value + '"'] === 2) {
            PUBLIC.get('Auth.Resource.Set', {
              fid: this.fid, ftype: 'team', res_type: 'videoClassLevel', res_id: relValue, server: 'read', value: 1
            }, data => {
              console.log(data)
            })
        }

        }


      },
      changeOnePage(value) {
        console.log(value)
        console.log(this.pageStatus)
        if (this.pageStatus['"' + value + '"'] === true) {    //可能不需要判断
          PUBLIC.get('Auth.Resource.Set', {
            fid: this.fid, ftype: 'team', res_type: 'personPage', res_id: value, server: 'read', value: 0
          }, data => {
            console.log(data)
          })
        }
        else if (this.pageStatus['"' + value + '"'] === false) {
          PUBLIC.get('Auth.Resource.Set', {
            fid: this.fid, ftype: 'team', res_type: 'personPage', res_id: value, server: 'read', value: 1
          }, data => {
            console.log(data)
          })
        } else if (this.pageStatus['"' + value + '"'] === 1) {
          PUBLIC.get('Auth.Resource.Set', {
            fid: this.fid, ftype: 'team', res_type: 'personPage', res_id: value, server: 'read', value: 0
          }, data => {
            console.log(data)
          })
        } else if (this.pageStatus['"' + value + '"'] === 2) {
          PUBLIC.get('Auth.Resource.Set', {
            fid: this.fid, ftype: 'team', res_type: 'personPage', res_id: value, server: 'read', value: 1
          }, data => {
            console.log(data)
          })
        }
      },
      getList() {
        for (var i in this.personCents) {
          this.PCvalue.push(this.personCents[i].value)
          console.log(this.PCvalue)
        }
        PUBLIC.get('Configure.Configure.Selfig', {type: 'personSet'}, data => {
          for (var n = 0; n < data.length; n++) {

            this.tableData3.push(JSON.parse(data[n].value))
          }
          console.log(this.tableData3)
        })
      }
    },
    mounted() {
      this.getList()
      DATAC.setConf(this)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .app-container {
    color: #333333;
    .el-table {
      .warning-row {
        background: #fff5f5;
      }
      .waiting {
        background-color: #f2ffff;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .powerCheck, .power {
      z-index: 100;
      width: 1000px;
      height: 570px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 40%;
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
        padding: 36px 16px;
        p {
          padding-bottom: 30px;
          img {
            vertical-align: top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          button {
            vertical-align: bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type {
          padding-top: 50px;
          text-align: center;
          button {
            width: 120px;
            margin-left: 75px;
          }
        }
        .checkBox {
          margin-left: 70px;
          margin-top: -12px;
          > div {
            height: 120px;
            padding-bottom: 0;
            > div {
              /*line-height: 120px;*/
              display: inline-block;
            }
            .all {
              padding-left: 20px;
              width: 120px;
              border: 1px solid #ccc;
              .el-checkbox {
                line-height: 120px
              }
            }
            .checks {
              padding-left: 20px;
              width: 760px;
              border: 1px solid #ccc;
              margin-left: -5px;
              height: 122px;
              vertical-align: top;
              .el-checkbox-group {
                .el-checkbox {
                  line-height: 50px;
                  width: 100px;
                  margin-left: 0;
                }
              }

            }
          }

        }
      }
    }
  }

</style>
