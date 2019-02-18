<template>
  <div class='info clearfix'>
    <div class='leftBox'>
      <div class='pic'>
        <img v-bind:src='vimg' alt='' width="200px" height="200px">
      </div>
      <el-button type='primary' @click='upImg()'>上传封面</el-button>
    </div>
    <div class='memberInfo'>
      <p><span><span class='title'>分类:</span><span class='innerText'>
        <el-select v-model='vclass' placeholder='请选择'>
          <el-option
            v-for='item in videoClass'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
      </span></span>
        <span><span class='title'>剧集:</span><span class='innerText'>
          <el-select v-model='vdrama' placeholder='请选择'>
            <el-option
              v-for='item in videoRank'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </span></span>
      </p>
      <p><span><span class='title'>视频标题:</span><span class='innerText'><el-input v-model='vtitle' placeholder='请输入内容'></el-input></span></span><span><span class='title'>播放媒资:</span><span class='innerText'><el-input v-model='vmeizi' placeholder='请输入内容'></el-input></span></span></p>
      <p><span><span class='title'>视频级别:</span><span class='innerText'>
        <el-select v-model='vlevel' placeholder='请选择'>
            <el-option
              v-for='item in videoLevel'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
      </span></span>
        <span>
          <span class='title'>上架时间:</span>
          <span class='innerText'>
            <el-date-picker
              v-model='vonTime'
              type='date'
              value-format="yyyy-MM-dd"
              placeholder='选择日期'
              @>
            </el-date-picker>
          </span>
        </span>
      </p>
      <p><span><span class='title'>视频标签:</span><span class='innerText'>
        <el-select v-model='vtags' multiple placeholder='请选择'>
          <el-option
            v-for='item in videoTag'
            :key='item.label'
            :label='item.label'
            :value='item.label'>
          </el-option>
        </el-select>
      </span></span>
      </p>
      <p>
        <span><span class='title'>视频版权:</span><span class='innerText'>
          <el-select v-model='vbanquan' placeholder='请选择'>
            <el-option
              v-for='item in options'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </span></span>
      </p>
      <p>
        <span><span class='title'>创作老师:</span><span class='innerText'>
          <!-- <el-input v-model='createTeacher'></el-input> -->
          <el-select v-model='createTeacher' multiple placeholder='请选择'>
          <el-option
            v-for='item in teacherList'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
        </span></span>
        <span><span class='title'>示范老师:</span>
          <span class='innerText'>
            <!-- <el-input v-model='showTeacher'></el-input> -->
          <el-select v-model='showTeacher' multiple placeholder='请选择'>
          <el-option
            v-for='item in teacherList'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
        </span></span>
      </p>
      <p>
        <span><span class='title'>视频简介:</span><span class='innerText'><el-button type='primary' @click='autoDesc'>自动生成</el-button></span></span>
        <span class='bigInput'>
          <el-input
            type='textarea'
            :rows='5'
            placeholder='请输入内容'
            v-model='vinfo'>
          </el-input>
        </span>
      </p>
      <p class='isUp ' ><span class='title'>降级时间:</span><span class='innerText'><span>
        <el-checkbox v-model='downGroupStatus[10][0]' :disabled="downGroupStatus[10][2]==false"  label='10'>合作视频</el-checkbox>
      <!-- <el-input placeholder='请输入内容'></el-input> -->
      <el-date-picker
              v-model='downGroupStatus[10][1]'
              type='date'
              placeholder='选择日期' :disabled="downGroupStatus[10][0]==false">
            </el-date-picker>
        </span><span><el-checkbox v-model='downGroupStatus[9][0]' label='9' :disabled="downGroupStatus[9][2]==false">VIP视频</el-checkbox>
        <!-- <el-input v-model='input' placeholder='请输入内容'></el-input> -->
        <el-date-picker
              v-model='downGroupStatus[9][1]'
              type='date'
              placeholder='选择日期' :disabled="downGroupStatus[9][0]==false">
            </el-date-picker>
        </span><span><el-checkbox v-model='downGroupStatus[8][0]' label='8' :disabled="downGroupStatus[8][2]==false" >普通视频</el-checkbox>
        <!-- <el-input v-model='input' placeholder='请输入内容'></el-input> -->
        <el-date-picker
              v-model='downGroupStatus[8][1]'
              type='date'
              placeholder='选择日期' :disabled="downGroupStatus[8][0]==false">
            </el-date-picker>
        </span></span></p>
      <p class='oneDemand' ><span class='title'>单次点播:</span><span class='innerText'><span><el-radio v-model='oneShot' label='-1'>不支持</el-radio><el-radio v-model='oneShot' label='1'>支持</el-radio>
        <el-input  v-if="oneShot==1" v-model="onePrice" ref="onePrice" placeholder='请输入大于0的数字！' type="number" @blur="checkPrice"></el-input><span v-if="oneShot==1">元/人次</span></span></span></p>
      <p class='freeDown' ><span class='title'>资源下载:</span><span class='innerText'><span><el-radio v-model='freeDown' label='-1'>不提供</el-radio><el-radio v-model='freeDown' label='1'>提供</el-radio>
        <el-select v-model='freeDownList' multiple placeholder='请选择' v-if="freeDown==1">
          <el-option
            v-for='item in userGroup'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
      </span></span></p>
       <p class='upFile' :style="'display:'+ hideup "><span class='title'>资源文件:</span>{{vfile}}<span><el-button type='primary' @click='upFile()'>上传文件</el-button></span></p>
      <el-input type='file' id='upimgs' v-on:change='upImgs' hidden></el-input>
      <el-input type='file' id='upFile' v-on:change='upFiles' hidden></el-input>
      <p><el-button type='success' @click='save'>保存</el-button><el-button type='info' @click='quit'>取消</el-button></p>
    </div>
  </div>
