<template>
  <div>
    <div id="editor" type="text/plain"></div>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      setTimeout(function() {
        console.log('aaa')
        _this.editor = UE.getEditor('editor', _this.config); // 初始化UE
        _this.editor.addListener("ready",  () => {
          console.log(_this.defaultMsg)
          _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
        })
      }, 500)
    },
    methods: {
      getUEContent() { // 获取内容方法
        console.log(this.editor.getContent())
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
