<template>
  <div class="app-container">
    <div class="memberHead">
      <p class="firstLine"><span class="phoneNum">推广类型：<selectKuang :selectData="paytype"
                                                                    @value="payValue"></selectKuang></span></p>
      <p><span class="buttons"><el-button type="success">批量导出</el-button><router-link to="/member/VIPextension"><el-button type="danger">VIP推广记录</el-button></router-link></span>
        <span
          class="record">推广消费人次：<span>{{moneyCount.a}}<span>人次</span></span>推广消费金额：<span>{{moneyCount.b}}  <span>元</span></span>平台收益支出：<span>{{moneyCount.c}} <span>元</span></span><searchBox
          @searchKey='searchKey' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tgData"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        prop="id"
        label="订单号"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="fromUid"
        label="推广员"
      >
      </el-table-column>
      <el-table-column
        prop="money_code"
        label="推广码"

        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="uid"
        label="使用会员"
      >
      </el-table-column>
      <el-table-column
        prop="commodity"
        label="消费内容"
      >
      </el-table-column>
      <el-table-column
        prop="money"
        label="消费金额（元）"

        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="使用时间">
      </el-table-column>
      <el-table-column
        prop="way"
        label="使用状态">
        <template slot-scope="scope">{{ payWays[scope.row.way] }}</template>
      </el-table-column>
      <el-table-column
        prop="way"
        label="支付方式">
        <template slot-scope="scope">{{ payWays[scope.row.way] }}</template>
      </el-table-column>
      <el-table-column
        prop="earnings"
        label="收益比例"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="originalPrice"
        label="收益金额"
      >
        <template slot-scope="scope">{{ scope.row.originalPrice?scope.row.originalPrice:0 }}</template>
      </el-table-column>

    </el-table>
    <paginationBox :data='dataLength' :pageSize="pagesize" @getCurrent="handleCurrentChange"></paginationBox>
  </div>
</template>

