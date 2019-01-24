<!--<template>-->
<!--<div class="addMember clearfix">-->
<!--<div class="leftBox">-->
<!--<div class="pic">-->
<!--<img v-bind:src="uimg" alt="">-->
<!--<p>-->
<!--<el-button type="primary" @click="upImg()">替换图片</el-button>-->
<!--</p>-->
<!--<el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input>-->
<!--</div>-->
<!--</div>-->
<!--<div class="memberInfo">-->
<!--<p><span><span class="title">会员ID:</span><span class="innerText">{{uid}}</span></span><span><span class="title">注册时间:</span><span-->
<!--class="innerText">{{ucreateTime}}</span></span></p>-->
<!--<p>-->
<!--<span><span class="title">用户密码:</span><span class="innerText"><el-input v-model="password"-->
<!--placeholder="请输入内容"></el-input></span></span>-->
<!--<span><span class="title">实名认证:</span><span class="innerText"><span v-if="urelStatus"-->
<!--style="color: green">已实名</span><span v-else-->
<!--style="color: red">未实名</span></span></span>-->
<!--</p>-->
<!--<p><span><span class="title">绑定手机号:</span><span class="innerText"><el-input v-model="utelphone"-->
<!--placeholder="请输入内容"></el-input></span></span>-->
<!--</p>-->
<!--<p v-for="(item,index) in ugroups" :key="index"><span><span class="title">会员身份:</span><span class="innerText">-->
<!--<el-select v-model="ugroups[index][0]" placeholder="请选择">-->
<!--<el-option-->
<!--v-for="item in userStatus"-->
<!--:key="item.value"-->
<!--:label="item.label"-->
<!--:value="item.value">-->
<!--</el-option>-->
<!--</el-select>-->
<!--</span></span><span><span class="title">到期时间:</span>-->
<!--<span class="innerText">-->
<!--<el-date-picker-->
<!--v-model="ugroups[index][1]"-->
<!--type="date"-->
<!--placeholder="选择日期"-->
<!--:picker-options="pickerOptions1">-->
<!--</el-date-picker>-->
<!--</span></span>-->
<!--<el-button class="deleteBtn" type="danger" @click="delGroup(ugroups[index][0])">删除</el-button>-->
<!--</p>-->
<!--<p class="addP"><span><span class="title">会员身份:</span><span class="innerText">-->
<!--<el-select v-model="unewGroup" placeholder="请选择">-->
<!--<el-option-->
<!--v-for="item in userStatus"-->
<!--:key="item.value"-->
<!--:label="item.label"-->
<!--:value="item.value">-->
<!--</el-option>-->
<!--</el-select>-->
<!--</span></span><span><span class="title">到期时间:</span>-->
<!--<span class="innerText">-->
<!--<el-date-picker-->
<!--v-model="unewEndTime"-->
<!--type="date"-->
<!--placeholder="选择日期"-->
<!--:picker-options="pickerOptions1">-->
<!--</el-date-picker>-->
<!--</span></span>-->
<!--&lt;!&ndash; <el-button class="deleteBtn" type="danger">删除</el-button> &ndash;&gt;-->
<!--</p>-->
<!--<p class="addBtn">-->
<!--<el-button type="primary" @click="addGroup()">添加</el-button>-->
<!--</p>-->
<!--<p><span><span class="title">收益比例:</span><span class="innerText"><el-input v-model="ugetMoney"-->
<!--placeholder="请输入内容"></el-input></span></span><span><span-->
<!--class="title">积分:</span><span class="innerText"><el-input v-model="jifen" placeholder="请输入内容"></el-input></span></span>-->
<!--</p>-->
<!--<p><span><span class="title">推广码:</span><span class="innerText">{{code}}</span></span><span><span class="title">账户余额:</span><span-->
<!--class="innerText"></span></span></p>-->
<!--<p>-->
<!--<el-button type="success" @click="setUser">保存</el-button>-->
<!--<el-button type="info" @click="$router.go(-1)">取消</el-button>-->
<!--</p>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->


