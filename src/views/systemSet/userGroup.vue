<template>
  <div class = 'userGroup'>
    <div class = 'memberHead'>
      <p><span class='buttons'><el-button type='warning' @click="addAdmin">添加角色</el-button></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='list'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='uid'
        label='ID'>
      </el-table-column>
      <el-table-column
        prop='user'
        label='使用者''>
      </el-table-column>
      <el-table-column
        prop='telphone'
        label='手机号'>
      </el-table-column>
      <el-table-column
        prop='tid'
        label='身份'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.tid == 319">管理员</span>
          <span v-if="scope.row.tid == 320">超级管理员</span>
        </template>
      </el-table-column>

      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small'  @click="powerShow(scope.row)">查看</el-button>
          <el-button type='text' size='small' @click="changeAdmin(scope.row)">修改</el-button>
          <el-button type='text' size='small' @click="stopUser(scope.row)">禁用</el-button>
          <el-button type='text' size='small' @click="powerSet(scope.row)">权限设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="addAdmin" v-show="showAdmin">
      <h3>信息编辑 <i class="fa fa-close" @click="addAdmin"></i></h3>
      <div class="inner">
        <p>&emsp;用户ID：<el-input v-model="username" placeholder="请输入用户名"></el-input></p>
        <p>&emsp;使用者：<el-input v-model="user" ></el-input></p>
        <p>&emsp;手机号：<el-input v-model="telphone" ></el-input></p>
        <p>&emsp;&emsp;&emsp;&emsp;<span><el-radio v-model="radio" label="1">管理员</el-radio><el-radio v-model="radio" label="2">超级管理员</el-radio></span></p>
        <p><el-button type="success" @click="addTeamUser" >提交</el-button><el-button type="info" @click="addAdmin">取消</el-button></p>
      </div>
    </div>
    <div class="changeAdmin" v-show="showChange">
      <h3>信息编辑 <i class="fa fa-close" @click="changeAdmin"></i></h3>
      <div class="inner">
        <p>&emsp;用户ID：<el-input v-model="username" placeholder="请输入用户ID"></el-input></p>
        <p>&emsp;使用者：<el-input v-model="user" ></el-input></p>
        <p>&emsp;手机号：<el-input v-model="telphone" ></el-input></p>
        <p>&emsp;&emsp;&emsp;&emsp;<span><el-radio v-model="radio" label="1">管理员</el-radio><el-radio v-model="radio" label="2">超级管理员</el-radio></span></p>
        <p><el-button type="success" @click="addTeamUser" >提交</el-button><el-button type="info" @click="addAdmin">取消</el-button></p>
      </div>
    </div>
    <div class="powerShow" v-show="seePower">
      <h3>信息编辑 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p><span>&emsp;用户名：<span>{{fid}}</span></span><span>密码：<span></span></span></p>
        <div class="pSet">
          <div class="left">
            <span>权限设置：</span>
          </div>
          <div class="right">
            <div class="checkBox">
              <div v-for="(items,index) in allList">
                <div class="all">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="apiSelect[index]" @change="handleCheckAllChange" disabled>{{index}}</el-checkbox>
                </div>
                <div class="checks">
                  <el-checkbox-group v-model="apiSelect[index]" @change="handleCheckedCitiesChange" disabled>
                    <el-checkbox v-for="item in items" :label="item.service" :key="item.service"  @change='changeOne(item.service, index)' v-if="item.des != null" disabled>{{item.des}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p><el-button type="success">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
      </div>
    </div>
    <div class="powerSet" v-show="showPower">
      <h3>信息编辑 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p><span>&emsp;用户名：<span>{{fid}}</span></span><span>密码：<span></span></span></p>
        <div class="pSet">
          <div class="left">
            <span>权限设置：</span>
          </div>
          <div class="right">
            <div class="checkBox">
              <div v-for="(items,index) in allList">
                <div class="all">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="apiSelect[index]" @change="handleCheckAllChange">{{index}}</el-checkbox>
                </div>
                <div class="checks">
                  <el-checkbox-group v-model="apiSelect[index]" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="item in items" :label="item.service" :key="item.service"  @change='changeOne(item.service, index)' v-if="item.des != null">{{item.des}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p><el-button type="success">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { checkGroup } from '../../components/index'
  export default  {
    components: {
      checkGroup
    },
    data() {
      return {
        username: '',
        password: '',
        user: '',
        telphone: '',
        GUlist: [],
        checkedCities: [],
        list: [],
        list1: [],
        list2: [],
        showChange: false,
        showAdmin: false,
        seePower: false,
        checkAll: false,
        showPower: false,
        checkMemberAll: false,
        isIndeterminate: true,
        title1: '会员管理',
        radio: '',
        uid: '',
        tid: '',
        res: [],
        identity: '',
        resList: [],
        apiList: [],
        cvalue: [],
        apiSelect: {},
        resSelect:[],
        fid: '',
        status: [],
        zhege: '',
        allList: {}
      }
    },
    methods: {
      stopUser(row) {
        console.log(row)
        PUBLIC.get('Team.User.Update', { tid: row.tid, uid: row.uid, on_status: -1 }, data => {
          console.log(data)
        })
      },
      changeAdmin(row) {
        console.log(row)
        this.username = row.uid
        this.telphone = row.telphone
        this.user = row.user
        this.showChange = !this.showChange
      },
      addAdmin() {
        console.log(this.showAdmin)
        this.showAdmin = !this.showAdmin
      },
      closeIt() {
        console.log('guanbi')
        this.showPower = this.seePower = false
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cvalue : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        this.allSelect = value
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.classList.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.classList.length
      },
      powerShow(row) {
        this.seePower = !this.seePower
        this.checkedCities = []
        this.classList = []
        this.identity = row.identity
        this.fid = row.uid
        if (this.seePower !== false) {
          this.getCheckList()
        }
      },
      powerSet(row) {
        this.checkedCities = []
        this.classList = []
        this.showPower = !this.showPower
        this.identity = row.identity
        this.fid = row.uid
        if (this.setPower !== false) {
          console.log('aaaaaaaaaaaaaaaaaaaaa')
          this.getCheckList()
        }
      },
      addTeamUser() {
        var _this = this
        console.log(this.radio)
        if (this.radio == 1) {
          _this.tid = 319
          console.log('319')
        } else if (this.radio == 2) {
          _this.tid = 320
          console.log('320')
        } else {
          console.log('no')
          return
        }
        let args = { telphone: this.telphone, user: this.user}
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'adminTel', key: this.username, on_status: 1, value: JSON.stringify(args), statu: 1 }, data => {
          console.log(data)
          PUBLIC.get('Team.User.Add', { uid: this.username, tid: _this.tid }, function(data) {
            console.log(data)
            _this.$router.go(0)
          })
        })
      },
      getUserList() {
        var liste = ''
        PUBLIC.get('Team.User._List', { tid: 319, all: -1 }, (data) => {
          console.log(data)
          var newData = []
          var demo = {
            uid: 'uid',
            tid: 'tid'
          }
          newData = PUBLIC.formatObj(demo,data)
          this.list1 = newData
          console.log(this.list1)
          PUBLIC.get('Team.User._List', { tid: 320, all: -1 }, (data) =>{
            console.log(data)
            var newData = []
            var demo = {
              uid: 'uid',
              tid: 'tid'
            }
            newData = PUBLIC.formatObj(demo,data)
            this.list2 = newData
            console.log(this.list2)
            for( var i = 0;i<newData.length;i++) {
              this.list1.push(this.list2[i])
            }
            console.log(this.list1)
            for(let i in this.list1) {
              console.log(this.list1[i].uid)
              PUBLIC.get('Configure.Configure.Selone', { type: 'adminTel', key: this.list1[i].uid }, data => {
                if(data != false) {
                  var val = JSON.parse(data.value)
                  var pzUid = data.key
                  console.log(val.telphone)
                  if(pzUid == this.list1[i].uid) {
                    this.list1[i]['user'] = val.user
                    this.list1[i]['telphone'] = val.telphone
                  }
                }else{}
                console.log(i,this.list1.length)
                if( Number(i)+1 == this.list1.length){
                  console.log(i)
                  this.list = this.list1
                  console.log(this.list)
                }
              })
            }
          })
        })
      },
      getCheckList() {
        // for(let a = 0; a < this.allList.length; a++) {
        for (let i in this.allList) {
          console.log(i)
          for(let n=0;n<this.allList[i].length;n++){

            PUBLIC.get('Auth.Apis.Check', {
              fid: this.fid, ftype: 'user', server: this.allList[i][n].service
            }, data => {
              console.log(this.allList[i])
              if(data==true){
                this.apiSelect[i].push(this.allList[i][n].service)
                this.apiSelect=JSON.parse(JSON.stringify(this.apiSelect))
                // console.log(this.apiSelect[i])
              }
              // _this.status['"' + zhege + '"'] = data
              // console.log(_this.checkedCities)
              // // console.log(_this.status)
              // if (data === true) {
              //   _this.checkedCities.push(_this.classList[i].value)
              //   console.log(_this.checkedCities)
              // }
              // console.log(_this.checkedCities)
            })

          }

        }
      },
      getPowerList() {
        var _this = this

        PUBLIC.get('Auth.Conf._List', { type: 'api' }, function (data) {
          // console.log(data)
          var allList = {}
          var con = []
          for (let i = 0; i < data.length; i++) {
            if(allList[data[i].class]==undefined){
              allList[data[i].class]=[]
              _this.apiSelect[data[i].class]=[]
            }
            allList[data[i].class].push(data[i])
          }
          _this.allList = allList
          // console.log(_this.allList)
          _this.apis = con
          // console.log( _this.$refs.api)
          // console.log( _this.members[1])
          var title = 'api'
          // _this.$refs.api.getNow(con, title);
        })
      },
      changeOne(value, row) {
        console.log(value, row)
        // PUBLIC.get('Auth.Apis.Check', {
        //   fid: this.fid, ftype: 'user', server: value
        // },
        // data => {
        //   console.log(data)
        //   if( data === true) {
        //     PUBLIC.get('Auth.Apis.Set', { fid: this.fid, ftype: 'user', server: value, value: '0' }, data => {
        //       console.log(data)
        //     })
        //   } else {
        //     PUBLIC.get('Auth.Apis.Set', { fid: this.fid, ftype: 'user', server: value, value: '1' }, dataaa => {
        //       console.log(dataaa)
        //     })
        //   }
        // })
      }

    },
    mounted() {
      this.getPowerList()
      this.getUserList()
    }
  }

