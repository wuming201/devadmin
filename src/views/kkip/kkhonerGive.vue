<template>
  <div class="honerGive">
    <div class="intro">
      <img :src="honerInfo.pic" alt="">
      <!-- ?'../../assets/pic.png':honerInfo.pic -->
      <span class="addYear" @click="openaddYear">添加荣誉年份</span>
      <div class="text fl">
        <p class="title">{{honerInfo.name}}</p>
        <p class="innerText">
          {{honerInfo.desc}}
        </p>
        <!--<i style="display: inline-block;height: 100%;vertical-align: middle;"></i>-->
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="honerWall">
      <div class="block" v-for="(item,index) in yearList" :key="index">
        <p>{{item.year}}年 <span @click="addTeacher(item.id)">添加老师</span><span @click="delYear(item.id)" style="right:40px">删除年份</span></p>
        <div class="innerBlock">
          <el-tag
            v-for="tag in item.teachers"
            :key="tag.teacher_id"
            closable
            @close="delTeacher(tag.id)"
            :type="tag.rel_name">
            {{tag.rel_name}}
          </el-tag>
        </div>
      </div>
      <!-- <div class="block">
        <p>2018年 <span>添加老师</span></p>
        <div class="innerBlock">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
      </div> -->

      <div class="clearfix"></div>
    </div>
    <div class="addAdmin" v-show="shouAdd">
      <h3>信息编辑 <i class="fa fa-close" @click="quitEdit"></i></h3>
      <div class="inner">
        <p>老师姓名：
          <el-autocomplete v-for="(item,index) in inputs" :key="index"
            class="inline-input"
            v-model="inputs[index].name"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
          >
          </el-autocomplete>
          <el-button type="primary" @click='addInput'>添加</el-button></p>
        <p><el-button type="success" @click="saveEdit" >提交</el-button><el-button type="info" @click="quitEdit">取消</el-button></p>
      </div>
    </div>
    <div class="addYears" v-show="showAddyear">
      <h3>添加荣誉年份 <i class="fa fa-close" @click="quitEdit"></i></h3>
      <div class="inner">
        <p>年份：<el-input v-model="addYearStr"></el-input>
        <p><el-button type="success" @click="addYear" >添加</el-button><el-button type="info" @click="quitEdit">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'schoolEdit',
    data() {
      return {
        tags: [],
        inputs: [
          { name: '', uid: '',err:""}
        ],
        showAddyear: false,
        addYearStr:"",
        yearList:[],
        teachers:[],
        inputsFlag:true,
        inputCounter: 0,
        shouAdd: false,
        multipleSelection: [],
        checkedAuthorize: [],
        videoClass: [],
        isIndeterminate: true,
        options: [],
        selectedOptions2: [],
        datas: [],
        region: [],
        regionName: '',
        boss: '',
        phone: '',
        mid: '',
        oldMid: '',
        percent: '',
        honerInfo:{}
      }
    },
    methods: {
      querySearch(queryString,cb) {//queryString, cb
        console.log(queryString)
        console.log(this.restaurants)
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        console.log(results)
        // var results=[]
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      quitEdit() {
        this.shouAdd = false
        this.showAddyear = false
      },
      loadTeachers(){
        var _this=this
        PUBLIC.get("User.certificate.certificateList",{on_status:1,state:1,number:1000},function(data){
          console.log(data)
          var tmp=[]
          var tmpDict={}
          for(var n=0;n<data.length;n++){
            tmp.push({value:data[n].rel_name+"-"+data[n].jobnumber,name:data[n].rel_name})
            tmpDict[data[n].rel_name+"-"+data[n].jobnumber]=data[n].uid
          }
          _this.teachersDict=tmpDict
          _this.restaurants=tmp
        })
      },
      checkTeacher(index){
        var _this=this
        PUBLIC.get("Configure.Honer.selrel_name",{rel_name:_this.inputs[index].name},function(data){
          if(data==false){
            console.log("教师不存在")
          }else{
            console.log(data)
            _this.inputs[index].uid=data
          }
        })
      },
      addTeacher(year) {
        console.log("添加教师")
        this.editYear=year
        this.inputs=[
          { name: '', uid: '',err:""}
        ]
        this.shouAdd = !this.shouAdd

        console.log(this.shouAdd)
      },
      delTeacher(id){
        var _this=this
        console.log("删除教师")
        console.log(id)
        // return
        PUBLIC.get("Configure.Honer.del",{id:id},function(data){
          _this.getHonerInfo(_this.key)
        })
      },
      addInput() {
        this.inputsFlag=false
        this.inputCounter = this.inputCounter + 1
        this.inputs.push({ name: "", model: ''})
        this.inputs = JSON.parse(JSON.stringify(this.inputs))
        this.inputsFlag=true
        console.log(this.inputs)
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
      getYearList(id){
        var _this=this
        PUBLIC.get("Configure.Year.sel",{honer_id:id},function(data){
          console.log(data)
          _this.yearList=data
          var indexDict={}
          for(var n=0;n<_this.yearList.length;n++){
            _this.yearList[n].teachers=[]
            indexDict[_this.yearList[n].id]=n
          }
          PUBLIC.get("Configure.Honer.selteacher",{honer_id:_this.honerId},function(data){
            console.log(data)
            for(var n=0;n<data.length;n++){
              _this.yearList[indexDict[data[n].yearid]].teachers.push(data[n])
            }
            console.log(_this.yearList)
            _this.yearList=JSON.parse(JSON.stringify(_this.yearList))
          })
        })
      },
      openaddYear() {
        this.showAddyear = true
        console.log(this.showAddyear)
      },
      addYear(){
        var _this=this
        var year=this.addYearStr
        PUBLIC.get("Configure.Year.add",{honer_id:_this.honerId,year:year},function(data){
          _this.getYearList(_this.honerId)
        })
      },
      delYear(id){
        var _this=this
        PUBLIC.get("Configure.Year.del",{id:id},function(){
          _this.getYearList(_this.honerId)
        })
      },
      getHonerInfo(name){
        var _this=this
        PUBLIC.get("Configure.Configure.Selone",{type: 'honer',key:name},function(data){
          _this.honerId=data.id
          _this.honerInfo=JSON.parse(data.value)
          _this.getYearList(_this.honerId)
          console.log(_this.honerInfo)
        })
      },
      getBranchOne() {
        PUBLIC.get('Configure.Configure.Selone', {type: 'branch', key: this.key}, (data) => {
          this.id = data.id
          var newData = JSON.parse(data.value ? data.value : '{}')
          this.datas = newData
          this.regionName = newData.name
          this.oldregionName = newData.name
          this.boss = newData.boss
          this.phone = newData.phone
          this.mid = newData.mid
          this.oldMid = newData.mid
          this.percent = newData.percent
          this.branchOld = data.key
          console.log(this.datas)
          this.region = newData.region
          this.checkedAuthorize = newData.authorize
          console.log(this.checkedAuthorize)
        })
      },
      edit(row) {
        this.key = row.name
        this.$router.push({name: 'branchEdit', params: {'key': this.key}})
      },
      getRegionList() {
        PUBLIC.get("Configure.Configure.Selone", {type: "quyuliebiao", key: "quyuliebiao"}, (data) => {
          console.log(JSON.parse(data.value))
          this.options = JSON.parse(data.value)
        })
      },
      saveEdit() {
        // this.datas.region = this.region
        var _this = this
        var teacherList=[]
        var errList=""
        for(var n=0;n<_this.inputs.length;n++){
          if(_this.teachersDict[_this.inputs[n].name]!=undefined){
            teacherList.push(_this.teachersDict[_this.inputs[n].name])
          }else{
            // errList+=_this.inputs[n].name+","
            teacherList.push(_this.inputs[n].name)
          }
        }

        if(errList!=""){
          PUBLIC.toa("包含有不存在的教师:"+errList)
          return
        }
        var editnum=0
        for(var n=0;n<teacherList.length;n++){
          editnum++
          (function(i){
            PUBLIC.get("Configure.Honer.add",{teacher_id:teacherList[i],honer_id:_this.honerId,year:_this.editYear},function(data){
              editnum--
              if(editnum==0){
                PUBLIC.toa("授予荣誉证书完毕",1)
                _this.shouAdd=!_this.shouAdd
                // _this.loadTeachers()
                _this.getHonerInfo(_this.key)
              }
            })
          })(n)
        }
      },
      quit() {
        this.$router.push({name: '分会管理', query: { 'page': this.page}})
      }
    },
    mounted() {
      this.page = this.$route.params.page
      this.key = this.$route.params.key
      this.key=this.$route.query.key
      console.log(this)
      this.loadTeachers()
      this.getHonerInfo(this.key)
      this.getRegionList()
      DATAC.setConf(this)
    },
    watch: {
      region() {
        console.log(this.region)
      },
      datas() {
        console.log(this.datas)
      },
      inputs() {
        console.log(this.inputs)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .honerGive {
    padding: 60px 120px;
    min-width: 1350px;
    .intro{
      position: relative;
      padding: 0 4%;
      .addYear{
        position: absolute;
        bottom: -40px;
        left: 150px;
        color: #169BD5;
        font-size: 14px;
      }
      img{
        float: left;
        width: 300px;
        height: 170px;
      }
      .text{
        padding-left: 20px;
        width: 70%;
        min-width: 500px;
        height: 170px;
        /*display: inline-block;*/
        .title{
          font-weight: bold;
          font-size: 18px;
          padding: 10px 0 25px;
        }
        .innerText{
          vertical-align: bottom;
          display: inline-block;
        }
      }
    }
    .honerWall{
      margin-top: 100px;
      .block{
        float: left;
        width: 440px;
        padding: 20px;
        >p{
          font-weight: bold;
          font-size: 18px;
          text-align: center;
          position: relative;
          margin-bottom: 20px;
          >span{
            position: absolute;
            right: 94px;
            bottom: 0;
            font-size: 12px;
            color: #169BD5;
            // float: left;
          }
          .delTeacher{
            position: absolute;
            right: 30px;
            bottom: 0;
          }
        }
        .innerBlock{
          >span{
            width: 80px;
            margin: 8px 10px;
          }
        }
      }
    }
    .addAdmin,.addYears{
      z-index: 100;
      font-size: 14px;
      background-color: #fff;

      h3{
        background-color: #E4E4E4;
        padding: 15px;
        .fa{
          float: right;
          font-size: 18px;
          padding: 0 10px;
        }
        .fa:hover{
          color: #518BBD;
        }
      }
    }
    .addAdmin,.addYears{
      width: 700px;
      height: 400px;
      margin-left: -350px;
      position: fixed;
      top: 20%;
      left: 50%;
      .inner{
        padding:36px 16px;
        p{
          padding-bottom: 30px;
          .el-input--medium{
            width: 150px;
            margin-right: 5px;
            margin-top: 20px;
          }
          .el-input--medium:nth-of-type(3n+1){
            margin-left: 70px;
          }
          .el-input--medium:first-of-type{
            margin-left: 0px;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          >button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          >button{
            width: 120px;
            margin-left: 135px;
          }
        }
      }
    }
    .addYears{
      width: 500px;
      height: 300px;
      .inner {
        p:last-of-type {
          > button{
            margin-left: 80px;
          }
        }
      }
    }
  }

</style>
