<template>
  <div class="app-container">
    <div class="memberHead">
      <p class="firstLine">
        <span class="phoneNum">使用状态：<selectKuang :selectData="useStatus" @value="useValue"></selectKuang></span>
        <span class="overTime">到期时间:<timeBox @value="searchTime"></timeBox></span></p>
      <p><span class="buttons"><el-button type="success">批量导出</el-button></span>
        <searchBox @searchKey='searchKey' :searchSelect='searchSelect'></searchBox></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <!--<el-table-column-->
        <!--prop="id"-->
        <!--label="ID">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="code"
        label="邀请码">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="到期时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="subaccount_num"
        label="子账号个数"
        width="150">
        <template slot-scope="scope">
          <span class="innerText" >{{scope.row.subaccount_num-1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="园所名称">
      </el-table-column>
      <el-table-column
        prop="user"
        label="负责人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="use_state"
        label="使用状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.use_state === '0'">未使用</span>
          <span class="innerText" v-else-if="scope.row.use_state === '1'">已使用</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="userPhone"
        label="使用会员"
        show-overflow-tooltip>
      </el-table-column> -->

    </el-table>
    <paginationBox :data='dataLength'  @getCurrent='handleCurrentChange'></paginationBox>
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
      codeType: 4,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      page: 1,
      dataLength: '',
      selectArg: {},
      tableData3: [],
      multipleSelection: [],
      searchSelect: [
        {
          value: 'code',
          label: '邀请码'
        }, {
          value: 'name',
          label: '园所名称'
        }, {
          value: 'username',
          label: '负责人'
        }, {
          value: 'user_phone',
          label: '手机号'
        }
      ],
      useStatus: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '已使用'
        }, {
          value: '0',
          label: '未使用'
        },
        {
          value: '',
          label: '全部'
        }
      ]
    }
  },
  methods: {
    handleCurrentChange(val) {

      this.page = val
      console.log(this.page)
      this.getCodeList(this.selectArg)
    },
    //获取总数
    getTotal() {
      // PUBLIC.get('Currency.receive.disAll', data => {
      //   console.log(data)
      //   this.dataLength = data.a
      // })
    },
    searchKey(e) {
      console.log(this.selectArg)
      this.page=1
      var op = this.selectArg
      op[e[0]] = e[1]
      console.log(op)
      this.getCodeList(op)
    },
    useValue(e) {
      this.page=1
      this.selectArg['use_state'] = e
      let ee = this.selectArg
      this.searchKey(ee)
    },
    searchTime(e) {
      this.page=1
      this.selectArg['star_time'] = e[0]
      this.selectArg['end_time'] = e[1]
      let ee = this.selectArg
      this.searchKey(ee)
    },
    getCodeList(keyword) {
      var _this=this
      var args = { page: this.page,iscode:0 }
      for(var k in keyword){
        args[k]=keyword[k]
      }
      keyword==keyword!=undefined ? keyword: ''
      console.log(args)
      PUBLIC.get('User.Mechanism.selmechall', args, function(data) {
        console.log(data)
        var newData = []
        var demo = {
          id: 'id',
          name: 'name',
          code: 'code',
          user: 'username',
          phone: 'user_phone',
          endTime: 'end_time',
          userPhone: 'user_phone',
          status: 'rec_status',
          use_state: 'use_state',
          subaccount_num:"subaccount_num",
          code:"code"
        }
        newData = PUBLIC.formatObj(demo,data)
        _this.tableData3 = newData
        console.log(typeof (_this.tableData3))
        // for (var i = 0; i < newData.length; i++) {
          // _this.getUserGroup(newData[i]['id'],_this.tableData3,i,newData)
        // }

        // console.log(_this.tableData3)
      },function(data){
        // console.log(data)
        _this.dataLength=parseInt(data.data.num)
        _this.pagesize=parseInt(data.data.pagenum)
        console.log(data.data.num)
      })
    },
  },
  mounted() {
    this.getCodeList()
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
