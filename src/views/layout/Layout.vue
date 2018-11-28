<template>

  <div class="app-wrapper" :class="classObj">
    <an-header :ids ="ids" ></an-header>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, TagsView, AnHeader } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  data() {
    return {
      id: '',
      tid: '',
      ids: {}
    }
  },
  components: {
    Sidebar,
    AppMain,
    TagsView,
    AnHeader
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
  },
  methods: {
    // getInfos(id, tid) {
    //   console.log(data)
    // },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 1360px;
    width: 100%;
    background-color: #ECECEC;
    .main-container{
      height: 1280px;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