<template>
  <div class="addMember clearfix">
    <div class="leftBox">
      <div class="pic">
        <img v-bind:src="uimg" alt="">
        <p>
          <el-button type="primary" @click="upImg()">替换图片</el-button>
        </p>
        <el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input>
      </div>
    </div>
    <div class="memberInfo">
      <p><span><span class="title">会员ID:</span><span class="innerText">{{uid}}</span></span><span><span class="title">注册时间:</span><span
        class="innerText">{{ucreateTime}}</span></span></p>
      <p>
        <span><span class="title">用户密码:</span><span class="innerText"><el-input v-model="password"
                                                                                placeholder="请输入内容"></el-input></span></span>
        <span><span class="title">实名认证:</span><span class="innerText"><span v-if="urelStatus"
                                                                            style="color: green">已实名</span><span v-else
                                                                                                                 style="color: red">未实名</span></span></span>
      </p>
      <p><span><span class="title">绑定手机号:</span><span class="innerText"><el-input v-model="utelphone" placeholder="请输入内容"></el-input></span></span>
        <span><span class="title">绑定手机号:</span><span class="innerText"><el-checkbox v-model="level3" style="font-size: 15px">集团用户</el-checkbox></span></span>
      </p>
      <p><span><span class="title">会员身份:</span><span class="innerText">
        <el-select v-model="ugroups" placeholder="请选择">
          <el-option
            v-for="item in userStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span></span><span><span class="title">到期时间:</span>
        <span class="innerText">
          <el-date-picker
            v-model="uendTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </span></span>
      </p>
      <p><span><span class="title">收益比例:</span><span class="innerText"><el-input v-model="ugetMoney"
                                                                                 placeholder="请输入内容"></el-input></span></span><span><span
        class="title">积分:</span><span class="innerText"><el-input v-model="jifen" placeholder="请输入内容"></el-input></span></span>
      </p>
      <p><span><span class="title">推广码:</span><span class="innerText">{{code}}</span></span><span><span class="title">账户余额:</span><span
        class="innerText"></span></span></p>
      <p>
        <el-button type="success" @click="setUser">保存</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
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
        //验证是否修改data
        allpersonData: '',
        allteamData: [],
        alll: '',
        oldugetMoney: '',
        page: 0,
        tableData3: [],
        options: [],
        multipleSelection: [],
        jifen: '',
        oldjifen: '',
        uid: "",
        uimg: "",
        password: "********",
        utelphone: "",
        ucreateTime: "",
        urelStatus: "",
        userStatus: [],
        userLevelStatus: [],
        inputs: "",
        ulevel: "",
        ugroups: '',
        oldugroups: '',
        uon_status: '',
        uendTime: "",
        olduendTime: '',
        ugetMoney: "",
        code: '',
        endTime: '',
        level3: false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        }
      }
    },
    methods: {
      //取消
      cancel(){
        console.log(this.page)
        this.$router.push({name:'会员列表',query: { page: this.page }})
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
      upImg(tab) {
        this.upFileFor = tab
        document.getElementById('upimgs').click();
      },
      upFile() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function (url) {
          console.log(url)
          _this.uimg = url
        })
      },
      getMemberInfo: function (id) {
        // console.log(this.ugetMoney)
        var _this = this
        var datas = ""
        PUBLIC.get('User.User.Userone', {uid: id}, (data) => {
          console.log(data)
          _this.allpersonData = data
          if(data.level == '3') {
            this.level3 = true
          }
          data.level = parseInt(data.level)
          PUBLIC.merObj(_this, data, {
            uid: "Id",
            uusername: "username",
            uimg: "header_img",
            ucreateTime: "reg_time",
            utelphone: "telphone",
            urelStatus: "rel_status",
            ulevel: "level",
            uname: "name"
          })
          //积分
          PUBLIC.get('Currency.receive.findcurrency', {uid: data.Id, money_type: '3'}, (data) => {
            // console.log(data)
            if (data != '') {
              _this.jifen = data.money_num
              _this.oldjifen = data.money_num
            }
          })

          PUBLIC.get('Team.User.TeamList', {uid: data.Id}, (data) => {
            console.log(data)
            _this.alll = data
            if (data.length > 0 || data != undefined) {
              for (var i in data) {
                if (data[i].tid == 318) {
                  _this.ugroups = _this.oldugroups = Number(data[i].tid)
                  _this.uon_status = data[i].on_status
                  if (_this.uon_status == -1) {
                    _this.ugroups = ''
                    _this.oldugroups = ''
                  }
                  // console.log(_this.ugroups)
                  this.uendTime = this.olduendTime = data[i].end_time
                  console.log(_this.uendTime.length)

                }
              }
            }
            console.log(_this.ugroups)
            //   data=data[0]
            //   PUBLIC.merObj(_this,data,{
            //   ugroup:"id",
            //   uendTime:"end_time"
            // })
            // _this.ugroup=parseInt(_this.ugroup)
          })
          // }
          //查看指定用户码
          PUBLIC.get('Currency.receive.findUidPro', {type: 'PromotionCode', uid: _this.uid}, function (dato) {
            console.log(dato.length)
            if (dato.length == 0) {
              console.log('aaaa')
              return
            } else {
              _this.code = dato[0].key
              // _this.ugetMoney = data[0].reduce_num
            }
          })
          PUBLIC.get("Configure.Configure.Selone", {type: "userGetMoneyFromSpread", key: _this.uid}, function (data) {

            console.log(data)
            if (data !== false) {
              _this.ugetMoney = data.value
              _this.oldugetMoney = data.value
            } else {
              _this.ugetMoney = 0
            }

          })

          console.log(_this)
        })
      },
      // setUser: function () {
      //   var _this = this
      //   console.log(this._data)
      //   PUBLIC.get("User.User.updateuser", {
      //     uid: this.uid,
      //     name: this.uname,
      //     telphone: this.utelphone,
      //     header_img: this.uimg
      //   }, (data) => {
      //     var stime = PUBLIC.getTime()
      //     if (this.ugroups == 318) {
      //       PUBLIC.get("Currency.receive.appenddis", {
      //         id: this.uid,
      //         uid: this.uid,
      //         astype: '',
      //         type: 'PromotionCode',
      //         item_id: 2,
      //         had_num: -1,
      //         time: this.vipList[i],
      //         startTime: stime
      //       }, (data) => {
      //         console.log(data)
      //       })
      //       // _this.open()
      //       //收益比例
      //       PUBLIC.get("Configure.Configure.Addconfig", {
      //         type: "userGetMoneyFromSpread",
      //         key: _this.uid,
      //         value: _this.ugetMoney,
      //         on_status: 1,
      //         statu: 1
      //       }, function (data) {
      //         // _this.$router.go(-1)
      //         console.log(data)
      //         for (var i in _this.ugroups) {
      //           PUBLIC.get("Team.User.Add", {
      //             tid: _this.ugroups[i][0],
      //             uid: _this.uid,
      //             end_time: _this.ugroups[i][1]
      //           }, (data) => {
      //             console.log(data)
      //           })
      //         }
      //       })
      //     }
      //   })
      //
      // }
      setUser() {
        let arg = {
          uid: this.uid,
          name: this.uname,
          telphone: this.utelphone,
          header_img: this.uimg,
          level: ''
        }
        if(this.level3 == true) {
          arg.level = 3
        }else if(this.allpersonData.rel_status == '1') {
          arg.level = 2
        }else if(this.allpersonData.telphone != '') {
          arg.level = 1
        }else{
          arg.level = 0
        }
        console.log(arg.level)
        var _this = this
        // console.log
        if(this.password!="********"){
          PUBLIC.get("User.User.updateadminpwd",{uid:this.uid,password:this.password},function(){})
        }
        PUBLIC.get("User.User.updateuser", arg, (data) => {
          var bigUid = this.uid
          var stime = PUBLIC.getTime()
          console.log(this.ugroups, this.oldugroups)
          if (this.ugroups == 318) {
            // 添加团队
            console.log(_this.uendTime.length)
            console.log(_this.uendTime)
            if (_this.uendTime.length==undefined || _this.uendTime.length >= 20) {
              console.log('aaaaa')
              let year = _this.uendTime.getFullYear()
              let month = _this.uendTime.getMonth() + 1    //js从0开始取
              let date1 = _this.uendTime.getDate()
              let hour = _this.uendTime.getHours()
              let minutes = _this.uendTime.getMinutes()
              let second = _this.uendTime.getSeconds()
              _this.endTime = year + "-" + month + "-" + date1 + " " + '0' + hour + ":" + '0' + minutes + ":" + '0' + second
            } else {
              console.log('bbbbbbb')
             _this.endTime = this.uendTime
            }
            //获取优惠码
            if (this.oldugroups == '') {
              PUBLIC.get("Team.User.Add", {tid: '318', uid: bigUid, end_time: _this.endTime}, (data) => {
                console.log(data)
              })
              PUBLIC.get("Currency.receive.appenddis", {
                type: 'PromotionCode',
                uid: bigUid,
                item_id: 2,
                astype: '',
                reduce_num: 10,
                had_num: -1,
                time: _this.endTime,
                startTime: ''
              }, (data) => {
                _this.code = data.key
                _this.ugetMoney = data.reduce_num
              })
            } else {
              console.log(_this.endTime)
              PUBLIC.get("Team.User.Update", {tid: '318', uid: bigUid, end_time:_this.endTime, on_status: 1}, (data) => {
                console.log(data)
              })
            }
            console.log(data.value)
            //设置收益比例
            if (this.ugetMoney != this.oldugetMoney) {
              PUBLIC.get("Configure.Configure.Addconfig", {
                type: "userGetMoneyFromSpread",
                key: bigUid,
                value: this.ugetMoney,
                on_status: 1,
                statu: 1
              }, (data) => {
                console.log(data)
              })
            }
            //设置积分
            console.log(this.jifen, this.oldjifen)
            if (this.jifen != this.oldjifen) {
              PUBLIC.get("Currency.receive.addcursd", {
                uid: bigUid,
                money_type: '3',
                num: this.jifen,
                type: 'update'
              }, (data) => {
                console.log(data)
              })
            }
            this.$router.push({name:'会员列表',query: { page: this.page }})
          }
          else if (this.oldugroups == 318 && this.ugroups == '' && this.uon_status == 1) {
            PUBLIC.get('Team.User.Update', {tid: 318, uid: this.uid, on_status: -1}, data => {
              console.log(data)
              this.$router.push({name:'会员列表',query: { page: this.page }})
            })
          } else {
            this.$router.push({name:'会员列表',query: { page: this.page }})
          }
        })
      }
    },
    mounted() {
      this.page = this.$route.params.page
      console.log(this)
      var id = this.$route.params.id
      console.log(id)
      DATAC.setConf(this)
      this.getMemberInfo(id)
    },
    watch: {
      level3() {
        console.log(this.level3)
      },
      uendTime() {
        console.log(this.uendTime)
        let year = this.uendTime.getFullYear()
        let month = this.uendTime.getMonth() + 1    //js从0开始取
        let date1 = this.uendTime.getDate()
        let hour = this.uendTime.getHours()
        let minutes = this.uendTime.getMinutes()
        let second = this.uendTime.getSeconds()
        if(month<10) {
          month = '0' + month
        }
        if(date1 < 10) {
          date1 = '0' + date1
        }
        this.endTime = year + "-" + month + "-" + date1 + " " + '0' + hour + ":" + '0' + minutes + ":" + '0' + second
        console.log(this.endTime)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .addMember {
    padding: 45px 62px;
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
          }
        }
        > span {
          padding-bottom: 55px;
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
      .deleteBtn {
        width: 100px;
        margin-left: 20px;
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
