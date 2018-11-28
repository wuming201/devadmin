<template>
  <div class="app-container">
    <div class="memberHead">

    </div>
    <el-table
      ref="multipleTable"
      :data="points.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="event_zhname"
        label="任务名称">
      </el-table-column>
      <el-table-column
        prop="event_value"
        label="积分数量"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="操作"
        width="400"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data="points" @getCurrent="handleCurrentChange"></paginationBox>
    <div class="reject" v-show="showBox">
      <h3>信息编辑 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p>任务名称：  {{event_zhname}}</p>
        <p>积分数量：<el-input v-model="event_value"  placeholder="请输入内容"></el-input></p>
        <p><el-button type="success" @click="saveIt" >保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
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
        filename: '',
        currentPage: 1,
        pagesize: 13,
        showBox: false,
        points: [],
        multipleSelection: [],
        event_name: '',
        event_value: ''
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.pagesize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      edit(row) {
        console.log(row)
        this.showBox = !this.showBox
        this.event_zhname = row.event_zhname
        this.event_name = row.event_name
        this.event_value = row.event_value
      },
      closeIt() {
        this.showBox = !this.showBox
      },
      saveIt() {
        console.log(this.event_name)
        PUBLIC.get('User.Event.eventupd', { event_name: this.event_name, event_value: this.event_value}, data => {
          console.log(data)
          console.log(this.event_name)
          this.$message('修改成功！')
          this.$router.go(0)
        })
      },
      getList() {
        PUBLIC.get('User.Event.eventselect', data => {
          console.log(data)

          var demo = {
            event_name: 'event_name',
            event_zhname: 'event_zhname',
            id: 'id',
            time: 'time',
            event_value: 'event_value'
          }
          var newData = PUBLIC.formatObj(demo,data)
          console.log(newData)
          this.points = newData
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >

  .el-textarea__inner::-webkit-input-placeholder {
    color: red;
  }
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
          .el-input{
            width: 200px;
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
