<template>
  <div class="withdraw">
    <div class="memberHead">
      <p class="firstLine"><span class="disposeState" >审核状态：<selectKuang :selectData="handelType" @value="checkValue" :holder="holder"></selectKuang></span><span class="disposePerson">处理人：<selectKuang :selectData="hpType" @value="hpValue" :holder="holder"></selectKuang></span><span class="applyTime">申请时间:<timeBox  @value="applyTime"></timeBox></span></p>
      <p><span class="buttons"><el-button type="success">批量导出</el-button></span>
        <span class="record"><searchBox @searchKey='searchKey' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="wdData"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="id"
        label="处理单号">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="user"
        label="昵称"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="money_num"
        label="申请金额"
        width="80">
        <template slot-scope="scope">{{ scope.row.money_num }}</template>
      </el-table-column>
      <el-table-column
        prop="card"
        label="卡号">
      </el-table-column>
      <el-table-column
        prop="bank"
        label="开户行"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="持卡人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="smallBank"
        label="支行"
        width="80">
        <template slot-scope="scope">{{ scope.row.subbranch }}</template>
      </el-table-column>
      <!-- <el-table-column
        prop="money_num"
        label="账户余额"
        width="150"
        show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column
        prop="pay_status"
        label="审核状态"
        width="150">
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.pay_status == '0'">未审核</span>
          <span class="innerText" v-if="scope.row.pay_status == '1'">已通过</span>
          <span class="innerText" v-if="scope.row.pay_status == '-1'">已拒绝</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="body"
        label="备注"
        width="150">
      </el-table-column>
      <el-table-column
        prop="handler"
        label="处理人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.pay_status === '1' || scope.row.pay_status === '-1'" type='text' size='small' style="color: black">已审核</el-button>
          <el-button type='text' size='small' v-if="scope.row.pay_status == '0'" @click="passIt(scope.row)">通过</el-button>
          <el-button type='text' size='small' v-if="scope.row.pay_status == '0'" @click="rejectIt(scope.row)">拒绝</el-button>
          <el-button type='text' size='small' v-if="scope.row.pay_status == '1'" ><a :href="scope.row.imgs" target="_blank">查看凭证</a></el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' :pageSize="pagesize" @getCurrent='handleCurrentChange'></paginationBox>
    <div class="pass" v-show="showPass">
      <h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>
      <div class="inner">
        <p>处理人：  {{admin}}</p>
        <p>上传凭证：<img :src="imgs" alt=""><el-button type="primary" @click="upImg()">上传图片</el-button><el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input></p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="2"
            v-model="rejdes"
            placeholder="请输入内容">
          </el-input>
        </p>
        <p><el-button type="success" @click="passUp">提交</el-button><el-button type="info" @click="cancel">取消</el-button></p>
      </div>
    </div>

    <div class="reject" v-show="showReject">
      <h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>
      <div class="inner">
        <p>处理人：  {{admin}}</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="2"
            v-model="rejdes"
            placeholder="请输入拒绝原因！">
          </el-input>
        </p>
        <p><el-button type="warning" @click="rejetUp">提交</el-button><el-button type="info" @click="cancel">取消</el-button></p>
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
        admin: '',
        list: null,
        filename: '',
        page: 1,
        dataLength: '',
        pagesize: '',
        showPass: false,
        showReject: false,
        wdData: [],
        rejdes: '',
        handle: '',
        passdes: '',
        imgs: [],
        selectArg:{},
        id: '',
        searchSelect: [
          {
            value: 'id',
            label: '处理单号'
          }, {
            value: 'uids',
            label: '用户ID'
          }
        ],
        handelType: [
          {
            value: '',
            label: '全部'
          },
         {
            value: '0',
            label: '未审核'
          } ,
          {
            value: '1',
            label: '已通过'
          }
          ,
          {
            value: '-1',
            label: '已拒绝'
          }
        ],
        holder: '全部',
        multipleSelection: [],
        hpType: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 'admin',
            label: 'admin'
          }
        ]
      }
    },
    created() {
      this.admin = JSON.parse(localStorage.userInfo).name
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getWdrList()
      },
      // showImg:function(url){

      // }
      //获取总数
      getTotal() {
        // PUBLIC.get('User.User.usercount', data => {
        //   this.dataLength = data
        // })
      },
      passIt(row) {
        this.id = row.id
        this.handle = row.handler
        this.showPass = !this.showPass
      },
      rejectIt(row) {
        console.log(row)
        this.handle = row.handler
        this.id = row.id
        this.pay_status = row.pay_status
        this.handler = row.handler
        this.showReject = !this.showReject
      },
      cancel() {
        this.showReject = this.showPass = false
      },
      rejetUp() {
        PUBLIC.get('Currency.receive.dispose', {
          id: this.id, pay_status: -1, handler: this.handler?this.handler: this.admin, imgs: this.imgs, body: this.rejdes
        }, data => {
          console.log(data)
          this.$message({
            message: '您拒绝了此条提现申请！',
            type: 'success'
          })
          this.$router.go(0)
        })
      },
      passUp() {
        console.log( this.imgs)
        PUBLIC.get('Currency.receive.dispose', {
          id: this.id, pay_status: 1, handler: this.handler?this.handler: this.admin, imgs: this.imgs, body: this.rejdes
        }, data => {
          console.log(data)
          this.$message({
            message: '您通过了此条提现申请！',
            type: 'success'
          })
          this.$router.go(0)
        })
      },
      searchKey(e) {
        console.log(e)
        if(e!=undefined && ["id","uid"].indexOf(e[0])>-1){
          delete this.selectArg["id"]
          delete this.selectArg["uid"]
          this.selectArg[e[0]]=e[1]
        }
        var op = this.selectArg
        // op[e[0]] = e[1]

        this.getWdrList(op)
      },
      hpValue(e) {
        this.selectArg['handler'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      checkValue(e) {
        this.selectArg['pay_status'] = e
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      applyTime(e) {
        this.selectArg['starttime'] = e[0]
        this.selectArg['endtime'] = e[1]
        console.log(e)
        let ee = this.selectArg
        this.searchKey(ee)
      },
      getWdrList: function(keyword) {
        console.log(keyword)
        var _this = this
        var args = { page: this.page ,act:1}
        console.log(args)
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Currency.receive.depositList', args, function(data) {
          console.log(data)
          // "id":"7","uid":"15844","to_uid":"-1","money_type":"3","money_num":"3","act":"0","start_time":"2018-07-09 10:15:42","end_time":"2018-07-09 10:15:42","rest_url":null,"rest_agument":null,"pay_status":"0","statu":"1","card_id":"1","handler":null,"card":"5465465478567856","bank":"asfsadasdasd","name":"\u6c5f\u6e56\u5c0f\u5efa","user":"tel_17333731888","balance":null}
          var demo = {
            id: 'id',
            card_id: 'card_id',
            uid: 'uid',
            balance: 'balance',
            money_num: 'money_num',
            act: 'act',
            card: 'card',
            handler: 'handler',
            bank: 'bank',
            user: 'user',
            rest_agument: 'rest_agument',
            money_type: 'money_type',
            name: 'name',
            pay_status: 'pay_status',
            rest_url: 'rest_url',
            imgs:"imgs",
            body:"body",
            subbranch:"subbranch"
          }
          var newData = PUBLIC.formatObj(demo, data)
          _this.wdData = newData
          console.log(newData)
        },function(data){
          // console.log(data)
          _this.dataLength=parseInt(data.data.num)
          _this.pagesize=parseInt(data.data.pagenum)
          console.log(data.data.num)
        })
      },
      upImg(tab) {
        this.upFileFor = tab
        document.getElementById('upimgs').click();
      },
      upFile() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function(url) {
          console.log(url)
          _this.imgs = url
        })
      }
    },
    mounted() {
      this.getWdrList()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >

  .el-textarea__inner::-webkit-input-placeholder {
    color: red;
  }
  .withdraw{
    color: #333333;
    padding: 25px;
    padding-bottom: 80px;
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
  }

</style>
