<template>
  <div class = 'app-container'>
    <div class = 'memberHead'>
      <p><span class='buttons'><el-button type='warning' @click="addHoner" >添加区域</el-button></span></p>
    </div>
    <treeTable :columns="columns" :tree-structure="true" :data-source="list" @edit="editOne" @del="delOne"></treeTable>
    <!-- @edit="editOne" @del="delOne" -->
    <div class="addAdmin" v-show="showEdit">
      <h3>信息编辑 <i class="fa fa-close" @click="editAdmin"></i></h3>
      <div class="inner">
        <p>区域名称：<el-input v-model="newCity" placeholder="请输入用户名"></el-input></p>
        <p>一级区域：<selectKuang :selectData="list" @value="selectFirst"></selectKuang></p>
        <p>二级区域：<selectKuang :selectData="listSec" @value="selectSec"></selectKuang></p>
        <p>{{addStatus}}</p>
        <p><el-button type="success" @click="addTeamUser" >继续添加</el-button><el-button type="info" @click="addHoner">取消</el-button></p>
      </div>
    </div>

    <div class="addAdmin" v-show="showEditOne">
      <h3>信息编辑 <i class="fa fa-close" @click="quitEdit"></i></h3>
      <div class="inner">
        <p>区域名称：<el-input v-model="editCity" placeholder="请输入用户名"></el-input></p>
        <p><el-button type="success" @click="editOneAct" >提交</el-button><el-button type="info" @click="quitEdit">取消</el-button></p>
      </div>
    </div>

  </div>
</template>

