<template>
  <div class="activityInfo">
    <div class="memberInfo">
      <p><span class="mr0"><span class="title">收件方:</span><span class="innerText">
        <span class="searchBox">
          <el-select v-model="value">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input  placeholder="请输入内容" v-model="uid"></el-input>
          <el-button type="primary" v-on:click="search">添加</el-button>
        </span>
      </span></span></p>
      <p>
        <span class="mr0"><span class="title"></span>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="values">
        </el-input>
      </span><el-button type="danger" class="delBtn"> 删除 </el-button></p>
      <p><span class="mr0"><span class="title">消息模板:</span><span class="innerText"><selectKuang></selectKuang></span></span></p>
      <p><el-button type="success" @click="sendMsg">发送</el-button><el-button type="info">取消</el-button></p>
    </div>
  </div>
</template>

<script>
  import { selectKuang, searchBox, timeBox } from '../../components/index'
  export default {
    name: 'add-edit',
    components: {
      searchBox,
      selectKuang,
      timeBox
    },
    data() {
      return {
        showPass: false,
        showReject: false,
        keyword: '',
        uid: '所有人',
        values: '',
        value: '站内信',
        code: '',
        type: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        types: [
          // {
          //   value: '短信',
          //   label: '短信'
          // }, {
          //   value: '邮件',
          //   label: '邮件'
          // }, {
          //   value: 'email',
          //   label: 'email'
          // }, 
          {
            value: '站内信',
            label: '站内信'
          }],
        multipleSelection: []
      }
    },
    methods: {
      search:function(){
        console.log(this.keyword)
        this.$emit( "searchKey", [this.value, this.keyword])

      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.pagesize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      passIt() {
        console.log(this.showPass)
        this.showPass = !this.showPass
      },
      rejectIt() {
        this.showReject = !this.showReject
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
      sendMsg() {
        var _this = this
        var uid=this.uid=="所有人"?-1:this.uid
        var args = { uid: uid, type: this.value, code: '',types:"管理员消息" ,value: this.values,searchToken:PUBLIC.token() }
        console.log(args)
        PUBLIC.get('Push.Push.Tsfq', args, (data) => {
          console.log(data)
          PUBLIC.toa("发送成功")
          // PUBLIC.get('Active.actives.updategrop',{ id: 2,end_time: _this.endTime, start_time: _this.startTime, reg_end_time: _this.reTime, address: _this.address, reg_file: _this.file }, function(data){
          //   console.log("第二层adjklasj").
          // })
        })
      }

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
          .innerText{
            width: 80%;
          }
        }
        .delBtn{
          margin-top: -50px;
          margin-left: 85px;
          margin-bottom: 60px;
          width: 100px;
          display: inherit;
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
