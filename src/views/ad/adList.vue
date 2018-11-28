<template>
  <div class = 'app-container'>
    <div class = 'memberHead'>
      <p><span class='buttons'><router-link to="/ad/ad-add"><el-button type='warning'>添加广告</el-button></router-link></span><span class="fr"><searchOne></searchOne></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='tableData3'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='id'
        label='ID'
        width='100'>
      </el-table-column>
      <el-table-column
        prop='adTitle'
        label='广告标题'>
      </el-table-column>
      <el-table-column
        prop='place'
        label='广告位'
        show-overflow-tooltip>

      </el-table-column>
      <el-table-column
        prop='newImg'
        width="300"
        label='广告图片'>
        <template slot-scope="scope">
          <img class="tabPic" :src="scope.row.newImg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop='color'
        label='背景'
        width="100">
      </el-table-column>
      <el-table-column
        prop='adLink'
        label='广告链接'
        width="300px"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='on_status'
        label='状态'>
        <template slot-scope="scope">
          <span v-if="scope.row.on_status == 1">显示</span>
          <span v-else>隐藏</span>
        </template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link :to="'/ad/ad-edit/'+scope.row.adTitle"><el-button type='text' size='small'>编辑</el-button></router-link>
          <el-button type='text' size='small' @click="delIt(scope.row.adTitle)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ad-add',
    data() {
      return {
        showBox: false,
        filename: '',
        currentPage: 1,
        pagesize: 13,
        tableData3: []
      }
    },
    methods: {
      getAdList() {
        var _this = this
        PUBLIC.get("Configure.Configure.Selfig", { type: 'ad' }, function(data) {
          var datas = []
          for (var n = 0; n < data.length; n++) {
            datas[n] = JSON.parse(data[n].value)
          }
          console.log(datas)
          var demo = {
            adTitle: "adTitle",
            place: "place",
            on_status: 'on_status',
            newImg: 'newImg',
            color: 'color',
            adLink: 'adLink'
          }
          var newData = PUBLIC.formatObj(demo, datas)
          console.log(newData)
          _this.tableData3 = newData
          console.log(_this.tableData3)
        })
      },
      delIt(key) {
        // this.adTitle = row.name
        var _this=this
        console.log(key)
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'ad', key: key, value: ' ', on_status: 1, statu: -1 }, function(data) {
          console.log(data)
          _this.getAdList()
        })
      }
    },
    mounted() {
      this.getAdList()
    }
    // watch:{
    //   searchKey:function(){
    //     console.log(this.searchKey)
    //   }
    // }
  }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .app-container{
    color: #333333;
    .memberHead{
      padding: 0;
    }
    .el-table{
      .tabPic{
        width: 200px;
        height: 100px;
      }
      .warning-row {
        background: #fff5f5;
      }
      .el-table__row{
        height: 130px;
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
  }

</style>
