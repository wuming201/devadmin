<template>
  <div class="app-container">
    <div class="memberHead">
      <p><el-button type="warning" @click="addMember">添加类型</el-button></p>
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
      <el-table-模板名称
        prop="name"
        label="文章标题">
      </el-table-模板名称>
      <el-table-column
        prop="name"
        label="文章类型">
      </el-table-column>
      <el-table-column
        prop="name"
        label="消息内容">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="使用次数">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发布条数">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @changeMember="changeMember" @click="changeMember(scope.row)">查看</el-button>
          <el-button type="text" size="small" @changeMember="changeMember" @click="changeMember(scope.row)">刷新</el-button>
          <el-button @click="deletFail(scope.row.id)" type="text" size="small" >删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <add-classify :what="what" v-show="showAdd" @addMember="addMember" @value="addClass"></add-classify>
    <changeClassify :what="what" :data1="row" v-show="showChange" @changeMember="changeMember" @value="changeClass"></changeClassify>
    <!--<div class="checkInfo" v-show="showBox">-->
      <!--<h3>查看信息 <i class="fa fa-close" @click="checkInfo"></i></h3>-->
      <!--<div class="inner">-->
        <!--<p>-->
          <!--<el-row>-->
            <!--<el-col :span="8"><span>订单号：{{rowInfo.order_id}}</span></el-col>-->
            <!--<el-col :span="8"><span>支付方式：{{rowInfo.way}}</span></el-col>-->
            <!--<el-col :span="8"><span>支付时间：{{rowInfo.timeout}}</span></el-col>-->
          <!--</el-row>-->
        <!--</p>-->
        <!--<p class="titles">{{rowInfo.name}}-{{rowInfo.group_name}}</p>-->
        <!--<p>-->
          <!--<el-row>-->
            <!--<el-col :span="12"><span class="title">姓名:</span><span class="innerText">{{rowInfo.name}}</span></el-col>-->
            <!--<el-col :span="12"><span class="title">单位名称:</span><span class="innerText">{{rowInfo.com}}</span></el-col>-->
          <!--</el-row>-->
        <!--</p>-->
        <!--<p>-->
          <!--<el-row>-->
            <!--<el-col :span="12"><span class="title">联系手机:</span><span class="innerText">{{rowInfo.telphone}}</span></el-col>-->
            <!--<el-col :span="12"><span class="title">联系邮箱:</span><span class="innerText">{{rowInfo.email}}</span></el-col>-->
          <!--</el-row>-->
        <!--</p>-->
        <!--<p><span class="title">备注:</span><span class="innerText">{{rowInfo.des}}</span></p>-->
        <!--<p><el-button type="success" @click="passIt" >通过</el-button><el-button type="danger" @click="rejectIt" >拒绝</el-button><el-button type="info" @click="checkInfo">取消</el-button></p>-->
      <!--</div>-->
    <!--</div>-->
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
        list: null,
        listLoading: true,
        downloadLoading: false,
        filename: '',
        showAdd: false,
        showChange: false,
        currentPage: 1,
        pagesize: 13,
        showBox: true,
        editId: 0,
        tableData3: [],
        row: {}
      }
    },
    methods: {
      changeClassName:function(e) {
        var _this = this
        PUBLIC.get("Video.drama.upclass",{class_id:this.editId,class:e},function(){
          _this.getClassList()
        })
      },
      getClassList:function() {
        console.log(this)
        // Video.drama.classlist
        var _this = this
        PUBLIC.get("Video.drama.classlist",function(data){
          console.log(data)
          var demo = {
            id: "id",
            name: "class"
          }
          var newData = PUBLIC.formatObj(demo, data)
          _this.tableData3 = newData
        })
      },
      changeClass(data) {
        var _this=this
        PUBLIC.get("Video.drama.upclass",{class_id:data.id,class:data.name},function(data){
          _this.getClassList()
        })
      },
      addMember() {
        console.log(this.showAdd)
        this.showAdd = !this.showAdd
      },
      changeMember(id) {
        console.log(this.showChange)
        this.showChange = !this.showChange
        this.editId=id
        this.row=id
        console.log(this.row)
      },
      addClass(value){
        var _this=this
        // console.log(this.value2)
        PUBLIC.get("Video.drama.addlist",{class:value},function(data){
          console.log(data)
          // _this.$emit("value",_this.value2)
          _this.getClassList()
        })
      },
      deletFail(id) {
        const h = this.$createElement;
        var _this=this
        PUBLIC.get("Video.drama.delist",{class_id:id},function(data){
          _this.getClassList()
        })
        return
        this.$msgbox({
          title: '提示信息',
          message: h('p', null, [
            h('span', null, '该类目下有剧集正在发布，不可删除！ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 3000)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          })
        })
      },
      deletWarning() {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '是否确定删除本条记录？此操作不可逆。')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 3000)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          })
        })
      }
    },
    mounted() {
      this.getClassList()
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

  }

</style>
