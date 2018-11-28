<template>
  <div class="add">
    <h3>添加{{what}} <i class="fa fa-close" @click="closeView"></i></h3>
    <div class="inner">
      <p></p>
      <p>分类名称：
        <el-input v-model="value2" :value="value2"></el-input>
      </p>
      <p>上级分类：
        <el-select v-model="value2" disabled placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </p>
      <p><el-button type="success" @click="closeIt">保存</el-button><el-button type="info" @click="closeView">取消</el-button></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['what'],
  data() {
    return {
      options2: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value2: ''
    }
  },
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
    closeIt() {
      this.$emit('value',this.value2)
    },
    closeView(){
      this.$emit('addMember')
    },
    save(){
      var _this=this
      console.log(this.value2)
      PUBLIC.get("Video.drama.addlist",{class:this.value2},function(data){
        console.log(data)
        _this.$emit("value",_this.value2)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
    .add{
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
          >.el-input{
            width: 200px;
          }
          button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          padding-top: 30px;
          button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }

</style>
