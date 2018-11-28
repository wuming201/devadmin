<template>
  <div class="app-container">
    <div class="memberHead">
      <p><el-button type="warning"  @click="addType">添加类型</el-button></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="key"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="server"
        label="展示网站">
        <template slot-scope="scope">
          <span v-if="scope.row.server == 'kkip'">KKIP</span>
          <span v-if="scope.row.server == '育视界'">育视界</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.value" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="on_status"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.on_status == 1">显示</span>
          <span v-if="scope.row.on_status == 2">隐藏</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button @click="delIt(scope.row.key)" type="text" size="small" >删除</el-button>
          <!--还有个deletWarning-->
          <el-button type="text" size="small" @changeMember="changeMember" @click="changeMember(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="addType" v-show="addNew">
      <h3>信息编辑 <i class="fa fa-close" @click="addType"></i></h3>
      <div class="inner">
        <p class="names">名称：  <el-input v-model="name"></el-input></p>
        <p><el-radio v-model="server" label="kkip">KKIP</el-radio><el-radio v-model="server" label="育视界">育视界</el-radio></p>
        <p class="links">图标： <span class="imgs"><img v-bind:src="newImg" alt=""></span><el-button type="primary" @click="upImg('newImg')">添加</el-button><el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input></p>
        <p><el-radio v-model="radio" label="1">显示</el-radio><el-radio v-model="radio" label="2">隐藏</el-radio></p>
        <p><el-button type="success" @click="addIt">保存</el-button><el-button type="info" @click="addType">取消</el-button></p>
      </div>
    </div>

    <div class="addType" v-show="editNew">
      <h3>信息编辑 <i class="fa fa-close" @click="editType"></i></h3>
      <div class="inner">
        <p class="names">名称：  <el-input v-model="editName" disabled></el-input></p>
        <p><el-radio v-model="editServer" label="kkip">KKIP</el-radio><el-radio v-model="editServer" label="育视界">育视界</el-radio></p>
        <p class="links">图标： <span class="imgs"><img v-bind:src="editImg" alt=""></span><el-button type="primary" @click="upImg('editImg')">添加</el-button>
        <!-- <el-input type="file" id="upimgs1" v-on:change="upFile" hidden>
          </el-input> -->
          </p>
        <p><el-radio v-model="editStatus" label="1">显示</el-radio><el-radio v-model="editStatus" label="2">隐藏</el-radio></p>
        <p><el-button type="success" @click="editIt">保存</el-button><el-button type="info" @click="editType">取消</el-button></p>
      </div>
    </div>

  </div>
</template>

<script>
  import { addClassify, changeClassify } from '../../components/VideoCom/index'

  export default {
    name: 'allMember',
    components: {
      addClassify,
      changeClassify
    },
    data() {
      return {
        addNew: false,
        filename: '',
        currentPage: 1,
        pagesize: 13,
        what: '分类',
        editId: 0,
        name: '',
        newImg: '',
        row: {},
        radio: '1',
        server:"育视界",
        tableData3: [],
        editServer:"",
        editName:"",
        editImg:"",
        editStatus:false,
        editNew:false
      }
    },
    methods: {
      changeMember:function(data){
        this.editNew=true
        this.editName=data.key
        this.editImg=data.value
        this.editStatus=data.on_status
        this.editServer=data.server
      },
      getTypeList:function() {
        var _this = this
        PUBLIC.get("Configure.Configure.Selfig", { type: 'articleType' }, function(data) {
          var demo = {
            key: "key",
            value: "value",
            on_status: 'on_status'
          }
          var newData = PUBLIC.formatObj(demo, data)
          for(let i in newData) {
            console.log(newData[i].value)
            console.log(JSON.parse(newData[i].value).img)
            var tmp=JSON.parse(newData[i].value)
            newData[i].value = tmp.img
            newData[i].server=tmp.server
            _this.tableData3 = newData
          }
          console.log(_this.tableData3)
        })
      },
      addType() {
        this.addNew = !this.addNew
      },
       editType() {
        this.editNew = !this.editNew
      },
      addIt() {
        var _this = this
        var values = { name: _this.name, img: _this.newImg, on_status: _this.radio,server:_this.server}
        PUBLIC.get("Configure.Configure.Addconfig",{ type: 'articleType', key: this.name, value: JSON.stringify(values), on_status: this.radio, statu: 1 },function(data){
          console.log(data)
          _this.addType()
          _this.getTypeList()
        })
      },
      editIt() {
        var _this = this
        var values = { name: _this.editName, img: _this.editImg, on_status: _this.editStatus,server:_this.editServer}
        PUBLIC.get("Configure.Configure.Addconfig",{ type: 'articleType', key: this.editName, value: JSON.stringify(values), on_status: this.editStatus, statu: 1 },function(data){
          console.log(data)
          _this.editType()
          _this.getTypeList()
        })
      },
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
      delIt(key) {
        var _this=this
        PUBLIC.get("Configure.Configure.Addconfig",{ type: 'articleType', key: key, value: '', on_status: 0, statu: -1 },function(data){
          console.log(data)
          _this.getTypeList()
        })
      }
    },
    mounted() {
      this.getTypeList()
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
        padding-top: 100px;
        button{
          margin: 0;
          border-radius: 0;
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
    .addType{
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
          .el-radio{
            margin-left: 50px;
          }
          .el-input{
            margin-left: 10px;
            width: 70%;
          }
        }
        .links{
          .el-button{
            vertical-align: bottom;
            margin-left: 20px;
          }
          .imgs{
            margin-left: 10px;
            width: 140px;
            height: 80px;
            vertical-align: top;
            display: inline-block;
            img{
              width: 140px;
              height: 80px;
            }
          }
        }
        .names{
          .el-input{
            width: 45%;
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
