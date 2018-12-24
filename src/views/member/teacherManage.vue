<template>
  <div class="app-container">
    <div class="memberHead">
      <p class="firstLine"><span class="phoneNum">电子证书：<selectKuang :selectData="eleCer"
                                                                    @value="eleCerValue"></selectKuang></span>
        <!--<span class="phoneNum">执业登记：<selectKuang :selectData="inJob" @value="jobValue"></selectKuang></span>-->
        <!--<span class="phoneNum">视频制作：<selectKuang :selectData="videoProducing" @value="produceValue"></selectKuang></span>-->
      </p>
      <p><span class="buttons"><el-button type="primary">全选</el-button><router-link to="/member/teacher-manage1"><el-button type="danger">视频制作者</el-button></router-link><el-button
        type="success">批量审核</el-button>
        <!--<router-link to="/member/teacher-add"><el-button type="warning">添加老师</el-button></router-link>-->
      </span>
        <span
          class="record">总记录：<span>{{dataLength}}</span>昨日新增：<span>{{yesterdayAdd}}</span>今日新增：<span>{{todayAdd}}</span><searchBox
          @searchKey='searchLike' @cleanIt='cleanIt' v-bind:searchSelect='searchSelect'></searchBox></span></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="rel_name"
        label="姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="stageName"
        label="公司">
      </el-table-column>
      <el-table-column
        prop="jobnumber"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="证书名称"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.grade === '1'">初级</span>
          <span class="innerText" v-else-if="scope.row.grade === '2'">中级</span>
          <span class="innerText" v-else-if="scope.row.grade === '3'">高级</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="licenceNum"
        label="证书编号"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop="pay_statu"
        label="在职状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <!--<span class="innerText" v-if="scope.row.state==1">在职</span>-->
          <!--<span class="innerText" v-else>离职</span>-->
          <span type="text" size="small" v-if="scope.row.pay_statu == 0" @click="check(scope.row)">未审核</span>
          <span type="text" size="small" v-if="scope.row.pay_statu == 1" @click="check(scope.row)">已通过</span>
          <span type="text" size="small" v-if="scope.row.pay_statu == -1" @click="check(scope.row)">未通过</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="certificates"-->
      <!--label="电子证书">-->
      <!--<template slot-scope="scope">-->
      <!--<img class="miniCer" :src="scope.row.certificates" alt="">-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="phone"
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="info(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" v-if="scope.row.pay_statu == 0 && scope.row.cert_type != '1'" @click="check(scope.row)">审核</el-button>
          <el-button type="text" size="small" v-if="scope.row.pay_statu == 1" @click="check(scope.row)">已通过</el-button>
          <el-button type="text" size="small" v-if="scope.row.pay_statu == -1" @click="check(scope.row)">未通过</el-button>
          <el-button type="text" size="small" v-if="scope.row.state==1"
                     @click="teacherStatus(scope.row.id,0,scope.row)">离职
          </el-button>
          <el-button type="text" size="small" v-else @click="teacherStatus(scope.row.id,1,scope.row)">在职</el-button>
        </template>
      </el-table-column>

    </el-table>
    <paginationBox :data='dataLength' :page='page' @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
  import {searchBox, selectKuang, timeBox, paginationBox} from '../../components/index'

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
        yesterdayAdd: '',
        todayAdd: '',
        tableData3: [],
        selectArg: {},
        eleCer: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '4',
            label: '未申领'
          }, {
            value: '1',
            label: '审核中'
          }, {
            value: '2',
            label: '审核通过'
          }, {
            value: '-1',
            label: '未通过'
          }, {
            value: '3',
            label: '到期'
          }
        ],
        searchSelect: [
          {
            value: 'rel_name',
            label: '老师姓名'
          }, {
            value: 'uid',
            label: '用户ID'
          }, {
            value: 'stageName',
            label: '艺名'
          }, {
            value: 'jobnumber',
            label: '工号'
          }, {
            value: 'licenceNum',
            label: '证书编号'
          }
        ],
        inJob: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '在职'
          },
          {
            value: '0',
            label: '离职'
          }
        ],
        videoProducing: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '参与'
          },
          {
            value: '0',
            label: '不参与'
          }
        ],
        multipleSelection: []
      }
    },
    created() {
      console.log(this.$route.query.page)
      if (this.$route.query.page != undefined) {
        this.page = this.$route.query.page
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getTeacherList()
      },
      //获取总数
      getTotal() {
        PUBLIC.get('User.certificate.dataStatistics', data => {
          console.log(data)
          this.yesterdayAdd = data.b
          this.todayAdd = data.c
          this.dataLength = data.a
        })
      },
      cleanIt() {
        var op = this.selectArg
        op['serach'] = op['like'] = ''
      },
      edit(row) {
        console.log(row)
        // this.$router.push({ name: '教师编辑', query: { id: row.id }})
        this.$router.push({name: '教师编辑', query: {page: this.page, id: row.id}})
      },
      check(row) {
        console.log(row)
        this.$router.push({name: '教师审核', query: {id: row.id}})
      },
      info(row) {
        this.$router.push({name: '教师详情', query: {page: this.page, id: row.id}})
      },
      teacherStatus(id, status, obj) {
        var _this = this
        PUBLIC.get("User.certificate.applyFor", {id: id, state: status}, function (data) {
          console.log(data)
          obj.state = status
        })
      },
      //模糊搜索
      searchLike(e) {
        this.page = 1
        console.log(e)
        var op = this.selectArg
        console.log(op)
        if (e[1] != undefined && e[0] != undefined && e[1] != "") {
          op['serach'] = e[1]
          op['like'] = e[0]
        } else {
          delete op["serach"]
          delete op["like"]
        }

        console.log('aaaaaa')
        console.log(op)
        this.getTeacherList(op)
      },
      searchKey(e) {
        this.page = 1
        console.log(e)
        var op = this.selectArg
        op[e[0]] = e[1]
        this.getTeacherList(op)
      },
      jobValue(e) {
        this.page = 1
        this.selectArg['state'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      eleCerValue(e) {
        this.page = 1
        this.selectArg['pay_statu'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      produceValue(e) {
        this.page = 1
        this.selectArg['videoProducing'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      getTeacherList(keyword) {
        console.log(keyword)
        var _this = this
        var args = {page: this.page}
        for (var k in keyword) {
          if (k == undefined) {
            continue
          }
          if (keyword[k] == undefined || keyword[k] == "") {
            continue
          }
          args[k] = keyword[k]
        }
        keyword == keyword != undefined ? keyword : ''
        PUBLIC.get('User.certificate.certificateList', args, (data) => {
          console.log("收到数据")
          var newData = []
          var demo = {
            id: 'id',
            territory: 'territory',
            jobnumber: 'jobnumber',
            stageName: 'stageName',
            grade: 'grade',
            videoProducing: 'videoProducing',
            certificates: 'mycer',
            licenceNum: 'licenceNum',
            statu: 'statu',
            state: "state",
            uid: 'uid',
            province: 'province',
            pay_statu: 'pay_statu',
            unit: 'unit',
            rel_name: 'rel_name',
            cert_type:'cert_type'
          }
          newData = PUBLIC.formatObj(demo, data)
          if (data.length == 0) {
            console.log("空数据")
            _this.tableData3 = []
          } else {
            console.log("有数据")
            newData = PUBLIC.formatObj(demo,data)

           this.tableData3 = JSON.parse(JSON.stringify(newData))
            console.log(this.tableData3)
            for(let i in this.tableData3) {
              PUBLIC.get('User.Appuser.getsteacher', {name: this.tableData3[i].rel_name}, v=> {
                console.log(v)
              })
            }
          }
        })
      }
    },
    mounted() {
      this.getTeacherList()
      this.getTotal()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .miniCer {
    width: 100px;
    height: 70px;
  }

  .app-container {
    color: #333333;
    .memberHead {
      height: 150px;
      padding: 0;
      p {
        padding-top: 10px;
        line-height: 65px;
        font-size: 14px;
        .buttons {
          .el-button {
            margin: 0;
            border-radius: 0;
          }
        }
        .record {
          float: right;
          > span {
            color: red;
            padding-right: 20px;
            font-weight: bold;
          }
        }
        .searchBox {
          display: inline-block;
          float: right;
        }
      }
      .firstLine {
        > span {
          padding-right: 20px;
          .selectKuang {
            width: 120px;
          }
          .el-input {
            width: 120px;
          }
        }
        .regTime {
          margin-right: 5%;
          .timeBox {
            display: inline-block;
          }
        }
      }
    }
    .el-table {
      .warning-row {
        background: #fff5f5;
      }
      .waiting {
        background-color: #f2ffff;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .el-pagination {
      padding-top: 20px;
    }

  }

</style>
