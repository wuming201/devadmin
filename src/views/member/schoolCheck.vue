<template>
  <div class="app-container">
    <div class="memberHead">
      <p class="firstLine"><span class="phoneNum">审核状态：<selectKuang :selectData='statuData'
                                                                    @value="checkValue"></selectKuang></span><span
        class="phoneNum">处理人：<selectKuang :selectData='adminStatus'></selectKuang></span><span class="overTime">提交日期:<timeBox @value="searchTime"></timeBox></span>
      </p>
      <p><span class="buttons"><el-button type="primary">全选</el-button>
        <!--<el-button type="danger">批量拒绝</el-button><el-button type="success">批量审核</el-button>-->
      </span>
        <searchBox :searchSelect="selectData" @searchKey='searchKey'></searchBox>
      </p>
    </div>
    <el-table
      ref="multipleTable"
      :data="checkList"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="shenq_name"
        label="申请人"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="company_name"
        label="单位名称"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="company_user"
        label="负责人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="company_mall"
        label="联系电话"
        width="150">
      </el-table-column>
      <el-table-column
        prop="user_tjtime"
        label="提交时间"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="user_statu"
        label="审核状态"
        width="150">
        <template slot-scope="scope">
          <span class="innerText" v-if="scope.row.user_statu == 0">审核中</span>
          <span class="innerText" v-else-if="scope.row.user_statu == -1">审核失败</span>
          <span class="innerText" v-else-if="scope.row.user_statu == 2">已撤回</span>
          <span class="innerText" v-else-if="scope.row.user_statu == 1">审核成功</span>
          <span class="innerText" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="处理人"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="user_time"
        label="处理时间">
      </el-table-column>
      <el-table-column
        prop="user_statu"
        label="操作"
        width="150"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.type!='ls'" type="text" size="small" @click="checkIt(scope.row)">查看</el-button>

          <el-button type="text" size="small" v-if="scope.row.user_statu == 0"
                     @click="examIt(scope.row)">审核
          </el-button>
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
        checkList: [],
        page: 1,
        pagesize: 40,
        dataLength: '',
        multipleSelection: [],
        selectArg: {},
        adminStatus: [],
        selectData: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 'shenq_uid',
            label: 'uid'
          },
          {
            value: 'company_mall',
            label: '手机号'
          }

        ],
        statuData: [
          {
            label: "审核中",
            value: "0"
          }, {
            label: "审核成功",
            value: "1"
          }, {
            label: "审核失败",
            value: "-1"
          }, {
            value: '2',
            label: '已撤回'
          }
        ],
        checkStatus: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '已通过'
          }, {
            value: '-1',
            label: '未通过'
          }, {
            value: '0',
            label: '未审核'
          }
        ]
      }
    },
    created() {
      console.log(this.$route.query.page)
      if (this.$route.query.page != undefined) {
        this.page = this.$route.query.page
      }
    },
    methods: {
      handleSelectionChange() {
      },
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getSchoolList()
      },
      //获取总数
      getTotal() {
        // PUBLIC.get('User.User.usercount', data => {
        //   this.dataLength = data
        // })
      },
      searchKey(e) {
        console.log(e)
        var op = this.selectArg
        op[e[0]] = e[1]
        console.log(op)
        this.getCheckList(op)
      },
      checkValue(e) {
        this.selectArg['user_statu'] = e
        this.getCheckList(this.selectArg)
      },
      searchTime(e) {
        this.page=1
        this.selectArg['start_time'] = e[0]
        this.selectArg['end_time'] = e[1]
        let ee = this.selectArg
        console.log(ee)
        this.getCheckList(this.selectArg)
      },
      checkIt(row) {
        localStorage.setItem("pageInfo", JSON.stringify(this.keyword))
        console.log(row.id)
        this.$router.push({name: '审核详情', params: {id: row.id, page: this.page, check: 1}})
      },
      examIt(row) {
        console.log(row)
        if (row.rec_status === '1' || row.rec_status === '-1') {
          this.$alert(row.name + '为已审核状态，请勿重复审核！', {
            confirmButtonText: '确定'
          })
          return
        }
        this.$router.push({name: '审核园所', params: {id: row.id}})
      },
      getCheckList(keyword) {
        var _this = this
        let args= {page: this.page}
        for (var k in keyword) {
          args[k] = keyword[k]
        }
        keyword == keyword != undefined ? keyword : ''
        console.log(args)
        PUBLIC.get('User.Examine.sellist', args, data => {
          this.checkList = data
        })
      }
    },
    mounted() {
      console.log(localStorage)
      if (localStorage.pageInfo !== '' && localStorage.pageInfo !== undefined && localStorage.pageInfo !== 'undefined') {
        this.getSchoolList(JSON.parse(localStorage.pageInfo))
        localStorage.removeItem('pageInfo')
      } else {
        this.getCheckList()
      }
      this.getTotal()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
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
