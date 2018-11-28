<template>
  <div class = 'app-container'>
    <div class = 'memberHead'>
      <p><span class='buttons'><el-button type='warning' @click="addHoner">添加荣誉</el-button></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='datas'
      tooltip-effect='dark'
      :row-class-name="tableRowClassName"
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
        prop='name'
        label='荣誉名称'>
      </el-table-column>
      <el-table-column
        prop='pic'
        label='图标'
        width='350'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <img class="tabPic" :src="scope.row.pic" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop='indexShow'
        label='首页显示'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small' @click="changeHoner(scope.row)">编辑</el-button>
          <el-button type='text' size='small' @click="delHoner(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="addHoner"  v-show="honerAdd" >
      <h3>添加荣誉 <i class="fa fa-close" @click="addHoner"></i></h3>
      <div class="inner">
        <p>荣誉名称：<el-input v-model="newTitle" placeholder="请输入剧集名称"></el-input></p>
        <p>视频图标：<img v-bind:src="newImg" alt=""><el-button type="primary" @click="upImg('newImg')">上传图标</el-button></p>
        <p>首页显示：<span><el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio></span></p>
        <p><el-button type="success" @click="createHoner" >提交</el-button><el-button type="info" @click="addHoner">取消</el-button></p>
        <el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input>
      </div>
    </div>
    <div class="changeHoner" v-show="honerChange">
      <h3>编辑荣誉 <i class="fa fa-close" @click="changeHoner"></i></h3>
      <div class="inner">
        <p>荣誉名称：<el-input v-model="newTitle" placeholder="请输入剧集名称"></el-input></p>
        <p>视频图标：<img v-bind:src="newImg" alt=""><el-button type="primary" @click="upImg('newImg')">上传图标</el-button></p>
        <p>首页显示：<span><el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio></span></p>
        <p><el-button type="success" @click="editHoner" >提交</el-button><el-button type="info" @click="changeHoner">取消</el-button></p>
        <el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    data() {
      return {
        datas: [],
        honerAdd: false,
        honerChange: false,
        newTitle: '',
        newImg: '',
        radio: '',
        index: ''
      }
    },
    methods: {
      addHoner(row) {
        this.newTitle = ''
        this.newImg = ''
        this.radio = ''
        this.honerAdd = !this.honerAdd
      },
      changeHoner(row) {
        this.honerChange = !this.honerChange
        console.log(row)
        this.newTitle = row.name
        this.radio = row.indexShow
        this.newImg = row.pic
      },
      editHoner() {
        var _this=this
        var value = JSON.stringify({ name: this.newTitle, pic: this.newImg, indexShow: this.radio })
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: this.newTitle, value: value, on_status: 1, statu: -1 }, function(data) {
          console.log(data)
          _this.editHoner=!_this.editHoner
          _this.getHoner()
        })
      },
      tableRowClassName(row, index) {
        this.index = row.rowIndex
      },
      upImg(tab) { //  绑数据
        this.upFileFor = tab
        document.getElementById("upimgs").click();
      },
      upFile() {
        var _this = this
        var tab=this.upFileFor
        console.log("触发上传")
        PUBLIC.postFile("upimgs",function(url){
          _this[tab]=url
        })
      },
      createHoner() {
        var _this = this
        var value = JSON.stringify({ name: this.newTitle, pic: this.newImg, indexShow: this.radio })
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: this.newTitle, value: value, on_status: 1, statu: 1 }, function(data) {
          _this.honerAdd = !_this.honerAdd
          _this.getHoner()
        })
      },
      getHoner() {
        var _this =this
        PUBLIC.get('Configure.Configure.Selfig', { type: 'honer'}, function(data) {
          var newData = []
          _this.datas = []
          for(var n = 0; n < data.length; n++) {
            _this.datas.push(JSON.parse(data[n].value))
          }
          console.log(_this.datas)
        })
      },
      delHoner(row) {
        console.log(row)
        this.newTitle = row.name
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: this.newTitle, value: ' ', on_status: 1, statu: -1 }, (data) => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.$router.go(0)
        })
      }
    },
    mounted() {
      this.getHoner()
      this.delHoner()
    }
  }
  // export default {
  //   name: 'ad-add',
  //   data() {
  //     return {
  //       showBox: false,
  //       filename: '',
  //       currentPage: 1,
  //       pagesize: 13,
  //       tableData3: []
  //     }
  //   },
  //   methods: {
  //     handleSelectionChange(val) {
  //       this.multipleSelection = val
  //     },
  //     handleSizeChange(val) {
  //       this.pagesize = val
  //     },
  //     handleCurrentChange(val) {
  //       this.currentPage = val
  //     },
  //     getUserList:function(keyword) {
  //       var _this = this
  //       var args = { page: 1 }
  //       for (var k in keyword) {
  //         args[k] = keyword[k]
  //       }
  //       keyword == keyword != undefined ? keyword : ''
  //       PUBLIC.get('User.User.Userlist', args, function(data) {
  //         var newData = []
  //         var demo = {
  //           id:'Id',
  //           username:'username',
  //           telphone:'telphone',
  //           reg_time:'reg_time',
  //           rel_status:'rel_status'
  //         }
  //         newData = PUBLIC.formatObj(demo,data)
  //         _this.tableData3 = newData
  //         for(var i = 0;i<newData.length;i++){
  //           _this.getUserGroup(newData[i]['id'],_this.tableData3,i,newData)
  //         }
  //
  //         // console.log(_this.tableData3)
  //       })
  //     },
  //     getUserGroup:function(id, relData, index, newData) {
  //       var _this = this
  //       PUBLIC.get('Team.User.TeamList',{uid:id},function(data){
  //         newData[index]['userGroup'] = data[0]['type']
  //         newData[index]['groupEndTime'] = data[0]['end_time']
  //         _this.tableData3 = JSON.parse(JSON.stringify(newData))
  //         console.log(relData[index])
  //       })
  //     },
  //     phoneValue(e) {
  //       this.selectArg['phoneStatus'] = e
  //       console.log(e)
  //     },
  //     relValue(e) {
  //       this.selectArg['issming'] = e
  //       console.log(e)
  //     },
  //     userValue(e) {
  //       this.selectArg['usertype'] = e
  //       console.log(e)
  //     },
  //     regTime(e) {
  //       this.selectArg['regstr_time'] = e[0]
  //       this.selectArg['regend_time'] = e[1]
  //       console.log(e)
  //     },
  //     endTime(e) {
  //       this.selectArg['daoqstr_time'] = e[0]
  //       this.selectArg['daoqend_time'] = e[1]
  //       console.log(e)
  //     }
  //   },
  //   mounted() {
  //     this.getUserList()
  //   }
  //   // watch:{
  //   //   searchKey:function(){
  //   //     console.log(this.searchKey)
  //   //   }
  //   // }
  // }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .app-container{
    color: #333333;
    .memberHead{
      padding: 0;
      p{
        padding-top: 100px;
      }
    }
    .el-table{
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
    .addHoner,.changeHoner{
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
          .el-input--medium{
            width: 80%;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          >button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          >button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }
  }

</style>
