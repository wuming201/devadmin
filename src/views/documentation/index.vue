<template>
  <div class="documentation-container">
    <h5>用户统计</h5>
    <div class="first">
      <div class="left fl">
        <div class="allmember">
          <!--<span class="allNum">会员总数：{{allMnum}}人</span>-->
          <div ref="allM" style="width: 448px; height: 230px;"></div>
        </div>
        <div class="allvip">
          <!--<span class="allNum">会员总数：{{allVnum}}人</span>-->
          <div ref="vip" style="display: inline-block;width: 448px; height: 230px;"></div>
        </div>
      </div>
      <div class="center fl">
        <div class="region">
          <div ref="regionM" style="display: inline-block; width: 215px; height: 230px;"></div>
          <span class="phoneBinding">手机绑定</span>
          <div ref="regionM1" style="display: inline-block;width: 215px; height: 230px;"></div>
          <span class="trueName">实名认证</span>
        </div>
        <div class="partner">
          <div ref="com" style="display: inline-block;width: 448px; height: 230px;"></div>
        </div>
      </div>
      <div class="right fr">
        <div class="top10">
          <p>注册TOP10</p>
          <table>
            <tr>
              <th>省会</th>
              <th>会员人数</th>
            </tr>
            <tr v-for="items in cityDataList">
              <td>{{items.name}}</td>
              <td>{{items.value}}</td>
            </tr>
          </table>
        </div>
        <div class="china" ref="china" style="display: inline-block;width: 490px; height: 380px;"></div>
      </div>
    </div>
    <div class="second">
      <div class="left2 fl">
        <p class="head">
          <span>流量统计</span>
          <span class="btns"><el-button type="primary" @click="getvisit(1)">今天</el-button><el-button type="info" @click="getvisit(2)">昨天</el-button><el-button
            type="info" @click="getvisit(3)">7天</el-button><el-button type="info" @click="getvisit(4)">30天</el-button></span>
          <span class="searchBox">
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="—"
              start-placeholder="从"
              end-placeholder="至">
            </el-date-picker>
            <el-button type="primary" @click="getvisitByTime">查看</el-button>
          </span>
        </p>
        <div class="inner">
          <p><span>登录人次：{{loginNum}}人</span><span>总访客（UV）：{{visitIP}}</span><span>总流量（UV）：{{visit}}</span>
          <!-- <span>平均在线时长：</span> -->
          </p>
          <p class="text">流量TOP10</p>
          <el-table
            :data="pageData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="首页">
            </el-table-column>
            <el-table-column
              prop="name"
              label="访客（UV）">
            </el-table-column>
            <el-table-column
              prop="address"
              label="流量（PV）">
            </el-table-column>
            <el-table-column
              prop="date"
              label="流量占比%">
            </el-table-column>
            <el-table-column
              prop="name"
              label="停留时长 s">
            </el-table-column>
            <el-table-column
              prop="address"
              label="跳失率%">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="right2 fl">
        <p class="head">
          消费统计<span>消费总人次：{{cusNum}}人</span><span>销售总额：{{allMoney}}元</span>
        </p>
        <div class="rightnow fl">
          <p>实时（支付成功）</p>
          <table>
            <tr>
              <th>支付方式</th>
              <th>金额</th>
              <th>时间</th>
            </tr>
            <tr v-for="items in payData">
              <td>
                <span v-if="items.way === 'wxwb'">微信</span>
                <span v-else-if="items.way === 'zfb'">支付宝</span>
                <span class="innerText" v-else>小程序</span>
              </td>
              <td>{{items.money}}</td>
              <td>{{items.timeLength}}</td>
            </tr>
          </table>
        </div>
        <div class="orderList fl">
          <p>订单列表</p>
          <table>
            <tr>
              <th>订单号</th>
              <th>消费金额</th>
              <th>支付方式</th>
              <th>支付状态</th>
              <th>支付时间</th>
            </tr>
            <tr v-for="items in olData">
              <td>{{items.id}}</td>
              <td>{{items.money}}</td>
              <td>
                <span v-if="items.way === 'wxwb'">微信</span>
                <span v-else-if="items.way === 'zfb'">支付宝</span>
                <span class="innerText" v-else>小程序</span>
              </td>
              <td>
                <span v-if="items.order_status === '0'">未支付</span>
                <span v-else-if="items.order_status === '-100'">取消</span>
                <span  v-else-if="items.order_status === '200'">支付成功</span>
                <span  v-else-if="items.order_status === '301'">业务成功</span>
                <span  v-else-if="items.order_status === '302'">业务失败</span>
                <span  v-else-if="items.order_status === '401'">订单成功</span>
                <span v-else-if="items.order_status === '402'">订单失败</span>
              </td>
              <td>{{items.end_time}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/map/js/china.js')  // 引入中国地图组件
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        allMnum: '',
        allVnum: '',
        allComnum: '',
        ordinary: '',
        reginYes: '',
        reginNo: '',
        jihuo: '',
        djihuo: '',
        xjihuo: '',
        cityData: [],
        cityDataList: [],
        pageData: [],
        nowPay: [],
        noTag: false,
        value6: '',
        olData: [],
        payData: [],
        cusNum: '',
        allMoney: '',
        zxtXz: [],
        zxtDq: [],
        zxtXf: [],
        zxtTg: [],
        loginNum: '',
        visitIP:0,
        visit:0
      }
    },
    methods: {
      getvisit:function(flag){
        flag=flag==undefined?1:flag
        var _this=this
        var startTime=""
        var endTime=""
        console.log(flag)
        switch(flag){
          case undefined: //今日
          break;
          case 1:
            startTime=PUBLIC.getNow(new Date(),true)
          break;
          case 2: //昨日
            startTime=PUBLIC.getNow(new Date(new Date().getTime()-3600*1000*24),true)
            endTime=PUBLIC.getNow(new Date(),true)
          break;
          case 3: //七天
            startTime=PUBLIC.getNow(new Date(new Date().getTime()-3600*1000*24*7),true)
          break;
          case 4: //三十天
            startTime=PUBLIC.getNow(new Date(new Date().getTime()-3600*1000*24*30),true)
          break;
        }

        PUBLIC.get("Statis.Visit.countVisitApi",{type:"A",ctype:"userVisit",count:"IP",startTime:startTime,endTime:endTime},function(data){
          _this.visitIP=data
        })
        PUBLIC.get("Statis.Visit.countVisitApi",{type:"A",ctype:"userVisit",count:"visit",startTime:startTime,endTime:endTime},function(data){
          _this.visit=data
        })
      },

      getvisitByTime:function(){
        console.log(this.value6)
        console.log(PUBLIC.getNow(new Date(this.value6[0]),true))
        // return
        var startTime=PUBLIC.getNow(new Date(this.value6[0]),true)
        var endTime=PUBLIC.getNow(new Date(this.value6[1]),true)
        var _this=this

        PUBLIC.get("Statis.Visit.countVisitApi",{type:"A",ctype:"userVisit",count:"IP",startTime:startTime,endTime:endTime},function(data){
          _this.visitIP=data
        })
        PUBLIC.get("Statis.Visit.countVisitApi",{type:"A",ctype:"userVisit",count:"visit",startTime:startTime,endTime:endTime},function(data){
          _this.visit=data
        })
      },
      drawAllM() {
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.allM)
        // console.log(myChart)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '会员总览',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: ['普通会员', 'VIP会员', '机构会员'],
            formatter: function (name) {
              var index = 0;
              var clientlabels = ['普通会员', 'VIP会员', '机构会员'];
              // var clientcounts = [9, 1, 10];
              var clientcounts = [_this.ordinary, _this.allVnum, _this.allComnum];
              clientlabels.forEach(function (value, i) {
                if (value == name) {
                  index = i;
                }
              });
              return name + "  " + clientcounts[index];
            }
          },
          series: [{
            name: '会员总览',
            type: 'pie',
            center: ['35%', '60%'],
            data: [
              {value: this.allMnum, name: '普通会员'},
              {value: this.allVnum, name: 'VIP会员'},
              {value: this.allComnum, name: '机构会员'}
            ]
          }]
        })
      },
      drawZhu1() {
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.regionM)
        // console.log(myChart)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '认证用户',
            textStyle: {
              fontSize: 14
            }
          },
          grid: {
            y2: 60
          },
          xAxis: {
            type: 'category',
            data: ['已激活', '未激活']
          },
          yAxis: {
            type: 'value',
            show: false
          },
          label: {
            normal: {
              show: true,
              position: 'top',
            }
          },
          series: [{
            type: 'bar',
            barWidth: '50',
            barCategoryGap: '20',
            data: [_this.bindingYes, _this.bindingNo]
          }]
        })
      },
      drawZhu2() {
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.regionM1)
        // console.log(myChart)
        // 绘制图表
        myChart.setOption({
          grid: {
            y2: 60
          },
          xAxis: {
            type: 'category',
            data: ['已认证', '未认证']
          },
          yAxis: {
            type: 'value',
            show: false
          },
          label: {
            normal: {
              show: true,
              position: 'top',
            }
          },
          series: [{
            type: 'bar',
            barWidth: '50',
            barCategoryGap: '20',
            data: [_this.reginYes, _this.regionNo]
          }]
        })
      },
      drawZhe() {
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.vip)
        // console.log(myChart)
        // 绘制图表
        myChart.setOption({
          title: {
            text: 'VIP会员',
            textStyle: {
              fontSize:14
            }
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['新增', '到期', '续费', '推广'],
            y: 30
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            // feature: {
            //   saveAsImage: {}
            // }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['7', '6', '5', '4', '3', '2', '1']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '新增',
              type: 'line',
              data: _this.zxtXz
            },
            {
              name: '到期',
              type: 'line',
              data: _this.zxtDq
            },
            {
              name: '续费',
              type: 'line',
              data: _this.zxtXf
            },
            {
              name: '推广',
              type: 'line',
              data: _this.zxtTg
            }
          ]
        })
      },
      drawAllCom() {
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.com)
        // console.log(myChart)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '机构会员',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: ['已激活', '待激活', '待续约'],
            formatter: function (name) {
              var index = 0;
              var clientlabels = ['已激活', '待激活', '待续约'];
              var clientcounts = [_this.jihuo, _this.djihuo, _this.xjihuo];
              clientlabels.forEach(function (value, i) {
                if (value == name) {
                  index = i;
                }
              });
              return name + "  " + clientcounts[index];
            }
          },
          series: [{
            name: '机构会员',
            type: 'pie',
            center: ['35%', '60%'],
            data: [
              {value: this.jihuo, name: '已激活'},
              {value: this.djihuo, name: '待激活'},
              {value: this.xjihuo, name: '待续约'}
            ]
          }]
        })
      },
      drawChina() {
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.china)
        // console.log(myChart)
        myChart.setOption({
          backgroundColor: '#FFFFFF',
          tooltip: {
            trigger: 'item'
          },
          //配置属性
          series: [{
            name: '数据',
            type: 'map',
            zoom: 1.25,
            mapType: 'china',
            scaleLimit: { min: 1.25, max: 1.25 },
            roam: true,
            label: {
              normal: {
                show: false  //省份名称
              },
              emphasis: {
                show: false
              }
            },
            data: _this.cityData  //数据
          }]
        })
      },
      getAllInfo() {
        var _this = this
        PUBLIC.get('User.User.Userlist', {page: 1}, (data) => {}, function (v) {
          _this.allMnum = Number(v.data.num)
          // console.log(_this.allMnum)
          //大饼图
          PUBLIC.get('User.User.Userlist', {page: 1, usertype: 318}, (data) => {}, function (v) {
            _this.allVnum = Number(v.data.num)
            console.log(_this.allVnum)
            PUBLIC.get('Team.User.countNumJigou', (v) => {
              console.log(v)
              // console.log(Number(v.data.num))
              _this.allComnum = Number(v)
              _this.ordinary = _this.allMnum - _this.allVnum - _this.allComnum
              console.log(_this.ordinary)
              _this.drawAllM()
            })
          })

          //柱状图
          PUBLIC.get('User.User.Userlist', {page: 1, issming: 1}, (data) => {}, function (v) {
            _this.reginYes = Number(v.data.num)
            _this.regionNo = _this.allMnum - _this.reginYes
            console.log(_this.regionNo, _this.reginYes, _this.allMnum)
            _this.drawZhu1()
            _this.drawZhu2()
          })
          PUBLIC.get('User.User.Userlist', {page: 1, phone_status: 1}, (data) => {}, function (v) {
            _this.bindingYes = Number(v.data.num)
            _this.bindingNo = _this.allMnum - _this.bindingYes
            // console.log(_this.bindingNo, _this.bindingYes, _this.allMnum)
            _this.drawZhu1()
            _this.drawZhu2()
          })

          //VIP折线图
          var today = new Date().getTime()
          var timeList = []
          for(var n = 0; n < 7; n++) {

            let date = new Date(today - 1000 * 60 * 60 * 24 * parseInt(n))
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var time = Y+M+D+ '00:00:00'
            let obj = { id: '', num: 0, time: time, type: ''}
            timeList.push(obj)
          }

          PUBLIC.get('Statis.Usermoney.vipuser', { type: 'xz' }, data => {
            // console.log(data)
            _this.zxtXz = timeList
            for(var a = 0; a < data.length; a++) {
              for(var b = 0; b < _this.zxtXz.length; b++) {
                if(data[a].time == _this.zxtXz[b].time) {
                  _this.zxtXz[b].num = Number(data[a].num)
                  _this.zxtXz[b].type = data[a].type
                }
              }
            }
            let newData1 = []
            for(var i in _this.zxtXz) {
              newData1.push(_this.zxtXz[i].num)
            }
            _this.zxtXz = newData1
            // console.log(_this.zxtXz)
            PUBLIC.get('Statis.Usermoney.vipuser', { type: 'dq' }, data => {
              // console.log(data)
              _this.zxtDq = timeList
              for(var a = 0; a < data.length; a++) {
                for(var b = 0; b < _this.zxtDq.length; b++) {
                  if(data[a].time == _this.zxtDq[b].time) {
                    _this.zxtDq[b].num = Number(data[a].num)
                    _this.zxtDq[b].type = data[a].type
                  }
                }
              }
              let newData = []
              for(var i in _this.zxtDq) {
                newData.push(_this.zxtDq[i].num)
              }
              _this.zxtDq = newData
              // console.log(_this.zxtDq)
            })
            PUBLIC.get('Statis.Usermoney.vipuser', { type: 'xf' }, data => {
              // console.log(data)
              _this.zxtXf = timeList
              for(var a = 0; a < data.length; a++) {
                for(var b = 0; b < _this.zxtXf.length; b++) {
                  if(data[a].time == _this.zxtXf[b].time) {
                    _this.zxtXf[b].num = Number(data[a].num)
                    _this.zxtXf[b].type = data[a].type
                  }
                }
              }
              let newData2 = []
              for(var i in _this.zxtXf) {
                newData2.push(_this.zxtXf[i].num)
              }
              _this.zxtXf = newData2
              // console.log(_this.zxtXf)
              PUBLIC.get('Statis.Usermoney.vipuser', { type: 'tg' }, data => {
                _this.zxtTg = timeList
                for(var a = 0; a < data.length; a++) {
                  for(var b = 0; b < _this.zxtTg.length; b++) {
                    if(data[a].time == _this.zxtTg[b].time) {
                      _this.zxtTg[b].num = Number(data[a].num)
                      _this.zxtTg[b].type = data[a].type
                    }
                  }
                }
                let newData = []
                for(var i in _this.zxtTg) {
                  newData.push(_this.zxtTg[i].num)
                }
                _this.zxtTg = newData
                // console.log(_this.zxtTg)
              }, function (c) {
                // console.log(c)
                if(c.data.ret === 200) {
                  _this.drawZhe()
                }
              })
            })

          })

          //机构会员
          PUBLIC.get('Statis.Usermoney.mechcount', data => {
            // console.log(data)
            _this.jihuo = data.jh
            _this.djihuo = data.djh
            _this.xjihuo = data.xjh
            _this.drawAllCom()
          })

          //地图数据
          PUBLIC.get('Statis.Usermoney.regcount', data => {
            // console.log(data)
            let demo = {
              value: 'num',
              name: 'province'
            }
            _this.cityData = PUBLIC.formatObj(demo, data)
            _this.cityDataList = _this.cityData.slice(0,10)
            // console.log(_this.cityData);
            _this.drawChina()
          })
        })
      },
      getListInfo() {
        PUBLIC.get('Order.receive.orderall', { page: 1, select: '', order_aes: -1 }, data => {
          let datas = data.splice(0,12)
          var demo = {
            id: 'id',
            uid: 'uid',
            money: 'money',
            pay_id: 'pay_id',
            commodity_type: 'commodity_type',
            act_status: 'act_status', //支付状态
            money_code: 'money_code',
            way: 'way',
            end_time: 'end_time',
            order_status: 'order_status',
            originalPrice: 'originalPrice'
          }
          var newData = PUBLIC.formatObj(demo, datas)
          this.olData = newData
          PUBLIC.get('Statis.orderlist.selectOrderlist', data => {
            this.cusNum = data.usernumber
            this.allMoney = data.money
          })
          PUBLIC.get('Statis.orderlist.orderList', data => {
            // console.log(data)
            let datas = data.splice(0,12)
            let demo1 = {
              uid: 'uid',
              way: 'way',
              money: 'money',
              timeLength: 'timeLength'
            }
            this.payData = PUBLIC.formatObj(demo1, datas)
          })
        })
      },
      //流量数据
      getLLinfo() {
        var _this = this
        let startTime = PUBLIC.getToday()
        let nowTime = PUBLIC.getNow()
        console.log(startTime,nowTime)
        PUBLIC.get('Statis.Usermoney.entercount', { startime: startTime, endtime: nowTime }, data => {
          console.log(data)
          this.loginNum = data
        })
      }
    },
    mounted() {
      this.getAllInfo()
      this.getLLinfo()
      this.getListInfo()
      this.getvisit()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .documentation-container {
    background-color: #fff;
    width: 1675px;
    div {
      background-color: #fff;
      position: relative;
      .allNum {
        font-size: 14px;
        position: absolute;
        top: 15px;
        right: 30px;
      }
    }
    h5 {
      height: 70px;
      margin-left: 30px;
      line-height: 70px;
      font-size: 20px;
      font-weight: normal;
    }
    .first {
      height: 460px;
      .fl {
        > div {
          height: 230px;
          width: 448px;
          border-right: 2px solid #ECECEC;
          border-top: 2px solid #ECECEC;
        }
      }
      .fr {
        float: left;
      }
      .left {

      }
      .center {
        .region {
          position: relative;
          font-size: 13px;
          .phoneBinding {
            position: absolute;
            left: 73px;
            bottom: 10px;

          }
          .trueName {
            position: absolute;
            left: 300px;
            bottom: 10px;
          }
        }
      }
      .right {
        border-right: 2px solid #ECECEC;
        border-top: 2px solid #ECECEC;
        width: 779px;
        height: 460px;
        padding: 20px 13px;
        .top10 {
          background: url("china.png");
          width: 260px;
          p {
            font-size: 13px;
            line-height: 30px;
          }
          table {
            margin-top: 10px;
            width: 240px;
            line-height: 23px;
            text-align: center;
            border-collapse: collapse;
          }
          th, td {
            width: 120px;
          }
          th {
            background-color: #F5FAFE;
            height: 40px;
            padding: 10px 0;
          }
          td {
            padding: 5px 0;
            height: 30px;
          }
          tr:nth-child(odd) {
            background: #F2F2F2;
          }
        }
        .china{
          margin-top: 20px;
        }
        >div{
          float: left;
        }
      }
    }
    .second {
      border-top: 8px solid #ECECEC;
      height: 840px;
      width: 100%;
      .left2 {
        width: 835px;
        border-right: 8px solid #ECECEC;
        height: 840px;
        .head {
          padding: 15px;
          border-bottom: 2px solid #ECECEC;
          .btns {
            margin-left: 20px;
            .el-button {
              width: 50px;
              height: 25px;
              font-size: 13px;
              padding: 0;
            }
          }
          .searchBox {
            margin-left: 20px;
            .el-date-editor {
              width: 300px;
              /*margin-top: 5px;*/
              /*height: 30px;*/
            }
            .el-button {
              width: 50px;
              height: 25px;
              font-size: 13px;
              padding: 0;
            }
          }
        }
        .inner {
          padding: 15px;
          p {
            span {
              display: inline-block;
              width: 192px;
              height: 50px;
              background-color: #F2F2F2;
              margin-left: 7px;
              line-height: 50px;
              text-indent: 1rem;
              font-size: 13px;
            }
          }
          .text {
            margin-top: 15px;
            line-height: 45px;
            font-size: 13px;
            text-indent: 1rem;
          }
        }
      }
      .right2 {
        width: 835px;
        height: 772px;
        .head {
          padding: 8px 15px;
          border-bottom: 2px solid #ECECEC;
          span {
            display: inline-block;
            width: 192px;
            height: 50px;
            background-color: #F2F2F2;
            margin-left: 14px;
            line-height: 50px;
            text-indent: 1rem;
            font-size: 13px;
          }
        }
        .rightnow, .orderList {
          padding: 20px 13px;
          width: 204px;
          height: 100%;
          border-right: 2px solid #ECECEC;
          p {
            font-size: 13px;
            line-height: 30px;
          }
          table {
            margin-top: 20px;
            width: 180px;
            line-height: 23px;
            text-align: center;
            border-collapse: collapse;
          }
          th {
            background-color: #F5FAFE;
          }
          th, td {
            padding: 10px 0;
          }
        }
        .orderList {
          border: none;
          width: 600px;
          table {
            width: 565px;
          }
        }
      }
    }
  }

  table, table tr th, table tr td {
    border: 1px solid #ebeef5;
    font-size: 13px;
  }
</style>
