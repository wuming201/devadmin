<template>
  <div class="addMember clearfix">
    <div class="memberInfo">
      <p><span><span class="title">证书1名称:</span><span class="innerText"><el-input v-model="cName1" placeholder="请输入内容"></el-input></span></span></p>
      <p class="poster"><span><span class="title">证书1图片:</span><span class="innerText"><img :src="changeImg1" alt=""></span></span><el-button type="primary" @click="upImg1('changeImg1')">上传图片</el-button><el-input type="file" id="upimgs1" v-on:change="upFile1" hidden></el-input></p>
      <p><span><span class="title">证书2名称:</span><span class="innerText"><el-input v-model="cName2" placeholder="请输入内容"></el-input></span></span></p>
      <p class="poster"><span><span class="title">证书2图片:</span><span class="innerText"><img :src="changeImg2" alt=""></span></span><el-button type="primary" @click="upImg2('changeImg2')" >上传图片</el-button><el-input type="file" id="upimgs2" v-on:change="upFile2" hidden></el-input></p>
      <p><span><span class="title">证书3名称:</span><span class="innerText"><el-input v-model="cName3" placeholder="请输入内容"></el-input></span></span></p>
      <p class="poster"><span><span class="title">证书3图片:</span><span class="innerText"><img :src="changeImg3" alt=""></span></span><el-button type="primary" @click="upImg3('changeImg3')" >上传图片</el-button><el-input type="file" id="upimgs3" v-on:change="upFile3" hidden></el-input></p>
      <p><el-button type="success" @click="createCertify">保存</el-button><el-button type="info" @click="cancel">取消</el-button></p>
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
        inputs: '',
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
      changeImg1: ' ',
      cName1: '',
      cName2: '',
      changeImg2: '',
      cName3: '',
      changeImg3: '',
      multipleSelection: [],
      zhengshuIndex:{
        "证书1":"1",
        "证书2":"2",
        "证书3":"3",
      }
    }
  },
  methods: {
    upImg1(tab) { //  绑数据
      this.upFileFor = tab
      document.getElementById("upimgs1").click();
    },
    upFile1() {
      var _this = this
      var tab=this.upFileFor
      console.log("触发上传")
      PUBLIC.postFile("upimgs1",function(url){
        _this[tab]=url
        console.log(_this[tab])
      })
    },
    upImg2(tab) { //  绑数据
      this.upFileFor = tab
      document.getElementById("upimgs2").click();
    },
    upFile2() {
      var _this = this
      var tab=this.upFileFor
      console.log("触发上传")
      PUBLIC.postFile("upimgs2",function(url){
        _this[tab]=url
      })
    },
    upImg3(tab) { //  绑数据
      this.upFileFor = tab
      document.getElementById("upimgs3").click();
    },
    upFile3() {
      var _this = this
      var tab=this.upFileFor
      console.log("触发上传")
      PUBLIC.postFile("upimgs3",function(url){
        _this[tab]=url
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    createCertify() {
      var _this = this
      var value = JSON.stringify({ name1: this.cName1, pic1: this.changeImg1, name2: this.cName2, pic2: this.changeImg2, name3: this.cName3, pic3: this.changeImg3 })
      console.log(value)
      _this.upNum=3
      _this.hadUp=0
      // if(_this.oldcName1!=_this.cName1){
      //   PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.oldcName1,statu:-1},function(data){
      //     PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.cName1,value:JSON.stringify({key:_this.cName1,img:_this.changeImg1}),on_status:1,statu:1},function(data){
      //       _this.hadUp+=1
      //       _this.upDo()
      //     })
      //   })
      // }else{
          PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:"证书1",value:JSON.stringify({key:_this.cName1,img:_this.changeImg1}),on_status:1,statu:1},function(data){
            _this.hadUp+=1
            _this.upDo()
          })
      // }
      // if(_this.oldcName2!=_this.cName2){
      //   PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.oldcName2,statu:-1},function(data){
      //     PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.cName2,value:JSON.stringify({key:_this.cName2,img:_this.changeImg2}),on_status:1,statu:1},function(data){
      //       _this.hadUp+=1
      //       _this.upDo()
      //     })
      //   })
      // }else{
        PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:"证书2",value:JSON.stringify({key:_this.cName2,img:_this.changeImg2}),on_status:1,statu:1},function(data){
          _this.hadUp+=1
            _this.upDo()
        })
      // }

      // if(_this.oldcName3!=_this.cName3){
      //   PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.oldcName3,statu:-1},function(data){
      //     PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.cName3,value:JSON.stringify({key:_this.cName3,img:_this.changeImg3}),on_status:1,statu:1},function(data){
      //       _this.hadUp+=1
      //       _this.upDo()
      //     })
      //   })
      // }else{
        PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:"证书3",value:JSON.stringify({key:_this.cName3,img:_this.changeImg3}),on_status:1,statu:1},function(data){
          _this.hadUp+=1
            _this.upDo()
        })
      // }
      
      // PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.cName1,value:JSON.stringify({key:_this.cName1,img:_this.changeImg1}),on_status:1,statu:1},function(data){})
      // PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.cName2,value:JSON.stringify({key:_this.cName2,img:_this.changeImg2}),on_status:1,statu:1},function(data){})
      // PUBLIC.get("Configure.Configure.Addconfig",{type:"certify",key:_this.cName3,value:JSON.stringify( {key:_this.cName3,img:_this.changeImg3}),on_status:1,statu:1},function(data){})
      // PUBLIC.get('Configure.Configure.Addconfig', { type: 'certify', key: _this.cName1, value: value, on_status: 1, statu: 1 }, function(data) {
      // })
    },
    upDo:function(){
      if(this.hadUp>=this.upNum){
        this.hadUp=0
        PUBLIC.toa("更新完毕",1)
        this.getCertify()
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        // this.$router.go(-1)
        }
    },
    getCertify() {
      var _this=this
      PUBLIC.get('Configure.Configure.Selfig', { type: 'certify' }, function(data) {
        console.log(data)
        for(var n=0;n<data.length;n++){
          var dataO=JSON.parse(data[n].value)
          if(["证书1","证书2","证书3"].indexOf(data[n].key)>-1){
            _this["cName"+_this.zhengshuIndex[data[n].key]]=dataO.key
            _this["oldcName"+_this.zhengshuIndex[data[n].key]]=dataO.key
            _this["changeImg"+_this.zhengshuIndex[data[n].key]]=dataO.img
          }
          
        }
      })
    }
  },
  mounted() {
    this.getCertify()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .addMember{
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
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 70px;
        }
      }
      .poster{
        .title{
          vertical-align: top;
        }
        .innerText{
          width: 300px;
          height: 170px;
          img{
            width: 300px;
            height: 170px;
          }
        }
        .el-button{
          width: 160px;
        }
      }
      p:last-of-type {
        padding-top: 100px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }

  }

</style>
