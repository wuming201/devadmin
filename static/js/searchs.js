methods: {
  handleSelectionChange(val) {
    this.multipleSelection = val
  },
  handleSizeChange(val) {
    this.pagesize = val
  },
  handleCurrentChange(val) {
    this.currentPage = val
  },
  getUserList:function(keyword) {
    var _this = this
    var args = { page: 1 }
    for (var k in keyword) {
      args[k] = keyword[k]
    }
    keyword == keyword != undefined ? keyword : ''
    PUBLIC.get('User.User.Userlist', args, function(data) {
      var newData = []
      var demo = {
        id:'Id',
        username:'username',
        telphone:'telphone',
        reg_time:'reg_time',
        rel_status:'rel_status'
      }
      newData = PUBLIC.formatObj(demo,data)
      _this.tableData3 = newData
      for(var i = 0;i<newData.length;i++){
        _this.getUserGroup(newData[i]['id'],_this.tableData3,i,newData)
      }

      // console.log(_this.tableData3)
    })
  },
  getUserGroup:function(id, relData, index, newData) {
    var _this = this
    PUBLIC.get('Team.User.TeamList',{uid:id},function(data){
      console.log(data)
      newData[index]['userGroup'] = data[0]['type']
      newData[index]['groupEndTime'] = data[0]['end_time']
      _this.tableData3 = JSON.parse(JSON.stringify(newData))
      console.log(relData[index])
    })
  },
  searchKey(e) {
    console.log(11111111111)
    console.log(e)
    var op = this.selectArg
    op[e[0]] = e[1]
    this.getUserList(op)
  },
  phoneValue(e) {
    this.selectArg['phoneStatus'] = e
    console.log(e)
  },
  relValue(e) {
    this.selectArg['issming'] = e
    console.log(e)
  },
  userValue(e) {
    this.selectArg['usertype'] = e
    console.log(e)
  },
  regTime(e) {
    this.selectArg['regstr_time'] = e[0]
    this.selectArg['regend_time'] = e[1]
    console.log(e)
  },
  endTime(e) {
    this.selectArg['daoqstr_time'] = e[0]
    this.selectArg['daoqend_time'] = e[1]
    console.log(e)
  }
},
