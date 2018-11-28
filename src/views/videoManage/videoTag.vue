<template>
  <div class="app-container">
    <div class="memberHead">
      <p>
        <!--<el-button type="primary" @click="openChangeTag">类型修改</el-button>-->
        <el-button type="warning"  @click="addMember">添加标签</el-button></p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      border
      style=" backgroundColor: #f5fafe"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="标签名称">
      </el-table-column>
      <el-table-column
        prop="value"
        label="所属类型">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="200">
        <template slot-scope="scope">
           <el-button type="text" size="small" @click="changeMember(scope.row)">编辑</el-button>
          <el-button  type="text" size="small" @click="delTag(scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<add-classify :what="what" v-show="showAdd" @addMember="addMember" @value="addTag"></add-classify>-->
    <div class="change" v-show="showChange">
      <h3>修改标签 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p></p>
        <p class="second">分类名称：
          <el-input v-model="name"></el-input>
        </p>
        <p>标签类型：
          <el-select v-model="title"  placeholder="请选择">
            <el-option
              v-for="item in belongType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p><el-button type="success" @click="save(id)">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
      </div>
    </div>
    <div class="change" v-show="showAdd">
      <h3>添加标签 <i class="fa fa-close" @click="closeIt"></i></h3>
      <div class="inner">
        <p></p>
        <p class="second">标签名称：
          <el-input v-model="addName"></el-input>
        </p>
        <p>标签类型：
          <el-select v-model="addTitle"  placeholder="请选择">
            <el-option
              v-for="item in belongType"v
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p><el-button type="success" @click="saveAdd">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
      </div>
    </div>
    <tag-change  v-show="tagChange" @changeTag="openChangeTag" @changetagData='changebelongType' :tagData="belongType"></tag-change>
    </div>
</template>

