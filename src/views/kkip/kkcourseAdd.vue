<template>
  <div class="addMember">
    <div class="memberInfo">
      <p><span class="lessons"><span class="title">课程名称:</span><span class="innerText"><el-input v-model="lessonName"></el-input></span></span></p>
      <p class="addP"><span><span class="title">课程图片:</span><span class="cPic"><span><img :src="changeImgSrc"  alt=""></span><el-button type="primary" @click="changeImg()">替换图片</el-button></span></span><el-input type='file' id='changeimgs' v-on:change='changeFile' hidden></el-input></p>
      <p><span class="links"><span class="title">视频链接:</span><span class="innerText"><el-input v-model="videoLink"></el-input></span></span></p>
      <p class="addP"><span><span class="title">课程相册:</span><span class="pics vHtml" v-html="morepic" ref="pic"></span><span><el-button type="primary" @click="upImg()">添加照片</el-button></span></span><el-input type='file' id='upimgs' v-on:change='upFile' hidden></el-input></p>
      <p><el-button type="primary" @click="createCourse">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
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
        tableData3: [
          {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        options: [
          {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        multipleSelection: [],
        morepic: '',
        lessonName: '',
        videoLink: '',
        uimg: '',
        arr: [],
        uimgs: {},
        cImg: '',
        changeImgSrc:""
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
          _this.uimg = url
          var htmls = '<span class="picBox"><img src = "' + _this.uimg + '" alt=""></span>'
          _this.morepic = _this.morepic + htmls
          console.log(_this.morepic)
          _this.uimgs = _this.arr.push(_this.uimg)
          console.log(_this.arr)
        })
      },
      changeImg(tab) {
        this.upFileFor = tab
        document.getElementById('changeimgs').click()
      },
      changeFile() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('changeimgs', function (url) {
          console.log(url)
          _this.changeImgSrc = url
          _this.uimg=url
        })
      },
      createCourse() {
        var _this = this
        console.log(this.videoLink)
        var value = JSON.stringify({name: this.lessonName, pic: this.changeImgSrc, pics: this.arr, link: this.videoLink})
        console.log(value)
        PUBLIC.get('Configure.Configure.Addconfig', {
          type: 'course',
          key: this.lessonName,
          value: value,
          on_status: 1,
          statu: 1
        }, function (data) {
          console.log(data)
          _this.$router.push({ path: '/kkip/kkip-course'})
        })
      },
      closeIt(){
        console.log("退出")
        this.$router.push({ path: '/kkip/kkip-course'})
      },
      delCourse() {
        var _this = this
        PUBLIC.get('Configure.Configure.Addconfig', {
          type: 'course',
          key: '撒大声地',
          value: '',
          on_status: '',
          statu: -1
        }, function (data) {
          console.log(data)
        })
      }
    },
    mounted() {
      this.delCourse()
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
          .personInfo,.pics{
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
                margin: 80px 20px;
              }
            }
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
