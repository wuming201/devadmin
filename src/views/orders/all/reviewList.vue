<template>
  <div class = 'allMember'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span class='phoneNum'>课评状态：<selectKuang v-bind:selectData='phoneStatus' @value='phoneValue' ></selectKuang></span>
        <span class='regTime'>课评结果:<selectKuang v-bind:selectData='phoneStatus' @value='phoneValue' ></selectKuang></span><span class='overTime'>回评时间:<timeBox @value='endTime'></timeBox></span></p>
      <p><span class='buttons'>
        <el-button type='success'>批量导出</el-button><router-link to="/orders/schedule"><el-button type='warning'>课时日程</el-button></router-link>
        <router-link to='/orders/changeLesson'><el-button type='danger'>调课记录</el-button></router-link>
          <searchBox @searchKey='searchKey' @cleanIt='cleanIt' v-bind:searchSelect='searchSelect'></searchBox></span></p>

    </div>
    <el-table
      ref='multipleTable'
      :data='tableData3'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <!--@select-all="getAll"-->
      <!--@select="getOne"	-->
      <el-table-column
        prop='id'
        label='幼儿园'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='执教机构'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='执教老师'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='bid'
        label='授课班级'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='bid'
        label='配班老师'
        width='100'>
      </el-table-column>
      <el-table-column
        prop='createTime'
        label='提交时间'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='telphone'
        label='状态'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='reviewTime'
        label='回评时间'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='attireScreen'
        label='着装'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='atmosphereScreen'
        label='评分'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='safetyScreen'
        label='安全'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='telphone'
        label='安全描述'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='desc'
        label='备注'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='signUrl'
        label='老师签字'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText"><img :src="scope.row.signUrl" alt=""></span>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' :page='page' :pageSize="pagesize" @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
  import { searchBox, selectKuang, timeBox, paginationBox } from '../../../components/index'
  export default {
    name: 'allMember',
    components: {
      searchBox,
      selectKuang,
      timeBox,
      paginationBox
    },
    data() {
      return {
        showChange: true,
        list: null,
        listLoading: true,
        downloadLoading: false,
        isUser: false,
        changeData: 1, //监控tid数据更新
        filename: '',
        page: 1,
        pagesize: 40,
        dataLength: '',
        yesterdayAdd: '',
        todayAdd: '',
        selectAll: [],
        selectAllData: [],
        tableData3: [],
        multipleSelection: [],
        searchSelect: [
          {
            value: 'telphone',
            label: '手机号'
          }, {
            value: 'name',
            label: '当前昵称'
          }, {
            value: 'id',
            label: '用户ID'
          }
        ],
        phoneStatus: [
          {
            value: '',
            label: '全部'
          }, {
            value: 1,
            label: '已验证'
          }, {
            value: 0,
            label: '未验证'
          }
        ],
        relStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 1,
            label: '已验证'
          },
          {
            value: 0,
            label: '未验证'
          }
        ],
        userStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 318,
            label: 'VIP用户'
          },
          {
            value: 317,
            label: '机构用户'
          },
          {
            value: 316,
            label: '特权用户'
          }
        ],
        selectArg: {},
        adataaa: 1
      }
    },
    created() {
      // localStorage.removeItem('pageInfo')
      console.log(this.$route.query.page)
      if(this.$route.query.page != undefined) {
        this.page = this.$route.query.page
      }
    },
    methods: {
      deactivated() {
        this.$destroy()
      },
      passIt() {
        this.showChange = !this.showChange
      },
      open2(row) {
        // console.log(row)
        if( row.user_status == 1) {
          this.$confirm('账号冻结后，用户将不能再使用账号密码、短信验证码、第三方登录', '提示', {
            confirmButtonText: '冻结',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // console.log('111111')
            this.$message({
              type: 'success',
              message: '冻结成功!'
            });
            PUBLIC.get("User.User.updateuser",{uid:row.id,user_status: -1},function(data){
              row.user_status = -1
            })
          }).catch(() => {
            // console.log('2222222')
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$confirm('账号解冻后，用户将可以继续使用账号密码、短信验证码、第三方登录', '提示', {
            confirmButtonText: '解冻',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // console.log('111111')
            this.$message({
              type: 'success',
              message: '解冻成功!'
            });
            PUBLIC.get("User.User.updateuser",{uid:row.id,user_status: 1},function(data){
              row.user_status = 1
            })
          }).catch(() => {
            // console.log('2222222')
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }

      },
      edit(row) {
        localStorage.setItem("pageInfo",JSON.stringify(this.keyword))
        console.log(this.page)
        this.$router.push({ name: '会员编辑', params: { id: row.id, page: this.page }})
      },
      info(row) {
        this.$router.push({ name: '会员详情', params: { id: row.id }})
      },
      handleCurrentChange(val) {
        this.page = val
        // console.log(this.page)
        this.getUserList(this.keyword)
      },
      //获取三个小数据
      getTotal(values) {
        // PUBLIC.get('User.User.usercount', values, data => {
        //   this.dataLength = data
        // })
        //昨天
        var yester = PUBLIC.getYesterday()
        var today = PUBLIC.getToday()
        var now = PUBLIC.getNow()
        // console.log(today, yester, now)
        PUBLIC.get('User.User.usercount',{ 'regstr_time': yester, regend_time: today }, data => {
          this.yesterdayAdd = data
        })
        PUBLIC.get('User.User.usercount',{ 'regstr_time': today, regend_time: now }, dataa => {
          this.todayAdd = dataa
        })
      },
      getUserList: function(keyword) {
        var _this = this
        this.keyword = keyword
        var args = { page: this.page }
        // console.log(keyword)
        for (var k in this.keyword) {
          args[k] = keyword[k]
        }
        this.args = args
        // console.log(args)
        this.keyword == this.keyword != undefined ? this.keyword : ''
        PUBLIC.get('Curriculum.lessonese.findReview', args, (data) => {
          console.log(data)
       })
      },
      getUserGroup: function(id, relData, index, newData) {
        // console.log(id, relData, index, newData)
        var _this = this
        PUBLIC.get('Team.User.TeamList',{uid:id},function(data){
          // console.log(data)
          if (_this.isUser === true && data == ''){
            newData[index]['tid'] = 0
            _this.tableData3 = JSON.parse(JSON.stringify(newData))
            _this.changeData += 1
            return
          } else if (data == '') {
            return
          }
          let min = data[0].id
          for(let i = 0; i < data.length; i++) {
            // console.log(data[i])
            // console.log(data[0].id)
            if(data[i].id < min) {
              min = data[i].id
              // console.log(min)
            }
            // console.log(newData[index])
            newData[index]['tid'] = min
            // console.log(newData[index]['tid'])
          }
          newData[index]['groupEndTime'] = data[0]['end_time']
          _this.tableData3 = JSON.parse(JSON.stringify(newData))
          // console.log(relData[index])
        })
      },
      cleanIt() {
        var op = this.selectArg
        for(var i in op) {
          delete op[i]
        }
      },
      searchKey(e) {
        this.page = 1
        console.log(e[0])
        this.selectArg[e[0]]=e[1]
        // if(e!=undefined &&["id","telphone","name"].indexOf(e[0])){
        //   delete this.selectArg["id"]
        //   delete this.selectArg["telphone"]
        //   delete this.selectArg["name"]
        //   this.selectArg[e[0]]=e[1]
        // }
        var op = this.selectArg
        // op[e[0]] = e[1]
        // console.log(op)
        delete op.undefined
        this.getUserList(op)
        this.cleanIt()
      },
      phoneValue(e) {
        // console.log( this.selectArg)
        this.selectArg['phone_status'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { phone_status: e } //获取搜索值
        this.getTotal(aaa)
      },
      relValue(e) {
        this.selectArg['issming'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { issming: e } //获取搜索值
        this.getTotal(aaa)
      },
      userValue(e) {
        this.selectArg['usertype'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { usertype: e } //获取搜索值
        this.isUser = true
        if(e == '') {
          this.isUser = false
        }
        this.getTotal(aaa)
      },
      regTime(e) {
        this.selectArg['regstr_time'] = e[0]
        this.selectArg['regend_time'] = e[1]
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { regstr_time: e[0], regend_time: e[1] } //获取搜索值
        this.getTotal(aaa)
      },
      endTime(e) {
        this.selectArg['daoqstr_time'] = e[0]
        this.selectArg['daoqend_time'] = e[1]
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { daoqstr_time: e[0], daoqend_time: e[1] } //获取搜索值
        this.getTotal(aaa)
      },
    //  全选
    //   getAll(a) {
    //     console.log(a)
    //     this.selectAllData = this.selectAllData.concat(a)
    //     console.log(this.selectAllData)
    //   },
    //   getOne(e) {
    //     console.log(e)
    //     this.selectAllData = this.selectAllData.concat(e)
    //   }
    },
    mounted() {
      var relName = this.$route.params.rel_name
      var tid = this.$route.params.tid
      console.log(relName, tid)
      console.log(localStorage.pageInfo)

      if(localStorage.pageInfo !== '' && localStorage.pageInfo !== undefined && localStorage.pageInfo !== 'undefined'){
        this.getUserList(JSON.parse(localStorage.pageInfo))
        localStorage.removeItem('pageInfo')
      }else{
        this.getUserList()
      }
      this.getTotal()
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .allMember{
    color: #333333;
    padding: 25px;
    padding-bottom: 80px;
    .memberHead{
      height: 150px;
      padding: 0;
      p{
        padding-top: 10px;
        line-height: 65px;
        font-size: 14px;
        .buttons{
          .el-button{
            margin: 0;
            border-radius: 0;
          }
        }
        .record{
          float: right;
          >span{
            color: red;
            padding-right: 20px;
            font-weight: bold;
          }
        }
        .searchBox{
          display: inline-block;
          float: right;
        }
      }
      .firstLine{
        >span{
          padding-right: 20px;
          .selectKuang{
            width: 124px;
          }
          .el-input{
            width: 124px;
          }
        }
        .regTime{
          margin-right: 5%;
          .timeBox{
            display: inline-block;
          }
        }
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
    .el-pagination{
      padding-top: 20px;
    }
    .pass{
      z-index: 100;
      width: 500px;
      height: 400px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -250px;
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
      .inner{
        padding:36px 16px;
        p{
          padding-bottom: 30px;
          .el-input{
            width: 30%;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        .radios{
          text-align: center;
          .el-radio{
            margin: 0 20px;
          }

        }
        p:last-of-type{
          padding-top: 40px;
          button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }

  }

</style>
