<template>
  <div class = 'allMember'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span></span></p>
      <p><span class='buttons'>
        <span class='buttons'><el-button type='success'>批量导出</el-button></span>
          <searchOne class="fr" @searchKey='searchKey' v-bind:holder = 'msg'></searchOne></span></p>

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
        prop='compName'
        label='执教机构'
        width='300'>
      </el-table-column>
      <el-table-column
        prop='name'
        label='套餐名称'
        width='200'>
      </el-table-column>
      <el-table-column
        prop='plan'
        label='包含教案'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-for="(item,index) in scope.row.plan">{{index+1}}-{{item.name}}&emsp;</span>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' :page='page' :pageSize="pagesize" @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
  import { searchOne, selectKuang, timeBox, paginationBox } from '../../components/index'
  export default {
    name: 'allMember',
    components: {
      searchOne,
      selectKuang,
      timeBox,
      paginationBox
    },
    data() {
      return {
        msg:'请输入关键词',
        list: null,
        listLoading: true,
        downloadLoading: false,
        isUser: false,
        changeData: 1, //监控tid数据更新
        filename: '',
        page: 1,
        pagesize: 0,
        dataLength:0,
        yesterdayAdd: '',
        todayAdd: '',
        selectAll: [],
        selectAllData: [],
        tableData3: [],
        multipleSelection: [],
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
        var args = { page: this.page,type: 3, }
        // console.log(keyword)
        for (var k in this.keyword) {
          args[k] = keyword[k]
        }
        this.args = args
        // console.log(args)
        this.keyword == this.keyword != undefined ? this.keyword : ''
        PUBLIC.get('Curriculum.mealese.findMeal', args, (data) => {
          let arr = []
          console.log(data)
          arr = data
          for(let i in arr) {
            PUBLIC.get('User.Appuser.selcompany', {tid: arr[i].tid}, v=>{
              if(v == '') {
                this.tableData3 = []
              }else{
                arr[i]['compName'] = v.company_name
                console.log(this.tableData3[i])
                this.tableData3.push(arr[i])
              }
            })
          }
        },function (res) {
          console.log(res.data)
          _this.dataLength = Number(res.data.num)
          _this.pagesize = Number(res.data.pagenum)
        })
      },
      // getUserGroup: function(id, relData, index, newData) {
      //   // console.log(id, relData, index, newData)
      //   var _this = this
      //   PUBLIC.get('Team.User.TeamList',{uid:id},function(data){
      //     // console.log(data)
      //     if (_this.isUser === true && data == ''){
      //       newData[index]['tid'] = 0
      //       _this.tableData3 = JSON.parse(JSON.stringify(newData))
      //       _this.changeData += 1
      //       return
      //     } else if (data == '') {
      //       return
      //     }
      //     let min = data[0].id
      //     for(let i = 0; i < data.length; i++) {
      //       // console.log(data[i])
      //       // console.log(data[0].id)
      //       if(data[i].id < min) {
      //         min = data[i].id
      //         // console.log(min)
      //       }
      //       // console.log(newData[index])
      //       newData[index]['tid'] = min
      //       // console.log(newData[index]['tid'])
      //     }
      //     newData[index]['groupEndTime'] = data[0]['end_time']
      //     _this.tableData3 = JSON.parse(JSON.stringify(newData))
      //     // console.log(relData[index])
      //   })
      // },
      cleanIt() {
        var op = this.selectArg
        for(var i in op) {
          delete op[i]
        }
      },
      searchKey(e) {
        this.page = 1
        console.log(e)
        // this.selectArg[e[0]]=e[1]
        // // if(e!=undefined &&["id","telphone","name"].indexOf(e[0])){
        // //   delete this.selectArg["id"]
        // //   delete this.selectArg["telphone"]
        // //   delete this.selectArg["name"]
        // //   this.selectArg[e[0]]=e[1]
        // // }
        var op = []
        op['name'] = e[0]
        // // console.log(op)
        // delete op.undefined
        this.getUserList(op)
        // this.cleanIt()
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