<script>
  import {searchBox, selectKuang, timeBox, paginationBox} from '../../components/index'

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
        filename: '',
        page: 1,
        dataLength: '',
        pagesize: '',
        yesterdayAdd: '',
        todayAdd: '',
        tgData: [],
        selectArg: {},
        multipleSelection: [],
        commodity_type: '',
        paytype: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 'vip_',
            label: 'vip_'
          },
        ],
        moneyCount: {},
        payStatus: {
          "0": "未支付",
          "1": "已支付"
        },
        payWays: {
          "0": "未支付",
          "zfb": "支付宝",
          "wxwb": "微信网页端",
          "wxjsapi": "微信小程序"
        },
        searchSelect: [
          {
            value: 'money_code',
            label: '推广码'
          }, {
            value: 'fromUid',
            label: '推广员'
          }, {
            value: 'uid',
            label: '使用会员'
          }, {
            value: 'id',
            label: '订单号'
          }
        ],
        // payType: [
        //   {
        //     value: '',
        //     label: '全部'
        //   }, {
        //     value: 'vip_1',
        //     label: 'VIP会员1个月'
        //   }, {
        //     value: 'vip_3',
        //     label: 'VIP会员3个月'
        //   },
        //   {
        //     value: 'vip_6',
        //     label: 'VIP会员6个月'
        //   },
        //   {
        //     value: 'vip_12',
        //     label: 'VIP会员12个月'
        //   }, {
        //     value: 'vip_24',
        //     label: 'VIP会员24个月'
        //   }
        // ],
        useStatus: [
          {
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '未支付'
          }, {
            value: '1',
            label: '已支付'
          }
        ],
        payWay: [
          {
            value: '',
            label: '全部'
          }, {
            value: 'zfb',
            label: '支付宝'
          }, {
            value: 'wxwb',
            label: '微信'
          }, {
            value: 'wxjsapi',
            label: '小程序'
          }
        ]
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val
        this.page = val
        this.searchKey()
      },

      payValue(e) {
        console.log('支付状态')
        if (e == '') {
          e = "vip_"
        }
        this.commodity_type = e
        console.log(e)
        let ee = this.selectArg
        this.page = 1
        this.searchKey(ee)
      },
      useValue(e) {
        console.log('使用状态')
        console.log(e)
        if (e == '') {
          this.selectArg['pay_status'] = 0

        }
        this.selectArg['pay_status'] = e

        let ee = this.selectArg
        // this.page=1
        console.log(ee)
        this.searchKey(ee)
      },
      wayValue(e) {
        console.log('支付方式')
        if (e == '') {
          e = "vip_"
        }
        this.selectArg['way'] = e
        console.log(e)
        let ee = this.selectArg
        this.page = 1
        this.searchKey(ee)
      },

      searchKey(e) {
        console.log(e)
        var _this = this
        if (e != undefined && ["fromUid", "money_code", "uid"].indexOf(e[0])) {
          // this.page=1
          delete this.selectArg.fromUid
          delete this.selectArg.money_code
          delete this.selectArg.uid
          this.selectArg[e[0]] = e[1]
        }
        var op = this.selectArg
        console.log(op)
        delete op.undefined
        if (e !== undefined && e[0] == "fromUid") {
          // this.page=1
          var _this = this
          PUBLIC.get("Currency.receive.findUidPro", {uid: e[1], type: "PromotionCode"}, function (data) {
            console.log(data)
            if (data.length > 0) {
              var code = data[0].key
              op["money_code"] = code
              _this.selectArg["money_code"] = code
              _this.getExtensionList(op)
            }
          })
        } else {
          if (e !== undefined) {
            op[e[0]] = e[1]
            // this.page=1
          }
          this.getExtensionList(op)
        }
      },
      getCount() {
        var _this = this
        PUBLIC.get("Order.receive.disproAll", {}, function (data) {
          _this.moneyCount = data
        })
      },
      getExtensionList(keyword) {
        console.log(keyword)
        var _this = this
        // var args = { }
        var args = {code_type: 'PromotionCode', pay_status: 1}   //仅显示支付成功
        for (var k in keyword) {
          if (k === undefined || keyword[k] === undefined || keyword[k] === "") {
            continue
          }
          args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Order.receive.orderall', {
          commodity_type: this.commodity_type,
          money_code: 1,
          page: this.page,
          select: JSON.stringify(args),
          order: 'id',
          order_aes: 1
        }, function (data) {
          console.log(data)
          var demo = {
            id: 'id',
            uid: 'uid',
            money: 'money',
            pay_id: 'pay_id',
            commodity_id: 'commodity_id',
            act_status: 'act_status', //支付状态
            money_code: 'money_code',
            money_type: 'money_type',
            end_time: 'end_time',
            pay_status: 'pay_status',
            originalPrice: 'originalPrice',
            earnings: "earnings",
            way: 'way'
          }
          var newData = PUBLIC.formatObj(demo, data)
          // for(var i = 0; i < newData.length; i++) {
          //   (function () {
          //
          //   })(i)
          // }
          console.log(newData)
          // _this.tgData = newData
          for (var n = 0; n < newData.length; n++) {

            (function (datas, i) {
              PUBLIC.get("Commodity.commoditys.message", {id: datas[i].commodity_id}, function (data0) {
                datas[i]["commodity"] = data0.desc
                _this.tgData = JSON.parse(JSON.stringify(datas))
              })
            })(newData, n)
            if (newData[n].money_code == null || newData[n].money_code == "") {
              console.log('aaa')
              continue
            }
            (function (datas, i) {
              console.log(i)
              PUBLIC.get("Currency.receive.findcode", {code: datas[i].money_code}, function (data1) {
                datas[i]["fromUid"] = data1.uid
                // datas[i]["codeGetMoney"]=data2.value
                _this.tgData = JSON.parse(JSON.stringify(datas))
              })
            })(newData, n)
          }
          console.log(newData)
        }, function (data) {
          console.log(data)
          _this.dataLength = parseInt(data.data.num)
          _this.pagesize = parseInt(data.data.pagenum)
          console.log(data.data.num)
        })
      }
    },
    mounted() {
      this.getExtensionList()
      this.getCount()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .app-container {
    color: #333333;

    .memberHead {
      height: 150px;
      padding: 0;
      p {
        padding-top: 10px;
        line-height: 65px;
        font-size: 14px;
        .buttons {
          .el-button {
            margin: 0;
            border-radius: 0;
          }
        }
        .record {
          float: right;
          > span {
            color: red;
            padding-right: 20px;
            font-weight: bold;
            span {
              color: #000;
              font-weight: bold;
            }
          }
        }
        .searchBox {
          display: inline-block;
          float: right;
        }
      }
      .firstLine {
        > span {
          padding-right: 20px;
          .selectKuang {
            width: 120px;
          }
          .el-input {
            width: 120px;
          }
        }
        .regTime {
          margin-right: 5%;
          .timeBox {
            display: inline-block;
          }
        }
      }
    }
    .el-table {
      .warning-row {
        background: #fff5f5;
      }
      .waiting {
        background-color: #f2ffff;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .el-pagination {
      padding-top: 20px;
    }

  }

</style>
