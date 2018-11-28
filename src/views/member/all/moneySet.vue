<template>
  <div class="moneySet clearfix">
    <div class="innerBox">
      <p>
        <span><span>原价：</span><el-input class="oldPrice" placeholder="请输入内容" v-model="vipMoney[2]"><template slot="append">元/月</template></el-input></span><span><span>1月价：</span><el-input placeholder="请输入内容" v-model="vipMoney_1[2]"><template slot="append">元</template></el-input></span>
      </p>
      <p>
        <span> <span>3月价：</span> <el-input placeholder="请输入内容" v-model="vipMoney_3[2]"><template slot="append">元</template></el-input></span><span><span>6月价：</span><el-input placeholder="请输入内容" v-model="vipMoney_6[2]"><template slot="append">元</template></el-input></span>
      </p>
      <p>
        <span><span>12月价：</span><el-input placeholder="请输入内容" v-model="vipMoney_12[2]"><template slot="append">元</template></el-input></span><span> <span>24月价：</span> <el-input placeholder="请输入内容" v-model="vipMoney_24[2]"><template slot="append">元</template></el-input></span>
      </p>
      <p>
        <span><span>永久会员：</span><el-input placeholder="请输入内容" v-model="vipMoney_600[2]"><template slot="append">元</template></el-input></span>
      </p>
      <p><el-button type="success" class="saveIt" @click="save">保存</el-button><el-button type="info" class="cancelIt" @click="quit">取消</el-button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addMember',
  data(){
    return {
      vipMoney:"",
      vipMoney_1:"",
      vipMoney_3:"",
      vipMoney_6:"",
      vipMoney_12: '',
      vipMoney_24:"",
      vipMoney_600:"",
    }
  },
  methods:{
    getComList:function(){
      var _this=this
      PUBLIC.get("Commodity.commoditys.checklist",{keyword:"VIP"},function(data){
        console.log(data)
        var demo={
          "单月VIP":"vipMoney",
          "1个月VIP":"vipMoney_1",
          "3个月VIP":"vipMoney_3",
          "6个月VIP":"vipMoney_6",
          "12个月VIP":"vipMoney_12",
          "24个月VIP":"vipMoney_24",
          "永久VIP":"vipMoney_600",
        }
        for(var n=0;n<data.length;n++){
          _this[demo[data[n]['name']]]=[data[n].id,data[n].name,data[n].money];
          // console.log(data[n][])
          // console.log(demo[data[n]['name']])
          // console.log(data[n].money)
        }
      })
    },
    save:function(){
      var _this=this
      this.allSave=5
      this.hadSave=0
      PUBLIC.get("Commodity.commoditys.upcom",{id:this.vipMoney[0],money:this.vipMoney[2]},function(){_this.hadSave+=1;_this.saveDon()})
      PUBLIC.get("Commodity.commoditys.upcom",{id:this.vipMoney_1[0],money:this.vipMoney_1[2]},function(){_this.hadSave+=1;_this.saveDon()})
      PUBLIC.get("Commodity.commoditys.upcom",{id:this.vipMoney_3[0],money:this.vipMoney_3[2]},function(){_this.hadSave+=1;_this.saveDon()})
      PUBLIC.get("Commodity.commoditys.upcom",{id:this.vipMoney_6[0],money:this.vipMoney_6[2]},function(){_this.hadSave+=1;_this.saveDon()})
      PUBLIC.get("Commodity.commoditys.upcom",{id:this.vipMoney_24[0],money:this.vipMoney_24[2]},function(){_this.hadSave+=1;_this.saveDon()})
      PUBLIC.get("Commodity.commoditys.upcom",{id:this.vipMoney_600[0],money:this.vipMoney_600[2]},function(){_this.hadSave+=1;_this.saveDon()})
    },
    saveDon:function(){
      if(this.hadSave==this.allSave){
        PUBLIC.toa("修改完毕",1)
      }
    },
    quit:function(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.getComList()
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .moneySet{
    padding: 110px 300px;
    .innerBox{
      p{
        display: inline-block;
        width: 100%;
        padding-bottom: 50px;
        >span{
          display: inline-block;
          padding-right: 130px;
          flex-wrap: nowrap;
          >span{
            width: 80px;
            text-align: right;
            display: inline-block;
          }
          .el-input{
            width: 255px;
          }

        }
        .saveIt{
          margin-left: 25%;
          margin-right: 10%;
          width: 10%;
        }
        .cancelIt{
          margin-left: 10%;
          margin-right: 25%;
          width: 10%;
        }
      }
    }
  }

</style>
