<template>
  <div class="list">
    <div class="memberHead">
      <p class="firstLine"><span class="phoneNum">视频级别：<selectKuang  :selectData="videoLevelData" @value="selectLevel" ></selectKuang></span><span class="phoneNum">上架状态：<selectKuang :selectData="statusData" @value="selectStatus" ></selectKuang></span>
        <span class="phoneNum">视频分类：<selectKuang :selectData="classData" @value="selectClass" ></selectKuang></span><span class="phoneNum">所属剧集：<selectKuang :selectData="dramaData" @value="selectDrama" ></selectKuang></span>
      </p>
      <p><span class="buttons"><router-link to="/videoManage/video-list/add"><el-button type="danger">添加视频</el-button></router-link></span>
        <span class="record">总记录：<span>1234</span>昨日新增：<span>42</span>今日新增：<span>255</span><searchBox @searchKey='searchBox' v-bind:searchSelect='searchSelect' :holder="'视频名称'" ></searchBox></span></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="视频名称">
      </el-table-column>
      <el-table-column
        prop="img"
        label="视频封面"
        show-overflow-tooltip>
        <template  slot-scope="scope"><img v-bind:src="scope.row.img" width="150" height="100"/></template>
      </el-table-column>
      <el-table-column
        prop="drama_id"
        label="所属剧集"
        width="150">
        <template slot-scope="scope">{{ scope.row.drama_title }}</template>
      </el-table-column>
      <el-table-column
        prop="copyright"
        label="视频版权"
        width="80">
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.copyright === '0'">育视界</span>
          <span class="innerText" v-else-if="scope.row.copyright === '1'">派师圈</span>
          <span class="innerText" v-else-if="scope.row.copyright === '派师圈'">派师圈</span>
          <span class="innerText" v-else-if="scope.row.copyright === '育视界'">育视界</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="视频级别"
        width="80"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.level === '8'">免费</span>
          <span class="innerText" v-else-if="scope.row.level === '9'">VIP</span>
          <span class="innerText" v-else-if="scope.row.level === '10'">机构</span>
          <span class="innerText" v-else-if="scope.row.level === '11'">特权</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="view"
        label="查看次数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="enshrine"
        label="收藏次数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="gradeNum"
        label="评分人次"
        width="80"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="grade"
        label="当前评分"
        width="80">
      </el-table-column>
      <el-table-column
        prop="praise"
        label="点赞"
        width="80">
      </el-table-column>
      <el-table-column
        prop="on_status"
        label="上架状态"
        width="80"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.on_status === '-1'">未上架</span>
          <span class="innerText" v-else-if="scope.row.on_status === '1'">已上架</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="shangjia(scope.row)" type="text" size="small" v-if="scope.row.on_status === '-1'">上架</el-button>
          <el-button @click="xiajia(scope.row)" type="text" size="small" v-if="scope.row.on_status === '1'">下架</el-button>
          <el-button @click="info(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <paginationBox :data='dataLength' :page='page' :pageSize="pageSize" @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
  import { searchBox, selectKuang, timeBox, paginationBox } from '../../../components/index'

  export default {
    name: 'allMember',
    components: {
      searchBox,
      selectKuang,
      timeBox,
      paginationBox
    },
    data() {
      return {
        list: null,
        listLoading: true,
        downloadLoading: false,
        filename: '',
        page: 1,
        dataLength: '',
        videoLevelData: [],
        classData: [],
        pageSize:40,
        dramaData:[],
        searchSelect: [
          {
            value: 'title',
            label: '视频名称'
          }
        ],
        statusData: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 1,
            label: '上架'
          },
          {
            value: -1,
            label: '下架'
          }
        ],
        videoDramaList:{},
        tableData3: [],
        multipleSelection: [],
        selectArg: {},
        keyword: ''
      }
    },
    created() {
      console.log(this.$route)
      if(this.$route.query.page != undefined) {
        this.page = this.$route.query.page
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        console.log('555555555555')
        this.getVideoList(this.keyword)
      },
      //获取总数
      getTotal() {
        PUBLIC.get('User.User.usercount', data => {
          this.dataLength = data
        })
      },
      info(row) {
        localStorage.setItem("pageInfo",JSON.stringify(this.keyword))
        this.$router.push({name:'视频详情',params: { id: row.id, page: this.page }})
      },
      edit(row) {
        localStorage.setItem("pageInfo",JSON.stringify(this.keyword))
        this.$router.push({ name: '视频编辑', params: { id: row.id, page: this.page }})
      },
      xiajia(row){
        var _this=this
        console.log(row)
        // this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
          PUBLIC.get('Video.drama.upvideo', { id: row.id, on_status: -1 }, (data) => {
            console.log(data)
            this.$router.go(0)
          })
        //
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
      },
      shangjia(row){
        var _this=this
        console.log(row)
        // this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        PUBLIC.get('Video.drama.upvideo', { id: row.id, on_status: 1 }, (data) => {
          console.log(data)
          this.$router.go(0)
        })
        //
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });


      },
      getClassList(){
        var _this=this
        PUBLIC.get('Video.drama.classlist',function(data){
          console.log(data)
          var demo={
            value: 'id',
            label: 'class'
          }
          var newData = PUBLIC.formatObj(demo, data)
          // console.log(newData)
          newData.push({ value: '', label: '全部' })
          _this.classData = newData
          console.log(_this.classData)
        })
      },
      getLevelList(){
        var _this=this
        PUBLIC.get('Configure.Configure.Selfig',{type:'videoLevel'},function(data){

          var demo={
            value:'id',
            label:'key',
          }
          var newData=PUBLIC.formatObj(demo,data)
          _this.videoLevelData=newData
          _this.videoLevelData.push({value: '', label: '全部'})
          console.log(_this.videoLevelData)
        })
      },
      getVideoList:function(keyword){
        var _this = this
        this.keyword = keyword
        var args = { page: this.page }
        for (var k in keyword) {
          if(keyword[k] == undefined ){
            return}
            args[k] = keyword[k]
        }
        console.log(args)
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('Video.drama.showvideo', args,function(data){
          console.log(data)
          var newData1 = []
          var demo1 = {
            id: 'id',
            title: 'title',
            author: 'author',
            img: 'img',
            level: 'level',
            on_status: 'on_status',
            desc:"desc",
            drama_id: 'drama_id',
            drama_title: 'drama_title'
          }
          newData1 = PUBLIC.formatObj(demo1,data)
          console.log(newData1)
          for(var i=0;i<newData1.length;i++){
            var tmp=JSON.parse(newData1[i].desc?newData1[i].desc:"{}")
            newData1[i].copyright=tmp["copyright"]
            _this.getDian(newData1,i)
          }
          _this.tableData3=newData1
        },function(data){
          _this.dataLength=parseInt(data.data.num)
          _this.pageSize=parseInt(data.data.pagenum)
          console.log(data)
        })
      },
      getDian:function(fdata,n){
        var _this=this
        PUBLIC.get('Comment.Comment.Selnum',{res_id:fdata[n].id,res_type:'video'},function(data){
          for(var i=0;i<data.length;i++){
            fdata[n][data[i].thing]=parseInt(data[i].value/data[i].num*10)/10
            if(data[i].thing=="grade"){
              fdata[n][data[i].thing]=parseInt(data[i].value/data[i].num*10)/10
              fdata[n]["gradeNum"]=data[i].num
            }else{
              fdata[n][data[i].thing]=data[i].value
            }
             // console.log(data[i])
          }
          _this.tableData3=JSON.parse(JSON.stringify(fdata))
        })
      },
      //筛选
      searchBox(e) {
        console.log(e)
        var op = this.selectArg
        op['key'] = e[0]
        op['search'] = e[1]
        console.log('11111111')
        this.getVideoList(op)
      },
      searchKey(e) {
        this.page = 1
        console.log(e)
        var op = this.selectArg
        for(var i in op) {
          if(op[i] === undefined){
            return
          }
        }
        console.log('2222222222')
        this.getVideoList(op)
      },
      selectLevel(e) {
        this.selectArg['level'] = e
        // this.selectArg['key'] = this.selectArg['search'] = ''
        let ee = this.selectArg
        this.searchKey(ee)
      },
      selectClass(e) {
        this.selectArg['class_id'] = e
        let ee = this.selectArg
        console.log(ee)
        this.searchKey(ee)
        this.getDrama(ee)
      },
      selectStatus(e) {
        if(e === '') {
          e = null
        }
        this.selectArg['on_status'] = e
        // this.selectArg['key'] = this.selectArg['search'] = ''
        let ee = this.selectArg
        this.searchKey(ee)
      },
      getDrama(e) {
        console.log(e)
        PUBLIC.get('Video.drama.showdrama', e, data => {
          console.log(data)
          var dramas={
            value: 'id',
            label: 'title'
          }
          var newDrama = PUBLIC.formatObj(dramas, data)
          // console.log(newData)
          newDrama.push({ value: '', label: '全部' })
          this.dramaData = newDrama
          console.log(this.dramaData)
        })
      },
      selectDrama(e) {
        console.log(e)
        if(e == '') {
          e = ''
        }
        this.selectArg['drama_id'] = e
        console.log(this.selectArg)
        // this.selectArg['key'] = this.selectArg['search'] = ''
        let ee = this.selectArg
        console.log(ee)
        this.searchKey(ee)
      },
      userValue(e) {
        this.selectArg['usertype'] = 1
      }
    },
    mounted() {
      if(localStorage.pageInfo !== '' && localStorage.pageInfo !== undefined && localStorage.pageInfo !== 'undefined'){
        console.log('33333333333')
        this.getVideoList(JSON.parse(localStorage.pageInfo))
        localStorage.removeItem('pageInfo')
      }else{
        this.getTotal()
        console.log('44444444444444444')
        this.getVideoList()
      }
      this.getClassList()
      this.getLevelList()
      this.getDrama()

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
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
          >span{
            color: red;
            padding-right: 20px;
            font-weight: bold;
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

</style>
