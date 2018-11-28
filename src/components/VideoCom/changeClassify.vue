<template>
  <div class="change">
    <h3>修改{{what}} <i class="fa fa-close" @click="closeIt"></i></h3>
    <div class="inner">
      <p></p>
      <p class="second">修改分类：
        <!-- {{title1}} -->
        <!--:value="data1.name"-->
        <el-input v-model="data1.name"></el-input>
      </p>
      <!-- <p>{{title2}}：
        <el-select v-model="data1.name"  placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </p> -->
      <p><el-button type="success" @click="save(data1.id)">保存</el-button><el-button type="info" @click="closeIt">取消</el-button></p>
    </div>
  </div>
</template>

<script>
export default {
  // 'value','data1'
  props: ['what', 'title1', 'title2', 'value','data1'],
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
      }]
      // value: {}
    }
  },
  name: 'changeClassify',
  mounted() {
    console.log("激活修改视频分类")
  },
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
      this.$emit('changeMember')
    },
    save(id) {
      console.log(id);
      var data= {};
      data.id=id;
      data.name=this.data1.name;
      console.log(data);
      this.$emit('value', data);
    }
  }
//   mounted() {
//     console.log(this.data1)
//   },
}
</script>
<style rel="stylesheet/scss" lang="scss" >
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
