<template>
  <div class='app-container'>
    <div class='memberHead'>
      <p class='firstLine'><span></span>
        <!--<span class='phoneNum'>认证状态：<selectKuang :selectData="activateStatus" @value="activateValue"></selectKuang></span><span class='overTime'>到期时间:<timeBox @value='endTime'></timeBox></span>-->
      </p>
      <p><span class='buttons'>
        <el-button type='primary'>批量导入</el-button>
        <el-button type='success' @click="chufa">批量导入</el-button><input id="upload" ref="upload" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  style="display: none"/>
        <router-link to="/member/organi-entry"><el-button type='warning'>添加机构</el-button></router-link></span>
        <span class="fr">审核状态：<selectKuang :selectData="activateStatus" @value="activateValue"></selectKuang><searchBox @searchKey='searchKey' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref='multipleTable'
      :data='tableData3'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <!--<el-table-column-->
      <!--type='selection'-->
      <!--width='55'>-->
      <!--</el-table-column>-->
      <el-table-column
        prop='id'
        label='ID'
        width='150'>
        <template slot-scope='scope'>{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop='company_name'
        label='园所名称'>
      </el-table-column>
      <el-table-column
        prop='company_jc'
        label='园所简称'>
      </el-table-column>
      <el-table-column
        prop='company_uid'
        label='创建者ID'>
      </el-table-column>
      <el-table-column
        prop='company_user'
        label='负责人'
        width='150'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='company_phone'
        label='联系方式'>
        <template slot-scope='scope'>{{ scope.row.company_phone }}</template>
      </el-table-column>
      <el-table-column
        prop='company_statu'
        label='认证状态'
        width='150'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.company_statu == 0">未认证</span>
          <span class="innerText" v-else-if="scope.row.company_statu == 1">已认证</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop='act'
        label='操作'
        show-overflow-tooltip>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click="handleClick(scope.row)">查看</el-button>
          <el-button type='text' size='small' @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationBox :data='dataLength' :page='page' :pageSize='pagesize' @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
import { searchBox, selectKuang, timeBox, paginationBox, oneTime } from '../../components/index'

export default {
  name: 'allMember',
  components: {
    searchBox,
    selectKuang,
    timeBox,
    paginationBox,
    oneTime
  },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      page: 1,
      dataLength: '',
      tableData3: [],
      videoClassDict:{},
      videoClass:[],
      searchSelect: [
         {
          value: 'name',
          label: '机构名称'
        }, {
          value: 'username',
          label: '负责人'
        }, {
          value: 'code',
          label: '机构邀请码'
        }, {
          value: 'user_phone',
          label: '手机号'
        }],
      activateStatus: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '已认证'
        },
        {
          value: 0,
          label: '未认证'
        }
      ],
      etStatus: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '已验证'
        },
        {
          value: -1,
          label: '未验证'
        },
      ],
      userStatus: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 318,
          label: 'VIP用户'
        },
        {
          value: 317,
          label: '机构用户'
        },
        {
          value: 316,
          label: '特权用户'
        }
      ],
      selectArg: {},
      multipleSelection: [],
      keyword: ''
    }
  },
  created() {
    console.log(this.$route.query.page)
    if(this.$route.query.page != undefined) {
      this.page = this.$route.query.page
    }
  },
  methods: {
    chufa() {
      this.$refs.upload.click()
    },
    upload(){
      this.$refs.importfxx.value = null;
    },
    importfxx(objs) {
      console.log(objs)
      let _this = this;
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for(var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require('xlsx');
          if(rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
              type: 'base64'
            });
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
          this.da = [...outdata]
          let arr = []
          this.da.map(v => {
            console.log(v)
            let obj = {}
            obj.pro = v['省']
            obj.city = v['市']
            obj.county = v['区']
            obj.name = v['园所名称']
            obj.user_phone = v['手机号']
            obj.username = v['负责人']
            // obj.name = v['区']
            obj.auth_dir = v['授权类目']
            obj.contract_num = v['合同编号']
            obj.subaccount_num = v['子账号个数']
            obj.end_time = v['到期时间']==undefined?"":v['到期时间']
            arr.push(obj)
          })
          console.log(arr)
          var getLen=0
          for(var i in arr) {
            getLen+=1
            PUBLIC.get("User.Mechanism.import",arr[i], function(data){
              console.log(data)
              getLen-=1
              if(getLen<=0){
                _this.getUserList()
              }
            })
          }

        }
        reader.readAsArrayBuffer(f);
      }
      if(rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }

    },
    handleCurrentChange(val) {
      this.page = val
      console.log(this.page)
      this.getUserList(this.keyword)
    },
    //获取总数
    getTotal() {
      // PUBLIC.get('User.User.usercount', data => {
      //   // this.dataLength = data
      // })
    },
    handleClick(row) {
      var _this = this
      console.log(row.id)
      _this.$router.push({ name: '机构详情', params: { id: row.id, page: this.page,type: 1 }})
    },
    edit(msg) {
      localStorage.setItem("pageInfo",JSON.stringify(this.keyword))
      this.$router.push({ name: '机构编辑', params: { id: msg.company_tid, page: this.page }})
    },
    getUserList(keyword) {
      this.keyword = keyword
      var _this=this
      var args = { page: this.page,type: 0 }
      for(var k in keyword){
        args[k]=keyword[k]
      }
      keyword==keyword!=undefined ? keyword: ''
      console.log(args)
      for(var k in args){
        if(k===undefined || args[k]===undefined || args[k]===""){
          delete args[k]
        }
      }
      PUBLIC.get('User.Company.sellist', args, function(data) {
        console.log(data)
        _this.tableData3 = data

      },function(data){
        // console.log(data)
        _this.dataLength=parseInt(data.data.num)
        _this.pagesize=parseInt(data.data.pagenum)
        console.log(data.data.num)
      })
    },
    getUserGroup(id, relData, index, newData) {
      var _this = this
      PUBLIC.get('Team.User.TeamList', { uid : id }, function(data) {
        newData[index]['userGroup'] = data[0]['type']
        newData[index]['groupEndTime'] = data[0]['end_time']
        _this.tableData3 = JSON.parse(JSON.stringify(newData))
        console.log(relData[index])
      })
    },
    searchKey(e) {
      console.log(11111111111)
      console.log(e)
      this.page=1
      if(["username","name","code"].indexOf(e[0])){
        delete this.selectArg["username"]
        delete this.selectArg["name"]
        delete this.selectArg["code"]
      }

      var op = this.selectArg
      op[e[0]] = e[1]
      this.selectArg=op
      this.getUserList(op)
    },
    activateValue(e) {
      this.page=1
      console.log(e)
      this.selectArg['company_statu'] = e
      let ee = this.selectArg
      this.searchKey(ee)
    },
    endTime(e) {
      this.page=1
      this.selectArg['star_time'] = e[0]
      this.selectArg['end_time'] = e[1]
      let ee = this.selectArg
      this.searchKey(ee)
    }
  },
  mounted() {
    console.log(typeof (localStorage.pageInfo))
    if(localStorage.pageInfo !== '' && localStorage.pageInfo !== undefined && localStorage.pageInfo !== 'undefined') {
      console.log(localStorage.pageInfo)
      this.getUserList(JSON.parse(localStorage.pageInfo))
      localStorage.removeItem('pageInfo')
    }else{
      this.getUserList()
    }
    this.getTotal()
    DATAC.setConf(this)
    var tmp={}
    console.log(this.videoClass)
    for(var n=0;n<this.videoClass.length;n++){
      tmp[this.videoClass[n]["value"]]=this.videoClass[n]["label"]
    }
    console.log(tmp)
    this.videoClassDict=tmp
    console.log("11111111111111111111111111111111111111111111")
    console.log(this.videoClassDict)
  },
  watch:{
    videoClass:function(){
      for(var n=0;n<this.videoClass.length;n++){
      tmp[this.videoClass[n]["value"]]=this.videoClass[n]["label"]
    }
    console.log(tmp)
    this.videoClassDict=tmp
    console.log("11111111111111111111111111111111111111111111")
    console.log(this.videoClassDict)
    }
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
        .fr{
          .selectKuang{
            .el-select{
              width: 150px;
            }
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
<!--{"Id":"77054","level":"1","username":"tel_15882376298","telphone":"15882376298","rel_name":"","rel_code":"",-->
<!--"phone_status":"1","rel_status":"0","name":"grXeyaFAHvS7","header_img":null,"user_status":"1","status_time":null,-->
<!--"statu":"1","reg_time":"2018-11-21 11:53:10","person_region":null,"person_jj":null,"person_zs":null,"person_xl":null,"token":"3ud9G3wM5UOorOJ6"}-->
