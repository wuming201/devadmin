<template>
  <div class = 'messageList'>
    <div class = 'memberHead'>
      <p class = 'firstLine'><span></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='mListData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='key'
        label='协议类型'>
      </el-table-column>
      <el-table-column
        prop='read_res'
        label='操作'
        width="300">
        <template slot-scope="scope">
          <el-button type="text" class="innerText" @click="edit(scope.row)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' @getCurrent='handleCurrentChange'></paginationBox>
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
        rowInfo: [],
        selectArg: {}
      }
    },
    methods: {
      passIt() {
        console.log('aaa')
      },
      rejectIt() {
        console.log('aaa')
      },
      edit(row){
        this.$router.push({name: '编辑协议',query: row.key})
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
        var args = { page: this.page,type:"agreement" }
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
