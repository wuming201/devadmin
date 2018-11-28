<template>
  <span class="selectKuang">
    <el-select v-model="value" :placeholder="holder" value-key="value">
      <el-option
        v-for="item in selectData"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </span>
</template>

<script>
  export default {
    props: { selectData: Array, holder: String,value0:String },
    data() {
      return {
        value: [],
        value0: "",
        first:0
      }
    },
    methods: {

    },
    mounted:function(){
      // this.value=this.value0
      // console.log(this.value0)
    },
    watch: {
      value0() {
        this.value=this.value0
        // console.log("接收到调试选择框默认值")
        // console.log(this.value0)
        // console.log(this.first)
        // console.log(this.value)
        // console.log(this.value0)
        // console.log(this.value0)
        // // if(this.value0 === undefined || this.value0 === '') {                        signUp页面undefine不能用
        // if( this.value0 === '') {
        //   return
        //   // this.$emit('value', '')
        // } else if (this.value0 === undefined){
        //   return
        // }else {
        //   this.$emit('value', this.value0)
        // }
        // console.log('2')
      },
      value(){
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        // console.log("调试选择框")
        // console.log(this.first)
        // console.log(this.value)
        // console.log(this.value0)
        //&& this.value==this.value0
        if(this.first<1 ){
          this.first++
          return
        }

        // if(this.value!==undefined && this.value!==""){
          console.log("发起选择框选择回调")
          console.log(this.value)
          this.$emit('value', this.value)
        // }
      },
      selectData() {
        console.log('3')
        if(this.selectData.length==0 || this.selectData == '' ) {
          this.selectData=[{label:"",value:""}]
          // this.value=""
          // console.log(this.selectData)
          // this.$emit('value', "")
        }
      }
    },
    mounted() {
      // if(this.value0===undefined){
      //   console.log('4')
      //   this.value0=0
      // }else if(this.value0==='') {
      //   console.log('5')
      //   this.value0=0
      // }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
  .searchBox{
    margin-left: 10px;
    .el-select{
      .el-input--suffix {
        width: 100px;
      }
      .resize-triggers{
        width: 100px;
      }
    }
    .el-input{
      width: 240px;
    }
  }
</style>
