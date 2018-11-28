<template>
  <div class="app-container">
    <div class="memberHead">

    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="视频级别">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="图标"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="id"
        label="角标">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="msgEdit">
      <h3>信息编辑 <i class="fa fa-close"></i></h3>
      <div class="inner">
        <p>视频级别：  免费视频</p>
        <p>视频角标：<img src="" alt=""><el-button type="primary">上传图片</el-button></p>
        <p>视频图标：<img src="" alt=""><el-button type="primary">替换图片</el-button></p>
        <p><el-button type="success" >提交</el-button><el-button type="info">取消</el-button></p>
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
        list: null,
        listLoading: true,
        downloadLoading: false,
        filename: '',
        dataLen: 50,
        currentPage: 1,
        pagesize: 13,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
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
    .msgEdit{
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
