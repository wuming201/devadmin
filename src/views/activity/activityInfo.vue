<template>
  <div class="activityInfo">
    <div class="memberInfo">
      <p><span><span class="title">活动ID:{{actInfo.id}}</span><span class="innerText" >{{actInfo.id}}</span></span></p>
      <p><span><span class="title">活动标题:</span><span class="innerText">{{actInfo.title}}</span></span><span><span class="title">活动类型:</span><span class="innerText">{{ actInfo.type }}</span></span></p>
      <p><span class="mr0"><span class="title">活动海报:</span><img :src="actInfo.img?actInfo.img:'../../assets/pic.png'" alt=""></span></p>
      <p><span class="mr0"> <span class="title">活动说明:</span><span class="longText">{{actInfo.explain}}</span></span></p>
      <p><span class="mr0"><span class="title">活动组别:</span>
          <el-table
        ref="multipleTable"
        :data="actGroup"
        tooltip-effect="dark"
        border
        style=" backgroundColor: #f5fafe ; width:971px"
        @selection-change="handleSelectionChange">
          <el-table-column
            prop="aid"
            width="250"
            label="名称">
            <template slot-scope="scope">{{scope.row.aid }}</template>
          </el-table-column>
          <el-table-column
            width="380"
            label="活动时间">
            <template slot-scope="scope">{{ scope.row.starTime }} 至 {{scope.row.endTime}}</template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="活动费用"
            width="180"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.price }}</template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="报名截止"
            width="160">
            <template slot-scope="scope">{{ scope.row.regEndTime }}</template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="报名文件"
            width="160">
            <template slot-scope="scope"><a :href="scope.row.reg_file" target="_blank">下载文件</a></template>
          </el-table-column>
        </el-table>
        </span>
      </p>
      <!-- <span><span class="title">报名表:</span><span class="innerText"><a :href="actGroup[0].reg_file" target="_blank">下载文件</a></span></span> -->
      <p><span><span class="title">投递邮箱:</span><span class="innerText">{{ actGroup[0].address }}</span></span></p>
      <p><span><span class="title">活动详情:</span><span  v-html="actInfo.body"></span></span></p>
      <p><el-button type="info" @click="quit">取消</el-button></p>
      <!-- <el-button type="success" @click="passIt">通过</el-button><el-button type="danger" @click="rejectIt">拒绝</el-button> -->
    </div>
    <div class="pass" v-show="showPass">
      <h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人：  wwww</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入拒绝原因！" v-model="desc1">
          </el-input>
        </p>
        <p><el-button type="success" @click="actDo(2)" >提交</el-button><el-button type="info" @click="passIt">取消</el-button></p>
      </div>
    </div>
    <div class="reject" v-show="showReject">
      <h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>
      <div class="inner">
        <p>&emsp;处理人：  wwww</p>
        <p>处理备注：
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入拒绝原因！" v-model="desc1">
          </el-input>
        </p>
        <p><el-button type="danger" @click="actDo(1)" >拒绝</el-button><el-button type="info" @click="rejectIt">取消</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { selectKuang } from '../../components/index'

  export default {
    name: 'activityInfo',
    components: {
      selectKuang
    },
    data() {
      return {
        actId: 0,
        showPass: false,
        showReject: false,
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
        actInfo: [],
        actGroup: [],
        desc1:""
      }
    },
    methods: {
      getActInfo() {
        var _this = this
        PUBLIC.get('Active.actives.message', { id: this.actId }, function(data) {
          console.log(data)
          var newData = []
          var demo = {
            id: 'id',
            type: 'type',
            title: 'title',
            explain: 'explain',
            img:"img",
            body:"body"
          }
          newData = PUBLIC.formatObj(demo, data)
          _this.actInfo = newData
          console.log(_this.actInfo)
        })
      },
      getActGroup() {
        var _this = this
        console.log("活动组")
        PUBLIC.get('Active.actives.group', { aid: this.actId }, function(data) {
          var demo = {
            aid: 'aid',
            starTime: 'start_time',
            endTime: 'end_time',
            regEndTime: 'reg_end_time',
            reg_file: 'reg_file',
            signTime: 'time',
            address: 'address',
            com_id:"commodity_id"
          }
          var newData = PUBLIC.formatObj(demo, data)
          _this.actGroup = newData
          for(var n=0;n<newData.length;n++){
            _this.getPrice(n,newData[n].com_id)
          }
          console.log(_this.actGroup)
        })
      },
      getPrice:function(i,com_id){
        var _this=this
        PUBLIC.get("Commodity.commoditys.message",{id:com_id},function(data){
          console.log(data)
          _this.actGroup[i].price=data.money
          _this.actGroup=JSON.parse(JSON.stringify(_this.actGroup))
        })
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
      passIt() {
        console.log(this.showPass)
        this.showPass = !this.showPass
      },
      rejectIt() {
        this.showReject = !this.showReject
      },
      actDo:function(status){
        var _this=this
        PUBLIC.get("Active.actives.auditApp",{id:this.actId,pay_status:status,des:this.desc1},function(data){
          _this.$router.go(-1)
        })
      },
      quit:function(){
         this.$router.go(-1)
      }
    },
    mounted() {
      
      this.actId=this.$route.params.id
      // console.log(this.id)
      // this.getInfo()
  
      this.getActInfo()
      this.getActGroup()
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
          border: 1px solid transparent;
          position: relative;
          .longText{
            position: absolute;
            top: 0px;
            left: 80px;

          }
        }
        span{
          display: inline-block;
          span{
            display: inline-block;
          }
          .title{
            vertical-align: top;
            width: 80px;
            text-align: right;
            padding-right: 10px;
          }
          img{
            height: 170px;
          }
          .innerText{
            width: 200px;
          }
          .longText{
            width: 80%;
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 150px;
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
        padding-top: 60px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }
    .reject,.pass{
      z-index: 100;
      width: 500px;
      height: 400px;
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
          .el-textarea{
            vertical-align: top;
            width: 300px;
            display: inline-block;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }
    .reject {
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:red;

      }
    }
  }

</style>
