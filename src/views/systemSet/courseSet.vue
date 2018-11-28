<template>
  <div class = 'app-container'>
    <div class = 'memberHead'>
      <router-link to="/systemSet/course-set/course-add"><el-button type="warning">添加课程</el-button></router-link>
    </div>
    <el-table
      ref='multipleTable'
      :data='courses'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'
      >
      <el-table-column
        prop='id'
        label='ID'
        width='150'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='name'
        label='课程名称'>
      </el-table-column>
      <el-table-column
        prop='pic'
        label='课程封面'>
        <template slot-scope="scope">
          <img class="pics" :src="scope.row.pic" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small' @click="toInfo(scope.row)" >查看</el-button>
          <el-button type='text' size='small' @click="toEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
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
        courses: []
      }
    },
    methods: {
      toInfo(row) {
        this.$router.push({name:'课程详情',params:{key: row.name}})
      },
      toEdit(row) {
        this.$router.push({name:'课程编辑',params:{key: row.name}})
      },
      getCertify() {
        var _this = this
        PUBLIC.get('Configure.Configure.Selfig', { type: 'course' }, function(data) {
          console.log(typeof (data[0].id))
          let newData = []
          for (var n = 0; n < data.length; n++) {
            _this.courses.push(JSON.parse(data[n].value))
          }
          console.log(_this.courses)
        })
      }
    },
    mounted() {
      PUBLIC.get('Configure.Configure.Addconfig', {
        type: 'course',
        key: '123123',
        on_status: 1,
        statu: -1
      }, function () {
      })
      this.getCertify()
    }
  }

</script>
<style rel='stylesheet/scss' lang='scss' >
  .app-container{
    color: #333333;
    .memberHead{
      padding: 0;
      p{
        padding-top: 100px;
      }
    }
    .el-table{
      .pics{
        width: 200px;
        height: 100px;
      }
      .warning-row {
        background: #fff5f5;
      }
      .el-table__row{
        height: 130px;
      }
      .waiting{
        background-color: #f2ffff;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .el-button--text{
      padding: 10px;
    }
    .el-pagination{
      padding-top: 20px;
    }
  }

</style>
