<template>
  <div class = 'allMember'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span class='phoneNum'>手机号：<selectKuang v-bind:selectData='phoneStatus' @value='phoneValue' ></selectKuang></span>
        <span class='phoneNum'>实名认证：<selectKuang  v-bind:selectData='relStatus' @value='relValue'></selectKuang></span><span class='phoneNum'>会员身份：<selectKuang  v-bind:selectData='userStatus' @value='userValue'></selectKuang></span>
        <span class='regTime'>注册时间:<timeBox @value='regTime'></timeBox></span><span class='overTime'>到期时间:<timeBox @value='endTime'></timeBox></span></p>
      <p><span class='buttons'>
        <!--<el-button type='primary'>全选</el-button><el-button type='danger'>批量冻结</el-button>-->
        <router-link to='/member/add-member'><el-button type='warning'>增加用户</el-button></router-link></span>
        <span class='record'>总记录：<span>{{dataLength}}</span>昨日新增：<span>{{yesterdayAdd}}</span>今日新增：<span>{{todayAdd}}</span>
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
        type='selection'
        width='55'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='会员ID'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='name'
        label='用户昵称'>
      </el-table-column>
      <el-table-column
        prop='telphone'
        label='绑定手机号'
        width='150'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='reg_time'
        label='注册时间'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='rel_status'
        label='是否实名'
        width='150'>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.rel_status === '0'">未实名</span>
          <span class="innerText" v-else-if="scope.row.rel_status === '1'">已实名</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='tid'
        label='会员身份'
        width='150'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.tid == 318">VIP会员</span>
          <span class="innerText" v-else-if="scope.row.tid ==317">机构子账号</span>
          <span class="innerText" v-else-if="scope.row.tid ==316">特权会员</span>
          <span class="innerText" v-else-if="scope.row.tid ==0">已过期</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='groupEndTime'
        label='到期时间'>
      </el-table-column>

      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link :to="'/member/member-info/' + scope.row.id "><el-button type='text' size='small'>查看</el-button></router-link>
          <!--<router-link :to="'/member/edit-member/' + scope.row.id ">-->
            <el-button type='text' size='small' @click="edit(scope.row)">编辑</el-button>
          <!--</router-link>-->
          <el-button type='text' size='small' @click="open2(scope.row)" v-if="scope.row.user_status == 1" >冻结</el-button>
          <el-button type='text' size='small' @click="open2(scope.row)" v-if="scope.row.user_status == -1 " >解冻</el-button>
        </template>
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
        PUBLIC.get('User.User.Userlist', args, (data) => {
          // console.log(data)
          var newData = []
          var demo = {
            id:'Id',
            user_status: 'user_status',
            name:'name',
            telphone:'telphone',
            reg_time:'reg_time',
            rel_status:'rel_status'
          }
          newData = PUBLIC.formatObj(demo,data)
          for(var i=0;i<newData.length;i++){
            _this.getUserGroup(newData[i].id,newData,i,newData)
          }
          _this.tableData3 = newData
          // console.log(_this.tableData3)
        },function(data){
        // console.log(data)
        _this.dataLength=parseInt(data.data.num)
        _this.pagesize=parseInt(data.data.pagenum)
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

  }

</style>
