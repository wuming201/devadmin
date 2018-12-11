import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [{
  path: '/login',
  component: () =>
    import ('@/views/login/index'),
  hidden: true
},
  {
    path: '/authredirect',
    component: () =>
      import ('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import ('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () =>
      import ('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: () =>
        import ('@/views/documentation/index'),
      name: 'documentation',
      meta: {title: 'documentation', icon: 'documentation', noCache: true}
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: () =>
        import ('@/views/documentation/index'),
      name: '用户统计',
      meta: {title: 'documentation', icon: 'documentation', noCache: true}
    }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/ad',
    component: Layout,
    redirect: '/ad/ad-list',
    name: '广告管理',
    children: [{
      path: '/ad/ad-list',
      component: () =>
        import ('@/views/ad/adList'),
      name: '广告列表',
      meta: {title: 'adList'}
    },
      {
        path: '/ad/friendly-link',
        component: () =>
          import ('@/views/ad/friendlyLink'),
        name: '友情链接',
        meta: {title: 'friendlyLink'}
      },
      {
        path: '/ad/ad-edit/:id',
        component: () =>
          import ('@/views/ad/adEdit'),
        name: '广告编辑',
        meta: {title: 'adEdit'}
      },
      {
        path: '/ad/ad-add',
        component: () =>
          import ('@/views/ad/adAdd'),
        name: '添加广告',
        meta: {title: 'adAdd'}
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: 'article/article-type',
    name: '文章管理',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [{
      path: 'article-type',
      component: () =>
        import ('@/views/article/articleType'),
      name: '文章类型',
      meta: {title: 'articleType'}
    },
      {
        path: 'article-list',
        component: () =>
          import ('@/views/article/articleList'),
        name: '文章列表',
        meta: {title: 'articleList'}
      },
      {
        path: 'article-info/:id',
        component: () =>
          import ('@/views/article/articleInfo'),
        name: '文章详情',
        meta: {title: 'articleInfo'}
      },
      {
        path: 'article-edit/:id',
        component: () =>
          import ('@/views/article/articleEdit'),
        name: '文章编辑',
        meta: {title: 'articleEdit'}
      },
      {
        path: 'article-send',
        component: () =>
          import ('@/views/article/articleSend'),
        name: '发布文章',
        meta: {title: 'articleSend'}
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: 'orders/order-list',
    name: '订单管理',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [{
      path: 'order-list',
      component: () =>
        import ('@/views/orders/orderList'),
      name: '订单列表',
      meta: {title: 'orderList'}
    },
      {
        path: 'serv-list',
        component: () =>
          import ('@/views/orders/servList'),
        name: '业务套餐',
        meta: {title: 'servList'}
      },
      {
        path: 'contract-list',
        component: () =>
          import ('@/views/orders/contractList'),
        name: '合约列表',
        meta: {title: 'contractList'}
      },
      {
        path: 'lesson-list',
        component: () =>
          import ('@/views/orders/lessonList'),
        name: '企业课表',
        meta: {title: 'lessonList'}
      },
      {
        path: 'schedule',
        component: () =>
          import ('@/views/orders/schedule'),
        name: '课时日程',
        meta: {title: 'schedule'}
      },
      {
        path: 'withdraw',
        component: () =>
          import ('@/views/orders/withdraw'),
        name: '提现管理',
        meta: {title: 'withdraw'}
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: 'message/message-list',
    name: '消息管理',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [{
      path: 'message-list',
      component: () =>
        import ('@/views/message/messageList'),
      name: '消息列表',
      meta: {title: 'messageList'}
    },
      {
        path: 'message-temp',
        component: () =>
          import ('@/views/message/messageTemp'),
        name: 'messageTemp',
        meta: {title: 'messageTemp'}
      },
      {
        path: 'message-send',
        component: () =>
          import ('@/views/message/messageSend'),
        name: '发送消息',
        meta: {title: 'messageSend'}
      }
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/points',
    name: '营销管理',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [{
      path: 'points',
      component: () =>
        import ('@/views/marketing/points'),
      name: '积分任务',
      meta: {title: 'points', noCache: true}
    },
      {
        path: 'discount-history',
        component: () =>
          import ('@/views/marketing/discountHistory'),
        name: '优惠券使用记录',
        meta: {title: '优惠券使用记录', noCache: true}
      },
      {
        path: 'line',
        component: () =>
          import ('@/views/marketing/line'),
        name: 'lineChart',
        meta: {title: 'lineChart', noCache: true}
      },
      {
        path: 'coupon',
        component: () =>
          import ('@/views/marketing/coupon'),
        name: '优惠券列表',
        meta: {title: 'coupon', noCache: true}
      },
      {
        path: 'coup-history',
        component: () =>
          import ('@/views/marketing/coupHistory'),
        name: '历史优惠券',
        meta: {title: 'couHistory', noCache: true}
      }
    ]
  },

  {
    path: '/systemSet',
    component: Layout,
    name: '系统设置',
    redirect: '/systemSet/manage-certify',
    children: [{
      path: '/systemSet/manage-certify',
      component: () =>
        import ('@/views/systemSet/manageCertify'),
      name: '经营证书',
      meta: {title: 'manageCertify'}
    },
      {
        path: '/systemSet/honer-manage',
        component: () =>
          import ('@/views/systemSet/honerManage'),
        name: '荣誉管理',
        meta: {title: 'honerManage'}
      },
      {
        path: '/systemSet/course-set',
        component: () =>
          import ('@/views/systemSet/courseSet'),
        name: '课程设置',
        meta: {title: 'courseSet'}
      },
      {
        path: '/systemSet/course-set/course-info',
        component: () =>
          import ('@/views/systemSet/courseInfo'),
        name: '课程详情',
        meta: {title: 'courseInfo'}
      },
      {
        path: '/systemSet/course-set/course-edit',
        component: () =>
          import ('@/views/systemSet/courseEdit'),
        name: '课程编辑',
        meta: {title: 'courseEdit'}
      },
      {
        path: '/systemSet/course-set/course-add',
        component: () =>
          import ('@/views/systemSet/courseAdd'),
        name: '课程添加',
        meta: {title: 'courseAdd'}
      },
      {
        path: '/systemSet/region-manage',
        component: () =>
          import ('@/views/systemSet/regionManage'),
        name: '区域管理',
        meta: {title: 'regionManage'}
      },
      {
        path: '/systemSet/branch-manage',
        component: () =>
          import ('@/views/systemSet/branchManage'),
        name: '分会管理',
        meta: {title: 'branchManage'}
      },
      {
        path: '/systemSet/branch-manage/branch-info',
        component: () =>
          import ('@/views/systemSet/branchInfo'),
        name: '分会详情',
        meta: {title: 'branchInfo'}
      },
      {
        path: '/systemSet/branch-manage/branch-edit/:key',
        component: () =>
          import ('@/views/systemSet/branchEdit'),
        name: '分会编辑',
        meta: {title: 'branchEdit'}
      },
      {
        path: '/systemSet/branch-manage/branch-add',
        component: () =>
          import ('@/views/systemSet/branchAdd'),
        name: '分会添加',
        meta: {title: 'branchAdd'}
      },
      {
        path: '/systemSet/user-group',
        component: () =>
          import ('@/views/systemSet/userGroup'),
        name: '用户组',
        meta: {title: 'userGroup'}
      },
      {
        path: '/systemSet/change-password',
        component: () =>
          import ('@/views/systemSet/changePassword'),
        name: '修改密码',
        meta: {title: 'changePassword'}
      },
      {
        path: '/systemSet/operate-log',
        component: () =>
          import ('@/views/systemSet/operateLog'),
        name: '操作日志',
        meta: {title: 'operateLog'}
      }
    ]
  },

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activity-list',
    name: '活动管理',
    meta: {
      title: 'activity',
      icon: 'activity'
    },
    children: [{
      path: 'activity-list',
      component: () =>
        import ('@/views/activity/activityList'),
      name: '活动列表',
      meta: {title: 'activityList'}
    },
      {
        path: 'activity-info/:id',
        component: () =>
          import ('@/views/activity/activityInfo'),
        name: '活动详情',
        meta: {title: 'activityInfo'}
      },
      {
        path: 'activity-edit/:id',
        component: () =>
          import ('@/views/activity/activityEdit'),
        name: '活动编辑',
        meta: {title: 'activityEdit'}
      },
      {
        path: 'act-release',
        component: () =>
          import ('@/views/activity/actRelease'),
        name: '添加活动',
        meta: {title: 'actRelease'}
      },
      {
        path: 'refund-check',
        component: () =>
          import ('@/views/activity/refundCheck'),
        name: '退费审核',
        meta: {title: 'refundCheck'}
      },
      {
        path: 'signUp-list',
        component: () =>
          import ('@/views/activity/signUpList'),
        name: '报名列表',
        meta: {title: 'signUpList'}
      }
    ]
  },

  {
    path: '/videoManage',
    component: Layout,
    redirect: '/videoManage/video-level',
    name: '视频管理',
    meta: {
      title: 'videoManage',
      icon: 'videoManage'
    },
    children: [
      {
        path: '/videoManage/video-level', // Must write the full path
        component: () =>
          import ('@/views/videoManage/videoLevel'), // Parent router-view
        name: '视频等级',
        meta: {title: 'bar'}
      },
      {
        path: '/videoManage/ranking-list',
        component: () =>
          import ('@/views/videoManage/rankingList'),
        name: '剧集列表',
        meta: {title: 'rankingList'}
      },
      {
        path: '/videoManage/video-classify',
        component: () =>
          import ('@/views/videoManage/videoClassify'),
        name: '视频分类',
        meta: {title: 'videoClassify'}
      },
      {
        path: '/videoManage/video-tag',
        component: () =>
          import ('@/views/videoManage/videoTag'),
        name: '视频标签',
        meta: {title: 'videoTag'}
      },
      {
        path: '/videoManage/video-list',
        redirect: '/videoManage/video-list/list',
        component: () =>
          import ('@/views/videoManage/videoList'),
        name: '视频列表',
        meta: {title: 'videoList'},
        children: [{
          path: '/videoManage/video-list/list',
          component: () =>
            import ('@/views/videoManage/videoList/vList'),
          name: '',
          meta: {title: 'vList'}
        },
          {
            path: '/videoManage/video-list/info/:id',
            component: () =>
              import ('@/views/videoManage/videoList/vInfo'),
            name: '视频详情',
            meta: {title: 'vInfo'}
          },
          {
            path: '/videoManage/video-list/edit/:id',
            component: () =>
              import ('@/views/videoManage/videoList/vEdit'),
            name: '视频编辑',
            meta: {title: 'vEdit'}
          },
          {
            path: '/videoManage/video-list/add',
            component: () =>
              import ('@/views/videoManage/videoList/vAdd'),
            name: '视频添加',
            meta: {title: 'vAdd '}
          }
        ]
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [{
      path: '401',
      component: () =>
        import ('@/views/errorPage/401'),
      name: 'page401',
      meta: {title: 'page401', noCache: true}
    },
      {
        path: '404',
        component: () =>
          import ('@/views/errorPage/404'),
        name: 'page404',
        meta: {title: 'page404', noCache: true}
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/all-member',
    name: '会员管理',
    meta: {
      title: 'member',
      icon: 'member'
    },
    children: [{
      path: 'all-member',
      component: () =>
        import ('@/views/member/allMember'),
      name: '会员列表',
      meta: {title: 'allMember'}
    },
      {
        path: 'vip-member',
        component: () =>
          import ('@/views/member/vipMember'),
        name: 'VIP会员',
        meta: {title: 'vipMember'}
      },
      {
        path: 'vip-info/:id',
        component: () =>
          import ('@/views/member/all/vipInfo'),
        name: '查看VIP会员',
        meta: {title: 'vipInfo'}
      },
      {
        path: 'edit-vip/:id',
        component: () =>
          import ('@/views/member/all/editVip'),
        name: '编辑VIP会员',
        meta: {title: 'editVip'}
      },
      {
        path: 'add-vip',
        component: () =>
          import ('@/views/member/all/addVip'),
        name: '添加VIP会员',
        meta: {title: 'addVip'}
      },
      {
        path: 'extension',
        component: () =>
          import ('@/views/member/extension'),
        name: '会员推广',
        meta: {title: 'extension'}
      },
      {
        path: 'VIPextension',
        component: () =>
          import ('@/views/member/all/VIPextension'),
        name: 'VIP推广',
        meta: {title: 'VIPextension'}
      },
      {
        path: 'school-data',
        component: () =>
          import ('@/views/member/schoolData'),
        name: '园所资料',
        meta: {title: 'schoolData'}
      },
      {
        path: 'organi-data',
        component: () =>
          import ('@/views/member/organiData'),
        name: '机构资料',
        meta: {title: 'organiData'}
      },
      {
        path: 'code-list',
        component: () =>
          import ('@/views/member/codeList'),
        name: '邀请码列表',
        meta: {title: 'codeList'}
      },
      {
        path: 'teacher-manage',
        component: () =>
          import ('@/views/member/teacherManage'),
        name: '教师管理',
        meta: {title: 'teacherManage'}
      },
      {
        path: 'teacher-manage1',
        component: () =>
          import ('@/views/member/all/teacherManage1'),
        name: '视频制作者',
        meta: {title: 'teacherManage1'}
      },
      {
        path: 'school-check',
        component: () =>
          import ('@/views/member/schoolCheck'),
        name: '园所审核',
        meta: {title: 'schoolCheck'}
      },
      {
        path: 'add-member',
        component: () =>
          import ('@/views/member/all/addMember'),
        name: '添加会员',
        meta: {title: 'addMember'}
      },
      {
        path: 'member-info/:id',
        component: () =>
          import ('@/views/member/all/memberInfo'),
        name: '会员详情',
        meta: {title: 'memberInfo'}
      },
      {
        path: 'edit-member/:id',
        component: () =>
          import ('@/views/member/all/editMember'),
        name: '会员编辑',
        meta: {title: 'editMember'}
      },
      {
        path: 'money-set',
        component: () =>
          import ('@/views/member/all/moneySet'),
        name: '费用设置',
        meta: {title: 'moneySet'}
      },
      {
        path: 'school-info/:id',
        component: () =>
          import ('@/views/member/all/schoolInfo'),
        name: '园所详情',
        meta: {title: 'schoolInfo'}
      },
      {
        path: 'check-info/:id',
        component: () =>
          import ('@/views/member/all/checkInfo'),
        name: '审核详情',
        meta: {title: 'checkInfo'}
      },
      {
        path: 'organi-info/:id',
        component: () =>
          import ('@/views/member/all/organiInfo'),
        name: '机构详情',
        meta: {title: 'organiInfo'}
      },
      {
        path: 'school-edit/:id',
        component: () =>
          import ('@/views/member/all/schoolEdit'),
        name: '园所编辑',
        meta: {title: 'schoolEdit'}
      },
      {
        path: 'organi-edit/:id',
        component: () =>
          import ('@/views/member/all/organiEdit'),
        name: '机构编辑',
        meta: {title: 'organiEdit'}
      },
      {
        path: 'organi-entry',
        component: () =>
          import ('@/views/member/all/organiEntry'),
        name: '机构添加',
        meta: {title: 'organiEntry'}
      },
      {
        path: 'school-entry',
        component: () =>
          import ('@/views/member/all/schoolEntry'),
        name: '园所添加',
        meta: {title: 'schoolEntry'}
      },
      {
        path: 'school-examine/:id',
        component: () =>
          import ('@/views/member/all/schoolExamine'),
        name: '审核园所',
        meta: {title: 'schoolExamine'}
      },
      {
        path: 'teacher-info',
        component: () =>
          import ('@/views/member/all/teacherInfo'),
        name: '教师详情',
        meta: {title: 'teacherInfo'}
      },
      {
        path: 'teacher-edit',
        component: () =>
          import ('@/views/member/all/teacherEdit'),
        name: '教师编辑',
        meta: {title: 'teacherEdit'}
      },
      {
        path: 'teacher-add',
        component: () =>
          import ('@/views/member/all/teacherAdd'),
        name: '教师添加',
        meta: {title: 'teacherAdd'}
      },
      {
        path: 'certify-check',
        component: () =>
          import ('@/views/member/all/certifyCheck'),
        name: '教师审核',
        meta: {title: 'certifyCheck'}
      },
      {
        path: 'personal-set',
        component: () =>
          import ('@/views/member/all/personalSet'),
        name: 'personalSet',
        meta: {title: 'personalSet'}
      }
    ]
  },
  {
    path: '/kkip',
    component: Layout,
    redirect: '/kkip/kkip-honer',
    name: 'kkip',
    children: [
      {
        path: '/kkip/kkip-honer',
        component: () =>
          import ('@/views/kkip/kkipHoner'),
        name: '荣誉管理',
        meta: {title: '荣誉管理'}
      },
      {
        path: '/kkip/kk-honer-give',
        component: () =>
          import ('@/views/kkip/kkhonerGive'),
        name: '荣誉管理',
        meta: {title: '荣誉管理'}
      },


      {
        path: '/kkip/kkip-course',
        component: () =>
          import ('@/views/kkip/kkipCourse'),
        name: '课程设置',
        meta: {title: '课程设置'}
      },
      {
        path: '/kkip/kk-course-Add',
        component: () =>
          import ('@/views/kkip/kkcourseAdd'),
        name: 'kk课程添加',
        meta: {title: 'kk课程添加'}
      },
      {
        path: '/kkip/kk-course-Edit/:key',
        component: () =>
          import ('@/views/kkip/kkcourseEdit'),
        name: 'kk课程编辑',
        meta: {title: 'kk课程编辑'}
      },
      {
        path: '/kkip/kk-course-Info/:key',
        component: () =>
          import ('@/views/kkip/kkcourseInfo'),
        name: 'kk课程详情',
        meta: {title: 'kk课程详情'}
      },
      {
        path: '/kkip/kk-course-JYLN',
        component: () =>
          import ('@/views/kkip/kkcourseJYLN'),
        name: '教育理念',
        meta: {title: '教育理念'}
      },


      {
        path: '/kkip/kkip-article',
        component: () =>
          import ('@/views/kkip/kkipArticle'),
        name: 'kk文章管理',
        meta: {title: 'kk文章管理'}
      },
      {
        path: '/kkip/kk-article-index',
        component: () =>
          import ('@/views/kkip/kkarticleIndex'),
        name: 'kkip文章首页',
        meta: {title: 'kkip文章首页'}
      },
      {
        path: '/kkip/kk-article-YTLR',
        component: () =>
          import ('@/views/kkip/kkarticleTYLR'),
        name: 'kkip文章幼体联人',
        meta: {title: 'kkip文章幼体联人'}
      },
      {
        path: '/kkip/kk-article-Type',
        component: () =>
          import ('@/views/kkip/kkarticleType'),
        name: 'kkip文章类型',
        meta: {title: 'kkip文章类型'}
      },
      {
        path: '/kkip/kk-article-send',
        component: () =>
          import ('@/views/kkip/kkarticleSend'),
        name: 'kkip文章添加',
        meta: {title: 'kkip文章添加'}
      },
      {
        path: '/kkip/kk-article-Edit',
        component: () =>
          import ('@/views/kkip/kkarticleEdit'),
        name: 'kkip文章编辑',
        meta: {title: 'kkip文章编辑'}
      },


      {
        path: '/kkip/kkip-region',
        component: () =>
          import ('@/views/kkip/kkipRegion'),
        name: '区域设置',
        meta: {title: '区域设置'}
      },
      {
        path: '/kkip/kk-branch-info',
        component: () =>
          import ('@/views/kkip/kkbranchInfo'),
        name: 'kkip分会详情',
        meta: {title: 'kkip分会详情'}
      },
      {
        path: '/kkip/kk-branch-info',
        component: () =>
          import ('@/views/kkip/kkbranchInfo'),
        name: 'kkip分会详情',
        meta: {title: 'kkip分会详情'}
      },


      {
        path: '/kkip/kkip-branch',
        component: () =>
          import ('@/views/kkip/kkipBranch'),
        name: '课程设置',
        meta: {title: '课程设置'},
      },
      {
        path: '/kkip/kk-branch-info',
        component: () =>
          import ('@/views/kkip/kkbranchInfo'),
        name: 'kkip分会详情',
        meta: {title: 'kkip分会详情'}
      },
      {
        path: '/kkip/kk-branch-add',
        component: () =>
          import ('@/views/kkip/kkbranchAdd'),
        name: 'kkip分会添加',
        meta: {title: 'kkip分会添加'}
      },
      {
        path: '/kkip/kk-branch-edit/:key',
        component: () =>
          import ('@/views/kkip/kkbranchEdit'),
        name: 'kkip分会编辑',
        meta: {title: 'kkip分会编辑'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

