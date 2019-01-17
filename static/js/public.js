// import axios from 'axios'

// import Cookies from "js-cookie";

CONFIG = {
  host: 'http://formapi.kkip.cn/',
  fileHost: 'http://file.kkip.cn/files.php',
}

PUBLIC = {
  // 传入参数则为设置token，不传入则为获取token，默认为空字符串
  init: function() {
    // 全局参数缓存
    // 视频等级图标
    // 用户等级图标

  },
  token: function(val) {
    if (val === undefined) {
      var tk = localStorage.selfToken
      return tk === undefined ? '' : tk
    }
    return localStorage.selfToken = val
  },
  cache: function(key, val) {
    if (val == undefined) {
      var tk = localStorage[key]
      var tt = localStorage['__time__' + key] == undefined ? 0 : localStorage['__time__' + key]
      console.log(tt)
      if (tt < Date.parse(new Date())) {
        return false
      }
      return tk == undefined ? '' : JSON.parse(tk)
    }

    localStorage['__time__' + key] = Date.parse(new Date()) + 180000
    console.log(localStorage['__time__' + key])
    return localStorage[key] = JSON.stringify(val)
  },
  test: function() {
    console.log('这里是测试公用函数')
    return
  },
  merObj: function(master, client, demo) {
    if (demo == undefined) {
      for (const i in client) {
        master[i] = client[i]
      }
      return master
    } else {
      var newData = this.formatObj(demo, client)
      for (const i in newData) {
        master[i] = newData[i]
      }
      return master
    }
  },
  // 页面跳转函数
  local: function(url, args, tags) {
    var urlZ = ''
    for (var key in args) {
      urlZ += '&' + key + '=' + args[key]
    }
    if (url.indexOf('?') == -1) {
      urlZ.replace('&', '?')
    }
    console.log(urlZ)
    url = '/#/' + url + urlZ
    window.location = url
  },
  // 页面载入url信息及缓存信息加载
  load: function() {

  },
  // 系统弹出提示
  toa: function(message, level) {
    message = String(message)
    level = level != undefined ? level : 3
    var type = ['default', 'success', 'warning', 'danger']
    new Toast({
      message: message,
      type: type[level]
    })
  },
  // 路由解析
  serviceSplit: function(ser, arg) {
    arg = arg != undefined ? arg : {}
    arg['token'] = this.token()
    var url = CONFIG.host + 'index.php?s=' + ser

    for (var k in arg) {
      url += '&' + k + '=' + arg[k]
    }
    return url
  },
  // 用于计算上传文件的名字，尽量使文件不会覆盖
  comFileName: function(fileName) {
    var filenames = fileName.split('.')
    console.log(filenames)
    var hou = filenames.length > 1 ? '.' + filenames[filenames.length - 1] : ''
    var ran = parseInt(Math.random() * 1000000)
    var fname = Date.now() + 's' + ran + hou
    return fname
  },
  // 数组对象格式化属性
  // 输入为数组对象或单对象
  isArray: function(value) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(value)
    } else {
      return Object.prototype.toString.call(value) === '[object Array]'
    }
  },
  formatObjOne: function(demo, data) {
    var newObj = {}
    for (var key in demo) {
      if (data[demo[key]] === undefined) {
        console.log(demo[key])
        return false
      }
      // console.log(demo[key]+":ok")
      newObj[key] = data[demo[key]]
    }
    return newObj
  },
  formatObj: function(demo, data) {
    if (this.isArray(data)) {
      var newData = []
      for (var n = 0; n < data.length; n++) {
        newData.push(this.formatObjOne(demo, data[n]))
      }
      return newData
    }
    return this.formatObjOne(demo, data)
  },
  dateFtt: function(fmt, date) { // author: meizz
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  },
  // 获取当前时间并且格式化如 2018-01-01 05:24:59
  getNowDate: function() {
    var date = new Date()
    var sign1 = '-'
    var sign2 = ':'
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1 // 月
    var day = date.getDate() // 日
    var hour = date.getHours() // 时
    var minutes = date.getMinutes() // 分
    var seconds = date.getSeconds() // 秒
    var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
    var week = weekArr[date.getDay()]
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (day >= 0 && day <= 9) {
      day = '0' + day
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = '0' + minutes
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = '0' + seconds
    }
    var currentdate = year + sign1 + month + sign1 + day + ' ' + hour + sign2 + minutes + sign2 + seconds
    return currentdate
  },
  // get请求
  get: function(service, args, retFn, retAll) {
    // 最后使用记录监测
    if (localStorage.lastTime !== undefined && (parseInt(localStorage.lastTime) + 1800000) < new Date().getTime()) {
      PUBLIC.token('')
      PUBLIC.cache('userInfo', {})
      localStorage.lastTime = undefined
      console.log('因为超时返回首页')
      // window.location.href="/#/login"
      window.location.reload()
      // return
    }
    localStorage.lastTime = new Date().getTime()
    var _this = this
    if (typeof args === 'function') {
      retFn = args
      args = {}
    }
    if (retAll == undefined) {
      retAll = function() {}
    }
    // retFn=typeof args=="function"?args
    // console.log(this)
    var url = this.serviceSplit(service, args)
    // console.log(url)
    axios.get(url)
      .then(function(res) {
        retAll(res)
        if (res.status !== 200) {
          switch (res.status) {
            default: _this.toa(res.data.msg)
              break
          }
          return
        }
        if (res.data.ret != 200) {
          _this.toa(res.data.msg)
          return
        }
        retFn(res.data.data)
        // var aa = localStorage.selfToken
        // console.log(aa)
        // if(localStorage.selfToken != '') {
        //   if (localStorage.nowTime == '') {
        //     console.log('第一次进入')
        //     let now = new Date().getTime()
        //     return localStorage.nowTime = now
        //   }
        //   else {
        //     console.log('第n次进入')
        //     let oldTime = localStorage.nowTime
        //     let  newTime = new Date().getTime()
        //     let cha = newTime -oldTime
        //     console.log(oldTime, newTime, cha)
        //     if (cha > 180) {
        //       localStorage.selfToken = ''
        //       localStorage.nowTime = ''
        //       Cookies.remove('Admin-Token')
        //       return
        //     }else {
        //       localStorage.nowTime = newTime
        //     }
        //   }
        // }else{
        // history.go(0)
        // }
      })
      .catch(function(error) {
        if (error.response) {
          // 存在请求，但是服务器的返回一个状态码
          // 他们都在2xx之外
          _this.toa('网络异常，请稍后重试')
          console.log('服务接口：' + service + '  请求出现异常')
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          // 一些错误是在设置请求时触发的
          _this.toa('网络异常，请稍后重试')
          console.log('服务接口：' + service + '  请求出现异常')
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },
  // post请求,token放在get参数里
  post: function(service, args, retFn) {
    var _this = this
    if (typeof args === 'function') {
      retFn = args
      args = {}
    }
    // console.log(args)
    // retFn=typeof args=="function"?args
    var url = this.serviceSplit(service)
    var params = new URLSearchParams()
    for (var key in args) {
      params.append(key, args[key])
    }
    // params.append('param1', 'value1');

    axios.post(url, params)
      .then(function(res) {
        if (res.status !== 200) {
          switch (res.status) {
            default: _this.toa(res.data.meg)
              break
          }
          return
        }
        if (res.data.ret != 200) {
          _this.toa(res.data.msg)
          return
        }

        // retFn(res.data.data)

        retFn(res.data.data)
      })
      .catch(function(error) {
        if (error.response) {
          // 存在请求，但是服务器的返回一个状态码
          // 他们都在2xx之外
          _this.toa('网络异常，请稍后重试')
          console.log('服务接口：' + service + '  请求出现异常')
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          // 一些错误是在设置请求时触发的
          _this.toa('网络异常，请稍后重试')
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },
  // 上传文件至文件服务器
  postFile: function(inputId, fn) {
    // console.log(inputId, fn)
    fn = fn ? fn : function(a) {
      return a
    }
    var _this = this
    var file = document.getElementById(inputId).files[0];
    var formdata1 = new FormData(); // 创建form对象
    var fname = this.comFileName(file.name)
    var upLen = 0
    var lastUpTime = 0
    // console.log(file,formdata1,fname)
    formdata1.append('filename', file, fname); // 通过append向form对象添加数据,可以通过append继续添加数据
    //或formdata1.append('img',file);
    console.log(formdata1)
    console.log(file)
    console.log(fname)

    var configs = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function(progressEvent) {
        var thisUpTime = new Date().getTime()
        if (thisUpTime - lastUpTime < 600 && (progressEvent.loaded != progressEvent.total)) {
          return
        }
        lastUpTime = thisUpTime
        if (progressEvent.loaded > upLen) {
          // var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          // _this.toa("文件上传中: " + complete)
          upLen = progressEvent.loaded
        }

      }
    }; //添加请求头
    console.log(configs)
    console.log(CONFIG.fileHost)
    axios.post(CONFIG.fileHost, formdata1, configs)
      .then(function(res) {
        console.log(res.data.url)
        resT = res.data.url;
        console.log(resT);
        fn(resT);
      })
      .catch(function(error) {
        console.log(error)
        if (error.response) {
          //存在请求，但是服务器的返回一个状态码
          //他们都在2xx之外

        } else {
          //一些错误是在设置请求时触发的
          // _this.toa("网络异常，请稍后重试");
        }
      });
  },
  // 获取当前日期
  getTime: function() {
    var date = new Date()
    var seperator1 = '-'
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
  },

  // 列表页三个小数据需要的时间
  // 获取昨天日期
  getYesterday: function() {
    const yesterday = new Date()
    const year1 = yesterday.getFullYear()
    let month1 = yesterday.getMonth() + 1 // js从0开始取
    let date1 = yesterday.getDate() - 1
    if (month1 >= 1 && month1 <= 9) {
      month1 = '0' + month1
    }
    if (date1 >= 0 && date1 <= 9) {
      date1 = '0' + date1
    }
    var zuotian = year1 + '-' + month1 + '-' + date1 + ' ' + '00:00:00'
    return zuotian
  },
  // 获取今天
  getToday: function() {
    const today = new Date()
    const year1 = today.getFullYear()
    let month1 = today.getMonth() + 1 // js从0开始取
    let date1 = today.getDate()
    if (month1 >= 1 && month1 <= 9) {
      month1 = '0' + month1
    }
    if (date1 >= 0 && date1 <= 9) {
      date1 = '0' + date1
    }
    var jintian = year1 + '-' + month1 + '-' + date1 + ' ' + '00:00:00'
    return jintian
  },

  // 获取刺客
  getNow: function(times, flag) {
    let now = new Date()
    flag = flag != undefined
    if (times == undefined) {
      now = new Date()
    } else {
      now = times
    }

    const year1 = now.getFullYear()
    let month1 = now.getMonth() + 1 // js从0开始取
    let date1 = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let second = now.getSeconds()
    if (month1 >= 1 && month1 <= 9) {
      month1 = '0' + month1
    }
    if (date1 >= 0 && date1 <= 9) {
      date1 = '0' + date1
    }
    if (hour >= 1 && hour <= 9) {
      hour = '0' + hour
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = '0' + minutes
    }
    if (second >= 0 && second <= 9) {
      second = '0' + second
    }
    if (flag) {
      var xianzai = year1 + '-' + month1 + '-' + date1 + ' 00:00:00'
    } else {
      var xianzai = year1 + '-' + month1 + '-' + date1 + ' ' + hour + ':' + minutes + ':' + second
    }

    // console.log(xianzai)
    return xianzai
  }
}

// 将所有接口进行数据抽象，增加缓存机制
// 数据分为静态与动态两种

DATAC = {
  get: function(key) {
    return this.videoLevel(key)
  },
  getConf: function(key) {
    return this.selectList(key)
  },
  setConf: function(obj) {
    var _this = this
    for (var i in this.selectList) {
      obj[i] = this.selectList[i]
    }
    for (var i in this.apiList) {
      (function(i) {
        var cc = _this.get(i)
        cc.then((b) => {
          obj[i] = b
        })
      })(i)
    }
    return obj
  },
  apiList: {
    videoLevel: ['Configure.Configure.Selfig', { type: 'videoLevel' }, {
      value: 'id',
      label: 'key'
    }],
    videoClass: ['Video.drama.classlist', {}, { value: 'id', label: 'class' }],
    videoRank: ['Video.drama.showdrama', {}, { value: 'id', label: 'title' }],
    videoTag: ['Configure.Configure.Selfig', { type: 'videoTag' }, { value: 'id', label: 'key' }]
    // orderList:['Order.receive.orderall',{type:"videoTag"},{value: "id",label: "key"}],
  },
  selectList: {
    userStatus: [{
      value: '',
      label: '普通会员'
    },
      {
        value: 318,
        label: 'VIP用户'
      }
    ],
    phoneStatus: [{
      label: '已认证',
      value: 1
    },
      {
        label: '未认证',
        value: -1
      },
      {
        label: '全部',
        value: ''
      }
    ],
    userLevelStatus: [{
      label: '已实名',
      value: 2
    },
      {
        label: '已认证手机',
        value: 1
      },
      {
        label: '未认证',
        value: 0
      },
      {
        label: '全部',
        value: ''
      }
    ],
    relStatus: [{
      label: '已认证',
      value: 1
    },
      {
        label: '未认证',
        value: -1
      },
      {
        label: '全部',
        value: ''
      }
    ],
    videoUpStatus: [{
      label: '上架',
      value: 1
    },
      {
        label: '下架',
        value: -1
      },
      {
        label: '全部',
        value: ''
      }
    ],
    payStatus: [{
      value: '',
      label: '全部'
    }, {
      value: '0',
      label: '失败'
    }, {
      value: '1',
      label: '成功'
    }]
  },
  videoLevel: function(url) {
    var cacheData = PUBLIC.cache(this.apiList[url][0])
    // if(cacheData!=false){
    //     console.log("触发缓存")
    //     return Promise.resolve(cacheData)
    // }
    var b = this.getVideoLevel(url)

    return b
  },
  getVideoLevel: async function(url) {
    var data = await this.getVideoLevelData(url)
    // console.log(data)
    if (JSON.stringify(this.apiList[url][2]) != '{}') {
      data = PUBLIC.formatObj(this.apiList[url][2], data)
    }
    // console.log(data)
    // this["__"+this.apiList[url][0]]=data
    PUBLIC.cache(this.apiList[url][0], data)
    // console.log(PUBLIC.cache(this.apiList[url][0]))
    // return  Promise.resolve(data)
    return data
  },
  getVideoLevelData: function(url) {
    var _this = this
    return new Promise(resolve => {
      // setTimeout(() => resolve("long_time_value"), 1000);
      PUBLIC.get(_this.apiList[url][0], _this.apiList[url][1], function(data) {
        resolve(data)
      })
    })
  }
}

function CC() {
  Object.defineProperty(this, 'name', {
    set: function(name) {
      nameValue = name.substr(0, 1).toUpperCase().concat(name.substring(1))
    },
    get: function() {
      return 'nameValue'
    }
  })
}

// console.log("测试异步转同步数据返回")
// console.log(DATAC.videoLevel())
// console.log(DATAC.get("videoLevel"))
DATAC.get('videoLevel').then((v) => {
  // console.log(v)
})
// console.log(CC.name)

// new Toast({
//     message:"123123",
//     type:"danger"
// })
