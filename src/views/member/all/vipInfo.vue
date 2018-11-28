<template>
  <div class="app-container">
    <el-container class="info clearfix">
      <el-aside width="140px" class="headPic" ><img src="../../../assets/pic.png" alt=""></el-aside>
      <el-main class="details"><span><span class="title">会员ID:</span><span class="innerText">{{all.Id}}</span></span>
        <span><span class="title">用户名:</span><span class="innerText">{{all.username}}</span></span>
        <span><span class="title">绑定手机号:</span><span class="innerText">{{all.telphone}}</span></span>
        <span><span class="title">注册时间:</span><span class="innerText">{{all.reg_time}}</span></span>
        <span><span class="title">推广码:</span><span class="innerText">{{all.rel_code}}</span></span>
        <span><span class="title">实名认证:</span><span class="innerText">1232131312312312</span></span>
        <span><span class="title">会员身份:</span><span class="innerText">{{all.level}}</span></span>
        <span><span class="title">到期时间:</span><span class="innerText">1232131312312312</span></span>
        <span><span class="title">收益比例:</span><span class="innerText">1232131312312312</span></span>
        <span><span class="title">积分:</span><span class="innerText">1232131312312312</span>
          <span class="title">账户余额:</span><span class="innerText">1232131312312312</span></span>
      </el-main>
      <el-aside width="140px" class="editBtn" ><el-button type="primary">主要按钮</el-button></el-aside>
    </el-container>
    <div class="tables ">
      <el-row :gutter="40">
        <el-col :xl="17">
          <div class="shopHistory">
            <p>消费记录</p>
            <el-table
              ref="multipleTable"
              :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              tooltip-effect="dark"
              border
              style=" backgroundColor: #f5fafe"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="id"
                label="订单号"
                width="200">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="内容">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="时间"
                width="150"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="id"
                label="金额">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="支付方式">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="支付状态">
              </el-table-column>
              <el-table-column
                prop="name"
                label="支付时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="优惠码">
              </el-table-column>
            </el-table>
            <paginationBox :data="tableData3" @getCurrent="handleCurrentChange"></paginationBox>
          </div>
        </el-col>
        <el-col :xl="7">
          <div class="logHistory">
            <p>登录记录</p>
            <el-table
              ref="multipleTable"
              :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              tooltip-effect="dark"
              border
              style=" backgroundColor: #f5fafe"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="id"
                label="登录时间"
                width="160">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="登录IP">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="登录地区">
              </el-table-column>
            </el-table>
            <paginationBox :data="tableData3" @getCurrent="handleCurrentChange2"></paginationBox>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :md="13">
          <div class="cardList">
            <p>银行卡列表</p>
            <el-table
              ref="multipleTable"
              :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              tooltip-effect="dark"
              border
              style=" backgroundColor: #f5fafe"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="id"
                label="开户行"
                width="200">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="卡号">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="持卡人"
                width="100"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="id"
                label="添加时间">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="操作">
                <template slot-scope="scope">
                  <el-button type='text' size='small' @click="delelt(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <paginationBox :data="tableData2" @getCurrent="handleCurrentChange3"></paginationBox>
          </div>
        </el-col>
        <el-col :md="11">
          <div class="txHistory">
            <p>提现记录</p>
            <el-table
              ref="multipleTable"
              :data="tableData1.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              tooltip-effect="dark"
              border
              style=" backgroundColor: #f5fafe"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="id"
                label="处理单号"
                width="160">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="提现卡号">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="申请时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="申请金额">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="处理状态">
              </el-table-column>
            </el-table>
            <paginationBox :data="tableData1" @getCurrent="handleCurrentChange4"></paginationBox>
          </div>
        </el-col>
      </el-row>
      <div class="childList">
        <p>子账号列表</p>
        <el-table
          ref="multipleTable"
          :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          border
          width="550"
          style=" backgroundColor: #f5fafe"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="id"
            label="子账号用户名"
            width="200">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="添加时间">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作">
            <template slot-scope="scope">
              <el-button type='text' size='small' @click="delelt(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <paginationBox :data="tableData2" @getCurrent="handleCurrentChange5"></paginationBox>
      </div>
    </div>


  </div>