</script>
<style rel='stylesheet/scss' lang='scss' >
  .userGroup{
    color: #333333;
    position: relative;
    padding: 20px;
    .memberHead{
      padding: 0;
      p{
        padding-top: 100px;
      }
    }
    .el-table{
      .warning-row {
        background: #fff5f5;
      }
      .waiting{
        background-color: #f2ffff;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .el-button--text{
      padding: 10px;
    }
    .el-pagination{
      padding-top: 20px;
    }
    .addAdmin,.powerSet, .powerShow, .changeAdmin{
      z-index: 100;
      font-size: 14px;
      background-color: #fff;

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
    }
    .addAdmin, .changeAdmin{
      width: 500px;
      height: 400px;
      margin-left: -250px;
      position: fixed;
      top: 20%;
      left: 50%;
      .inner{
        padding:36px 16px;
        p{
          padding-bottom: 30px;
          .el-input--medium{
            width: 80%;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          >button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          >button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }
    .powerSet,.powerShow{
      width: 1000px;
      height: 1300px;
      margin-left: -500px;
      position: absolute;
      top: 10%;
      left: 50%;
      .inner{
        padding:60px 10px;
        p{
          padding-bottom: 30px;
          >span{
            margin-right: 100px;
          }
        }
        p:last-of-type{
          text-align: center;
          .el-button{
            margin: 50px ;
            width: 120px;
          }
        }
        .pSet{
          .left{
            display: inline-block;
            vertical-align: top;
          }
          .right{
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

    }
  }

</style>
