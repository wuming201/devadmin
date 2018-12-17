<template>
  <div class = 'messageList'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span></span></p>
      <p><span class='buttons'><router-link to="/message/message-list"><el-button type='warning'>消息列表</el-button></router-link></span>
        <span class=" fr">消息状态：<selectKuang  v-bind:selectData='payStatus' @value='stateValue'></selectKuang>&emsp;&emsp;&emsp;<searchBox @searchKey='searchKey' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='mListData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <!--<el-table-column-->
        <!--type='selection'>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop='id'-->
        <!--label='ID'>-->
        <!--<template></template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop='rel_name'
        label='会员名'>
        <template slot-scope="scope">
          <span class="innerText">{{scope.row.to_uid==-1?"所有人":scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop='problem_img'
        label='消息内容'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <img :src="scope.row.problem_img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop='problem_type'
        label='消息类型'>
      </el-table-column>
      <el-table-column
        prop='problem_time'
        label='发送时间'>
      </el-table-column>
      <el-table-column
        prop='read_res'
        label='已读状态'>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.read_res === '0'">未读</span>
          <span class="innerText" v-else-if="scope.row.read_res === '1'">已读</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' @getCurrent='handleCurrentChange'></paginationBox>
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
        mListData: [],
        multipleSelection: [],
        searchSelect: [
          {
            value: 'uid',
            label: '用户ID'
          }, {
            value: 'code',
            label: '手机号'
          }],
        msgType: [
          {
            value: '',
            label: '全部'
          }, {
            value: '系统推送',
            label: '系统推送'
          }, {
            value: '问题反馈',
            label: '问题反馈'
          }
        ],
        payStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '已送达'
          },
          {
            value: '0',
            label: '待回复'
          },
          {
            value: '0',
            label: '已回复'
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
        this.getsignList()
      },
      getsignList(keyword) {
        // console.log(keyword)
        var _this = this
        var args = { page: this.page }
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('User.Problem.selall', args, function(data) {
          console.log(data)
        })
      },
      passAduit(status) {
        console.log(status)
        var _this = this
        // _this.des = { des: this.des}
        console.log(_this.des)
        PUBLIC.get('Active.actives.auditApp', { id: this.id, pay_status: status, des: this.des }, function(data) {
          console.log(data)
        })
      },
      rejectAduit(status) {
        console.log(status)
        var _this = this
        // _this.des = { des: this.des}
        console.log(_this.des)
        PUBLIC.get('Active.actives.auditApp', { id: this.id, pay_status: status, des: this.des }, function(data) {
          console.log(data)
        })
      },
      searchKey(e) {
        var op = this.selectArg
        op[e[0]] = e[1]
        console.log(op)
        delete op.undefined
        this.getsignList(op)
      },
      typeValue(e) {
        console.log(e)
        if(e === '') {
          // delete  this.selectArg.type
          this.selectArg['type'] = ''
        }else{
          this.selectArg['type'] = e
        }
        let ee = this.selectArg
        this.searchKey(ee)
      },
      stateValue(e) {
        if(e === '') {
          // delete  this.selectArg.type
          this.selectArg['read_res'] = ''
        }else{
          this.selectArg['read_res'] = e
        }
        console.log(e)
        let ee = this.selectArg
        delete ee.undefined
        this.searchKey(ee)
      }
    },
    mounted() {
      this.getsignList()
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
  .messageList{
    padding: 20px;
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
