<template>
  <div class="kkipHoner">
    <div class="memberHead">
      <p class="firstLine"><span></span></p>
      <p><el-button type="warning" @click="addHoner">添加荣誉</el-button></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='datas'
      tooltip-effect='dark'
      :row-class-name="tableRowClassName"
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='id'
        label='ID'
        width='150'>
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
        prop='desc'
        label='荣誉介绍'>
      </el-table-column>
      <el-table-column
        prop='indexShow'
        label='首页显示'>
        <template slot-scope="scope">
          <span v-if="scope.row.indexShow == 1">显示</span>
          <span v-else-if="scope.row.indexShow == 2">隐藏</span>
          <span v-else>``````</span>
        </template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small' @click="changeHoner(scope.row)">编辑</el-button>
          <el-button type='text' size='small' @click="delHoner(scope.row)">删除</el-button>
          <el-button type='text' size='small' @click="toAddUser(scope.row)">颁奖</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<paginationBox :data="points" @getCurrent="handleCurrentChange"></paginationBox>-->
    <div class="addHoner" v-show="honerAdd">
      <h3>添加荣誉 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p>荣誉名称：  <el-input v-model="editName" ></el-input></p>
        <p>荣誉图标： <span class="imgs"><img v-bind:src="editImg" alt=""></span><el-button type="primary" @click="upImg('editImg')">上传图片</el-button></p>
        <p>荣誉介绍：  <el-input
                          type="textarea"
                          v-model="successDesc"
                          :rows="3"
                          placeholder="请输入荣誉介绍">
                        </el-input>
        </p>
        <p>首页显示：<el-radio v-model="editStatus" label="1">显示</el-radio><el-radio v-model="editStatus" label="2">隐藏</el-radio></p>
        <p><el-button type="success" @click="createHoner" >保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
      </div>
    </div>
    <div class="changeHoner" v-show="honerChange">
      <h3>修改荣誉 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p>荣誉名称：  <el-input v-model="editName" disabled="disabled"></el-input></p>
        <p>荣誉图标： <span class="imgs"><img v-bind:src="editImg" alt=""></span><el-button type="primary" @click="upImg('editImg')">上传图片</el-button></p>
        <p>荣誉介绍：  <el-input
            type="textarea"
            v-model="successDesc"
            :rows="3"
            placeholder="请输入荣誉介绍">
        </el-input>
        </p>
        <p>首页显示：<el-radio v-model="editStatus" label="1">显示</el-radio><el-radio v-model="editStatus" label="2">隐藏</el-radio></p>
        <p><el-button type="success" @click="editHoner" >保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
        <el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input>
      </div>
    </div>
  </div>

</template>

<script>
  import { selectKuang,paginationBox } from '../../components/index'

  export default {
    name: 'allMember',
    components: {
      selectKuang,
      paginationBox
    },
    data() {
      return {
        datas: [],
        honerAdd: false,
        honerChange: false,
        oldName: '', //修改荣誉是用来删除旧数据
        editName: '',
        successDesc: '',
        editImg: '',
        newImg: '',
        radio: '',
        // name: '',
        index: '',
        editStatus: 1,
      }
    },
    methods: {
      upImg(tab){
        console.log(tab)
        this.upFileFor=tab
        document.getElementById("upimgs").click();
      },
      upFile(){
        var _this=this
        var tab=this.upFileFor
        console.log("触发上传")
        PUBLIC.postFile("upimgs",function(url){
          _this[tab]=url
        })
      },
      closeIt() {
        this.honerAdd = false
        this.honerChange = false
      },
      // handleSelectionChange(val) {
      //   this.multipleSelection = val
      // },
      // handleSizeChange(val) {
      //   this.pagesize = val
      // },
      // handleCurrentChange(val) {
      //   this.currentPage = val
      // },
      addHoner(row) {
        this.editName = ''
        this.editImg = ''
        this.editStatus = ''
        this.successDesc = ''
        this.honerAdd = !this.honerAdd
      },
      changeHoner(row) {
        this.honerChange = !this.honerChange
        console.log(row)
        this.oldName = row.name
        this.editName = row.name
        this.editStatus = row.indexShow
        this.editImg = row.pic
        this.successDesc = row.desc

      },
      toAddUser:function(data){
        console.log(data)
        // return
        this.$router.push({path:"/kkip/kk-honer-Give",query:{key:data.name}})
      },
      editHoner() {
        var _this=this
        var value = JSON.stringify({ name: this.editName, pic: this.editImg, indexShow: this.editStatus, desc: this.successDesc })
        if(this.oldName!=this.editName){
          PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: this.oldName, value: value, on_status: 1, statu: -1 }, function() {
          PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: _this.editName, value: value, on_status: 1, statu: 1 }, function(data) {
            console.log(data)
            _this.honerChange = false
            _this.getHoner()
          })

        })
        }else{
          PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: _this.editName, value: value, on_status: 1, statu: 1 }, function(data) {
            console.log(data)
            _this.honerChange = false
            _this.getHoner()
          })


        }

      },
      tableRowClassName(row, index) {
        this.index = row.rowIndex
      },
      createHoner() {
        var _this = this
        var value = JSON.stringify({ name: this.editName, pic: this.editImg, indexShow: this.editStatus, desc: this.successDesc })
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: this.editName, value: value, on_status: 1, statu: 1 }, function(data) {
          console.log(data)
          _this.honerAdd = false
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
        this.editImg = row.name
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'honer', key: this.editImg, value: ' ', on_status: 1, statu: -1 }, (data) => {
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
</script>
<style rel="stylesheet/scss" lang="scss" >

  /*.el-textarea__inner::-webkit-input-placeholder {*/
    /*color: red;*/
  /*}*/
  .kkipHoner{
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
        height: 65px;
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
      .cell{
        img{
          max-height: 100px;
          width: 150px;
        }
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
        background-color: white;
        p{
          padding-bottom: 30px;
          .el-textarea{
            vertical-align: top;
            width: 350px;
            display: inline-block;
          }
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