<script>
  import { treeTable, selectKuang } from '../../components/index'
  export default {
    components: {
      treeTable,
      selectKuang
    },
    data() {
      return {
        showEdit:false,
        list:[],
        listSec:[],
        selectFirstCity:"",
        selectSecCity:"",
        newCity:"",
        addStatus:"",
        region:[
          ],
          columns: [
          {
            text: '地区',
            dataIndex: 'label'
          }
        ],
      dataSource: [

      ],
        honerAdd: false,
        honerChange: false,
        radio: '1',
        showEditOne:false,
        editOneObj:{},
        editCity:""
        // showEdit: true
      }
    },
    methods: {
      addHoner() {
        this.honerAdd = !this.honerAdd
        this.honerChange =! this.honerChange
        this.showEdit =!this.showEdit
      },
      changeHoner() {
        this.honerChange = !this.honerChange
      },
      editAdmin() {
        console.log(this.showEdit)
        this.showEdit = !this.showEdit
      },
      selectFirst:function(data){
        console.log(data)
        this.selectFirstCity=data
        for(var n=0;n<this.region.length;n++){
          if(this.region[n].label==data){
            this.listSec=this.region[n].children
          }
        }
      },
      selectSec:function(data){
        console.log(data)
        this.selectSecCity=data
      },

      hadCity(list,label){
        for(var i=0;i<list.length;i++){
          if(list[i].label==label){
            return true
          }
        }
        return false
      },
      addTeamUser:function(){
        console.log(this.newCity=="",this.selectFirstCity=="",this.selectSecCity=="")
        if(this.newCity==""){
          this.addStatus="地区为空，无法添加"
          return
        }
        console.log(0)
        if(this.selectFirstCity==""){
          if(this.hadCity(this.region,this.newCity)){
            alert("该地区已存在")
            return
          }
          this.region.push({value:this.newCity,label:this.newCity,children:[]})
          console.log(this.region)
          this.showList()
          this.saveConf()
          this.addStatus="添加成功！"
          // this.showList()
          return
        }
        console.log(1)
        var secFirDom={}
        for(var n=0;n<this.region.length;n++){
          if(this.region[n].label==this.selectFirstCity){
            secFirDom=this.region[n].children
          }
        }

        if(this.selectSecCity==""){
          if(this.hadCity(secFirDom,this.newCity)){
            alert("该地区已存在")
            return
          }
          secFirDom.push({value:this.newCity,label:this.newCity,children:[]})
          this.showList()
          this.saveConf()
          this.addStatus="添加成功！"
          return
        }
        console.log(2)
        var secSecDom={}
        for(var n=0;n<secFirDom.length;n++){
          if(secFirDom[n].label==this.selectSecCity){
            secSecDom=secFirDom[n].children
            if(this.hadCity(secSecDom,this.newCity)){
              alert("该地区已存在")
              return
            }
            secSecDom.push({value:this.newCity,label:this.newCity})
            this.showList()
            this.saveConf()
            this.addStatus="添加成功！"
            return
          }
        }
      },
      saveConf:function(){
        var _this=this
        PUBLIC.post("Configure.Configure.Addconfig",{type:"quyuliebiao",key:"quyuliebiao",value:JSON.stringify(this.region),on_status:1,statu:1},function(data){
          console.log("区域数据保存完毕")
        })
      },
      loadConf:function(){
        var _this=this
        PUBLIC.get("Configure.Configure.Selone",{type:"quyuliebiao",key:"quyuliebiao"},function(data){
          console.log("区域数据载入完毕")
          console.log(data)
          _this.region=data?JSON.parse(data.value):[]
          _this.showList()
        })
      },
      showList:function(){
        var regin=this.region
        var list=[]
        var indexs=0
        for(var n=0;n<regin.length;n++){
          indexs++
          regin[n]["id"]=indexs
          regin[n]["parentId"]=0
          for(var i=0;i<regin[n].children.length;i++){
            // list.push({value:regin[n].children[i].value,label:regin[n].children[i].label,levle:2})
            indexs++
            regin[n].children[i]['id']=indexs
            regin[n].children[i]['parentId']=regin[n]["id"]
            for(var x=0;x<regin[n].children[i].children.length;x++){
              // list.push({value:regin[n].children[i].children[x].value,label:regin[n].children[i].children[x].label,levle:3})
              indexs++
              regin[n].children[i].children[x]["id"]=indexs
              regin[n].children[i].children[x]['parentId']=regin[n].children[i]["id"]
            }
          }
        }
        console.log("打印有序列表")
        console.log(regin)
        this.list=JSON.parse(JSON.stringify(regin))
      },
      editOne:function(data){
        console.log(data)
        var id=data.id
        var regin=this.list
        var selectOne=[]
        for(var n=0;n<regin.length;n++){
          if(regin[n].id==id){
            console.log(regin[n].label)
            selectOne=this.region[n]
            break
          }
          for(var i=0;i<regin[n].children.length;i++){
            // list.push({value:regin[n].children[i].value,label:regin[n].children[i].label,levle:2})
            if(regin[n].children[i].id==id){
              console.log(regin[n].children[i].label)
              selectOne=this.region[n].children[i]
              break
            }
            for(var x=0;x<regin[n].children[i].children.length;x++){
              // list.push({value:regin[n].children[i].children[x].value,label:regin[n].children[i].children[x].label,levle:3})
              if(regin[n].children[i].children[x].id==id){
                console.log(regin[n].children[i].children[x].label)
                selectOne=this.region[n].children[i].children[x]
                break
              }
            }
          }
        }

        this.editCity=selectOne.label
        this.editOneObj=selectOne
        this.showEditOne=!this.showEditOne

      },
      editOneAct:function(){
        this.editOneObj.label=this.editCity
        this.editOneObj.value=this.editCity
        this.saveConf()
        this.showList()
        console.log(this.region)
        this.showEditOne=!this.showEditOne
      },
      delOne:function(data){
        console.log(data)
        if(data.children!=undefined && data.children.length>0){
          alert("该区域还有子级区域存在，不允许删除")
          return
        }

        var id=data.id
        var regin=this.list
        var selectOne=[]
        for(var n=0;n<regin.length;n++){
          if(regin[n].id==id){
            console.log(regin[n].label)
            selectOne=this.region[n]
            // delete this.region[n]
            this.region.splice(n, 1);
            break
          }
          for(var i=0;i<regin[n].children.length;i++){
            // list.push({value:regin[n].children[i].value,label:regin[n].children[i].label,levle:2})
            if(regin[n].children[i].id==id){
              console.log(regin[n].children[i].label)
              this.region[n].children.splice(i, 1)
              // selectOne=this.region[n].children[i]

              break
            }
            for(var x=0;x<regin[n].children[i].children.length;x++){
              // list.push({value:regin[n].children[i].children[x].value,label:regin[n].children[i].children[x].label,levle:3})
              if(regin[n].children[i].children[x].id==id){
                console.log(regin[n].children[i].children[x].label)
                // selectOne=this.region[n].children[i].children[x]
                this.region[n].children[i].children.splice(x, 1)
                break
              }
            }
          }
        }

        this.saveConf()
        this.showList()
      },
      quitEdit:function(){
        this.showEditOne=!this.showEditOne
      }
    },
    mounted() {
      this.loadConf()
      this.showList()
    },
    watch :{
      newCity:function(){
        this.addStatus=""
      }
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
    .el-button--text{
      padding: 10px;
    }
    .el-pagination{
      padding-top: 20px;
    }
    .addAdmin,.powerSet{
      z-index: 100;
      font-size: 14px;
      background-color: #fff;

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
    }
    .addAdmin{
      width: 500px;
      height: 400px;
      margin-left: -250px;
      position: fixed;
      top: 20%;
      left: 50%;
      .inner{
        padding:36px 16px;
        p{
          padding-bottom: 30px;
          .el-input--medium{
            width: 80%;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          >button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          >button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }
  }

</style>
