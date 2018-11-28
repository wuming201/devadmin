<template>
  <div class = 'app-container'>
    <div class = 'activityHead'>
      <p><span class='buttons'><router-link to="/activity/act-release"><el-button type='warning'>添加活动</el-button></router-link></span><span class="fr"></span></p>
       <searchOne  class="right" @searchKey='searchKey'></searchOne>
    </div>
    <el-table
      ref='multipleTable'
      :data='actlData'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'
      @selection-change='handleSelectionChange'>
      <el-table-column
        prop='id'
        label='ID'
        width='150'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='title'
        label='活动名称'>
      </el-table-column>
      <el-table-column
        prop='type'
        label='活动类型'
        width='150'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='cretTime'
        label='发布时间'>
      </el-table-column>
      <el-table-column
        prop='cretTime'
        label='报名时间'>
      </el-table-column>
      <el-table-column
        prop='applyNum'
        label='报名通过人数'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='on_status'
        label='状态'>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.on_status === '-1'" style="color: #409EFF">下线</span>
          <span class="innerText" v-else-if="scope.row.on_status === '1'" style="color: #409EFF">正常</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link :to="'/activity/activity-info/'+scope.row.id"><el-button type='text' size='small'>查看</el-button></router-link>
          <router-link :to="'/activity/activity-edit/'+scope.row.id"><el-button type='text' size='small'>编辑</el-button></router-link>
        </template>
      </el-table-column>

    </el-table>
    <paginationBox :data='dataLength' :pageSize="pageSize" @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
  import { searchOne, paginationBox } from '../../components/index'

  export default {
    name: 'activityList',
    components: {
      searchOne,
      paginationBox
    },
    data() {
      return {
        showBox: false,
        downloadLoading: false,
        filename: '',
        page: 1,
        dataLength: '',
        actlData: [],
        multipleSelection: [],
        selectArg: {},
        status: [],
        dataLength:0,
        pageSize:0,
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getActList()
      },
      //获取总数
      getTotal() {
        // PUBLIC.get('User.User.usercount', data => {
        //   this.dataLength = data
        // })
      },
      searchKey(e) {
        // console.log(e)
        // var op = this.selectArg
        console.log(e)
        // // op[e[0]] = e[1]
        this.getActList(e)
      },
      getActList:function(keyword) {
        console.log(keyword)
        var _this = this
        if(keyword==undefined){
          keyword=""
        }else{
          keyword=keyword[0]
        }
        // for (var k in keyword) {
        //   args[k] = keyword[k]
        // }
        console.log(keyword)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Active.actives.activelist', { page: this.page, status: 1, titile: keyword }, function(data) { //type: 'agfdsadasd',
          console.log(data)
          var demo = {
            id: 'id',
            uid: 'uid',
            type: 'type',
            on_status: 'on_status',
            title: 'title',
            cretTime: 'cretTime',
            applyNum: 'applyNum'
          }
          var newData = PUBLIC.formatObj(demo, data)
          _this.actlData = newData
        },function(data){
          _this.dataLength=parseInt(data.data.num)
          _this.pageSize=parseInt(data.data.pagenum)
        })
      }
    },
    mounted() {
      this.getActList()
      this.getTotal()
    }

  }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .app-container{
    color: #333333;
    .right{
      float: right;
    }
    .activityHead{
      padding: 0;
      p{
        padding-top: 10px;
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
    /*.el-button--text{*/
      /*padding: 10px;*/
    /*}*/
    /*.el-pagination{*/
      /*padding-top: 20px;*/
    /*}*/
  }

</style>
