<template>
  <div class="app-container">
    <el-container class="info clearfix">
      <el-aside width="140px" class="headPic" ><img :src="headPic" alt=""></el-aside>
      <el-main class="details"><span><span class="title">会员ID:</span><span class="innerText">{{uid}}</span></span><span><span class="title">用户名:</span><span class="innerText">{{username}}</span></span>
        <span><span class="title">绑定手机号:</span><span class="innerText">{{utelphone}}</span></span><span><span class="title">注册时间:</span><span class="innerText">{{ucreateTime}}</span></span>
        <span><span class="title">推广码:</span><span class="innerText">{{discount.key}}</span></span><span><span class="title">实名认证:</span><span class="innerText">{{urelStatus === '1'?'已实名':'未实名'}}</span></span>
        <span><span class="title">用户级别:</span><span class="innerText"><span class="iiText" v-for="items in userLevel">{{items}}</span>
        </span></span><span><span class="title">到期时间:</span><span class="innerText"><span class="iiText" v-for="items in uendTime">{{items}}</span></span></span>
        <span><span class="title">收益比例:</span><span class="innerText">{{ugetMoney}}%</span></span><span><span class="title">积分:</span><span class="innerText">{{integral}}</span></span>
        <span class="lastp"><span class="title">账户余额:</span><span class="innerText">{{integral}}</span></span>
      </el-main>
      <el-aside width="140px" class="editBtn" ><router-link :to="'/member/edit-member/' + uid"><el-button type="primary">修改</el-button></router-link></el-aside>
    </el-container>
    <div class="tables ">
      <el-row :gutter="40">
        <el-col :xl="17">
          <div class="shopHistory">
            <p>消费记录</p>
            <el-table
              ref="multipleTable"
              :data="payHistory.slice((payPage-1)*pagesize,payPage*pagesize)"
              tooltip-effect="dark"
              border
              style=" backgroundColor: #f5fafe"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="orderId"
                label="订单号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="commodity_type"
                label="内容">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="时间"
                width="150"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额">
              </el-table-column>
              <el-table-column
                prop="way"
                label="支付方式">
              </el-table-column>
              <el-table-column
                prop="pay_status"
                label="支付状态">
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="支付时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="money_code"
                label="优惠码">
              </el-table-column>
            </el-table>
            <memberPag class="zfjl" :data="payHistory" @getCurrent="handlePayChange"></memberPag>
          </div>
        </el-col>
        <el-col :xl="7">
          <div class="logHistory">
            <p>登录记录</p>
            <el-table
              ref="multipleTable"
              :data="loginHistory.slice((loginPage-1)*pagesize,loginPage*pagesize)"
              tooltip-effect="dark"
              border
              style=" backgroundColor: #f5fafe"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="time"
                label="登录时间"
                width="160">
              </el-table-column>
              <el-table-column
                prop="ip"
                label="登录IP">
              </el-table-column>
              <el-table-column
                prop="ipadress"
                label="登录地区">
              </el-table-column>
            </el-table>
            <memberPag :data="loginHistory" @getCurrent="handleLoginChange"></memberPag>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :md="13">
          <div class="cardList">
            <p>银行卡列表</p>
            <el-table
              ref="multipleTable"
              :data="bankCards.slice((bankPage-1)*pagesize,bankPage*pagesize)"
              tooltip-effect="dark"
              border
              style=" backgroundColor: #f5fafe"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="bankDeposit"
                label="开户行"
                width="200">
              </el-table-column>
              <el-table-column
                prop="card"
                label="卡号">
              </el-table-column>
              <el-table-column
                prop="user"
                label="持卡人"
                width="100"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="name"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delCard(scope.row)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <memberPag :data="tableData3" @getCurrent="handleBankChange"></memberPag>
          </div>
        </el-col>
        <el-col :md="11">
          <div class="txHistory">
            <p>子账号列表</p>
            <el-table v-if="childCountFlag"
                      ref="multipleTable"
                      :data="childCount"
                      tooltip-effect="dark"
                      border
                      width="550"
                      style=" backgroundColor: #f5fafe"
                      @selection-change="handleSelectionChange">
              <el-table-column
                prop="telphone"
                label="子账号手机号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="添加时间">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delChildCount(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <memberPag :data="childCount" @getCurrent="handleChildChange"></memberPag>
          </div>
        </el-col>
      </el-row>
      <div class="childList">
        <p>加入团队 </p>
        <!-- .slice((childPage-1)*pagesize,childPage*pagesize) -->
        <el-table
          ref="multipleTable"
          :data="childCount"
          tooltip-effect="dark"
          border
          width="550"
          style=" backgroundColor: #f5fafe"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="telphone"
            label="公司名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="公司简称">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="部门名称">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="岗位">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="直属上级ID">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="身份">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delChildCount(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="角色">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delChildCount(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="工号">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="加入时间">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="离开时间">
          </el-table-column>
        </el-table>
        <memberPag :data="childCount" @getCurrent="handleChildChange"></memberPag>
      </div>
    </div>


  </div>
