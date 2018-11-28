<template>
  <div class="jyln">
    <div class="memberInfo">
      <p class="first">
        <span><span class="title">书名:</span><span class="innerText"><el-input v-model="bookName"></el-input></span></span>
        <span><span class="title">作者:</span><span class="innerText"><el-input v-model="author"></el-input></span></span>
        <span><span class="title">出版社:</span><span class="innerText"><el-input v-model="press"></el-input></span></span>
      </p>
      <p class="poster"><span class="mr0"><span class="title">图片1:</span><img :src="pic1" alt=""><span class="imgBtn"><el-button type="primary" @click="upImg">上传图片</el-button></span></span><el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input></p>
      <p class="adLink">
        <span class="mr0">
          <span class="title">简介:</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="desc">
          </el-input>
        </span>
      </p>
      <p class="poster"><span class="mr0"><span class="title">图片2:</span><img :src="pic2" alt=""><span class="imgBtn"><el-button type="primary" @click="upImg2">上传图片</el-button></span></span><el-input type="file" id="upimgs2" v-on:change="upFile2" hidden></el-input></p>
      <p class="wenan">
        <span>
          <span class="title">文案1:</span>
          <span class="innerText">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="wenan1">
            </el-input>
          </span>
        </span>
        <span>
          <span class="title">文案2:</span>
          <span class="innerText">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="wenan2">
            </el-input>
          </span>
        </span>
      </p>
      <p class="adLink">
        <span class="mr0">
          <span class="title">文案3:</span>
          <el-input
            type="textarea"
            :rows="2"
            v-model="wenan3">
          </el-input>
        </span>
      </p>
      <p><el-button type="success" @click="saveIt">保存</el-button><el-button type="info" @click="quit">取消</el-button></p>
    </div>
  </div>
</template>

<script>
  import { selectKuang, timeBox, UE } from '../../components/index'
  import defaultPic from '../../assets/pic.png'
  export default {
    name: 'activityEdit',
    components: {
      selectKuang,
      timeBox,
      UE
    },
    data() {
      return {
        bookName: '',
        author: '',
        press: '',
        desc: '',
        pic1: defaultPic,
        pic2: defaultPic,
        newImg: '',
        newImg2: '',
        wenan1: '',
        wenan2: '',
        wenan3: '',
        values: ''
      }
    },
    created() {
      this.getInfo()
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
      upImg2(){
        // console.log(tab)
        // this.upFileFor=tab
        document.getElementById("upimgs2").click();
      },
      upFile(){
        // var tab=this.upFileFor
        console.log("触发上传")
        PUBLIC.postFile("upimgs",(url) => {
          this.newImg=url
          this.pic1 = this.newImg
        })
      },
      upFile2(){
        // var tab=this.upFileFor
        console.log("触发上传")
        PUBLIC.postFile("upimgs2",(url) => {
          this.newImg2=url
          this.pic2 = this.newImg2
          console.log(this.pic2)
        })
      },
      getInfo() {
        PUBLIC.get("Configure.Configure.Selfig",{ type: 'JYLN', key: 'JYLN'}, (dataa) => {
          // this.quit()
          console.log(dataa)
          let data = JSON.parse(dataa[0].value)
          this.bookName = data.bookName
          this.author = data.author
          this.press = data.press
          this.desc = data.desc
          this.pic1 = data.newImg
          this.pic2 = data.newImg2
          this.wenan1 = data.wenan1
          this. wenan2 = data.wenan2
          this. wenan3 = data.wenan3
        })
      },
      saveIt() {
        var values = { bookName: this.bookName, author: this.author, press: this.press, desc: this.desc, newImg2: this.pic2, newImg: this.pic1, wenan1: this.wenan1, wenan2: this.wenan2, wenan3: this.wenan3 }
        console.log(values)
        PUBLIC.get("Configure.Configure.Addconfig",{ type: 'JYLN', key: 'JYLN', value: JSON.stringify(values), on_status: 1, statu: 1 }, (data) => {
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
  .jyln{
    padding: 120px 200px;
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
          .el-input,.el-textarea{
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
            vertical-align: text-top;
          }
          img{
            /*width: 620px;*/
            height: 200px;
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
      .first{
        >span:first-of-type{
          margin-right: 0px;
        }
      }
      .adLink{
        padding-bottom: 55px;
        .mr0{
          border: 1px solid transparent;
          padding-bottom: 0;
        }
        .title{
          border: 1px solid transparent;
          display: inline-block;
          margin-top: -36px;
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
      .wenan{
        .title{
          margin-top: -120px;
        }
        .innerText{
          width: 300px;
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
