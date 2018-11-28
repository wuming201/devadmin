<template>
  <div class="activityInfo">
    <div class="memberInfo">
      <p><span><span class="title">广告ID:</span><span class="innerText"></span></span></p>
      <p><span><span class="title">广告标题:</span><span class="innerText"><el-input v-model="adTitle" placeholder="请输入内容"></el-input></span></span><span><span class="title">广告位置:</span><span class="innerText"><selectKuang :selectData="adPlace" @value='placeValue' :value0="place1"></selectKuang></span></span></p>
      <p class="poster"><span class="mr0"><span class="title">活动海报:</span><img :src="newImg" alt=""><span class="imgBtn"><el-button type="primary" @click="upImg">上传图片</el-button></span></span><el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input></p>
      <p class="colorCode"><span><span class="title">背景色码:</span><span class="innerText"><el-input v-model="color" placeholder="请输入内容"></el-input></span></span></p>
      <p class="adLink"><span class="mr0"><span class="title">广告链接:</span><el-input v-model="adLink" placeholder="请输入内容"></el-input></span></p>
      <p><span class="mr0"><span class="title"></span><el-radio v-model="radio" label="1">显示</el-radio><el-radio v-model="radio" label="0">隐藏</el-radio></span></p>
      <p><el-button type="success" @click="saveIt">保存</el-button><el-button type="info" @click="quit">取消</el-button></p>
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
        adTitle: '',
        place: '',
        newImg: '',
        color: '',
        adLink: '',
        radio: '',
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
        multipleSelection: []
      }
    },
    methods: {
      placeValue(e) {
        console.log(e)
        this.place1 = e
      },
      upImg(){
        // console.log(tab)
        // this.upFileFor=tab
        document.getElementById("upimgs").click();
      },
      upFile(){
        // var tab=this.upFileFor
        console.log("触发上传")
        PUBLIC.postFile("upimgs",(url) => {
          this.newImg=url
        })
      },
      saveIt() {
        var values = { adTitle: this.adTitle, place: this.place1, newImg: this.newImg, color: this.color, adLink: this.adLink, on_status: this.radio }
        console.log(values)
        PUBLIC.get("Configure.Configure.Addconfig",{ type: 'ad', key: this.adTitle, value: encodeURIComponent(JSON.stringify(values)), on_status: this.radio, statu: 1 }, (data) => {
          this.quit()
          console.log(data)
        })
      },
      quit:function(){
        this.$router.go(-1)
      }
    },
    mounted() {
    },
    watch: {
      radio() {
        console.log(this.radio)
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
            width: 620px;
            height: 170px;
            display: inline-block;
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
