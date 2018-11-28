<template>
  <div class='app-container'>
    <div class='orderHead'>
      <p class='firstLine'>
        <span class='payType'>商品类型：
          <selectKuang :selectData="commodityType" :holder="holder" @value="commodityValue" ></selectKuang>
        </span>
        <span class='payWay'>支付方式：
          <selectKuang :selectData="way" :holder="holder" @value="moneyValue" ></selectKuang>
        </span>
        <span class='payState'>支付状态：
          <selectKuang :selectData="payStatus" :holder="holder" @value="payValue" ></selectKuang>
        </span>
        <span class='discount'>优惠类型：
          <selectKuang :selectData="moneyCode" :holder="holder" @value="stateValue" ></selectKuang>
        </span>
        <span class='payTime'>支付时间:<timeBox  @value='payTime'></timeBox></span></p>
      <p><span class='buttons'><el-button type='success'>批量导出</el-button></span>
        <span class='record'>总记录：<span>1234</span>昨日新增：<span>42</span>今日新增：<span>255</span>
          <searchBox @searchKey='searchBox' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='olData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='id'
        label='ID'
        width='100'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='订单号'>
      </el-table-column>
      <el-table-column
        prop='uid'
        label='会员名'
        width='150'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='commodity_name'
        label='消费内容'>
      </el-table-column>
      <el-table-column
        prop='money'
        label='消费金额'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='way'
        label='支付方式'
        width='150'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.way === 'wxwb'">微信</span>
          <span class="innerText" v-else-if="scope.row.way === 'zfb'">支付宝</span>
          <span class="innerText" v-else>小程序</span>
        </template>
      </el-table-column>
      <el-table-column
        prop='order_status'
        label='支付状态'
        width='150'>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.order_status === '0'">未支付</span>
          <span class="innerText" v-else-if="scope.row.order_status === '-100'">取消</span>
          <span class="innerText" v-else-if="scope.row.order_status === '200'">支付成功</span>
          <span class="innerText" v-else-if="scope.row.order_status === '301'">业务成功</span>
          <span class="innerText" v-else-if="scope.row.order_status === '302'">业务失败</span>
          <span class="innerText" v-else-if="scope.row.order_status === '401'">订单成功</span>
          <span class="innerText" v-else-if="scope.row.order_status === '402'">订单失败</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='end_time'
        label='支付时间'
        width='200'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='money_code'
        label='优惠码'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='originalPrice'
        label='收益金额'
        width='150'>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' :pageSize="pagesize" @getCurrent='handleCurrentChange'></paginationBox>
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
        page: 1,
        dataLength: '',
        pagesize: 40,
        olData: [],
        multipleSelection: [],
        holder: '全部',
        selectArg: {},
        stime: '',
        etime: '',
        key: '',
        value: '',
        searchSelect: [
          {
            value: 'uid',
            label: '会员名'
          }, {
            value: 'id',
            label: '订单号'
          }
        ],
        payStatus: [
          {
            value: '',
            label: '全部'
          }, {
            value: '200',
            label: '支付成功'
          }, {
            value: '0',
            label: '未支付'
          }, {
            value: '-100 ',
            label: '取消'
          }, {
            value: '301 ',
            label: '业务成功'
          }, {
            value: '302',
            label: '业务失败'
          }, {
            value: '401 ',
            label: '订单成功'
          }, {
            value: '402 ',
            label: '订单失败'
          }
        ],
        way: [
          {
            value: '',
            label: '全部'
          }, {
            value: 'zfb',
            label: '支付宝'
          }, {
            value: 'wxwb',
            label: '微信'
          }
        ],
        commodityType: [
          {
            value: '',
            label: '全部'
          }, {
            value: 'activity',
            label: 'VIP升级'
          }, {
            value: 'sadasd',
            label: '活动报名'
          }
        ],
        moneyCode: [
          {
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '未使用'
          }, {
            value: '2',
            label: '优惠券'

          }, {
            value: '1',
            label: '邀请码'
          }
        ]
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getOrderList()
      },
      //获取总数
      getTotal() {

      },
      searchBox(e) {
        this.key = e[0]
        this.value = e[1]
        this.getOrderList()
      },
      searchKey(e) {
        console.log(e[0])
        if(e[0] === '' || e[0] === undefined) {
          console.log(this.selectArg)
          var op = this.selectArg
          this.getOrderList(op)
        }else{
          console.log(e)
          var op = this.selectArg
          op[e[0]] = e[1]
          this.getOrderList(op)
        }
      },
      payValue(e) {
        this.selectArg['order_status'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      moneyValue(e) {
        this.selectArg['money_type'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      commodityValue(e) {
        this.selectArg['commodity_type'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      stateValue(e) {
        this.selectArg['money_code'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      payTime(e) {
        this.selectArg['starttime'] = e[0]
        this.selectArg['endtime'] = e[1]
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      getOrderList(keyword) {
        // if(keyword['key'] !== '') {
        //   var key = keyword['key']
        //   var value = keyword['value']
        //   PUBLIC.get('Order.receive.orderall', { page: this.currentPage, select: JSON.stringify(args), starttime: this.stime, endtime: this.etime, order: 'id', order_aes: 1, key: key, value: value }, (data) => {
        //     console.log(data)
        //     var demo = {
        //       id: 'id',
        //       uid: 'uid',
        //       money: 'money',
        //       pay_id: 'pay_id',
        //       commodity_type: 'commodity_type',
        //       act_status: 'act_status', //支付状态
        //       money_code: 'money_code',
        //       way: 'way',
        //       end_time: 'end_time',
        //       order_status: 'order_status',
        //       originalPrice: 'originalPrice'
        //     }
        //     var newData = PUBLIC.formatObj(demo, data)
        //     _this.olData = newData
        //     console.log(newData)
        //   })
        //   return
        // }
        console.log(keyword)
        var _this = this
        var args = {}
        for (var k in keyword) {
          if(keyword[k]==undefined || keyword[k]==""){
            continue
          }
          args[k] = keyword[k]
        }
        if(args['starttime']) {
          this.stime = args['starttime']
          this.etime = args['endtime']
          args = ''
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Order.receive.orderall', { page: this.page, select: JSON.stringify(args), starttime: this.stime, endtime: this.etime, order: 'id', order_aes: -1, key: this.key, value: this.value }, (data) => {
          console.log(data)
          var demo = {
            id: 'id',
            uid: 'uid',
            money: 'money',
            pay_id: 'pay_id',
            commodity_id: 'commodity_id',
            commodity_type: 'commodity_type',
            act_status: 'act_status', //支付状态
            money_code: 'money_code',
            way: 'way',
            end_time: 'end_time',
            order_status: 'order_status',
            originalPrice: 'originalPrice'
          }
          var newData = PUBLIC.formatObj(demo, data)
          _this.olData = newData
          console.log(newData)
          for(var n=0;n<newData.length;n++){
            (function(i){
              PUBLIC.get("Commodity.commoditys.message",{id:newData[i]["commodity_id"]},function(data){
                newData[i]["commodity_name"]=data.name
                _this.olData =JSON.parse(JSON.stringify(newData))
              })
            })(n)
          }
          this.key = this.value = ''
        },function(data){
          // console.log(data)
          _this.dataLength=parseInt(data.data.num)
          _this.pagesize=parseInt(data.data.pagenum)
          console.log(data.data.num)
        })
      }
    },
    mounted() {
      this.getOrderList()
      this.getTotal()
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
    .orderHead{
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
