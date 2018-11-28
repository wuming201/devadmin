<template>
    <div class="kk-index">
      <p class="select">
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
          textarea: ''
        }
      },
      methods: {
        saveIt() {
          var _this = this
          var value = JSON.stringify({text: this.textarea})
          PUBLIC.post("Configure.Configure.Addconfig", {
            type: 'kkipIndex',
            key: 'kkipIndex',
            value: value,
            on_status: 1,
            statu: 1
          }, function () {
            _this.$router.go(-1)
          })
        },
        getInfo() {
          PUBLIC.get('Configure.Configure.Selone', { type: 'kkipIndex', key: 'kkipIndex' }, (data) => {
            console.log(data)
            // this.id = data.id
            var newData = JSON.parse(data.value)

            this.textarea = newData.text
            console.log(newData)
          })
        }
      },
      mounted() {
        this.getInfo()
      }
    }
</script>

<style rel='stylesheet/scss' lang='scss' >
  .kk-index{
    padding: 100px 15%;
    p{
      width: 80%;
      text-align: center;
    }
    .btn{
      padding-top: 50px;
      .el-button{
        width: 100px;
        margin: 0 20px;
      }
    }
  }

</style>
