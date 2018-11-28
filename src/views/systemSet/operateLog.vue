<template>
  <div class="operateLog">
    <div class="memberHead">
      <p class="firstLine"><span class="overTime">操作时间:<timeBox></timeBox></span></p>
      <p><span class="buttons"><el-button type="success">批量导出</el-button><searchBox></searchBox></span></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="用户id"
        width="200">
        <template slot-scope="scope">{{ scope.row.uid }}</template>
      </el-table-column>
      <el-table-column
        prop="ipadress"
        label="IP地区"
        width="250">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="登录IP"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="time"
        label="操作时间"
        width="250">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column
        prop="act"
        label="操作内容">
      </el-table-column>

    </el-table>
    <paginationBox :data="dataLength" :pageSize="pageSize" @getCurrent="handleCurrentChange"></paginationBox>
  </div>
</template>

<script>
  import { searchBox, selectKuang, timeBox, paginationBox } from '../../components/index'

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
        currentPage: 1,
        pagesize: 13,
        searchSelect:[{
          value: 'username',
          label: '用户名'
        }, {
          value: 'telphone',
          label: '手机号'
        }, {
          value: 'id',
          label: '用户ID'
        }],
        phoneStatus:[
          {
            value: "",
            label: "全部"
          },
          {
            value: 1,
            label: "已验证"
          },
          {
            value: -1,
            label: "未验证"
          },
        ],
        relStatus:[
          {
            value: "",
            label: "全部"
          },
          {
            value: 1,
            label: "已验证"
          },
          {
            value: -1,
            label: "未验证"
          },
        ],
        userStatus:[
          {
            value: "",
            label: "全部"
          },
          {
            value: 318,
            label: "VIP用户"
          },
          {
            value: 317,
            label: "机构用户"
          },
          {
            value: 316,
            label: "特权用户"
          },
        ],
        tableData3: [],
        multipleSelection: [],
        selectArg:{}
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        console.log(val)
        this.pagesize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getLogList({},val)
      },
      getLogList:function(keyword,page){
        var _this=this
        page=page==undefined?1:page
        var args={page:page}
        for(var k in keyword){
          args[k]=keyword[k]
        }
        keyword==keyword!=undefined?keyword:""
        PUBLIC.get("User.User.Selhistory",args,function(data){
          var newData=[]
          var demo={
            uid:"uid",
            // username:"username",
            // telphone:"telphone",
            time:"time",
            ip:"ip",
            act: 'act',
            ipadress:"ipadress"
          }
          newData=PUBLIC.formatObj(demo,data)
          console.log(newData)
          _this.tableData3=newData
          // for(var i=0;i<newData.length;i++){
          //   _this.getUserGroup(newData[i]["id"],_this.tableData3,i,newData)
          // }

          // console.log(data)
        },function(data){
          _this.dataLength=parseInt(data.data.num)
          _this.pageSize=parseInt(data.data.pagenum)
        })
      },
      getUserGroup:function(id,relData,index,newData){
        var _this=this
        PUBLIC.get("Team.User.TeamList",{uid:id},function(data){
          newData[index]["userGroup"]=318
          newData[index]["groupEndTime"]=data[0]["end_time"]
          _this.tableData3=JSON.parse(JSON.stringify(newData))
          console.log(relData[index])
        })
      },
      searchKey:function(e){
        console.log(11111111111)
        console.log(e)
        var op=this.selectArg
        op[e[0]]=e[1]
        this.getUserList(op)
      },
      phoneValue:function(e){
        this.selectArg["phoneStatus"]=e
        console.log(e)
      },
      relValue:function(e){
        this.selectArg["issming"]=e
        console.log(e)
      },
      userValue:function(e){
        this.selectArg["usertype"]=e
        console.log(e)
      },
      regTime:function(e){
        this.selectArg["regstr_time"]=e[0]
        this.selectArg["regend_time"]=e[1]
        console.log(e)
      },
      endTime:function(e){
        this.selectArg["daoqstr_time"]=e[0]
        this.selectArg["daoqend_time"]=e[1]
        console.log(e)
      },
    },
    mounted:function(){
      this.getLogList()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .operateLog{
    color: #333333;
    padding: 25px;
    padding-bottom: 80px;
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

  }

</style>
