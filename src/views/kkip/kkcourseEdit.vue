<template>
  <div class="addMember clearfix">
    <div class="memberInfo">
      <p><span class="lessons"><span class="title">课程名称:</span><span class="innerText"><el-input v-model="lesson"></el-input></span></span></p>
      <p class="addP"><span><span class="title">课程图片:</span><span class="cPic"><span><img :src="pic" alt=""></span><el-button type="primary" @click="changeImg()">替换图片</el-button></span></span><el-input type='file' id='changeimgs' v-on:change='changeFile' hidden></el-input></p>
      <p><span class="links"><span class="title">视频链接:</span><span class="innerText"><el-input v-model="links"></el-input></span></span></p>
      <p class="addP"><span><span class="title">课程相册:</span>
        <span class="pics" v-html="morepic"></span><span class="addP" v-html="addPic"></span><span><el-button type="primary" @click="upImg()">添加照片</el-button></span></span><el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input></p>
      <p><el-button type="primary" @click="editCourse">编辑</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
    </div>
  </div>
</template>

<script>
  import { selectKuang } from '../../components/index'

  export default {
    name: 'addMember',
    components: {
      selectKuang
    },
    data() {
      return {
        lesson: ' ',
        links: '',
        pic: '',
        morepic: '',
        key: '',
        pics: '',
        addPic: '',
        addPics: '',
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
      changeImg(tab) {
        this.changeFileFor = tab
        document.getElementById('changeimgs').click()
      },
      changeFile() {
        var _this = this
        var tab = this.changeFileFor
        console.log('触发上传')
        PUBLIC.postFile('changeimgs', function (url) {
          console.log(url)
          _this.pic = url
        })
      },
      upImg(tab) {
        this.upFileFor = tab
        document.getElementById('upimgs').click()
      },
      upFile() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function (url) {
          console.log(url)
          _this.pics.push(url)
          console.log(_this.pics)
          let htmls = '<span class="picBox"><img src = "' + url + '" alt=""></span>'
          _this.morepic = _this.morepic + htmls
          console.log(_this.morepic)
        })
      },
      getCourseOne() {
        var _this = this
        var key = this.$route.params
        console.log(this.$route.params)
        PUBLIC.get('Configure.Configure.Selone', { type: 'course', key: key.key }, function(data) {
          console.log(data)
          var newData = JSON.parse(data.value)
          _this.newData = newData
          _this.lesson = newData.name
          _this.oldLesson=newData.name
          _this.links = newData.link
          _this.pic = newData.pic
          _this.pics = newData.pics
          console.log(_this.pics)
          for(var i = 0; i < _this.pics.length; i++) {
            let htmls = '<span class="picBox"><img src = "' + _this.pics[i] + '" alt=""></span>'
            _this.morepic = _this.morepic + htmls
            console.log(_this.morepic)
          }
        })
      },
      editCourse() {
        var _this = this
        console.log(this.videoLink)
        var value = JSON.stringify({name: this.lesson, pic: this.pic, pics: this.pics, link: encodeURIComponent(this.links) })
        console.log(value)
        if(_this.oldLesson!=_this.lesson){
          PUBLIC.get('Configure.Configure.Addconfig', {
          type: 'course',
          key: _this.oldLesson,
          value: value,
          on_status: 1,
          statu: -1
        }, function() {
          PUBLIC.get('Configure.Configure.Addconfig', {
            type: 'course',
            key: _this.lesson,
            value: value,
            on_status: 1,
            statu: 1
          }, function (data) {
            // _this.$router.go(-1)
            _this.$router.push({ path: '/kkip/kkip-course'})
          })
        })
        }else{
          PUBLIC.get('Configure.Configure.Addconfig', {
            type: 'course',
            key: _this.lesson,
            value: value,
            on_status: 1,
            statu: 1
          }, function (data) {
            // _this.$router.go(-1)
            _this.$router.push({ path: '/kkip/kkip-course'})
          })
        }

      },
      closeIt(){
        this.$router.push({ path: '/kkip/kkip-course'})
      }
    },
    mounted() {
      console.log(this.$route)
      this.key = this.$route.query.key
      this.getCourseOne()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .addMember{
    font-size: 14px;
    padding: 45px 62px;
    .memberInfo{
      padding-left: 230px;
      p {
        text-align: left;
        .lessons{
          .el-input{
            width: 300px;
          }
        }
        .links{
          .el-input{
            width: 500px;
          }
        }
        span{
          display: inline-block;
          span{
            display: inline-block;
          }
          .title{
            width: 100px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText{
            width: 200px;
            .dzzs{
              color: #169BD5;
              margin-left: 30px;
            }
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 120px;
        }
      }
      .addP{
        >span{
          position: relative;
          .title{
            position: absolute;
            top: 0;
            left: 0;
          }
          .cPic{
            margin-left: 100px;
            position: relative;
            img{
              width: 300px;
              height: 170px;
            }
            .el-button{
              width: 150px;
              position: absolute;
              bottom: 0;
              right: -200px;
            }
          }
          .personInfo,.pics, .addP{
            margin-left: 100px;
            >span{
              margin:0 5px 20px;
              width: 210px;
              height: 120px;

              img{
                width: 210px;
                height: 120px;
              }
            }
            >span:last-of-type{
              vertical-align: top;
              .el-button{
                width: 150px;
                /*vertical-align: text-bottom;*/
                margin-left: 20px;
              }
            }
          }
          .addP{
            margin-left: 0;
            vertical-align: top;
          }
        }
      }
      p:last-of-type {
        width: 80%;
        padding-top: 60px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }

  }

</style>
