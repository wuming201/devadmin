<template>
  <div class="activityInfo">
    <div class="memberInfo">
      <p>
        <span><span class="title">文章类型:</span>
          <span class="innerText">
            <el-select v-model="articleType" placeholder="请选择">
            <el-option
              v-for="item in type"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          </span></span>
        <span>
          <span class="title">作者:</span><span class="innerText"><el-input v-model="writer" placeholder="请输入内容"></el-input></span></span></p>
      <p><span class="mr0"><span class="title">文章标题:</span><span class="innerText"><el-input v-model="title" placeholder="请输入内容"></el-input></span></span></p>
      <p><span class="mr0"><span class="title">活动说明:</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="desc">
        </el-input></span>
      </p>
      <!--<p><span><span class="title">活动详情:</span><div class="editor-container"><UE :defaultMsg=defaultMsg :config=config ref="ue" v-model="newBody"></UE></div></span></p>-->
      <p><span><span class="title">活动详情:</span><div class="editor-container"><UE v-if="defaultMsg!==false" :defaultMsg='defaultMsg' :config=config ref="ue" v-model="newBody"></UE></div></span></p>
      <p class="radios">
        <el-radio v-model="isShow" label= 1>显示</el-radio>
        <el-radio v-model="isShow" label= -1>隐藏</el-radio>
      </p>
      <p><el-button type="success" @click="editAct">保存</el-button><el-button type="info" @click="cancel">取消</el-button></p>
    </div>
  </div>
</template>

<script>
  import { selectKuang, timeBox, UE } from '../../components/index'
  // import e from 'wangeditor'
  export default {
    name: 'add-edit',
    components: {
      selectKuang,
      timeBox,
      UE
    },
    data() {
      return {
        showPass: false,
        showReject: false,
        changeImg: '',
        newTitle: '',
        newBody: '',
        writer: '',
        title: '',
        defaultMsg:false,
        body: '',
        desc: '',
        file: '',
        articleType: '',
        type: [],
        id: '',
        config: {
          initialFrameWidth: 920,
          initialFrameHeight: 350
        },
        tableData3: [],
        isShow: -1,
        multipleSelection: []
      }
    },
    methods: {
      getType() {
        var _this = this
        PUBLIC.get("Configure.Configure.Selfig", { type: 'articleType' }, function(data) {
          console.log(data[0].value)
          var newData = []
          for (var n = 0; n < data.length; n++) {
            newData.push(JSON.parse(data[n].value))
          }
          _this.type = newData
          console.log(_this.type)
        })
      },
      typeValue(e) {
        this.articleType = e
        console.log(this.articleType)
      },
      cancel() {
        this.$router.push({ name: '文章列表'})
      },
      getInfo(id) {
        var _this=this
        PUBLIC.get('Article.articles.message', { id: id }, data=>{
          console.log(data)
          this.articleType = data.type
          this.writer = data.writer
          this.title = data.title
          this.desc = data.desc
          this.body = decodeURIComponent(data.body)
          // setTimeout(function(){
          //   console.log(_this.$refs.ue)
            _this.defaultMsg=decodeURIComponent(data.body)
          // },3000)
          
          
          // this.$refs.ue.ready(
          //   function(){
          //     console.log( this.$refs.ue.getContent())
          //     this.$refs.ue.setContent(decodeURIComponent(data.body))
          //   }
          // )
          // this.$refs.ue.setContent(decodeURIComponent(data.body));
          // this.$refs.ue.setUEContent(decodeURIComponent(data.body))
          // this.$refs.ue.load()
          console.log(this.defaultMsg)
        })
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
      editAct(){
        var _this=this
        var time = PUBLIC.getNow()
        console.log(time)
        PUBLIC.post( 'Article.articles.update', { id: this.id, writer: this.writer, title: this.title, body: encodeURIComponent(this.$refs.ue.getUEContent()), type: this.articleType, desc: this.desc, time: time, status: this.isShow }, function(data) {
          console.log(data)
          _this.$router.push({ name: '文章列表'})
        })
      }
    },
    mounted() {
      var id = this.$route.params.id
      this.id = id
      this.getInfo(id)
      this.getType()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .activityInfo{
    padding: 120px 400px;

    .memberInfo{
      font-size: 14px;
      p {
        text-align: left;
        .el-row{
          margin-left: 80px;
          margin-top: -15px;
          .el-col-8{
            .el-input{
              width: 120px;
            }
          }
          .el-col-4{
            .el-input{
              width: 120px;
            }
          }
        }
        .el-table{
          margin-left: 80px;
          margin-top: -15px;
        }
        .el-textarea{
          width: 80%;
        }
        .mr0{
          width: 100%;
          .title{
            vertical-align: top;
          }
          .innerText{
            width: 80%;
          }
        }
        >span{
          display: inline-block;
          span{
            display: inline-block;
          }
          .title{
            width: 80px;
            text-align: right;
            padding-right: 10px;
          }
          img{
            height: 170px;
            width: 170px;
            border: 1px solid #ccc;
            display: inline-block;
          }
          .innerText{
            width: 200px;
          }
          .longText{
            width: 80%;
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 150px;
        }
      }
      .radios{
        margin-left: 80px;
      }
      .poster{
        .el-button{
          vertical-align: bottom;
          margin-left: 20px;
        }
      }
      p:last-of-type {
        padding-top: 60px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }
    .editor-container{
      margin-left: 80px;
      margin-top: -15px;
      width: 100%;
    }
  }

</style>
