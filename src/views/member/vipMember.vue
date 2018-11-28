<template>
  <div class='vip-member'>
    <div class='v-memberHead'>
      <p class='realName'><span class='phoneNum'>实名认证：<selectKuang  :selectData='relStatus' @value='relValue'></selectKuang></span>
        <span class='regTime'>注册时间:<timeBox @value='regTime'></timeBox></span><span class='overTime'>到期时间:<timeBox @value='endTime'></timeBox></span></p>
      <p><span class='buttons'>
        <!--<el-button type='success'>数据导出</el-button>-->
        <!--<router-link to="/member/add-vip"><el-button type='warning'>添加用户</el-button></router-link>-->
        <router-link to='/member/money-set'><el-button type='primary'>费用设置</el-button></router-link><el-button type='danger' @click="passIt">收益比例</el-button></span>
        <span class='record'>总记录：<span>{{dataLength}}</span>昨日新增：<span>{{yesterdayAdd}}</span>今日新增：<span>{{todayAdd}}</span><searchBox :searchSelect="searchSelect"  @searchKey='searchKey'></searchBox></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='vipData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'
      @row-click='getId'>
      <el-table-column
        type='selection'
        width='55'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='会员ID'
        width='150'>
        <template slot-scope='scope'>{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop='name'
        label='用户昵称'
        width='150'>
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
        <template slot-scope='scope'>{{ scope.row.reg_time }}</template>
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
        prop='groupEndTime'
        label='到期时间'>
        <template slot-scope='scope'>{{ scope.row.groupEndTime }}</template>
      </el-table-column>
      <el-table-column
        prop='code'
        label='推广码'
        width='150'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label='收益比例（%）'
        width='150'
        show-overflow-tooltip>
        <template slot-scope='scope'>
          <span v-if="scope.row.ugetMoney != ''">{{ scope.row.ugetMoney }}%</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--prop='phone'-->
        <!--label='推广人次'-->
        <!--width='150'-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <el-table-column
        prop='phone'
        label='操作'
        show-overflow-tooltip>
        <template slot-scope='scope'>
          <el-button  type='text' size='small'  @click='info(scope.row)'>查看</el-button>
          <el-button type='text' size='small' @click='routerTo(scope.row)'>编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pass" v-show="showChange">
      <h3>修改收益比例 <i class="fa fa-close" @click="passIt"></i></h3>
      <div class="inner">
        <p>当前收益比例：{{oldProfit}}</p>
        <p>修改收益比例：<el-input  suffix-icon="el-icon-date" v-model="newProfit"></el-input></p>
        <p class="radios"><el-radio v-model="isDefault" label="1">修改默认</el-radio><el-radio v-model="isDefault" label="0">修改全部</el-radio></p>
        <p><el-button type="success" @click="passUp">提交</el-button><el-button type="info">取消</el-button></p>
      </div>
    </div>
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
        showChange: false,
        filename: '',
        newProfit: '',  //修改后的收益
        isDefault: '',//是否是默认
        oldProfit: '',
        vipData:[],
        page: 1,
        pagesize: 40,
        dataLength: '',
        yesterdayAdd: '',
        todayAdd: '',
        searchSelect: [
          {
            value: 'telphone',
            label: '手机号'
          }, {
            value: 'name',
            label: '昵称'
          }, {
            value: 'id',
            label: '用户ID'
          }],
        phoneStatus:[
          {
            value: '',
            label: '全部'
          },
          {
            value: 1,
            label: '已验证'
          },
          {
            value: -1,
            label: '未验证'
          },
        ],
        relStatus:[
          {
            value: '',
            label: '全部'
          },
          {
            value: 1,
            label: '已验证'
          },
          {
            value: -1,
            label: '未验证'
          },
        ],
        userStatus:[
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
        tableData3: [],
        multipleSelection: [],
        selectArg: {},
        ugetMoney: '',
        tuiguang: [],
        keyword: ''
      }
    },
    created() {
      console.log(this.$route.query.page)
      if(this.$route.query.page != undefined) {
        this.page = this.$route.query.page
      }
    },
    methods: {

      //修改收益比例
      getOldProfit() {
        PUBLIC.get('Configure.Configure.Selfig', { type: 'getMoneyFromPay', key: 'vip' }, data => {
          // console.log(data)
          this.oldProfit = data[0].value + '%'
        })
      },
      passIt() {
        this.showChange = !this.showChange
      },
      passUp() {
        console.log( this.imgs)
        PUBLIC.get('Configure.Configure.updbi', {bili: this.newProfit, type: this.isDefault}, data => {
          console.log(data)
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.$router.go(0)
        })
      },
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getUserList(this.keyword)
      },
      getId(row) {
        this.id = row.id
        // console.log(this.id)
      },
      //查看
      info(row) {
        localStorage.setItem("pageInfo",JSON.stringify(this.keyword))
        this.$router.push({ name: '会员详情', params: { id: row.id, page: this.page }})
      },
      routerTo(row) {
        localStorage.setItem("pageInfo",JSON.stringify(this.keyword))
        var _this = this
        // console.log(this.id)
          this.$router.push({ name: '编辑VIP会员', params: { id: row.id, page: this.page }})
      },
      getTotal() {
        PUBLIC.get('Team.User.Count', { tid: 318 }, data => {
          // this.dataLength = data.allnum * 1

          this.yesterdayAdd = data.yestodaynum
          this.todayAdd = data.todaynum
        })
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
      getUserList:function(keyword){
        var _this=this
        this.keyword = keyword
        var args={page: this.page, usertype:"318"}
        for(var k in keyword){
          args[k]=keyword[k]
        }
        keyword==keyword!=undefined?keyword:''
        if(args.telphone != undefined) {
          args.page = -1
        }else {
          args.page = this.page
        }
        this.args = args
        console.log(args)
        PUBLIC.get('User.User.Userlist',args, function(data) {
          // console.log(data)
          var newData = []
          var demo={
            id: 'Id',
            username: 'username',
            telphone: 'telphone',
            reg_time: 'reg_time',
            rel_status: 'rel_status',
            name:"name"
          }
          newData=PUBLIC.formatObj(demo,data)
          // _this.tableData3=newData
          // console.log(newData)
          for(var i=0;i<newData.length;i++){
            _this.getUserGroup(newData[i]['id'],_this.tableData3,i,newData)
          }
          PUBLIC.get('Order.receive.findcode', function(data1){
            // console.log(data1)
            _this.tuiguang = data1
          })
          for(var i=0; i < newData.length; i++) {
            (function(n,newData){
              PUBLIC.get('Configure.Configure.Selone',{type:'userGetMoneyFromSpread',key:newData[n].id},function(data){
                // console.log('aaaaaaaaaa' + data)
                if( data === false) {
                  newData[n]['ugetMoney'] = ''
                }else {
                  newData[n]['ugetMoney'] = data.value
                  console.log(newData)
                }
              })
              PUBLIC.get('Currency.receive.findUidPro', { type: 'PromotionCode',uid: newData[n].id },function(dataa){
                if(dataa == false) {
                  return
                }
                newData[n]['code'] = dataa[0].key
                // newData[n]['ugetMoney'] = dataa[0].reduce_num
                _this.tableData3=newData
                // console.log(newData)
                if(n > newData.length - 2) {
                  for( var b in newData) {
                    for (var c in _this.tuiguang) {
                      if(newData[b].code === _this.tuiguang[c].money_code) {
                        newData[n]['tuiguang'] = _this.tuiguang[c].num
                      }
                    }
                  }
                  _this.vipData =  _this.tableData3
                }
              })
            })(i,newData)
          }
          _this.selectArg = {}
        },function(data){
        // console.log(data)
        _this.dataLength=parseInt(data.data.num)
        _this.pagesize=parseInt(data.data.pagenum)
        console.log(data.data.num)
      })
      },
      getUserGroup:function(id,relData,index,newData){
        var _this=this
        PUBLIC.get('Team.User.TeamList',{uid:id},function(data){
          newData[index]['userGroup']=318
          // newData[index]['groupEndTime']=data[0]['end_time']
          for(var n=0;n<data.length;n++){
            if(data[n].id==318){
              newData[index]['groupEndTime']=data[n]['end_time']
            }
          }
          _this.tableData3=JSON.parse(JSON.stringify(newData))
        })
      },
      searchKey:function(e){
        this.page = 1
        this.selectArg[e[0]]=e[1]
        var op = this.selectArg
        delete op.undefined
        this.getUserList(op)
      },
      relValue:function(e){
        this.selectArg['issming']=e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      regTime:function(e){
        this.selectArg['regstr_time']=e[0]
        this.selectArg['regend_time']=e[1]
        let ee = this.selectArg
        this.searchKey(ee)
      },
      endTime:function(e){
        this.selectArg['daoqstr_time']=e[0]
        this.selectArg['daoqend_time']=e[1]
        let ee = this.selectArg
        this.searchKey(ee)
      }
    },
    mounted(){
      if(localStorage.pageInfo !== '' && localStorage.pageInfo !== undefined && localStorage.pageInfo !== 'undefined'){
        this.getUserList(JSON.parse(localStorage.pageInfo))
        localStorage.removeItem('pageInfo')
      }else{
        this.getUserList()
      }
      this.getTotal()
      this.getOldProfit()
      DATAC.setConf(this)
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .vip-member{
    color: #333333;
    padding: 25px;
    .v-memberHead{
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
      .realName{
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
    .pass{
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
          .el-input{
            width: 30%;
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
        .radios{
          text-align: center;
          .el-radio{
            margin: 0 20px;
          }

        }
        p:last-of-type{
          padding-top: 40px;
          button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }

  }

</style>
