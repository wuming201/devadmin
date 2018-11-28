<template>
  <div class="schoolInfo">
    <div class="memberInfo">
      <p><span><span class="title">分会ID:</span><span class="innerText">{{id}}</span></span><span><span class="title">成立时间:</span><span class="innerText">{{newData.createTime}}</span></span></p>
      <p><span><span class="title">地区:</span><span class="innerText">{{newData.region}}</span></span><span><span class="title">分会名称:</span><span class="innerText">{{newData.name}}</span></span></p>
      <p><span><span class="title">负责人:</span><span class="innerText">{{newData.boss}}</span></span><span><span class="title">联系方式:</span><span class="innerText">{{newData.phone}}</span></span></p>
      <p><span><span class="title">关联会员ID:</span><span class="innerText">{{newData.mid}}</span></span><span><span class="title">分层比例:</span><span class="innerText">{{newData.percent}}</span></span></p>
      <p class="duoxuan"><span><span class="title">历史负责人:</span>
          <el-table
            border
            :data="tableData">
            <el-table-column
              prop="date"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="联系方式"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              width="260"
              label="合作地址">
            </el-table-column>
            <el-table-column
              prop="address"
              width="200"
              label="节约时间">
            </el-table-column>
            <el-table-column
              prop="address"
              width="120"
              label="结算销售额">
            </el-table-column>
            <el-table-column
              prop="address"
              width="120"
              label="结算分成">
            </el-table-column>
          </el-table>
      </span></p>
      <p class="duoxuan"><span><span class="title">区域数据:</span>
          <el-table
            border
            :data="tableData">
            <el-table-column
              prop="date"
              label="区域"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="注册会员"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              width="260"
              label="VIP会员">
            </el-table-column>
            <el-table-column
              prop="address"
              width="200"
              label="合作会员">
            </el-table-column>
            <el-table-column
              prop="address"
              width="120"
              label="消费额">
            </el-table-column>
            <el-table-column
              prop="address"
              width="120"
              label="分成">
            </el-table-column>
          </el-table>
      </span></p>
      <p><el-button type="primary" @click="edit">编辑</el-button><el-button type="info" @click="cancel">取消</el-button></p>
    </div>
  </div>
</template>

<script>
  const authorizesOption = ['ok', '好sss的', '都行', '随sadsadsa便', '同意', '可以', 'oksadsadas', '好的', '都sadadas行', '随dsadasdas便', '同dsad意', '可cccc以']
  export default {
    name: 'kkip分会详情',
    data() {
      return {
        showIt: false,
        multipleSelection: [],
        authorizes: authorizesOption,
        isIndeterminate: true,
        checkedAuthorize: [],
        newData: [],
        id: ''
      }
    },
    methods: {
      edit() {
        console.log(this.key)
        this.$router.push({ name: '分会编辑', params: { key: this.key }})
      },
      cancel() {
        this.$router.go(-1)
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
      getBranchOne() {
        PUBLIC.get('Configure.Configure.Selone', { type: 'branch', key: this.key }, (data) => {
          console.log(data)
          this.id = data.id
          var newData = JSON.parse(data.value)

          this.newData = newData
          console.log(newData)
        })
      },
      // edit(row) {
      //   this.key = row.key
      //   this.$router.push({name:'branchEdit',params:{'key': this.key}})
      // }
    },
    mounted() {
      this.key = this.$route.params.key
      console.log(this.key)
      this.getBranchOne()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .schoolInfo{
    padding: 120px 300px;
    .memberInfo{
      font-size: 14px;
      p {
        text-align: left;
        span{
          display: inline-block;
          .title{
            width: 120px;
            text-align: right;
            padding-right: 10px;
          }
          .el-table{
            margin-left: 60px;
            margin-right: -60px;
          }
          .innerText{
            width: 200px;
          }
          .el-checkbox{
            width: 146px;
            margin-left: 0;
          }
        }
        >span{
          padding-bottom: 55px;
          height: 80px;
          >span{
            width: 80%;
            line-height: 30px;
          }
        }
        >span:first-of-type{
          margin-right: 70px;
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
      .duoxuan{
        >span:first-of-type{
          margin-right: 0;
        }
        .title{
          vertical-align: top;
        }
      }
      p:last-of-type {
        padding-top: 100px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }
  }

</style>
