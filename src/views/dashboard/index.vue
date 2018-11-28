<template>
  <div class="dashboard-container">
    <h2>用户统计</h2>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
<style rel='stylesheet/scss' lang='scss' >
  .dashboard-container{
    h2{
      padding-left: 20px;
    }
  }

</style>
