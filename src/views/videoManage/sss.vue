<template>
  <div class="footer">
    <div class="content">
      <p class="foot-menu">
        <a>关于我们</a>
        <router-link to="/article">新闻动态</router-link>
        <a>常见问题</a>
        <router-link to="/renew">
          <a>VIP升级
            <span>
              <img src="./hot.png" alt="">
            </span>
          </a>
        </router-link>
        <a>机构认证</a>
        <router-link to="/videoList"><a>全部视频<span><img src="./hot.png" alt=""></span></a></router-link>
        <a>最新活动</a>
        <router-link to="/teacherAuth/realName"><a>执业证书</a></router-link></p>
      <p class="certificate"><a>蜀ICP备 16584235482-5号</a><a> 川网文123456789号</a><a>广播电视节目制作经营许可</a><a>电信增值业务许可</a></p>
      <p class="warning">本站部分资源来自网友上传，如果无意中侵犯了您的版权，请联系本站，本站将在3个工作日内删除。</p>
      <img class="web-pic" src="./tubiao.png" alt="">
    </div>
  </div>
</template>

<script>
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer

    height:145px
    background-color: dimgray
    text-align center
    margin-top 80px
    padding 35px
    font-size 14px
    .content
      .foot-menu
        a
          color #ef8200
          padding  0 14px
          border-right 1px solid #ef8200
          height 16px
          display inline-block
          position relative
          span
            position absolute
            top -20px
            left 50px
        a:last-of-type
          border none
      .certificate
        margin-top 35px
        a
          color #afaf9a
          padding  0 14px
      .warning
        margin-top 20px
        color #afaf9a
        margin-bottom 20px
</style>