<script>
  import { addClassify, changeClassify, tagChange } from '../../components/VideoCom/index'

  export default {
    name: 'allMember',
    components: {
      addClassify,
      changeClassify,
      tagChange
    },
    data() {
      return {
        list: null,
        listLoading: true,
        downloadLoading: false,
        currentPage: 1,
        pagesize: 13,
        showAdd: false,
        showChange: false,
        tagChange: false,
        what: '标签',
        value2: {},
        title: '',
        name: '',
        id: '',
        changeRow: '',
        options2: [],
        addName: '',
        addTitle: '',
        tableData3: [],
        belongType: [ {
            value: '年龄阶段',
            label: '年龄阶段'
          }, {
            value: '使用场景',
            label: '使用场景'
          }
        ]
      }
    },
    methods: {
      closeIt() {
        this.showAdd = false
        this.showChange = false
        this.tagChange = false
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      addMember() {
        console.log(this.showAdd)
        this.showAdd = !this.showAdd
      },
      openChangeTag() {
        console.log('aaaaa')
        this.tagChange = !this.tagChange
      },
      changebelongType(data) {
        this.belongType = data

      },
      changeMember(row) {
        console.log(row)
        this.showChange = !this.showChange
        this.name = row.name
        this.title = row.value
        this.id = row.id
      },
      changeMemberAct() {
        this.showChange = !this.showChange
        console.log(this.showChange)
      },
      saveAdd() {
        console.log(this.addName)
        console.log(this.addTitle)
        var key = []
        var values = this.addTitle
        key = this.addName

        console.log(values)
        // PUBLIC.get('Configure.Configure.Selone', { type: "videoTag", key: this.addTitle }, data => {
        //   if (data.value.length > 0) {
        //     let a = JSON.parse(data.value)
        //     console.log(a)
        //     for (var i in a) {
        //       values.push(a[i])
        //       console.log(values)
        //     }
        //   }
        //   console.log(values)
        PUBLIC.get("Configure.Configure.Addconfig",{ type: "videoTag", key: key, value: this.addTitle, on_status: 1, statu: 1 }, (data) => {
          console.log(data)
          this.getTag()
          // console.log(_this.tagChange)
          this.addMember()
        })
        // })
      },
      save(data) {
        console.log(data.value)
        console.log(this.title)
        var titles = []
        // titles.push(this.title)
        PUBLIC.get("Configure.Configure.Addconfig",{type:"videoTag",key: this.name, value: this.title, on_status: 1,statu: 1}, (data) => {
          console.log(data)
          this.showChange = !this.showChange
          this.getTag()
        //    console.log(_this.tagChange)

        })
      },
      addTag:function(data){
        var _this = this
        PUBLIC.get("Configure.Configure.Addconfig",{type:"videoTag",key:data,value:data,on_status:1,statu:1},(data) => {
          console.log(data)
          _this.getTag()
          _this.showAdd = !_this.showAdd
        })
      },
      delTag:function(data){
        var _this=this
        this.$confirm('是否确认删除本条记录？本操作不可逆。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          PUBLIC.get("Configure.Configure.Addconfig",{type:"videoTag",key:data,value:data,on_status:-1,statu:-1},function(data){
            console.log(data)
            _this.$router.go(0)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getTag:function(){
        var _this=this
        PUBLIC.get("Configure.Configure.Selfig",{type:"videoTag"},function(data){
          console.log(data)
          var demo = {
            id:"id",
            name:"key",
            value: 'value'
          }
          data=PUBLIC.formatObj(demo,data)
          _this.tableData3 = data
          for (let i = 0; i < _this.tableData3.length; i++) {
            _this.options2.push({ value: '', label: '' })
            _this.options2[i]['value'] = _this.tableData3[i]['name']
            _this.options2[i]['label'] = _this.tableData3[i]['name']
            console.log(_this.options2)
          }
        })
      }
    },
    mounted() {
      this.getTag()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .app-container{
    color: #333333;
    .memberHead{
      height: 150px;
      padding: 0;
      p{
        padding-top: 100px;
        button{
          margin: 0;
          border-radius: 0;
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
    .msgEdit{
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
  .change {
    z-index: 100;
    width: 500px;
    height: 400px;
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

      }
      p:last-of-type{
        padding-top: 30px;
        button{
          width: 120px;
          margin-left: 75px;
        }
      }
      .second{
        .el-input{
          width: 200px;
        }
      }
    }
  }
</style>




<!--9-12写修改类型 未写完-->
<div style="display: none">
  <!--<template>-->
    <!--<div class="app-container">-->
      <!--<div class="memberHead">-->
        <!--<p><el-button type="primary" @click="openChangeTag">类型修改</el-button><el-button type="warning"  @click="addMember">添加标签</el-button></p>-->
      <!--</div>-->
      <!--<el-table-->
        <!--ref="multipleTable"-->
        <!--:data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
        <!--tooltip-effect="dark"-->
        <!--border-->
        <!--style=" backgroundColor: #f5fafe"-->
        <!--@selection-change="handleSelectionChange">-->
        <!--<el-table-column-->
          <!--prop="id"-->
          <!--label="ID"-->
          <!--width="200">-->
          <!--<template slot-scope="scope">{{ scope.row.id }}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="标签名称">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="value"-->
          <!--label="所属类型">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="操作"-->
          <!--width="200">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" size="small" @click="changeMember(scope.row)">编辑</el-button>-->
            <!--<el-button  type="text" size="small" @click="delTag(scope.row.name)">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <!--&lt;!&ndash;<add-classify :what="what" v-show="showAdd" @addMember="addMember" @value="addTag"></add-classify>&ndash;&gt;-->
      <!--<div class="change" v-show="showChange">-->
        <!--<h3>修改标签 <i class="fa fa-close" @click="closeIt"></i></h3>-->
        <!--<div class="inner">-->
          <!--<p></p>-->
          <!--<p class="second">分类名称：-->
            <!--<el-input v-model="name"></el-input>-->
          <!--</p>-->
          <!--<p>标签类型：-->
            <!--<el-select v-model="title"  placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in belongType"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</p>-->
          <!--<p><el-button type="success" @click="save(id)">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="change" v-show="showAdd">-->
        <!--<h3>添加标签 <i class="fa fa-close" @click="closeIt"></i></h3>-->
        <!--<div class="inner">-->
          <!--<p></p>-->
          <!--<p class="second">分类名称：-->
            <!--<el-input v-model="addName"></el-input>-->
          <!--</p>-->
          <!--<p>标签类型：-->
            <!--<el-select v-model="addTitle"  placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in belongType"v-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</p>-->
          <!--<p><el-button type="success" @click="saveAdd">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<tag-change  v-show="tagChange" v-if="belongType.length >2" @changeTag="openChangeTag" @changetagData='changebelongType' :tagData="belongType"></tag-change>-->
    <!--</div>-->
  <!--</template>-->

  <!--<script>-->
    <!--import { addClassify, changeClassify, tagChange } from '../../components/VideoCom/index'-->

    <!--export default {-->
      <!--name: 'allMember',-->
      <!--components: {-->
        <!--addClassify,-->
        <!--changeClassify,-->
        <!--tagChange-->
      <!--},-->
      <!--data() {-->
        <!--return {-->
          <!--list: null,-->
          <!--listLoading: true,-->
          <!--downloadLoading: false,-->
          <!--currentPage: 1,-->
          <!--pagesize: 13,-->
          <!--showAdd: false,-->
          <!--showChange: false,-->
          <!--tagChange: false,-->
          <!--what: '标签',-->
          <!--value2: {},-->
          <!--title: '',-->
          <!--name: '',-->
          <!--id: '',-->
          <!--changeRow: '',-->
          <!--options2: [],-->
          <!--addName: '',-->
          <!--addTitle: '',-->
          <!--tableData3: [],-->
          <!--belongType: [],-->
          <!--oldbelongType: []-->
        <!--}-->
      <!--},-->
      <!--methods: {-->
        <!--closeIt() {-->
          <!--this.showAdd = false-->
          <!--this.showChange = false-->
          <!--this.tagChange = false-->
        <!--},-->
        <!--handleSelectionChange(val) {-->
          <!--this.multipleSelection = val-->
        <!--},-->
        <!--addMember() {-->
          <!--console.log(this.showAdd)-->
          <!--this.showAdd = !this.showAdd-->
        <!--},-->
        <!--//打开类型修改-->
        <!--openChangeTag() {-->
          <!--console.log(this.belongType)-->
          <!--this.tagChange = !this.tagChange-->
        <!--},-->
        <!--//类型修改后保存-->
        <!--changebelongType(data) {-->
          <!--console.log(data)-->
          <!--console.log(this.belongType)-->
          <!--// let oldType = data[0]-->
          <!--// // let new-->
          <!--// this.belongType = data-->

        <!--},-->
        <!--changeMember(row) {-->
          <!--console.log(row)-->
          <!--this.showChange = !this.showChange-->
          <!--this.name = row.name-->
          <!--this.title = row.value-->
          <!--this.id = row.id-->
        <!--},-->
        <!--changeMemberAct() {-->
          <!--this.showChange = !this.showChange-->
          <!--console.log(this.showChange)-->
        <!--},-->
        <!--saveAdd() {-->
          <!--console.log(this.addName)-->
          <!--console.log(this.addTitle)-->
          <!--var key = []-->
          <!--var values = this.addTitle-->
          <!--key = this.addName-->

          <!--console.log(values)-->
          <!--// PUBLIC.get('Configure.Configure.Selone', { type: "videoTag", key: this.addTitle }, data => {-->
          <!--//   if (data.value.length > 0) {-->
          <!--//     let a = JSON.parse(data.value)-->
          <!--//     console.log(a)-->
          <!--//     for (var i in a) {-->
          <!--//       values.push(a[i])-->
          <!--//       console.log(values)-->
          <!--//     }-->
          <!--//   }-->
          <!--//   console.log(values)-->
          <!--PUBLIC.get("Configure.Configure.Addconfig",{ type: "videoTag", key: key, value: this.addTitle, on_status: 1, statu: 1 }, (data) => {-->
            <!--console.log(data)-->
            <!--this.getTag()-->
            <!--// console.log(_this.tagChange)-->
            <!--this.addMember()-->
          <!--})-->
          <!--// })-->
        <!--},-->
        <!--save(data) {-->
          <!--console.log(data.value)-->
          <!--console.log(this.title)-->
          <!--var titles = []-->
          <!--// titles.push(this.title)-->
          <!--PUBLIC.get("Configure.Configure.Addconfig",{type:"videoTag",key: this.name, value: this.title, on_status: 1,statu: 1}, (data) => {-->
            <!--console.log(data)-->
            <!--this.showChange = !this.showChange-->
            <!--this.getTag()-->
            <!--//    console.log(_this.tagChange)-->

          <!--})-->
        <!--},-->
        <!--addTag:function(data){-->
          <!--var _this = this-->
          <!--PUBLIC.get("Configure.Configure.Addconfig",{type:"videoTag",key:data,value:data,on_status:1,statu:1},(data) => {-->
            <!--console.log(data)-->
            <!--_this.getTag()-->
            <!--_this.showAdd = !_this.showAdd-->
          <!--})-->
        <!--},-->
        <!--delTag:function(data){-->
          <!--var _this=this-->
          <!--this.$confirm('是否确认删除本条记录？本操作不可逆。', '提示', {-->
            <!--confirmButtonText: '确定',-->
            <!--cancelButtonText: '取消',-->
            <!--type: 'warning'-->
          <!--}).then(() => {-->
            <!--PUBLIC.get("Configure.Configure.Addconfig",{type:"videoTag",key:data,value:data,on_status:-1,statu:-1},function(data){-->
              <!--console.log(data)-->
              <!--this.$router.go(0)-->
            <!--})-->
          <!--}).catch(() => {-->
            <!--this.$message({-->
              <!--type: 'info',-->
              <!--message: '已取消删除'-->
            <!--})-->
          <!--})-->
        <!--},-->
        <!--getTag:function(){-->
          <!--var _this=this-->
          <!--PUBLIC.get("Configure.Configure.Selfig",{type:"videoTag"},(data) => {-->
            <!--console.log(data)-->
            <!--var demo = {-->
              <!--id:"id",-->
              <!--name:"key",-->
              <!--value: 'value'-->
            <!--}-->
            <!--data=PUBLIC.formatObj(demo,data)-->
            <!--_this.tableData3 = data-->
            <!--for (let i = 0; i < _this.tableData3.length; i++) {-->
              <!--_this.oldbelongType.push(_this.tableData3[i]['value'])-->
              <!--_this.options2.push({ value: '', label: '' })-->
              <!--_this.options2[i]['value'] = _this.tableData3[i]['name']-->
              <!--_this.options2[i]['label'] = _this.tableData3[i]['name']-->
              <!--console.log(_this.options2)-->
            <!--}-->
            <!--for (var a = 0; a < this.oldbelongType.length; a++) {-->
              <!--for (var j = a + 1; j < this.oldbelongType.length; j++) {-->
                <!--if (this.oldbelongType[a] === this.oldbelongType[j]) {-->
                  <!--j = ++a;-->
                <!--}-->
              <!--}-->
              <!--this.belongType.push(this.oldbelongType[a])-->
              <!--console.log(this.belongType)-->
            <!--}-->
          <!--})-->
        <!--}-->
      <!--},-->
      <!--mounted() {-->
        <!--this.getTag()-->
      <!--}-->
    <!--}-->
  <!--</script>-->
  <!--<style rel="stylesheet/scss" lang="scss" >-->
    <!--.app-container{-->
      <!--color: #333333;-->
      <!--.memberHead{-->
        <!--height: 150px;-->
        <!--padding: 0;-->
        <!--p{-->
          <!--padding-top: 100px;-->
          <!--button{-->
            <!--margin: 0;-->
            <!--border-radius: 0;-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--.el-table{-->
        <!--.warning-row {-->
          <!--background: #fff5f5;-->
        <!--}-->
        <!--.waiting{-->
          <!--background-color: #f2ffff;-->
        <!--}-->
        <!--.success-row {-->
          <!--background: #f0f9eb;-->
        <!--}-->
      <!--}-->
      <!--.el-pagination{-->
        <!--padding-top: 20px;-->
      <!--}-->
      <!--.msgEdit{-->
        <!--z-index: 100;-->
        <!--width: 500px;-->
        <!--height: 400px;-->
        <!--font-size: 14px;-->
        <!--background-color: #fff;-->
        <!--position: fixed;-->
        <!--top: 20%;-->
        <!--left: 50%;-->
        <!--margin-left: -250px;-->
        <!--h3{-->
          <!--background-color: #E4E4E4;-->
          <!--padding: 15px;-->
          <!--.fa{-->
            <!--float: right;-->
            <!--font-size: 18px;-->
            <!--padding: 0 10px;-->
          <!--}-->
          <!--.fa:hover{-->
            <!--color: #518BBD;-->
          <!--}-->
        <!--}-->
        <!--.inner{-->
          <!--padding:36px 16px;-->
          <!--p{-->
            <!--padding-bottom: 30px;-->
            <!--img{-->
              <!--vertical-align:top;-->
              <!--width: 140px;-->
              <!--height: 80px;-->
              <!--border: 1px solid #cccccc;-->
              <!--display: inline-block;-->
            <!--}-->
            <!--button{-->
              <!--vertical-align:bottom;-->
              <!--margin-left: 50px;-->
            <!--}-->
          <!--}-->
          <!--p:last-of-type{-->
            <!--button{-->
              <!--width: 120px;-->
              <!--margin-left: 75px;-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->

    <!--}-->
    <!--.change {-->
      <!--z-index: 100;-->
      <!--width: 500px;-->
      <!--height: 400px;-->
      <!--background-color: #fff;-->
      <!--position: fixed;-->
      <!--top: 20%;-->
      <!--left: 50%;-->
      <!--margin-left: -250px;-->
      <!--h3{-->
        <!--background-color: #E4E4E4;-->
        <!--padding: 15px;-->
        <!--.fa{-->
          <!--float: right;-->
          <!--font-size: 18px;-->
          <!--padding: 0 10px;-->
        <!--}-->
        <!--.fa:hover{-->
          <!--color: #518BBD;-->
        <!--}-->
      <!--}-->
      <!--.inner{-->
        <!--padding:36px 16px;-->
        <!--p{-->
          <!--padding-bottom: 30px;-->

        <!--}-->
        <!--p:last-of-type{-->
          <!--padding-top: 30px;-->
          <!--button{-->
            <!--width: 120px;-->
            <!--margin-left: 75px;-->
          <!--}-->
        <!--}-->
        <!--.second{-->
          <!--.el-input{-->
            <!--width: 200px;-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--</style>-->

</div>
