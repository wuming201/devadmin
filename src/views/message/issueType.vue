<template>
  <div class = 'messageList'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span></span></p>
      <p><span class='buttons'><el-button type='warning' @click="addIt">&emsp;添加&emsp;</el-button></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='mListData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='key'
        label='问题类型'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='操作'
        width="300">
        <template slot-scope="scope">
          <el-button type="text" class="innerText" @click="editIt(scope.row)">编辑</el-button>
          <el-button type="text" class="innerText" @click="delIt(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' @getCurrent='handleCurrentChange'></paginationBox>
    <div class="pass" v-show="showPass">
      <h3>添加类型 <i class="fa fa-close" @click="addIt"></i></h3>
      <div class="inner">
        <p>消息类型：  问题反馈</p>
        <p>二级区域：<el-input v-model="add_name"></el-input></p>
        <p><el-button type="success" @click="saveAdd()">保存</el-button><el-button type="info" @click="addIt">取消</el-button></p>
      </div>
    </div>
    <div class="reject" v-show="showReject">
      <h3>信息编辑 <i class="fa fa-close" @click="editIt"></i></h3>
      <div class="inner">
        <p>消息类型：  问题反馈</p>
        <p>二级区域：<el-input v-model="edit_name"></el-input></p>
        <p><el-button type="success" @click="saveEdit()">保存</el-button><el-button type="info" @click="editIt">取消</el-button></p>
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
        add_name: '',
        old_name: '',
        edit_name: '',
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
            value: '短信',
            label: '短信'
          }, {
            value: '站内信',
            label: '站内信'
          }
        ],
        payStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '已读'
          },
          {
            value: '0',
            label: '未读'
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
      addIt() {
        console.log(this.showPass)
        this.showPass = !this.showPass
      },
      editIt(a) {
        this.edit_name = a.value
        this.old_name = a.value
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
        var args = { page: this.page, type:"problemType" }
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Configure.Configure.Selfig', args, (data) => {
          console.log(data)
          this.mListData = data
        })
      },
      saveAdd() {
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'problemType', key: this.add_name, value: this.add_name,on_status: '1',statu: 1 }, (data) => {
          if(data == true) {
            this.add_name = ''
            this.addIt()
            this.getsignList()
          }
        })
      },
      saveEdit() {
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'problemType', key: this.old_name, value: this.edit_name, on_status: '-1',statu: 1 }, (data) => {
          console.log(data)
          PUBLIC.get('Configure.Configure.Addconfig', { type: 'problemType', key: this.edit_name, value: this.edit_name,on_status: '1',statu: 1 }, (v) => {
            if(data == true) {
              this.edit_name = ''
              this.old_name = ''
              this.editIt()
              this.getsignList()
            }
          })
        })
      },
      delIt(a) {
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'problemType', key: a.key, value: a.value, on_status: '-1',statu: 1 }, (data) => {
          this.getsignList()
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
      // this.getTotal()
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
    padding: 20px 250px;
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
      .innerText{
        padding: 0 20px;
      }
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
          .el-input{
            vertical-align: middle;
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
            margin-top: 50px;
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