</template>

<script>
import { memberPag } from '../../../components/index'

export default {
  name: 'memberInfo',
  components: {
    memberPag
  },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      childPage: 1,
      bankPage: 1,
      loginPage: 1,
      payPage: 1,
      drawPage: 1,
      pagesize: 8,
      headPic: '',
      uid: "",
      uimg:"",
      username:"",
      utelphone:"",
      ugroup:"",
      ugetMoney: '', //收益比例
      integral: '', //积分
      uendTime: [],
      ucreateTime:"",
      urelStatus:"",
      userStatus:[],
      userLevelStatus:[],
      inputs:"",
      userLevel: [],
      ulevel:"",
      bankCards: [],
      loginHistory: [],
      payHistory: [],
      childCount: [],
      childCountFlag:false,
      withDraw: [],
      tableData3: [],
      tableData2: [],
      multipleSelection: [],
      teamList: [],
      discount: {}
    }
  },
  methods: {
    edit() {
      this.$router.push({ name: '会员编辑', params: { id: this.uid }})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleChildChange(val) {
      this.childPage = val
    },
    handleBankChange(val) {
      this.bankPage = val
    },
    handleLoginChange(val) {
      this.loginPage = val
    },
    handleDrawChange(val) {
      this.drawPage = val
    },
    handlePayChange(val) {
      this.payPage = val
    },
    getMemberInfo:function(id) {
      console.log(id)
      var _this = this
      var datas=""
      PUBLIC.get('User.User.Userone',{uid:id}, (data) => {
        console.log(data)
        data.level=parseInt(data.level)
        this.headPic = data.header_img
        PUBLIC.merObj(_this,data,{
          uid:"Id",
          username:"username",
          uimg:"header_img",
          ucreateTime:"reg_time",
          utelphone:"telphone",
          urelStatus:"rel_status",
          ulevel:"level"
        })
        console.log(data.Id)
        PUBLIC.get('Currency.receive.finddiscounts', { uid: data.Id, type: 'PromotionCode' }, data => {
          // console.log(data[0])
          if(data.length>0){
            this.discount = data[0]
          console.log(this.discount)
          }

        })
        //查询用户级别
        PUBLIC.get('Team.User.TeamList',{uid: data.Id},(data) => {
          console.log(data)
          let userLevel = []
          let endTime = []
          for (var i in data) {
            if(data[i].on_status == -1) {
              continue
            }else {
              endTime.push(data[i].end_time.slice(0, 10))
              userLevel.push(data[i].desc)
              if(data[i].id==317){
                  PUBLIC.get('User.User.adminselsubaccount', { uid: id }, dataa => {
                  if(dataa == ''){
                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                    return
                  }
                  let datas=[]
                  for(var c=0;c<dataa.length;c++){
                    if(dataa[c].uid==id){continue;}
                    datas.push(dataa[c])
                  }
                  let newData = []
                  let demo2 = {
                    create_time: 'create_time',
                    telphone: 'telphone'
                  }
                  newData = PUBLIC.formatObj(demo2, datas)
                  _this.childCount = JSON.parse(JSON.stringify(newData))
                  _this.childCountFlag = true
                  console.log("拉取子账号列表")
                  console.log(_this.childCount)
                  console.log(_this.childCount.length)
                  console.log(_this)
                })
              }
            }
          }
          this.userLevel = userLevel
          this.uendTime = endTime
          console.log(this.userLevel)
          console.log(this.uendTime)
        })
        //获取收益比例
        PUBLIC.get("Configure.Configure.Selone",{type:"userGetMoneyFromSpread",key: this.uid}, (data) => {
          console.log(data)
          if (data !== false) {
            this.ugetMoney = data.value
            console.log(data)
          } else {
            this.ugetMoney = 0
          }
        })
        //获取积分
        PUBLIC.get("Currency.receive.findcurrency",{ money_type: '3', uid: this.uid }, (data) => {
          console.log(data)
          if (data != false || data != '') {
            this.integral = data.money_num
          } else {
            this.integral = 0
          }
        })
        console.log(this)
      })
      //  下面table数据
      PUBLIC.get('Currency.receive.mycard', { uid: id }, data => {
        let demo1 = {
          bankDeposit: 'bankDeposit',
          card: 'card',
          statu: 'statu',
          user: 'user',
          id: 'id'
        }
        this.bankCards  = PUBLIC.formatObj(demo1, data)
        console.log(this.bankCards)

      })
      PUBLIC.get('User.User.adminselenter', { uid: id }, data => {
        console.log(data)
        let newData = []
        let demo1 = {
          time: 'time',
          ip: 'ip',
          ipadress: 'ipadress'
        }
        newData = PUBLIC.formatObj(demo1, data)
        this.loginHistory = newData
      })
          // 子账号


      //消费记录
      let select = { uid: id }
      PUBLIC.get('Order.receive.orderall', { select: JSON.stringify(select) }, data => {
        console.log(data)
        let newData = []
        let demo1 = {
          orderId: 'id',
          commodity_type: 'commodity_type',
          create_time: 'create_time',
          money: 'money',
          way: 'way',
          pay_status: 'pay_status',
          end_time: 'end_time',
          money_code: 'money_code'
        }
        this.payHistory = PUBLIC.formatObj(demo1, data)
        console.log(this.payHistory)
      })

    //  提现记录
      PUBLIC.get('Currency.receive.depositList', { uid: id, page: 1, handler: '' }, data => {
        console.log(data)
        let newData = []
        let demo1 = {
          id: 'id',
          card: 'card',
          start_time: 'start_time',
          money_num: 'money_num',
          pay_status: 'pay_status'
        }
        newData = PUBLIC.formatObj(demo1, data)
        this.withDraw = newData
        console.log(this.withDraw)
      })
    },
    //删除银行卡
    delCard(row) {
      console.log(row)
      PUBLIC.get('Currency.receive.delebanca', { id: row.id }, data => {
        console.log(data)
        this.getMemberInfo(this.id)
      })
    },
  //  删除子账号
    delChildCount(row) {
      console.log(row)
      PUBLIC.get('User.User.admindelsubaccount', { telphone: row.telphone, uid: this.uid }, data => {
        console.log(data)
        this.getMemberInfo(this.id)
      })
    },
  },
  mounted() {
    var id=this.$route.params.id
    this.id = id
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
        margin-top: -10px;
        width: 140px;
        height: 144px;
        img{
          width: 140px;
          height: 140px;
        }
      }
      .details{
        margin-left: 20px;
        padding: 0;
        .lastp{
          width: 100%;
        }
        >span{
          padding-bottom: 30px;
          .title{
            text-align: right;
            width: 100px;
          }
          .innerText{
            width: 200px;
            height: 20px;
            margin-left: 10px;
            vertical-align: top;
            .iiText {
              width: 200px;
              height: 30px;


            }
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
      .el-table__row {
        > td {
          line-height: 60px;
          height: 60px;
          border-right: 0;
        }
      }
    }
  }

</style>
