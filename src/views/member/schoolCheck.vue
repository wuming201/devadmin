<template>
  <div class="app-container">
    <div class="memberHead">
      <p class="firstLine"><span class="phoneNum">审核状态：<selectKuang :selectData='checkStatus' @value="checkValue"></selectKuang></span><span class="phoneNum">处理人：<selectKuang :selectData='adminStatus'></selectKuang></span><span class="overTime">到期时间:<timeBox></timeBox></span></p>
      <p><span class="buttons"><el-button type="primary">全选</el-button>
        <!--<el-button type="danger">批量拒绝</el-button><el-button type="success">批量审核</el-button>-->
      </span><searchBox :searchSelect="selectData" @searchKey='searchKey'></searchBox></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="scData"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="name"
        label="申请人"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="单位名称"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="username"
        label="负责人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="code"
        label="联系电话"
        width="150">
      </el-table-column>
      <el-table-column
        prop="time"
        label="提交时间"
        width="180"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText">{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rec_status"
        label="审核状态"
        width="150">
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.rec_status === '0'">未审核</span>
          <span class="innerText" v-else-if="scope.row.rec_status === '-1'">未通过</span>
          <span class="innerText" v-else-if="scope.row.rec_status === '1'">已审核</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="proname"
        label="处理人"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="beizhu"
        label="处理时间">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="操作"
        width="150"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link  v-if="scope.row.type=='ls'" :to="'/member/school-examine/' + scope.row.id + 'checkHis'"><el-button type="text" size="small">查看</el-button></router-link>
          <!--<router-link  v-if="scope.row.type!='ls'" :to="'/member/school-examine/' + scope.row.id + 'check'">-->
            <el-button v-if="scope.row.type!='ls'" type="text" size="small" @click="checkIt(scope.row)">查看</el-button>
          <!--</router-link>-->
          <el-button type="text" size="small" v-if="scope.row.type!='ls' && scope.row.rec_status === '0'" @click="examIt(scope.row)">审核</el-button>
        </template>
      </el-table-column>

    </el-table>
    <paginationBox :data='dataLength' :page='page' @getCurrent='handleCurrentChange'></paginationBox>
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
        scData: [],
        page: 1,
        pagesize: 40,
        dataLength: '',
        multipleSelection: [],
        selectArg: {},
        adminStatus: [],
        selectData1:[

          {
            value: '',
            label: '全部'
          }
        ],
        selectData: [ {
            label:"园所名称",
            value:"name"
          }, {
            label:"用户ID",
            value:"uid"
          }, {
            label:"邀请码",
            value:"code"
          }, {
            value: 'user_phone',
            label: '手机号'
          }
        ],
        checkStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '已通过'
          }, {
            value: '-1',
            label: '未通过'
          }, {
            value: '0',
            label: '未审核'
          }
        ]
      }
    },
    created() {
      console.log(this.$route.query.page)
      if(this.$route.query.page != undefined) {
        this.page = this.$route.query.page
      }
    },
    methods: {
      handleSelectionChange(){},
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getSchoolList()
      },
      //获取总数
      getTotal() {
        // PUBLIC.get('User.User.usercount', data => {
        //   this.dataLength = data
        // })
      },
      searchKey(e) {
        console.log(e)
        console.log(e[0])
        console.log("code" in ["uid","name","code"] )
        if(e!=undefined && ["uid","name","code"].indexOf(e[0])){
          console.log("清理数据")
          delete this.selectArg["uid"]
          delete this.selectArg["name"]
          delete this.selectArg["code"]
          this.selectArg[e[0]]=e[1]
        }
        var op = this.selectArg
        op[e[0]] = e[1]
        console.log(op)
        this.getSchoolList(op)
      },
      checkValue(e) {
        this.selectArg['rec_status'] = e
        this.getSchoolList(this.selectArg)
      },
      regTime(e) {
        this.selectArg['regstr_time'] = e[0]
        this.selectArg['regend_time'] = e[1]
      },
      endTime(e) {
        this.selectArg['daoqstr_time'] = e[0]
        this.selectArg['daoqend_time'] = e[1]
      },
      checkIt(row) {
        localStorage.setItem("pageInfo",JSON.stringify(this.keyword))
        console.log(row.id)
        this.$router.push({ name: '审核详情', params: { id: row.id, page: this.page, check: 1 }})
      },
      examIt(row) {
        console.log(row)
        if (row.rec_status === '1' || row.rec_status === '-1') {
          this.$alert(row.name + '为已审核状态，请勿重复审核！', {
            confirmButtonText: '确定'
          })
          return
        }
        this.$router.push({ name: '审核园所', params: { id: row.id }})
      },
      getSchoolList(keyword) {
        var _this=this
        this.keyword = keyword
        // var args = { page: 1 }
        var args = { page: this.page, use_state: 1 }
        for(var k in keyword){
          args[k]=keyword[k]
        }
        keyword==keyword!=undefined ? keyword: ''
        console.log(args)
        PUBLIC.get('User.Mechanism.selmechall', args, function(data) {
          var newData = []
          var demo = {
            id:"id",
            user_phone: 'user_phone',
            id: 'id',
            uid: 'uid',
            name: 'name',
            username: 'username',
            code: 'code',
            time: 'time',
            end_time: 'end_time',
            proname: 'proname',
            beizhu: 'beizhu',
            rec_status: 'rec_status',
            type:"type"
          }

          newData = PUBLIC.formatObj(demo,data)
          _this.scData = newData
        },function(data){
        // console.log(data)
        _this.dataLength=parseInt(data.data.num)
        _this.pagesize=parseInt(data.data.pagenum)
        console.log(data.data.num)
      })
      }
    },
    mounted() {
      console.log(localStorage)
      if(localStorage.pageInfo !== '' && localStorage.pageInfo !== undefined && localStorage.pageInfo !== 'undefined'){
        this.getSchoolList(JSON.parse(localStorage.pageInfo))
        localStorage.removeItem('pageInfo')
      }else{
        this.getSchoolList()
      }
      this.getTotal()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .app-container{
    color: #333333;
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
            width: 120px;
          }
          .el-input{
            width: 120px;
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
