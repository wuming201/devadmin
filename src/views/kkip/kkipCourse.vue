<template>
  <div class="kkipCourse">
    <div class="memberHead">
      <p class="firstLine"><span></span></p>
      <p><router-link to="/kkip/kk-course-JYLN"><el-button type="warning" >教育理念</el-button></router-link></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="courses"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="课程封面"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <img class="pics" :src="scope.row.pic" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="操作"
        width="400"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small' @click="toInfo(scope.row)" >查看</el-button>
          <el-button type='text' size='small' @click="toEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<paginationBox :data="points" @getCurrent="handleCurrentChange"></paginationBox>-->
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
        this.$router.push({name:'kk课程详情',params:{key: row.name}})
      },
      toEdit(row) {
        this.$router.push({name:'kk课程编辑',params:{key: row.name}})
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
      this.getCertify()
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" >

  .el-textarea__inner::-webkit-input-placeholder {
    color: red;
  }
  .kkipCourse{
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
        height: 65px;
        >span{
          padding-right: 20px;
          .selectKuang{
            width: 124px;
          }
          .el-input{
            width: 124px;
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
      .pics{
        width: 200px;
        height: 100px;
      }
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
    .addHoner,.changeHoner{
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
        background-color: white;
        p{
          padding-bottom: 30px;
          .el-textarea{
            vertical-align: top;
            width: 350px;
            display: inline-block;
          }
          .el-input{
            width: 200px;
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
  }

</style>
