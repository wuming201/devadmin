<template>
  <div class="app-container">
    <div class="memberHead">
      <p><router-link to="/article/article-send"><el-button type="warning" @click="addMember">发布文章</el-button></router-link></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="alData"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        prop="id"
        label="ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="type"
        label="文章类型">
      </el-table-column>
      <el-table-column
        prop="writer"
        label="发布者">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="on_statu"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.on_statu == 1">显示</span>
          <span v-else>隐藏</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="info(scope.row.id)">查看</el-button>
          <el-button type="text" size="small" v-if="scope.row.on_statu==-1"  @click="changeStatus(scope.row.id,1)">上架</el-button>
          <el-button type="text" size="small" v-if="scope.row.on_statu==1" @click="changeStatus(scope.row.id,-1)">下架</el-button>
          <el-button type="text" size="small" @click="changeTime(scope.row.id)">刷新</el-button>
          <el-button @click="deletFail(scope.row.id)" type="text" size="small" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        currentPage: 1,
        pagesize: 13,
        what: '分类',
        editId: 0,
        alData: [],
        row: {}
      }
    },
    methods: {
      changeStatus:function(id,status){
        var _this=this
        PUBLIC.get("Article.articles.update",{id:id,status:status},function(data){
          _this.getClassList()
        })
      },
      deletFail:function(id){
        var _this=this
        this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          PUBLIC.get("Article.articles.update",{id:id,statu:-1},function(data){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            _this.getClassList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      changeTime:function(id){
        var _this=this
        PUBLIC.get("Article.articles.update",{id:id,time:PUBLIC.getNowDate()},function(data){
          _this.getClassList()
        })

      },
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
        PUBLIC.get("Article.articles.getarticle", { type_id: ''}, function(data){
          console.log(data)
          var demo = {
            id: "id",
            uid: 'uid',
            type: "type",
            time: 'time',
            title: 'title',
            body: 'body',
            desc: 'desc',
            statu: 'statu',
            on_statu: 'on_statu',
            writer:"writer"
          }
          var newData = PUBLIC.formatObj(demo, data)
          _this.alData = newData
          console.log(_this.alData)
        })
      },
      addMember() {
        console.log(this.showAdd)
        this.showAdd = !this.showAdd
      },
      info(id) {
        this.$router.push({ name: '文章详情', params: { id: id }})
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
