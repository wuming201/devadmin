<template>
  <div class="tagChange">
    <h3>修改类型 <i class="fa fa-close" @click="closeIt"></i></h3>
    <div class="inner">
      <p><el-input placeholder="年龄阶段" v-model="tagData[0].label"></el-input></p>
      <p>
        <el-input placeholder="使用场景" v-model="tagData[1].label"></el-input>
      </p>
      <p>
        <el-input placeholder="视频等级" v-model="tagData[2].label"></el-input>
      </p>
      <p><el-button type="success" @click="typeChange">修改</el-button><el-button type="info">取消</el-button></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tagData'],
  data() {
    return {
      value2: '',
      key1: '',
      key2: '',
      key3: '',
      types: [],
      oldTypes: []
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
    getType() {
      console.log(this.tagData)
      // PUBLIC.get('Configure.Configure.Selfig', { type: 'videoTag' }, data => {
      //   console.log(data)
      //   if (data.length > 0) {
      //     for (var i in data) {
      //       this.types.push(data[i].key)
      //       this.key1 = this.types[0]
      //       this.key2 = this.types[1]
      //       this.key3 = this.types[2]
      //       this.oldTypes.push(data[i].key)
      //     }
      //   }
      //
      // })
    },
    typeChange() {
      console.log(this.tagData)
      this.$emit('changetagData', this.tagData)
      // var keys = [this.key1, this.key2, this.key3]
      // var oldKeys = [this.oldTypes[0], this.oldTypes[1], this.oldTypes[2]]
      // console.log(keys)
      // console.log(oldKeys)
      // for (var i = 0; i < oldKeys.length; i++) {
      //   if(oldKeys[i] == undefined) {
      //     console.log('aaaaa')
      //   }
      //   else{
      //     PUBLIC.get('Configure.Configure.Addconfig', { type: 'videoTag', key: oldKeys[i], value: '', on_status: 1, statu: -1 }, data => {
      //       console.log(data)
      //       console.log(keys[i])
      //     })
      //   }
      //
      // }
      // for (var a = 0; a < keys.length; a++) {
      //   PUBLIC.get('Configure.Configure.Addconfig', { type: 'videoTag', key: keys[a], value: '', on_status: 1, statu: 1 }, data => {
      //     console.log(data)
      //     // this.$router.go(0)
      //   })
      // }
    },
    closeIt() {
      console.log('jiushiwoksdajdhnlksadlak')
      this.$emit('changeTag')
    }
  },
  mounted() {
    this.getType()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
    .tagChange{
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
          padding-bottom: 20px;
          .el-input{
            width: 300px;
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





















<!--09-12写修改类型 未写完-->


<!--<template>-->
  <!--<div class="tagChange">-->
    <!--<h3>修改类型 <i class="fa fa-close" @click="closeIt"></i></h3>-->
    <!--<div class="inner">-->
      <!--<p><el-input placeholder="年龄阶段" v-model="tagData[0]"></el-input></p>-->
      <!--<p>-->
        <!--<el-input placeholder="使用场景" v-model="tagData[1]"></el-input>-->
      <!--</p>-->
      <!--<p>-->
        <!--<el-input placeholder="视频等级" v-model="tagData[2]"></el-input>-->
      <!--</p>-->
      <!--<p><el-button type="success" @click="typeChange">修改</el-button><el-button type="info">取消</el-button></p>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--props: ['tagData'],-->
    <!--data() {-->
      <!--return {-->
        <!--value2: '',-->
        <!--key1: '',-->
        <!--key2: '',-->
        <!--key3: '',-->
        <!--types: [],-->
        <!--oldTypes: []-->
      <!--}-->
    <!--},-->
    <!--name: 'AppMain',-->
    <!--computed: {-->
      <!--cachedViews() {-->
        <!--return this.$store.state.tagsView.cachedViews-->
      <!--},-->
      <!--key() {-->
        <!--return this.$route.fullPath-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--getType() {-->
        <!--console.log('aaa')-->
        <!--console.log('aaa' + this.tagData)-->
        <!--// PUBLIC.get('Configure.Configure.Selfig', { type: 'videoTag' }, data => {-->
        <!--//   console.log(data)-->
        <!--//   if (data.length > 0) {-->
        <!--//     for (var i in data) {-->
        <!--//       this.types.push(data[i].key)-->
        <!--//       this.key1 = this.types[0]-->
        <!--//       this.key2 = this.types[1]-->
        <!--//       this.key3 = this.types[2]-->
        <!--//       this.oldTypes.push(data[i].key)-->
        <!--//     }-->
        <!--//   }-->
        <!--//-->
        <!--// })-->
      <!--},-->
      <!--typeChange() {-->
        <!--// console.log(this.tagData)-->
        <!--this.$emit('changetagData', this.tagData)-->
        <!--// var keys = [this.key1, this.key2, this.key3]-->
        <!--// var oldKeys = [this.oldTypes[0], this.oldTypes[1], this.oldTypes[2]]-->
        <!--// console.log(keys)-->
        <!--// console.log(oldKeys)-->
        <!--// for (var i = 0; i < oldKeys.length; i++) {-->
        <!--//   if(oldKeys[i] == undefined) {-->
        <!--//     console.log('aaaaa')-->
        <!--//   }-->
        <!--//   else{-->
        <!--//     PUBLIC.get('Configure.Configure.Addconfig', { type: 'videoTag', key: oldKeys[i], value: '', on_status: 1, statu: -1 }, data => {-->
        <!--//       console.log(data)-->
        <!--//       console.log(keys[i])-->
        <!--//     })-->
        <!--//   }-->
        <!--//-->
        <!--// }-->
        <!--// for (var a = 0; a < keys.length; a++) {-->
        <!--//   PUBLIC.get('Configure.Configure.Addconfig', { type: 'videoTag', key: keys[a], value: '', on_status: 1, statu: 1 }, data => {-->
        <!--//     console.log(data)-->
        <!--//     // this.$router.go(0)-->
        <!--//   })-->
        <!--// }-->
      <!--},-->
      <!--closeIt() {-->
        <!--this.$emit('changeTag')-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--this.getType()-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style rel="stylesheet/scss" lang="scss" >-->
  <!--.tagChange{-->
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
        <!--padding-bottom: 20px;-->
        <!--.el-input{-->
          <!--width: 300px;-->
        <!--}-->
      <!--}-->
      <!--p:last-of-type{-->
        <!--padding-top: 30px;-->
        <!--button{-->
          <!--width: 120px;-->
          <!--margin-left: 75px;-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->

<!--</style>-->

