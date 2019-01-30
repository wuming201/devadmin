<template>
  <div class = 'allMember'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span></span></p>
      <p><span class='buttons'>
        <!--<el-button type='primary'>全选</el-button><el-button type='danger'>批量冻结</el-button>-->
        <router-link to='/member/add-member'><el-button type='warning'>批量导出</el-button></router-link></span><span class='phoneNum'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;课表状态：<selectKuang v-bind:selectData='phoneStatus' @value='phoneValue' ></selectKuang></span>
        <span class='regTime'>&emsp;&emsp;课表年份:
          <el-date-picker
            v-model="searchYear"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
            @change="yearValue">
          </el-date-picker>
          <selectKuang v-bind:selectData='semesterStatus' @value='semesterValue' ></selectKuang></span>
        <span class='record'>
          <!--<searchBox @searchKey='searchKey' @cleanIt='cleanIt' v-bind:searchSelect='searchSelect'></searchBox>-->
        </span></p>

    </div>
    <el-table
      ref='multipleTable'
      :data='tableData3'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='yuansuo'
        label='幼儿园'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='jigou'
        label='执教机构'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='合约'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='year'
        label='课表年份'
        width='200'>
      </el-table-column>
      <el-table-column
        prop='semester'
        label='学期'
        width='300'>
      </el-table-column>
      <el-table-column
        prop='hourNum'
        label='课时数'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='weeks'
        label='授课周期'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='timeQuantum'
        label='授课时段'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='lessonsNum'
        label='课节数'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='tecId'
        label='执教老师'
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' :page='page' :pageSize="pagesize" @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
  import { searchBox, selectKuang, timeBox, paginationBox } from '../../components/index'
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
        list: null,
        listLoading: true,
        downloadLoading: false,
        isUser: false,
        changeData: 1, //监控tid数据更新
        filename: '',
        page: 1,
        pagesize: '',
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
            label: '执教机构'
          }, {
            value: 'name',
            label: '幼儿园'
          }, {
            value: 'id',
            label: '合约编号'
          }
        ],
        phoneStatus: [
          {
            value: '',
            label: '全部'
          }, {
            value: 0,
            label: '确认中'
          }, {
            value: 1,
            label: '待开课'
          }, {
            value: 2,
            label: '已开课'
          }, {
            value: -1,
            label: '已撤回'
          }
        ],
        semesterStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '上半学期',
            label: '上半学期'
          },
          {
            value: '下半学期',
            label: '下半学期'
          }
        ],
        selectArg: {},
        adataaa: 1,
        searchYear: ''
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
        // var yester = PUBLIC.getYesterday()
        // var today = PUBLIC.getToday()
        // var now = PUBLIC.getNow()
        // console.log(today, yester, now)
        // PUBLIC.get('User.User.usercount',{ 'regstr_time': yester, regend_time: today }, data => {
        //   this.yesterdayAdd = data
        // })
        // PUBLIC.get('User.User.usercount',{ 'regstr_time': today, regend_time: now }, dataa => {
        //   this.todayAdd = dataa
        // })
      },
      getUserList(keyword) {
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
        PUBLIC.get('Curriculum.listese.findList', args, (data) => {
          this.tableData3=[]
          console.log(data)
          // if(data != '') {
            for(let i in data) {
              PUBLIC.get('User.Company.seltid',{ tid: data[i].tid}, v =>{
                console.log(v)
                if(v != false) {
                  data[i]['yuansuo'] = v.company_name
                }
                PUBLIC.get('User.Company.seltid',{ tid: data[i].oid}, v1 =>{
                  console.log(v1)
                  if(v1 != false) {
                    data[i]['jigou'] = v1.company_name
                  }
                  this.tableData3.push(data[i])
                })
              })
            }
          // }else{
          //   this.tableData3 = []
          // }
        },(res) => {
          console.log(res)
          this.dataLength = res.data.num
          this.pagesize = res.data.pagnum
          console.log(this.dataLength,this.pagesize)
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
        if(this.selectArg[e[0]] == 'year' || this.selectArg[e[0]] == 'semester') {
          this.selectArg[e[0]]=e[1]
          var op = this.selectArg
          // op[e[0]] = e[1]
          console.log(op)
          delete op.undefined
          this.getUserList(op)
        }else{
          this.selectArg[e[0]]=e[1]
          var op = this.selectArg
          // op[e[0]] = e[1]
          console.log(op)
          delete op.undefined
          this.getUserList(op)
          this.cleanIt()
        }
        // if(e!=undefined &&["id","telphone","name"].indexOf(e[0])){
        //   delete this.selectArg["id"]
        //   delete this.selectArg["telphone"]
        //   delete this.selectArg["name"]
        //   this.selectArg[e[0]]=e[1]
        // }
      },
      phoneValue(e) {
        this.selectArg['on_statu'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { on_statu: e } //获取搜索值
        // this.getTotal(aaa)
      },
      semesterValue(e) {
        // console.log( this.selectArg)
        this.selectArg['semester'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        // let aaa = { year: e } //获取搜索值
        // this.getTotal(aaa)
      },
      yearValue(e) {
        // console.log( this.selectArg)
        this.selectArg['year'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        // let aaa = { usertype: e } //获取搜索值
        // this.isUser = true
        // if(e == '') {
        //   this.isUser = false
        // }
        // this.getTotal(aaa)
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
      }
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
        .phoneNum{
          .selectKuang{
            width: 124px;
          }
          .el-input{
            width: 124px;
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

  }

</style>
