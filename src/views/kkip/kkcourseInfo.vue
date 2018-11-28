<template>
  <div class="addMember clearfix">
    <div class="memberInfo">
      <p><span><span class="title">课程名称:</span><span class="innerText">{{newData.name}}</span></span></p>
      <p class="addP"><span><span class="title">课程图片:</span><span class="cPic"><span><img :src="pic" alt=""></span></span></span></p>
      <p><span><span class="title">视频链接:</span><span class="innerText">{{newData.link}}</span></span></p>
      <p class="addP"><span><span class="title">课程相册:</span><span class="pics" v-html="morepic"></span></span></p>
      <p><el-button type="primary" @click="edit">编辑</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
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
        multipleSelection: [],
        pic: '',
        newData: '',
        arr: '',
        pics: '',
        morepic: ''
      }
    },
    methods: {
      edit() {
        // console.log(this.newData.name)
        this.$router.push({name: 'kk课程编辑',params: {key: this.newData.name }})
      },
      closeIt(){
        this.$router.push({ path: '/kkip/kkip-course'})
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
      getCourseOne() {
        var _this = this
        var key = this.$route.params
        console.log(this.$route.params)
        PUBLIC.get('Configure.Configure.Selone', { type: 'course', key: key.key }, function(data) {
          console.log(data)
          var newData = JSON.parse(data.value)
          _this.newData = newData

          _this.pic = newData.pic
          _this.pics = newData.pics
          console.log(_this.pics)
          for(var i = 0; i < _this.pics.length; i++) {
            let htmls = '<span class="picBox"><img src = ' + _this.pics[i] + ' alt=""></span>'
            _this.morepic = _this.morepic + htmls
            console.log(_this.morepic)
          }


        })

      }
    },
    mounted() {
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
            img{
              width: 300px;
              height: 170px;
            }
          }
          .personInfo,.pics{
            margin-left: 100px;
            >span{
              padding:0 5px 20px;
              img{
                width: 210px;
                height: 120px;
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
