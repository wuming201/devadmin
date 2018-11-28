<template>
  <div class='app-container'>
    <div class='memberHead'>

    </div>
    <el-table
      ref='multipleTable'
      :data='tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'
      @selection-change='handleSelectionChange'>
      <el-table-column
        prop='id'
        label='ID'
        width='200'>
        <template slot-scope='scope'>{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop='name'
        label='视频级别'>
        <!--<template slot-scope="scope">-->
          <!--<span class="innerText" v-if="scope.row.name === 'freeVideo'">普通视频</span>-->
          <!--<span class="innerText" v-else-if="scope.row.name === 'vipVideo'">VIP视频</span>-->
          <!--<span class="innerText" v-else-if="scope.row.name === 'mechanismVideo'">机构视频</span>-->
          <!--<span class="innerText" v-else-if="scope.row.name === 'privilegeVideo'">特权视频</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        prop='img'
        label='图标'
        show-overflow-tooltip>
        <template slot-scope='scope'>
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop='jimg'
        label='角标'>
        <template slot-scope='scope'>
          <img :src="scope.row.jimg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop='name'
        label='操作'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click='changeVideo(scope.row)' v-bind:datas='scope.row'>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class='msgEdit' v-show='showEdit'>
      <h3>信息编辑 <i class='fa fa-close' @click='changeVideo'></i></h3>
      <div class='inner'>
        <p>视频级别：  {{changeLevel.name}}</p>
        <p>视频角标：<img v-bind:src='changeLevel.img' alt=''><el-button type='primary' @click='upImg("img")'>替换图片</el-button></p>
        <p>视频图标：<img v-bind:src='changeLevel.jimg' alt=''><el-button type='primary'  @click='upImg("jimg")'>替换图片</el-button></p>
        <p><el-button type='success' @click='upLevel' >提交</el-button><el-button type='info' @click="closeBox">取消</el-button></p>
        <el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import { searchBox, selectKuang, timeBox, paginationBox } from '../../components/index'
// import func from './vue-temp/vue-editor-bridge';

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
        showEdit: false,
        currentPage: 1,
        pagesize: 13,
        tableData3: [],
        changeLevel: {},
        upFileFor:''
      }

    },
    methods: {
      upImg(tab) {
        console.log(tab)
        this.upFileFor = tab
        document.getElementById('upimgs').click();
      },
      closeBox() {
        this.showEdit = false
      },
      upLevel: function() {
        var _this = this
        var data = this.changeLevel
        console.log(data)
        data.type = 'videoLevel'
        data.key = data.name
        data.on_status = 1
        data.value = JSON.stringify({ img: data.img, jimg: data.jimg })
        data.statu = 1
        PUBLIC.get('Configure.Configure.Addconfig', data, function(data) {
          console.log(data)
          if( data === true) {
            _this.$message({
              showClose: true,
              message: '编辑成功！',
              type: 'success'
            })
            _this.closeBox()
          }
        })
      },
      upFile() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function(url) {
          _this.changeLevel[tab] = url
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      changeVideo(e) {
        this.showEdit = !this.showEdit
        console.log(e)
        this.changeLevel = e
      },
      getLevelList() {
        var _this = this
        PUBLIC.get('Configure.Configure.Selfig', { type:  'videoLevel' }, function(data){
          console.log(data)
          for (var i = 0; i < data.length; i++) {

            var value = data[i]['value']

            value = JSON.parse(value, value)

            for(var n in value) {

              data[i][n] = value[n]
            }
          }
          console.log(data)
          var demo = {
            id: 'id',
            name: 'key',
            img: 'img',
            jimg: 'jimg',
            type: 'type',
            key: 'key',
            on_status: 'on_status'
          }
          var newData = PUBLIC.formatObj(demo, data)
          console.log(newData)
          _this.tableData3 = newData
        })
      }
    },
    mounted: function() {
      this.getLevelList()
    }
  }
</script>
<style rel = 'stylesheet/scss' lang = 'scss' >
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
      img{
        width: 80px;
        height: 80px;
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
       /*p:last-of-type{*/
         /*button{*/
           /*width: 120px;*/
           /*margin-left: 75px;*/
         /*}*/
       /*}*/
      }
    }

  }

</style>
