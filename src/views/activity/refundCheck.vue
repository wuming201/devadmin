<template>
  <div class = 'app-container'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span class='payWay'>支付方式：<selectKuang :selectData='way' @value='payValue'></selectKuang></span>
        <span class='phoneNum'>审核状态：<selectKuang  v-bind:selectData='audit' @value='relValue'></selectKuang></span><span class='phoneNum'>处理人：<selectKuang  v-bind:selectData='manage' @value='userValue'></selectKuang></span>
      </p>
      <p><span class='buttons'><el-button type='primary'>全选</el-button><el-button type='danger'>批量拒绝</el-button><el-button type='success'>批量通过</el-button><el-button type='primary'>批量导出</el-button></span>
        <span><searchBox @searchKey='searchKey' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='refundlData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'
      @selection-change='handleSelectionChange'>
      <el-table-column
        type='selection'
        width='55'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='ID'>
      </el-table-column>
      <el-table-column
        prop='order_id'
        label='处理单号'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='报名单号'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='username'
        label='用户名'>
      </el-table-column>
      <el-table-column
        prop='way'
        label='支付方式'>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.way === '-1'">额</span>
          <span class="innerText" v-else-if="scope.row.way === '1'">支</span>
          <span class="innerText" v-else-if="scope.row.way === '0'">付2</span>
          <span class="innerText" v-else>错数据</span>
        </template>
      </el-table-column>
      <el-table-column
        prop='money'
        label='支付金额'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='end_time'
        label='支付时间'>
      </el-table-column>
      <el-table-column
        prop='audit'
        label='审核状态'>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.audit === '-1'">未通过</span>
          <span class="innerText" v-else-if="scope.row.audit === '1'">已通过</span>
          <span class="innerText" v-else-if="scope.row.audit === '0'">未审核</span>
          <span class="innerText" v-else>错数据</span>
        </template>
      </el-table-column>
      <el-table-column
        prop='manage'
        label='处理人'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.audit === '0'" type='text' size='small' @click="passIt(scope.row)">通过</el-button>
          <el-button v-if="scope.row.audit === '0'" type='text' size='small' @click="rejectIt(scope.row)">拒绝</el-button>
          <el-button v-if="scope.row.audit === '1' || scope.row.audit === '2'" type='text' size='small' style="color: black">已审核</el-button>
        </template>
      </el-table-column>

    </el-table>
    <paginationBox :data='dataLength' @getCurrent='handleCurrentChange'></paginationBox>
    <div class="pass" v-show="showPass">
      <h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人： {{manages}}</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="4"
            v-model="des"
            placeholder="请输入通过原因！">
          </el-input>
        </p>
        <p><el-button type="success" @click="passAduit(2)">提交</el-button><el-button type="info" @click="passIt">取消</el-button></p>
      </div>
    </div>
    <div class="reject" v-show="showReject">
      <h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人：{{manages}}</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="4"
            v-model="des"
            placeholder="请输入拒绝原因！">
          </el-input>
        </p>
        <p><el-button type="danger" @click="rejectAduit(1)">拒绝</el-button><el-button type="info" @click="rejectIt">取消</el-button></p>
      </div>
    </div>
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
        des: '',
        manages: 'admin',
        showPass: false,
        showReject: false,
        showBox: false,
        downloadLoading: false,
        page: 1,
        pagesize: 40,
        dataLength: '',
        // searchKey: '',
        tableData3: [],
        multipleSelection: [],
        searchSelect: [
          {
            value: 'name',
            label: '用户名'
          }, {
            value: 'order_id',
            label: '处理单号'
          }
        ],
        way: [
          {
            value: ' ',
            label: '全部'
          }, {
            value: 1,
            label: '1'
          }, {
            value: 0,
            label: '0'
          }
        ],
        audit: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 0,
            label: '未审核'
          },
          {
            value: 1,
            label: '成功'
          },
          {
            value: -1,
            label: '失败'
          }
        ],
        manage: [
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
        refundlData: [],
        refundOne: {},
        selectArg: {},
        pagesize: ''
      }
    },
    methods: {
      checkInfo() {
        console.log(this.showBox)
        this.showBox = !this.showBox
      },
      passIt(row) {
        this.showPass = !this.showPass
        this.refundOne = row
      },
      rejectIt(row) {
        this.showReject = !this.showReject
        this.refundOne = row
      },
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getUserList()
      },
      getRefundList:function(keyword) {
        var _this = this
        var args = { page: this.page }
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Active.actives.refundAudit', args, function(data) {
          console.log(data)
          // var newData = []
          var demo = {
            id: 'id',
            order_id: 'order_id',
            username: 'name',
            way: 'way',
            audit: 'audit',
            manage: 'manage'
          }
          var newData = PUBLIC.formatObj(demo, data)
          for (var i in data) {
            (function (i) {
              PUBLIC.get('Order.receive.orderfindmess', { oid: data[i].order_id }, (v) => {
                newData[i]["money"] = v.money
                newData[i]["end_time"] = v.end_time
                newData[i]["way"] = v.way
                // this.sListData = newData
                _this.refundlData=JSON.parse(JSON.stringify(newData))
                console.log(_this.refundlData)
              })
            })(i)
          }
        },function(data){
          // console.log(data)
          _this.dataLength=parseInt(data.data.num)
          _this.pagesize=parseInt(data.data.pagenum)
          console.log(data.data.num)
        })
      },
      searchBox(e) {
        console.log(11111111111)
        console.log(e)
        var op = this.selectArg
        op['key'] = e[0]
        op['search'] = e[1]
        this.getRefundList(op)
      },
      searchKey(e) {
        console.log(11111111111)
        console.log(e)
        var op = this.selectArg
        this.getRefundList(op)
      },
      payValue(e) {
        this.selectArg['way'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      relValue(e) {
        this.selectArg['audit'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      userValue(e) {
        this.selectArg['manage'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      passAduit(audit) {
        // _this.des = { des: this.des}
        // console.log(_this.des)
        PUBLIC.get('Active.actives.auditProcessing', { id: this.refundOne.id, audit: audit, manage: this.manages }, function(data) {
          console.log(data)
          this.showPass = !this.showPass
        })
      },
      rejectAduit(audit) {
        var _this = this
        // _this.des = { des: this.des}
        // console.log(_this.des)
        PUBLIC.get('Active.actives.auditProcessing', { id: this.refundOne.id, audit: audit, manage: this.manages }, function(data) {
          console.log(data)
          this.showReject = !this.showReject
        })
      }
    },
    mounted() {
      this.getRefundList()
      this.getTotal()
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' >
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
    .el-button--text{
      padding: 10px;
    }
    .el-pagination{
      padding-top: 20px;
    }
    .reject,.pass{
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
          .el-textarea{
            vertical-align: top;
            width: 300px;
            display: inline-block;
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
        p:last-of-type{
          button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }
    .reject {
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:red;

      }
    }
  }

</style>
