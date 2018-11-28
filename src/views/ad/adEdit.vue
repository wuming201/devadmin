<template>
  <div class="activityInfo">
    <div class="memberInfo">
      <p><span><span class="title">广告ID:</span><span class="innerText"></span></span></p>
      <p><span><span class="title">广告标题:</span><span class="innerText"><el-input v-model="adInfo.adTitle" placeholder="请输入内容"></el-input></span></span><span><span class="title">广告位置:</span><span class="innerText"><selectKuang :value0="adInfo.place" :selectData="adPlace" @value="changePlace"></selectKuang></span></span></p>
      <p class="poster"><span class="mr0"><span class="title">活动海报:</span><img :src="adInfo.newImg" alt=""><span class="imgBtn"><el-button type="primary" @click="upFile">替换图片</el-button></span></span></p>
      <input type="file" id="upFileForm" @change="upFileChange" hidden>
      <p class="colorCode"><span><span class="title">背景色码:</span><span class="innerText"><el-input v-model="adInfo.color" placeholder="请输入内容"></el-input></span></span></p>
      <p class="adLink"><span class="mr0"><span class="title">广告链接:</span><el-input v-model="adInfo.adLink" placeholder="请输入内容"></el-input></span></p>
      <p><span class="mr0"><span class="title"></span><el-radio v-model="adInfo.on_status" label="1">显示</el-radio><el-radio v-model="adInfo.on_status" label="-1">隐藏</el-radio></span></p>
      <p><el-button type="success" @click="save">保存</el-button><el-button type="info" @click="quit">取消</el-button></p>
    </div>
  </div>
</template>

<script>
  import { selectKuang, timeBox, UE } from '../../components/index'
  export default {
    name: 'activityEdit',
    components: {
      selectKuang,
      timeBox,
      UE
    },
    data() {
      return {
        showPass: false,
        showReject: false,
        defaultMsg: '这里是UE测试',
        adInfo:{},
        adPlace: [
          {
            value: 'PC首页轮播图',
            label: 'PC首页轮播图'
          }, {
            value: '小程序首页轮播图',
            label: '小程序首页轮播图'
          }, {
            value: 'VIP付费页横幅',
            label: 'VIP付费页横幅'
          }, {
            value: '小程序首页VIP广告',
            label: '小程序首页VIP广告'
          }
        ],
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        tableData3: [],
        multipleSelection: []
      }
    },
    methods: {
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
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
      getAdInfo:function(){
        var _this=this
        PUBLIC.get("Configure.Configure.Selone",{type:"ad",key:this.oldTitle},function(data){
          _this.adInfo=JSON.parse(decodeURIComponent(data.value))
          _this.oldInfo=JSON.parse(decodeURIComponent(data.value))
          console.log(_this.adInfo)
        })
      },
      save:function(){
        var _this=this
        if(this.adInfo.adTitle!=this.oldTitle){
            PUBLIC.get("Configure.Configure.Addconfig",{type:"ad",key:this.oldTitle,value:encodeURIComponent(JSON.stringify(this.oldInfo)),on_status:1,statu:-1},function(data){
              PUBLIC.get("Configure.Configure.Addconfig",{type:"ad",key:_this.adInfo.adTitle,value:encodeURIComponent(JSON.stringify(_this.adInfo)),on_status:_this.adInfo.on_status,statu:1},function(data){
              // console.log(data)
              _this.quit()
            })})
        } else{
          PUBLIC.get("Configure.Configure.Addconfig",{type:"ad",key:this.adInfo.adTitle,value:encodeURIComponent(JSON.stringify(this.adInfo)),on_status:this.adInfo.on_status},function(data){
          // console.log(data)
          _this.quit()
        })
        }
      },
      changePlace:function(data){
        console.log("选中")
        console.log(data)
        this.adInfo.place=data
      },
      quit:function(){
        this.$router.go(-1)
      },
      upFile:function(){
      console.log("触发上传")
      document.getElementById("upFileForm").click();
    },
    upFileChange:function(){
      var _this=this
      console.log("开始上传文件")
      PUBLIC.postFile("upFileForm",function(data){
        _this.adInfo.newImg=data
      })
    },
    },
    mounted() {
      this.oldTitle=this.$route.params.id
      this.getAdInfo()
      console.log(this.oldTitle)
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .activityInfo{
    padding: 120px 400px;
    .memberInfo{
      font-size: 14px;
      p {
        text-align: left;
        .el-table{
          margin-left: 80px;
          margin-top: -15px;
        }
        .mr0{
          width: 100%;
          .el-input{
            width: 70%;
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
          }
          .innerText{
            width: 250px;
          }
          .longText{
            width: 80%;
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 100px;
        }
      }
      .poster{
        .title{
          vertical-align: top;
        }
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
