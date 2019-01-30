<template>
  <div class = 'allMember'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span class='phoneNum'>合约状态：<selectKuang v-bind:selectData='phoneStatus' @value='phoneValue' ></selectKuang></span>
        <!--<span class='regTime'>签约日期:<timeBox @value='regTime'></timeBox></span>-->
        <span class='overTime'>结束日期:<timeBox @value='endTime'></timeBox></span></p>
      <p><span class='buttons'>
        <!--<el-button type='primary'>全选</el-button><el-button type='danger'>批量冻结</el-button>-->
        <router-link to='/member/add-member'><el-button type='warning'>增加用户</el-button></router-link></span>
        <span class='record'>总记录：<span>{{dataLength}}</span>昨日新增：<span>{{yesterdayAdd}}</span>今日新增：<span>{{todayAdd}}</span>
          <!--<searchBox @searchKey='searchKey' @cleanIt='cleanIt' v-bind:searchSelect='searchSelect'></searchBox>-->
        </span></p>

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
        prop='number'
        label='合约编号'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='mealName'
        label='签约套餐'
        width='200'>
      </el-table-column>
      <el-table-column
        prop='startTime'
        label='服务期限'
        width='300'>
        <template slot-scope="scope">
          <span class="innerText"><span style="display:inline-block;width:80px; height: 16px; overflow: hidden">{{scope.row.startTime}}</span>- <span  style="display:inline-block;width:80px; height: 16px; overflow: hidden">{{scope.row.endTime}}</span></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='on_statu'
        label='合约状态'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.on_statu === '0'">无效</span>
          <span class="innerText" v-else-if="scope.row.on_statu === '1'">有效</span>
        </template>
      </el-table-column>
      <el-table-column
        prop='makeTime'
        label='结束日期'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='reslutFor'
        label='备注'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='creater'
        label='创建人'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='admin'
        label='处理人'
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
            value: 1,
            label: '已签约'
          }, {
            value: 2,
            label: '服务中'
          }, {
            value: 3,
            label: '已到期'
          }, {
            value: 4,
            label: '合约终止中'
          }, {
            value: 5,
            label: '合约已终止'
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
        this.tableData3 = []
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
        PUBLIC.get('Curriculum.signese.findData', args, (data) => {
          console.log(data)
          // this.tableData3 = data
          for(let i in data) {
            PUBLIC.get('User.Company.seltid',{ tid: data[i].tid}, v =>{
              console.log(v)
              if(v != false) {
                data[i]['jigou'] = v.company_name
              }
            })
            PUBLIC.get('User.Company.seltid',{ tid: data[i].oid}, v1 =>{
              console.log(v1)
              if(v1 != false) {
                data[i]['yuansuo'] = v1.company_name
              }
              PUBLIC.get('User.User.Userlist',{ id: data[i].people}, v2 =>{
                console.log(v2)
                if(v2 != false) {
                  data[i]['admin'] = v2[0].rel_name
                }
                PUBLIC.get('User.User.Userlist',{ id: data[i].initiator}, v3 =>{
                  console.log(v3)
                  if(v3 != false) {
                    data[i]['creater'] = v3[0].rel_name
                  }
                })
                this.tableData3.push(data[i])
              })
            })
          }
        },function (res) {
          console.log(res.data)
          _this.dataLength = Number(res.data.num)
          _this.pagesize = Number(res.data.pagenum)
        })
      },
      getUserGroup: function(id, relData, index, newData) {
        // console.log(id, relData, index, newData)
        // var _this = this
        // PUBLIC.get('Team.User.TeamList',{uid:id},function(data){
        //   // console.log(data)
        //   if (_this.isUser === true && data == ''){
        //     newData[index]['tid'] = 0
        //     _this.tableData3 = JSON.parse(JSON.stringify(newData))
        //     _this.changeData += 1
        //     return
        //   } else if (data == '') {
        //     return
        //   }
        //   let min = data[0].id
        //   for(let i = 0; i < data.length; i++) {
        //     // console.log(data[i])
        //     // console.log(data[0].id)
        //     if(data[i].id < min) {
        //       min = data[i].id
        //       // console.log(min)
        //     }
        //     // console.log(newData[index])
        //     newData[index]['tid'] = min
        //     // console.log(newData[index]['tid'])
        //   }
        //   newData[index]['groupEndTime'] = data[0]['end_time']
        //   _this.tableData3 = JSON.parse(JSON.stringify(newData))
        //   // console.log(relData[index])
        // })
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
        this.selectArg['on_statu'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { on_statu: e } //获取搜索值
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
        this.selectArg['start_time'] = e[0]
        this.selectArg['end_time'] = e[1]
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { regstr_time: e[0], regend_time: e[1] } //获取搜索值
        this.getTotal(aaa)
      },
      endTime(e) {
        this.selectArg['start_time'] = e[0]
        this.selectArg['end_time'] = e[1]
        let ee = this.selectArg
        this.searchKey(ee)
        let aaa = { regstr_time: e[0], regend_time: e[1] } //获取搜索值
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

  }

</style>
