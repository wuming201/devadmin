<template>
  <div class='app-container'>
    <div class='memberHead'>
      <p class='firstLine'><span class='phoneNum'>上架状态：<selectKuang v-bind:selectData='rankStatusSelect' :value0="value0"  @value='upValue'></selectKuang></span>
        <span class='phoneNum'>所属剧集：<selectKuang v-bind:selectData='BIGclassList'  @value='classValue'></selectKuang></span></p>
      <p><span class='buttons'><el-button type='danger' @click='addRinking'>添加剧集</el-button></span>
      <!-- <router-link to='/member/all-member/add-member'><el-button type='warning'>批量下载</el-button></router-link><el-button type='success'>批量上架</el-button> -->
        <span class='record'><el-input v-model='searchWord' placeholder='请输入内容'></el-input>
    <el-button type='primary' @click='searchBox(searchWord)'>搜索</el-button></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='tableData3'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='id'
        label='ID'
        width='150'>
        <template slot-scope='scope'>{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop='title'
        label='剧集名称'>
      </el-table-column>
      <el-table-column
        prop='img'
        label='封面'
        width='250'
        show-overflow-tooltip>
        <template  slot-scope='scope'><img v-bind:src='scope.row.img' width='150' height='100'/></template>
      </el-table-column>
      <el-table-column
        prop='class'
        label='所属分类'
        width='150'>
        <template slot-scope='scope'>{{ scope.row.className }}</template>
      </el-table-column>
      <el-table-column
        prop='desc'
        label='剧集简介'>
      </el-table-column>
      <el-table-column
        prop='num'
        label='视频个数'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='on_status'
        label='上架状态'
        width='150'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.on_status === '-1'">未上架</span>
          <span class="innerText" v-else-if="scope.row.on_status === '1'">已上架</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button  v-if="scope.row.on_status==1" @click="downIt(scope.row)" type="text" size="small">下架</el-button>
          <el-button v-else @click="upIt(scope.row)" type="text" size="small">上架</el-button>

          <el-button type="text" size="small" @click="changeRinking(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delDrama(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <paginationBox :data='dataLength' :pageSize="pageSize" @getCurrent='handleCurrentChange'></paginationBox>
    <div class="addRanking"  v-show="rankAdd" >
      <h3>添加剧集 <i class="fa fa-close" @click="addRinking"></i></h3>
      <div class="inner">
        <p>视频分类：
          <selectKuang v-bind:selectData="classList" @value="setNewClass"></selectKuang>
        </p>
        <p>剧集名称：<el-input v-model="newTitle" placeholder="请输入剧集名称"></el-input></p>
        <p>剧集简介：<el-input v-model="newDesc" placeholder="请输入剧集简介"></el-input></p>
        <p>视频图标：<img v-bind:src="newImg" alt=""><el-button type="primary" @click="upImg('newImg')">上传图片</el-button></p>
        <p><el-button type="success" @click="createDrama" >提交</el-button><el-button type="info" @click="closeAdd">取消</el-button></p>
        <el-input type="file" id="upimgs" v-on:change="upFile" hidden></el-input>
      </div>
    </div>
    <div class="changeRanking" v-show="rankChange">
      <h3>信息编辑 <i class="fa fa-close" @click="closeEdit"></i></h3>
      <div class="inner">
        <p>视频分类：
          <el-select v-model="changeClass" value-key="value" @change="changeClassId">
            <el-option
              v-for="item in classList"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </p>
        <p>剧集名称：<el-input v-model="changeTitle" placeholder="请输入剧集名称"></el-input></p>
        <p>剧集简介：<el-input v-model="changeDesc" placeholder="请输入剧集简介"></el-input></p>
        <!-- <p>视频角标：<img src="" alt=""><el-button type="primary">上传图片</el-button></p> -->
        <p>视频图标：<img v-bind:src="changeImg" alt=""><el-button type="primary" @click="upImg('changeImg')">替换图片</el-button></p>
        <p><el-button type="success" @click="changeDrama">提交</el-button><el-button type="info" @click="closeEdit">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { searchOne, selectKuang, timeBox, paginationBox, searchBox } from '../../components/index'

  export default {
    name: 'allMember',
    components: {
      searchBox,
      selectKuang,
      timeBox,
      paginationBox,
      searchOne
    },
    data() {
      return {
        on_status: '',
        list: null,
        listLoading: true,
        downloadLoading: false,
        filename: '',
        page: 1,
        dataLength: '',
        rankAdd: false,
        rankChange: false,
        tableData3: [],
        multipleSelection: [],
        classList:[],
        BIGclassList: [],
        rankStatus:"",
        classSelectD:"",
        searchWord:"",
        newImg:"",
        newTitle:"",
        newDesc: '',
        newClass:"",
        changeImg:"",
        changeTitle:"",
        changeClass:"",
        changeId:"",
        changeDesc: '',
        selectArg: {},
        dataLength:0,
        pageSize:0,
        rankStatusSelect:[
          {
            value:"",
            label:"全部"
          },
          {
            value:"-1",
            label:"已下架"
          },
          {
            value:"1",
            label:"已上架"
          }
        ],
        value0: '',  //默认上架状态
        value1: '',  //默认所属剧集
        videoClass:[],
        classIsChange: false,
        oldClassId: ''
      }
    },
    created() {
      DATAC.setConf(this)
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getRankList()
      },
      //获取总数
      getTotal() {
        // PUBLIC.get('User.User.usercount', data => {
        //   this.dataLength = data
        // })
      },
      addRinking() {
        this.rankAdd = !this.rankAdd
      },
      upIt(row) {
        console.log(row)
        row.on_status = 1
        PUBLIC.get('Video.drama.updrama', row, (data) => {
          console.log(data)
          if( data === true) {
            this.$message({message: '上架成功！',
              type: 'success'})

          }
        })
      },
      downIt(row) {
        console.log(row)
        row.on_status = -1
        PUBLIC.get('Video.drama.updrama', row, (data) => {
          console.log(data)
          if( data === true) {
            this.$message({message: '下架成功！',
              type: 'success'})
          }
        })
      },
      changeClassId() {
        this.classIsChange = true
      },
      changeRinking(e) {
        // this.classList =
        this.oldClassId = e.class
        console.log(e)
        this.changeClass = e.className
        this.rankChange = !this.rankChange
        this.changeId=e.id
        this.changeTitle=e.title
        this.changeImg = e.img
        this.changeDesc = e.desc
        this.on_status = e.on_status
        console.log(this.changeClass)
      },
      classSelect(e) {
        console.log(e)
        this.classSelectD = e
      },
      //筛选
      searchKey(e) {
        console.log(e)
        var op = this.selectArg
        op[e[0]] = e[1]
        console.log(op)
        this.getRankList(op)
      },
      upValue(e) {
        this.selectArg['on_status'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      classValue(e) {
        this.selectArg['class_id'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      searchBox(e){
        var op = {}
        op['keyword'] = e
        console.log(op)
        this.getRankList(op)
      },
      getClassList() {
        var _this = this
        PUBLIC.get('Video.drama.classlist', function(data){
          // console.log(data)
          var demo={
            value:"id",
            label:"class"
          }
          var newData=PUBLIC.formatObj(demo,data)
          let sdata = PUBLIC.formatObj(demo,data)
          newData.push({value:"",label:"全部"})
          _this.classList = JSON.parse(JSON.stringify(sdata))
          _this.BIGclassList = JSON.parse(JSON.stringify(newData))
          _this.getRankList()
        })
      },
      getRankList(keyword){
        console.log(keyword)
        var _this = this
        var args = { page: this.page }
        console.log(this)
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get("Video.drama.showdrama",args,function(data){
          console.log(data)
          var demo={
            id:"id",
            title:"title",
            class:"class",
            img:"img",
            num:"vNum",
            on_status:"on_status",
            desc: 'info'
          }
          var newData = PUBLIC.formatObj(demo, data)
          // console.log(newData)
          // console.log(_this.videoClass)
          for (var n = 0; n < newData.length; n++) {
            var classId = newData[n].class
            for (var i = 0; i < _this.videoClass.length; i++) {
              if (_this.videoClass[i].value === classId) {
                newData[n]['className'] = _this.videoClass[i].label
                break
              }
            }
          }
          _this.tableData3 = newData
          // console.log( _this.tableData3 )
        },function(data){
          _this.dataLength=parseInt(data.data.num)
          _this.pageSize=parseInt(data.data.pagenum)
        })
      },
      upImg(tab){
        console.log(tab)
        this.upFileFor=tab
        document.getElementById("upimgs").click();
      },
      upFile(){
        var _this=this
        var tab=this.upFileFor
        console.log("触发上传")
        PUBLIC.postFile("upimgs",function(url){
          _this[tab]=url
        })
      },
      setNewClass:function(e){
        this.newClass=e
        console.log(e)
      },
      createDrama:function() {
        var _this=this
        PUBLIC.get("Video.drama.adddrama",{title:this.newTitle,img:this.newImg,on_status:1,info: this.newDesc},function(data){
          console.log(data)
          PUBLIC.get("Video.drama.uplistdrama",{class_id:_this.newClass,drama_id:data},function(data){
            _this.getRankList()
            _this.rankAdd=!_this.rankAdd
          })
        })
      },
      changeDrama:function(){
        var _this=this
        PUBLIC.get("Video.drama.updrama",{id:this.changeId,title:this.changeTitle,img:this.changeImg,on_status: this.on_status, info: this.changeDesc},function(data){
          console.log(data)
          if(_this.classIsChange == true) {
            console.log(_this.changeClass,_this.changeClass.value)
            PUBLIC.get("Video.drama.uplistdrama",{class_id:_this.changeClass.value, drama_id:_this.changeId,status:1,type:"update"},function(data){
              _this.classIsChange = false
              console.log(data)
              _this.getRankList()
              _this.rankChange=!_this.rankChange
            })
          }else{
            console.log(_this.oldClassId)
            PUBLIC.get("Video.drama.uplistdrama",{class_id:_this.oldClassId,drama_id:_this.changeId,status:1,type:"update"},function(data){
              console.log(data)
              _this.getRankList()
              _this.rankChange=!_this.rankChange
            })
          }
        })
      },
      closeEdit(){
        this.rankChange=!this.rankChange
      },
      closeAdd(){
        this.rankAdd=!this.rankAdd
      },
      delDrama:function(id){
        var _this=this
        this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          PUBLIC.get("Video.drama.dedrams",{id:id,statu:-1},function(data){},function (dataa) {
            console.log(dataa.data.ret)
            if(dataa.data.ret === 405) {
              _this.$alert('剧集下还包含了视频,不可删除!', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    mounted() {
      this.getClassList()
      this.getRankList()
      this.getTotal()
    }
  }
</script>
<style rel='stylesheet/scss' lang='scss' >
  .app-container{
    color: #333333;
    .memberHead{
      height: 150px;
      padding: 0;
      p{
        padding-top: 10px;
        line-height: 65px;
        font-size: 14px;
        .buttons{
          .el-button{
            margin: 0;
            border-radius: 0;
          }
        }
        .record{
          float: right;
          .el-input{
            width: 240px;
          }
        }
        .searchBox{
          display: inline-block;
          float: right;
        }
      }
      .firstLine{
        >span{
          padding-right: 20px;
          .selectKuang{
            width: 120px;
          }
          .el-input{
            width: 120px;
          }
        }
        .regTime{
          margin-right: 5%;
          .timeBox{
            display: inline-block;
          }
        }
      }
    }
    .el-table{
      .warning-row {
        background: #fff5f5;
      }
      .waiting{
        background-color: #f2ffff;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .el-pagination{
      padding-top: 20px;
    }
    .addRanking,.changeRanking{
      z-index: 100;
      width: 500px;
      height: 450px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -250px;
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
      .inner{
        padding:36px 16px;
        p{
          padding-bottom: 30px;
          .el-input--medium{
            width: 80%;
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
            margin-left: 75px;
          }
        }
      }
    }
  }

</style>
