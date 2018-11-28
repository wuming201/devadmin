<template>
  <div class="app-container">
    <div class="memberHead">
      <p class="firstLine"><span class="useState">发放状态：<selectKuang :selectData='useStatus' @value='useValue'></selectKuang></span><span class="generateTime">生成时间:<timeBox @value='regTime'></timeBox></span></p>
      <p><span class="buttons"><el-button type="success">批量导出</el-button><el-button type="danger" @click="showAdd">添加优惠券</el-button><el-button type="primary" @click="toHistory">使用记录</el-button></span>
        <span class="record">总记录：<span>1234</span>已使用：<span>42</span>未使用：<span>255</span><searchBox @searchKey='searchBox' :searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="disList"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        prop="key"
        label="券号">
      </el-table-column>
      <el-table-column
        prop="astype"
        label="类型">
        <template slot-scope="scope">
          <!--<span class="innerText" v-if="scope.row.type == 'commodity'">未知commodity</span>-->
          <span class="innerText" v-if="scope.row.astype == 'discount'">折扣券</span>
          <span class="innerText" v-if="scope.row.astype == 'shopping'">商品券</span>
          <span class="innerText" v-if="scope.row.astype == 'moneynum'">现金券</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reduce_num"
        label="金额（折扣）"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="shangpin"
        label="商品"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.shangpin}}
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="生效时间">
      </el-table-column>
      <el-table-column
        prop="time"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="on_status"
        label="状态">
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.on_status === '1'">发放中</span>
          <span class="innerText" v-else-if="scope.row.on_status === '-1'">已过期</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sum"
        label="发放数量">
      </el-table-column>
      <el-table-column
        prop="had_num"
        label="已使用">
        <template slot-scope="scope">
          <span class="innerText">{{scope.row.sum - scope.row.on_status}}</span>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' @getCurrent='handleCurrentChange'></paginationBox>
    <div class="addCoupon" v-show="showBox">
      <h3>信息编辑 <i class="fa fa-close" @click="showAdd"></i></h3>
      <div class="inner">
        <p><span>面额（元）：<el-input v-model="money"></el-input></span>
          <span>身份时长（月）：
            <!--<el-input v-model="months"></el-input>-->
            <el-select v-model="months" placeholder="请选择">
              <el-option
                v-for="item in vipDataList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </span>
        </p>
        <p>&emsp;生效时间：
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <p> &emsp;失效时间：
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <p>&emsp;发放数量：<span><el-input v-model="had_num"></el-input><el-button type="gray" @click="num500">500</el-button><el-button type="gray"  @click="num2000">2000</el-button><el-button type="gray"  @click="num5000">5000</el-button></span></p>
        <p><el-button type="success" @click="addDis">提交</el-button><el-button type="info" @click="showAdd">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { searchBox, selectKuang, timeBox, paginationBox } from '../../components/index'

  export default {
    name: 'coupon',
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
        showBox: false,
        disList: [],
        multipleSelection: [],
        money: '',
        months: '',
        startTime: '',
        time: '',
        had_num: '',
        vipDataList: [],
        selectArg: {},
        shenfenshichang1: '',
        shenfenshichang2: '',
        shenfenshichang3: '',
        shenfenshichang4: '',
        shenfenshichang5: '',
        shenfenshichang6: '',
        shenfenshichang7: '',
        pagesize: '',
        searchSelect: [
          {
            value: 'id',
            label: '券号ID'
          }, {
            value: 'key',
            label: '优惠券号码'
          }, {
            value: 'uid',
            label: '使用券名称'
          }
        ],
        useStatus: [
          {
            value: '',
            label: '全部'
          }, {
            value: -1,
            label: '发放中'
          }, {
            value: 1,
            label: '已过期'
          }
        ]
      }
    },
    methods: {
      toHistory() {
        this.$router.push({name: '优惠券使用记录'})
      },
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getDisList()
      },
      searchBox(e) {
        let aa = this.selectArg
        delete aa['on_status']
        console.log(aa)
        aa['key'] = e[0]
        aa['value'] = e[1]
        this.getDisList(aa)
      },
      useValue(e) {
        console.log(e)
        this.selectArg['on_status'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      regTime(e) {
        console.log( this.selectArg)
        this.selectArg['on_status'] = ''
        this.selectArg['startTime'] = e[0]
        this.selectArg['time'] = e[1]

        let ee = this.selectArg

        console.log(ee)
        this.searchKey(ee)
      },

      searchKey(e) {
        console.log(e)
        var op = this.selectArg
        op[e[0]] = e[1]
        delete op.undefined
        console.log(op)
        this.getDisList(op)
      },
      getDisList(keyword) {
        var _this =  this
        // console.log(keyword)
        var args = { page: this.page, type: 'discounts' }
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Currency.receive.overdueTodata', args, (data) => {
          // console.log(data)
          var newData = []
          var demo = {
            id: 'id',
            uid: 'uid',
            time: 'time',
            astype: 'astype',
            type: 'type',
            sum: 'sum',
            startTime: 'startTime',
            on_status: 'on_status',
            reduce_num: 'reduce_num',
            key: 'key',
            had_num: 'had_num',
            item_id: 'item_id'
          }
          newData = PUBLIC.formatObj(demo,data)
          for(let i = 0; i< data.length; i++ ) {
            (function (n) {
              PUBLIC.get('Commodity.commoditys.message', { id: data[n].item_id }, data => {
                if(data != false) {
                  if( data.desc.length <= 8) {
                    newData[n]['shangpin'] = data.desc
                    _this.disList.push(newData[n])
                  }else {
                    newData[n]['shangpin'] = JSON.parse(data.desc)
                    _this.disList.push(newData[n])
                  }
                }else {
                  newData[n]['shangpin'] = ''
                  _this.disList.push(newData[n])
                }
              })
            })(i)
          }
        },function(data){
          console.log(data)
          _this.dataLength=parseInt(data.data.num)
          _this.pagesize=parseInt(data.data.pagenum)
          _this.astype =
          console.log(data.data.had_num)

        })
        PUBLIC.get('Commodity.commoditys.checklist', { keyword: 'vip' }, data => {
          let vipData = []
          let demo1 = {
            id: 'id',
            desc: 'desc',
            money: 'money',
            money_type: 'money_type',
            name: 'name',
            type: 'type',
            on_status: 'on_status'
          }
          vipData = PUBLIC.formatObj(demo1,data)
          this.vipDataList = vipData
          for (let i = 0; i < this.vipDataList.length; i++) {
            for (let a = 0; a < this.disList.length; a++) {
              if (this.disList[a].item_id == this.vipDataList[i].id) {
                this.disList[a]['month'] = this.vipDataList[i].desc
              }
            }
          }
        })

      },
      showAdd() {
        console.log(this.showBox)
        this.showBox = !this.showBox
      },
      num500() {
        this.had_num = 500
      },
      num2000() {
        this.had_num = 2000
      },
      num5000() {
        this.had_num = 5000
      },
      addDis() {
        var _this=this
        if (this.startTime === '') {
          this.starTime = PUBLIC.getTime()
          console.log(this.starTime)
        }
        // if(parseInt(this.money)==0 && parseInt(this.months)==0){
        //   return
        // }
        // if(parseInt(this.money)>0){
        //   var type="moneynum"
        //   var comId=2
        //   var num=parseInt(this.money)
        // }else{
        //    var type="commodity"
        //   var num=parseInt(this.months)
        // }
        PUBLIC.get('Currency.receive.appenddis', { uid: 0, astype: 'moneynum', type: '', item_id: this.months, reduce_num: this.money, had_num: this.had_num, time: this.time, startTime: this.startTime }, (data) => {
          console.log(data)
          _this.getDisList()
          _this.showBox=!_this.showBox
        })
      }
    },
    mounted() {
      this.getDisList()
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
    .addCoupon{
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
            width: 200px;
          }
          >span{
            .el-input{
              width: 100px;
              margin-right: 30px;
            }
            >.el-select{
              width: 130px;
              .el-input{
                width: 130px;
              }
            }
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          >button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          >button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }

  }

</style>