</template>

<script>
import { paginationBox } from '../../../components/index'

export default {
  name: 'memberInfo',
  components: {
    paginationBox
  },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1,
      currentPage5: 1,
      all: '',
      pagesize: 13,
      uid:"",
      uimg:"",
      uusername:"",
      utelphone:"",
      ugroup:"",
      uendTime:"",
      ucreateTime:"",
      urelStatus:"",
      userStatus:[],
      userLevelStatus:[],
      inputs:"",
      ulevel:"",
      tableData3: [
        {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData2: [
        {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData1: [
        {
          date: '2016-05-02',
          name: 'adasd',
          address: 'zcxzczxc 1518 弄'
        }, {
          date: '2016-05-04',
          name: 'ghjhgjghjghjhgh',
          address: 'vcxvxcv 1518 弄'
        }, {
          date: '2016-05-01',
          name: 'xvxcvxc',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: 'xcvxcvcxv',
          address: 'xvxcvxcvcx 1518 弄'
        }, {
          date: '2016-05-06',
          name: 'xcvxccxvcx',
          address: 'xvcxvxcvxc 1518 弄'
        }, {
          date: '2016-05-07',
          name: '4324324324324',
          address: 'xcvxcvsadasdwa 1518 弄'
        }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val
    },
    handleCurrentChange4(val) {
      this.currentPage4 = val
    },
    handleCurrentChange5(val) {
      this.currentPage5 = val
    },
    handleCurrentChange3(val) {
      this.currentPage3 = val
    },
    delelt() {
      console.log('暂无数据')
    },
    getMemberInfo:function(id) {
      var _this = this
      var datas=""
      PUBLIC.get('User.User.Userone',{uid:id}, function(data) {
        console.log(data)
        _this.all = data
        //银行卡
        PUBLIC.get('Currency.receive.mycard', {uid:id}, data => {
          console.log(data)
        })
        //提现接口
        PUBLIC.get('Currency.receive.depositList', {uid:id, page: 1}, data => {
          console.log(data)
        })
        //子账号
        PUBLIC.get('User.User.Selsubaccount', {uid:id, page: 1}, data => {
          console.log(data)
        })
        // var newData = []
        // var demo={
        //   uid:"Id",
        //   username:"username",
        //   uimg:"header_img",
        //   ucreateTime:"reg_time",
        //   utelphone:"telphone",
        //   urelStatus:"rel_status",
        //   ulevel:"level"
        // }
        // newData=PUBLIC.formatObj(demo,data)
        // _this.tableData3=newData
        // console.log(newData)
      //   PUBLIC.get('Team.User.TeamList',{uid:data.Id},function(data){
      //     console.log(data)
      //     data=data[0]
      //     PUBLIC.merObj(_this,data,{
      //     ugroup:"id",
      //     uendTime:"end_time"
      //   })
      //   _this.ugroup=parseInt(_this.ugroup)
      //   })
      //   console.log(_this)
      //   // var demo = {
      //   //   id: 'id',
      //   //   name: 'class'
      //   // }
      //   // var newData = PUBLIC.formatObj(demo, data)
      //   // _this.tableData3 = newData
      })
    }
  },
  mounted() {
    this.page = this.$route.params.page
    var id=this.$route.params.id
    console.log(id)
    DATAC.setConf(this)
    this.getMemberInfo(id)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .app-container{
    color: #333333;
    .info{
      padding: 40px 0 10px 0;
      background-color: #fff;
      .headPic{
        margin-left: 20px;
        padding-bottom: 30px;
      }
      .details{
        margin-left: 20px;
        padding: 0;
        >span{
          padding-bottom: 30px;
          .title{
            text-align: right;
            width: 100px;
          }
          .innerText{
            width: 200px;
          }
        }
        span{
          display: inline-block;
        }
      }
      .editBtn{
        padding-top: 40px;
      }
    }
    .tables{
      padding-top: 40px;
      .el-row {
        margin-bottom: 80px;
        p {
          line-height: 26px;
        }
        .el-pagination {
          padding-top: 20px;
        }
      }
    }
  }

</style>
