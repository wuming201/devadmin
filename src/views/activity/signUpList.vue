<template>
  <div class = 'app-container'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span class='payWay'>支付方式：<selectKuang v-bind:selectData='payWay' @value='payWayValue'></selectKuang></span>
        <span class='phoneNum'>支付状态：<selectKuang  v-bind:selectData='payStatus' @value='payValue'></selectKuang></span><span class='phoneNum'>审核状态：<selectKuang  v-bind:selectData='examStatus' @value='examValue' ></selectKuang></span>
      </p>
      <p><span class='buttons'><el-button type='primary'>全选</el-button><el-button type='danger'>批量拒绝</el-button><el-button type='success'>批量通过</el-button><el-button type='primary'>批量导出</el-button></span>
        <span><searchBox @searchKey='searchBox' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='sListData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'
      @selection-change='handleSelectionChange'>
      <el-table-column
        type='selection'
        width='30'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='ID'
        width="50">
        <template></template>
      </el-table-column>
      <el-table-column
        prop='order_id'
        label='订单号'>
      </el-table-column>
      <el-table-column
        prop='name'
        label='用户名'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='activity_id'
        label='活动'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='group_name'
        label='组别'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='reg_time'
        width="180"
        label='报名时间'>
      </el-table-column>
      <el-table-column
        prop='money'
        label='费用'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='way'
        label='支付方式'>
      </el-table-column>
      <el-table-column
        prop='pay_status'
        label='支付状态'>
      </el-table-column>
      <el-table-column
        prop='end_time'
        label='支付时间'
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='pay_status'
        label='审核状态'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.pay_status	 === '-1'">未审核</span>
          <span class="innerText" v-else-if="scope.row.pay_status	 === '1'">已审核</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small' @click="handleClick( scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' @getCurrent='handleCurrentChange'></paginationBox>
    <div class="checkInfo" v-show="showBox">
      <h3>查看信息 <i class="fa fa-close" @click="checkInfo"></i></h3>
      <div class="inner">
        <p>
          <el-row>
            <el-col :span="8"><span>订单号：{{rowInfo.order_id}}</span></el-col>
            <el-col :span="8"><span>支付方式：{{rowInfo.way}}</span></el-col>
            <el-col :span="8"><span>支付时间：{{rowInfo.timeout}}</span></el-col>
          </el-row>
          </p>
        <p class="titles">{{rowInfo.name}}-{{rowInfo.group_name}}</p>
        <p>
          <el-row>
            <el-col :span="12"><span class="title">姓名:</span><span class="innerText">{{rowInfo.name}}</span></el-col>
            <el-col :span="12"><span class="title">单位名称:</span><span class="innerText">{{rowInfo.com}}</span></el-col>
          </el-row>
        </p>
        <p>
          <el-row>
            <el-col :span="12"><span class="title">联系手机:</span><span class="innerText">{{rowInfo.telphone}}</span></el-col>
            <el-col :span="12"><span class="title">联系邮箱:</span><span class="innerText">{{rowInfo.email}}</span></el-col>
          </el-row>
        </p>
        <p><span class="title">备注:</span><span class="innerText">{{rowInfo.des}}</span></p>
        <p><el-button type="success" @click="passIt" v-if="rowInfo.pay_status==0" >通过</el-button><el-button  v-if="rowInfo.pay_status==0" type="danger" @click="rejectIt" >拒绝</el-button><el-button type="info" @click="checkInfo">取消</el-button></p>
      </div>
    </div>
    <div class="pass" v-show="showPass">
      <h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人：  wwww</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="2"
            v-model="des"
            placeholder="请输入拒绝原因！">
          </el-input>
        </p>
        <p><el-button type="success" @click="passAduit(1)">提交</el-button><el-button type="info" @click="passIt">取消</el-button></p>
      </div>
    </div>
    <div class="reject" v-show="showReject">
      <h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人：  wwww</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="2"
            v-model="des"
            placeholder="请输入拒绝原因！">
          </el-input>
        </p>
        <p><el-button type="danger" @click="rejectAduit(2)">拒绝</el-button><el-button type="info" @click="rejectIt">取消</el-button></p>
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
        showPass: false,
        showReject: false,
        showBox: false,
        downloadLoading: false,
        filename: '',
        page: 1,
        pagesize: '',
        dataLength: '',
        pay_status: '',
        id: '',
        des: '',
        sListData: [],
        multipleSelection: [],
        searchSelect: [
          {
            value: 'name',
            label: '用户名'
          }, {
            value: 'activity_id',
            label: '活动'
          }
        ],
        payWay: [
          {
            value: '',
            label: '全部'
          }, {
            value: 1,
            label: '支付宝'
          }, {
            value: 0,
            label: '微信'
          }
        ],
        payStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 2,
            label: '已验证'
          },
          {
            value: 1,
            label: '未验证'
          }
        ],
        examStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 318,
            label: '已通过'
          },
          {
            value: 317,
            label: '未通过'
          },
          {
            value: 316,
            label: '审核中'
          }
        ],
        rowInfo: [],
        selectArg: {}
      }
    },
    methods: {

      checkInfo() {
        this.showBox = !this.showBox
      },
      passIt() {
        console.log(this.showPass)
        this.showPass = !this.showPass
      },
      rejectIt() {
        this.showReject = !this.showReject
      },
      handleClick(row) {
        console.log(row)
        var _this = this
        _this.id = row.id
        _this.rowInfo = row
        _this.showBox = !_this.showBox
      },
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getVideoList()
      },
      getsignList(keyword) {
        console.log(keyword)
        var _this = this
        var args = { page: this.page }
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Active.actives.userList', args, (data) => {
          console.log(data)
          var demo = {
            id: 'id',
            uid: 'uid',
            com: 'com',
            des: 'des',
            activity_id: 'activity_id',
            money: 'money',
            reg_time: 'reg_time',
            group_name: 'group_name',
            order_id: 'order_id',
            name: 'name',
            telphone: 'telphone',
            email: 'email',
            on_status: 'pay_status'
          }
          var newData = PUBLIC.formatObj(demo, data)
          console.log(newData)
          for (var i in data) {
            (function (i) {
              PUBLIC.get('Order.receive.orderfindmess', { oid: data[i].order_id }, (v) => {
                newData[i]["pay_status"] = v.pay_status
                newData[i]["end_time"] = v.end_time
                newData[i]["way"] = v.way
                // this.sListData = newData
                _this.sListData=JSON.parse(JSON.stringify(newData))
                console.log(_this.sListData)
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
      passAduit(status) {
        console.log(status)
        var _this = this
        // _this.des = { des: this.des}
        console.log(_this.des)
        PUBLIC.get('Active.actives.auditApp', { id: this.id, pay_status: status, des: this.des }, function(data) {
          console.log(data)
          _this.showPass=!_this.showPass
        })
      },
      rejectAduit(status) {
        console.log(status)
        var _this = this
        // _this.des = { des: this.des}
        console.log(_this.des)
        PUBLIC.get('Active.actives.auditApp', { id: this.id, pay_status: status, des: this.des }, function(data) {
          console.log(data)
          _this.showReject=!this.showReject
        })
      },
      searchBox(e) {
        let op = this.selectArg
        op['key'] = e[0]
        op['value'] = e[1]
        console.log(op)
        this.getsignList(op)
      },
      searchKey(e) {
        let op = this.selectArg
        console.log(op)
        this.getsignList(op)
      },
      payValue(e) {
        this.selectArg['pay_status'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      payWayValue(e) {
        this.selectArg['way'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      examValue(e) {
        // if(e === '') {
        //   this.getsignList()
        //   return
        // }
        this.selectArg['audit'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      }
    },
    mounted() {
      this.getsignList()
    }
    // watch:{
    //   searchKey:function(){
    //     console.log(this.searchKey)
    //   }
    // }
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
    .checkInfo{
      z-index: 100;
      width: 1000px;
      height: 550px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -500px;
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
          line-height: 40px;
          padding-bottom: 30px;
          padding-left: 110px;
          span{
            display: inline-block;
          }
          .title{
            width: 80px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText{
            width: 200px;
          }
          >button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        .titles{
          color: #518BBD;
          font-size: 22px;
          font-weight: bold;
        }

        p:last-of-type{
          >button{
            width: 120px;
            margin-left: 90px;
          }
        }
      }
    }
    .reject,.pass{
      z-index: 100;
      width: 500px;
      height: 400px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 24%;
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
