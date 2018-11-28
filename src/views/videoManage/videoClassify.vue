<template>
  <div class="app-container">
    <div class="memberHead">
      <p><el-button type="warning" @click="addMember">添加分类</el-button></p>
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
        prop="name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button @click="deletFail(scope.row.id)" type="text" size="small" >删除</el-button>
          <!--还有个deletWarning-->
          <el-button type="text" size="small"  @click="changeMember(scope.row)">编辑</el-button>
          <!-- @changeMember="changeMember" -->
        </template>
      </el-table-column>
    </el-table>
    <add-classify :what="what" v-show="showAdd" @addMember="addMember" @value="addClass"></add-classify>
    <changeClassify :what="what" :data1="changeRow" v-show="showChange" @changeMember="changeClassAct" @value="changeClass"></changeClassify>
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
        what: '分类',
        editId: 0,
        tableData3: [],
        row:{},
        changeRow:{}
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
          _this.showChange = !_this.showChange
        })
      },
      addMember() {
        console.log(this.showAdd)
        this.showAdd = !this.showAdd
      },
      changeMember(row) {
        console.log(this.showChange)
        this.showChange = !this.showChange
        console.log(this.showChange)
        // this.editId=id
        // this.row=id
        this.changeRow={"id":row.id,"name":row.name}
        console.log(this.row)
      },
      changeClassAct(val){
        this.showChange = !this.showChange
      },
      addClass(value){
        var _this=this
        // console.log(this.value2)
        PUBLIC.get("Video.drama.addlist",{class:value},function(data){
          console.log(data)
          // _this.$emit("value",_this.value2)
          _this.showAdd=false
          _this.getClassList()
        })
      },
      deletFail(id) {
        const h = this.$createElement;
        var _this=this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          PUBLIC.get("Video.drama.delist",{class_id:id},function(data){
            _this.getClassList()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        // return
        // _this.$msgbox({
        //   title: '提示信息',
        //   message: h('p', null, [
        //     h('span', null, '该类目下有剧集正在发布，不可删除！ ')
        //   ]),
        //   showCancelButton: true,
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   beforeClose: (action, instance, done) => {
        //     if (action === 'confirm') {
        //       instance.confirmButtonLoading = true
        //       instance.confirmButtonText = '执行中...'
        //       setTimeout(() => {
        //         done()
        //         setTimeout(() => {
        //           instance.confirmButtonLoading = false
        //         }, 300)
        //       }, 3000)
        //     } else {
        //       done()
        //     }
        //   }
        // }).then(action => {
        //   this.$message({
        //     type: 'info',
        //     message: 'action: ' + action
        //   })
        // })
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
    },
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
