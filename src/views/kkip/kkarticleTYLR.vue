<template>
    <div class="kk-ytlr">
      <p class="video"><span class="title">视频:</span>{{videoText}} <el-button type="primary" @click="changeImg()">上传文件</el-button><el-input type='file' id='changeVideo' v-on:change='changeFile' style="display: none"></el-input></p>
      <p class="select"><span class="title">文本:</span>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </p>
      <p class="btn"><el-button type="success" @click="saveIt">保存</el-button><el-button type="info">取消</el-button></p>
    </div>
</template>

<script>
    export default {
      name: "kkarticle-index",
      data() {
        return {
          videoText: '未上传文件',
          textarea: ''
        }
      },
      methods: {
        changeImg(tab) {
          this.changeFileFor = tab
          document.getElementById('changeVideo').click()
        },
        changeFile() {
          var _this = this
          var tab = this.changeFileFor
          console.log('触发上传')
          PUBLIC.postFile('changeVideo', function (url) {
            console.log(url)
            _this.videoText = url
          })
        },
        getInfo() {
          PUBLIC.get('Configure.Configure.Selone', { type: 'kkipYTLR', key: 'kkipYTLR' }, (data) => {
            console.log(data)
            // this.id = data.id
            var newData = JSON.parse(data.value)
            if( newData.videoText == '') {
              this.videoText = '未上传文件'
            }else{
              this.videoText = newData.videoText
            }
            this.textarea = newData.textarea
            console.log(newData)
          })
        },
        saveIt() {
          var _this = this
          var value = JSON.stringify({videoText: this.videoText, textarea: this.textarea})
          PUBLIC.post("Configure.Configure.Addconfig", {
            type: 'kkipYTLR',
            key: 'kkipYTLR',
            value: value,
            on_status: 1,
            statu: 1
          }, function () {
            _this.$router.go(-1)
          })
        }

      },
      mounted() {
        this.getInfo()
      }
    }
</script>

<style rel='stylesheet/scss' lang='scss' >
  .kk-ytlr{
    padding: 100px 15%;
    p{
      width: 80%;
      text-align: left;
      >span{
        display: inline-block;
        width: 50px;
        margin-left: -50px;

      }
    }
    .video{
      line-height: 50px;
      position: relative;
      .el-button{
        position: absolute;
        right: 400px;
        top: 10px;
      }
    }
    .btn{
      padding-top: 50px;
      text-align: center;
      .el-button{
        text-align: center;
        padding: 10px 30px;
        margin: 0 20px;
      }
    }
  }

</style>
