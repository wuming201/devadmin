<template>
  <div class = 'app-container'>
    <div class = 'memberHead'>
      <p><span class='buttons'><el-button type='warning' @click="newIt">添加友情链接</el-button></span><span class="fr"><searchOne></searchOne></span></p>
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
        width='150'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='name'
        label='名称'>
      </el-table-column>
      <el-table-column
        prop='link'
        label='链接'
        width='350'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='on_status'
        label='状态'>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small' @click="editIt(scope.row)">编辑</el-button>
          <el-button type='text' size='small' @click="delIt(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="change" v-show="showChange">
      <h3>信息编辑 <i class="fa fa-close" @click="changeIt"></i></h3>
      <div class="inner">
        <p class="names">名称：  <el-input v-model="name"></el-input></p>
        <p class="links">链接： <el-input v-model="links"></el-input></p>
        <p><el-radio v-model="radio" label="1">显示</el-radio><el-radio v-model="radio" label="2">隐藏</el-radio></p>
        <p><el-button type="success" @click="saveEditIt">保存</el-button><el-button type="info" @click="newIt">取消</el-button></p>
      </div>
    </div>
    <div class="new" v-show="addNew">
      <h3>信息编辑 <i class="fa fa-close" @click="newIt"></i></h3>
      <div class="inner">
        <p class="names">名称：  <el-input v-model="name"></el-input></p>
        <p class="links">链接： <el-input v-model="links"></el-input></p>
        <p><el-radio v-model="radio" label="1">显示</el-radio><el-radio v-model="radio" label="2">隐藏</el-radio></p>
        <p><el-button type="success" @click="addLink">保存</el-button><el-button type="info" @click="newIt">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ad-add',
    data() {
      return {
        tableData3: [],
        addNew: false,
        showChange: false,
        radio: '1',
        name: '',
        on_status: '',
        links: '',
        num: 0
      }
    },
    methods: {
      changeIt(row) {
        console.log(this.showChange)
        this.showChange = !this.showChange
      },
      editIt(row) {
        var _this = this
        this.key = row.name
        this.name = row.name
        this.links = row.link
        this.on_status = row.on_status
        console.log(this.key)
        this.changeIt(row)
      },
      saveEditIt() {
        var values = { name: this.name, link: this.links, on_status: this.radio, key: this.key }
        console.log(values)
        PUBLIC.get("Configure.Configure.Addconfig",{ type: 'friendLink', key: this.key, value: JSON.stringify(values), on_status: this.radio, statu: 1 }, function(data){
          console.log(data)
        })
      },
      newIt() {
        this.addNew = !this.addNew
      },
      addLink() {
        var _this = this
        var values = { name: _this.name, link: _this.links, on_status: _this.radio, key: _this.name}
        PUBLIC.get("Configure.Configure.Addconfig",{ type: 'friendLink', key: this.name, value: JSON.stringify(values), on_status: this.radio, statu: 1 },(data) => {
          console.log(data)
          if (data === true) {
            console.log('aaaaaaa')
            this.$message({ message: '添加友情链接成功！', type: 'success' })
          } else {
            console.log('vvvvvvvvv')
            this.$message({
              message: '添加友情链接失败！',
              type: 'warning'
            });
            return
          }
        })
      },
      getLinkList:function() {
        var _this = this
        PUBLIC.get("Configure.Configure.Selfig", { type: 'friendLink' }, function(data) {
          console.log(data)
          var datas = []
          for (var n = 0; n < data.length; n++) {
            datas[n] = JSON.parse(data[n].value)
          }
          console.log(datas)
          var demo = {
            name: "name",
            link: "link",
            on_status: 'on_status',
            key: 'key'
          }
          var newData = PUBLIC.formatObj(demo, datas)
          _this.tableData3 = newData
          console.log(_this.tableData3)
        })
      },
      delIt(row) {
        console.log(row)
        this.newTitle = row.name
        PUBLIC.get('Configure.Configure.Addconfig', { type: 'friendLink', key: this.newTitle, value: ' ', on_status: 1, statu: -1 }, function(data) {
          console.log(data)
        })
      }
    },
    mounted() {
      this.getLinkList()
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
    .change,.new{
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
