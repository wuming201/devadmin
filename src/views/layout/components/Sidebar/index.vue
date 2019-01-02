<template>
  <div class="sidebar">
    <ul class="sideList">
      <li class="cursor" v-for=" (items, index) in list" @click="openLi(items,index)">
        <i :class="items.icon"></i>{{items.name}} <span><i class="fa fa-caret-up" ref="icon"></i></span>
        <ul :class="items.active" @click.stop="bba">
          <router-link v-for="item in items.childname" :to="item.link" @click="cleanPageInfo">
            <li>{{item.name}}</li>
          </router-link>
        </ul>
      </li>

    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    data() {
      return {
        rotate:'0deg',
        path: '',
        list: [
          {
            icon: 'fa fa-users',
            name: '会员管理',
            childname: [
              {
                link: '/member/all-member',
                name: '会员总览'
              }, {
                link: '/member/vip-member',
                name: 'VIP会员'
              }, {
                link: '/member/extension',
                name: '会员推广'
              }, {
                link: '/member/school-data',
                name: '园所资料'
              }, {
                link: '/member/organi-data',
                name: '机构资料'
              },
              // {
              //   link: '/member/code-list',
              //   name: '邀请码列表'
              // },
              {
                link: '/member/school-check',
                name: '企业审核'
              }, {
                link: '/member/teacher-manage',
                name: '教师管理'
              }, {
                link: '/member/personal-set',
                name: '身份设置'
              }
            ],
            active: ''
          },
          {
            icon: 'fa fa-video-camera',
            name: '视频管理',
            childname: [
              {
                link: '/videoManage/video-level',
                name: '视频级别'
              }, {
                link: '/videoManage/video-classify',
                name: '视频分类'
              }, {
                link: '/videoManage/video-tag',
                name: '视频标签'
              }, {
                link: '/videoManage/ranking-list',
                name: '剧集列表'
              }, {
                link: '/videoManage/video-list',
                name: '视频列表'
              }
            ],
            active: ''
          },
          {
            icon: 'fa fa-soccer-ball-o',
            name: '活动管理',
            childname: [
              {
                link: '/activity/activity-list',
                name: '活动列表'
              }, {
                link: '/activity/signUp-list',
                name: '报名列表'
              }, {
                link: '/activity/refund-check',
                name: '退费审核'
              }
            ]
            , active: ''
          },
          {
            icon: 'fa fa-gift',
            name: '营销管理',
            childname: [
              {
                link: '/marketing/points',
                name: '积分任务'
              }, {
                link: '/marketing/coupon',
                name: '优惠券列表'
              }
            ]
            , active: ''
          },
          {
            icon: 'fa fa-list-alt',
            name: '业务管理',
            childname: [
              {
                link: '/orders/serv-list',
                name: '业务套餐'
              }, {
                link: '/orders/contract-list',
                name: '合约列表'
              }, {
                link: '/orders/lesson-list',
                name: '企业课表'
              }, {
                link: '/orders/schedule',
                name: '课时日程'
              }, {
                link: '/orders/order-list',
                name: '订单列表'
              }, {
                link: '/orders/withdraw',
                name: '提现管理'
              }
            ]
            , active: ''
          },
          {
            icon: 'fa fa-bullhorn',
            name: '广告管理',
            childname: [
              {
                link: '/ad/ad-list',
                name: '广告列表'
              }, {
                link: '/ad/friendly-link',
                name: '友情链接'
              }
            ]
            , active: ''
          },
          {
            icon: 'fa fa-video-camera',
            name: '文章管理',
            childname: [
              {
                link: '/article/article-type',
                name: '文章类型'
              }, {
                link: '/article/article-list',
                name: '文章列表'
              },
              {
                link: '/message/agreements',
                name: '平台协议'
              }
            ],
            active: ''
          },
          {
            icon: 'fa fa-commenting',
            name: '消息管理',
            childname: [
              {
                link: '/message/message-list',
                name: '消息列表'
              },
              {
                link: '/message/issue-type',
                name: '问题类型'
              }
            ],
            active: ''
          },
          {
            icon: 'iconfont  icon-wangluo_f',
            name: 'KKIP官网设置',
            childname: [
              {
                link: '/kkip/kkip-honer',
                name: '荣誉管理'
              }, {
                link: '/kkip/kkip-course',
                name: '课程设置'
              },
              {
                link: '/kkip/kkip-article',
                name: '文章管理'
              }, {
                link: '/kkip/kkip-region',
                name: '区域管理'
              }, {
                link: '/kkip/kkip-branch',
                name: '分会管理',
              }
            ],
            active: ''
          },
          {
            icon: 'fa fa-cogs',
            name: '系统设置',
            childname: [
              {
                link: '/systemSet/manage-certify',
                name: '经营证书'
              },
              // {
              //   link: '/systemSet/honer-manage',
              //   name: '荣誉管理'
              // }, {
              //   link: '/systemSet/course-set',
              //   name: '课程设置'
              // }, {
              //   link: '/systemSet/region-manage',
              //   name: '区域管理'
              // }, {
              //   link: '/systemSet/branch-manage',
              //   name: '分会管理'
              // },
              {
                link: '/systemSet/user-group',
                name: '用户组'
              }, {
                link: '/systemSet/change-password',
                name: '修改密码'
              }, {
                link: '/systemSet/operate-log',
                name: '操作日志'
              }
            ],
            active: ''
          }
        ]
      }
    },
    methods: {
      cleanPageInfo() {
        localStorage.removeItem("pageInfo")
        console.log(localStorage.pageInfo)
      },
      getPath() {
        console.log(this.$route)
        this.path = this.$route.path
      },
      openLi(a, b) {
        console.log(a)
        console.log(a.active)
        if (a.active != undefined && a.active != '') {
          console.log('oooooooo')
          a['active'] = ''
          this.$refs.icon[b].style.transform = 'rotate(0deg)'
        } else {
          // console.log(this.rotate)
          // this.rotate = '180deg'
          let icon = 'icon' + b
          // console.log(this.rotate)
          console.log(icon)
          console.log(this.$refs.icon[b])
          this.$refs.icon[b].style.transform = 'rotate(180deg)'
          console.log(']]]]]]]]]]]]]]]]]]')
          a['active'] = 'active'
        }
        console.log(a, b)
      },
      bba(a) {
        console.log(this.path)
        console.log(a.srcElement.baseURI.split('#')[1])
        if (a.srcElement.baseURI.split('#')[1] == this.path) {
          console.log('aaaaaa')
          this.$router.go(0)
        }
      }
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    mounted() {
      this.getPath()
    }
  }
</script>