</template>
<script>
  import { selectKuang } from '../../../components/index'

  export default {
    name: 'addMember',
    components: {
      selectKuang
    },
    data() {
      return {
        radio: '1',
        up: '1',
        downTime: '',
        // oneShot: '',
        // freeDown: '',
        showTeacher: '',
        createTeacher: ' ',
        vbanquan: '0',
        fdSelect: '',
        options: [
          {
            value: '0',
            label: '育视界'
          },
          {
            value: '1',
            label: '派师圈'
          }
        ],
        userGroup:[
          {
            label:"vip会员",
            value:"318"
          },
          {
            label:"机构会员",
            value:"317"
          },
          {
            label:"特权会员",
            value:"316"
          },
          ],
        //   downGroupStatus:{
        //   "8":[false,"",false],
        //   "9":[false,""],
        //   "10":[false,""]
        // },
        downGroupStatus:{
          "8":[false,"",false],
          "9":[false,"",false],
          "10":[false,"",false],
          "11": [false, "", false],
        },
        value: '',
        tags: '',
        creat: '',
        show: '',
        multipleSelection: [],
        videoLevel: [],
        videoClass: [],
        videoTag: [],
        videoRank: [],
        teacherList:[],
        vimg: '',
        vfile: '',
        vclass: '',
        vtags: '',
        vlevel: '',
        vdrama: '',
        vtitle: '',
        vonTime: '',
        vinfo: '',
        vmeizi: '',
        vtagsLabel: [],
      //  buyaode
        input: '',
        onePrice: '',
        oneShot: '-1',
        freeDown: '-1',
        freeDownList:[],
        url_type: '',
        hideup: 'none',
      }
    },
    methods: {
      checkPrice() {
        if(this.onePrice <= 0) {
          // this.priceWrong = true
          this.$refs.onePrice.focus()
          this.onePrice = ''
        }else{
          this.onePrice = Number(this.onePrice)
        }
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
      //自动生成视频简介
      autoDesc() {
        console.log(this.vtags)

        this.vinfo = '欢迎加入育视界幼儿律动视频点播平台，' +
          this.vtitle + '是专门针对 ' + this.vtags+ ' 制作的参考视频，如果您喜欢的话，请收藏视频或者为我们点赞哦~'
      },
      save() {
        var _this = this
        if(this.freeDown!=1){

          this.freeDownList=[]
          // datas["freeDown"]=this.freeDownList
        }
        var desc = { 'showTeacher': this.showTeacher, 'createTeacher': this.createTeacher,"copyright":this.vbanquan,"freeDownList":this.freeDownList,"oneMoney":this.onePrice,"oneStatus":this.oneShot}
        if(this.vmeizi.indexOf('mda-') == -1) {
          this.url_type = 'aliyun'
        }else{
          this.url_type = 'baidu'
        }
        if(this.freeDown != -1){
          if(this.freeDownList.length == 0 || this.vfile == ''){
            this.$alert('请上传资源文件', '', {
              confirmButtonText: '确定',
            });
            return
          }
        }
        var datas={
          title: this.vtitle,
          img: this.vimg,
          info: this.vinfo,
          url: this.vmeizi,
          videofile: this.vfile,
          url_type: this.url_type,
          level: this.vlevel,
          drama_id: this.vdrama,
          // tags: '['+this.vtags+']',
          tags:JSON.stringify(this.vtags),
          // up_time:this.vonTime,
          on_status: -1,
          con_status:this.oneShot,
          money:this.onePrice,
          desc: JSON.stringify(desc),
          copyright: this.vbanquan
        }


        console.log(datas)
        PUBLIC.get('Video.drama.uploading',datas,(data)=>{
          console.log(data)
          var actNum=0
          // PUBLIC.get("Video.drama.demotion",{select:JSON.stringify({level:_this.vlevel,time:_this.vonTime + ' 00:00:00',res_id:data,on_status:1,type:"1"}),type:"insert"},function(data1){})
          // for(var k in _this.downGroupStatus){
          //   console.log("1111111111111111111111111")
          //   console.log(k)
          //  console.log(_this.downGroupStatus[k])
          //   if(_this.downGroupStatus[k][0]==true){
          //     var on_status=1
          //     }else{
          //       var on_status=-1
          //     }
          //      actNum+=1
          //     PUBLIC.get("Video.drama.demotion",{select:JSON.stringify({level:k,time:_this.downGroupStatus[k][1],res_id:data,on_status:on_status,type:"-1"}),type:"insert"},function(data1){
          //       actNum-=1
          //       if(actNum==0){
          //         _this.freeDownAct(data)
          //       }
          //
          //   })
          //
          // }
          this.$router.push({name:'视频列表',query: { page: this.page }})

        })
      },
       freeDownAct(id){
        var num=this.freeDownList.length
        var _this=this
        if(this.freeDownList.length==0){
           _this.$router.go(-1)
        }
        for(var n=0;n<this.freeDownList.length;n++){
          PUBLIC.get("Auth.Resource.Set",{fid:this.freeDownList[n],ftype:"team",res_id:id,res_type:"video",server:"down",on_status:1,statu:1,value:1},function(data){
            console.log(data)
            num-=1
            if(num==0){
              _this.$router.go(-1)
            }
          })
        }

      },
      upImg(tab) {
        this.upFileFor = tab
        document.getElementById('upimgs').click();
      },
      upImgs() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upimgs', function(url) {
          console.log(url)
          _this.vimg = url
        })
      },

      upFile(tab) {
        this.upFileFor = tab
        document.getElementById('upFile').click();
      },
      upFiles() {
        var _this = this
        var tab = this.upFileFor
        console.log('触发上传')
        PUBLIC.postFile('upFile', function(url) {
          console.log(url)
          _this.vfile = url

          console.log(_this.vfile)
        })
      },
      quit:function(){
        this.$router.go(-1)
      },
      //公共选择项
      loadTeacherList:function(){
        var _this=this
        PUBLIC.get("User.certificate.certificateList",{videoProducing:1,pay_statu:1},function(data){
          var demo={
            value:"uid",
            label:"stageName"
          }
          var relData=PUBLIC.formatObj(demo,data)
          _this.teacherList=relData
        })
      }
    },
    watch: {

      freeDownList() {
        if(this.freeDownList.length > 0) {
          this.hideup = 'block'
        }
      },
      freeDown() {
        if(this.freeDown == -1) {
          this.hideup = 'none'
        }else if(this.freeDown != -1 && this.freeDownList.length > 0){
          this.hideup = 'block'
        }else{
          this.hideup = 'none'
        }
      },
      vclass() {
        var _this = this
        PUBLIC.get('Video.drama.showdrama', { class_id: _this.vclass }, function(data){
          var demo = {
            value: 'id',
            label: 'title'
          }
          data=PUBLIC.formatObj(demo, data)
          _this.videoRank = data
          _this.vdrama=""
        })
      },
      vtags() {
        this.vtagsLabel = []
        for (let i = 0; i < this.vtags.length; i++) {
          // console.log(this.vtags[i])
          for (let a = 0; a < this.videoTag.length; a++) {
            if (this.videoTag[a].value == this.vtags[i]) {
              this.vtagsLabel.push(this.videoTag[a].label)
            }
          }
        }
        console.log(this.vtagsLabel)
      },
      vlevel(){
        var _this=this
        var level=this.vlevel
        console.log(level)
        for(var k in this.downGroupStatus){
          if(parseInt(k) >=parseInt(level) ){
            this.downGroupStatus[k][2]=false
            this.downGroupStatus[k][0]=false
          }else{
            this.downGroupStatus[k][2]=true
            this.downGroupStatus[k][0]=false
          }
        }
        console.log(this.downGroupStatus)
        this.downGroupStatus=JSON.parse(JSON.stringify(this.downGroupStatus))
      },
      createTeacher(){
        console.log(this.createTeacher)
      }
    },
    mounted() {
      DATAC.setConf(this)
      this.loadTeacherList()
      console.log(this)
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .info{
    padding: 70px 50px;
    .leftBox{
      width: 300px;
      float: left;
      .pic{
        img{
          width: 300px;
          height: 170px;
          border: 1px seagreen solid;
        }
      }
    }
    .memberInfo{
      font-size: 14px;
      padding-left: 400px;
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
          padding-bottom: 40px;
        }
        >span:first-of-type{
          margin-right: 70px;
        }
        .bigInput{
          display: block;
          margin-left: 100px;
          margin-top: -40px;
          width: 575px;
        }
      }
      .addBtn{
        margin-top: -47px;
        margin-left: 100px;
        .el-button{
          width: 200px;
          margin-bottom: 55px;
        }
      }
      p:last-of-type {
        width: 80%;
        text-align: center;

        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
      .intro,.oneDemand,.freeDown,.isUp{
        line-height: 18px;
        padding-bottom: 40px;
        .introduce,.title{
          width: 100px;
          text-align: right;
          padding-right: 10px;
          margin-right: 0;
          padding-bottom: 0;
        }
        .text{
          padding-bottom: 0;
          margin-left: 100px;
          margin-top: -20px;
        }
      }
      .oneDemand,.freeDown,.isUp{
        .innerText{
          padding-bottom: 0;
          margin-top: -27px;
          margin-left: 100px;
          display: block;
          >span{
            margin-right: 10%;
            margin-bottom: 20px;
            .el-radio{
              width: 100px;
            }
            .el-input{
              width: 200px;
            }
          }
          .downFile{
            color: #409EFF;
          }
        }
      }
      .upFile{
        width: 80%;
        margin-left: 30px;
        .el-button{
          margin-left: 60px;
        }
      }
    }
    #upFile{
      display: none;
    }

  }

</style>
