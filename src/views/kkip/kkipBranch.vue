<template>
  <div class='branchManage'>
    <div class='memberHead'>
      <p class='firstLine'><span class='phoneNum'>省：<selectKuang v-bind:selectData='provinceStatus' @value='provinceValue'></selectKuang></span>
        <span class='phoneNum'>市：<selectKuang v-bind:selectData='cityStatus' @value='citylValue'></selectKuang></span><span class='phoneNum'>区：<selectKuang v-bind:selectData='areaStatus' @value='areaValue'></selectKuang></span></p>
      <p><span class='buttons'><router-link to="/systemSet/branch-manage/branch-add"><el-button type='warning'>添加分会</el-button></router-link> <searchBox @searchKey='searchKey' @cleanIt='cleanIt'
                                                                                                                                                         v-bind:searchSelect='searchSelect'></searchBox></span>
      </p>
    </div>
    <el-table
      ref='multipleTable'
      :data='datas'
      tooltip-effect='dark'
      border
      style=' backgroundColor: #f5fafe'>
      <el-table-column
        prop='id'
        label='ID'
        width='100'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='region'
        label='地区'
        width='200'>
      </el-table-column>
      <el-table-column
        prop='name'
        label='分会名称'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='boss'
        label='负责人'
        width='150'>
        <template></template>
      </el-table-column>
      <el-table-column
        prop='mid'
        label='关联用户ID'
        width='150'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='showAuth'
        label='授权类目'>
      </el-table-column>
      <el-table-column
        prop='percent'
        label='区域销售额'>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='操作'
        width='300'
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type='text' size='small' @click="info(scope.row)">查看</el-button>
          <el-button type='text' size='small' @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <paginationBox :data='dataLength' :page='page' :pageSize="pagesize"
                   @getCurrent='handleCurrentChange'></paginationBox>
  </div>
</template>

<script>
  import {searchBox, selectKuang, timeBox, paginationBox} from '../../components/index'

  export default {
    name: 'allMember',
    components: {
      searchBox,
      selectKuang,
      timeBox,
      paginationBox
    },
    data() {
      return {
        //筛选框
        provinceStatus: [{
          value: '',
          label: '全部'
        }],
        cityStatus: [{
          value: '',
          label: '全部'
        }],
        cityList: [], //当前市数据
        areaStatus: [{
          value: '',
          label: '全部'
        }],
        searchSelect: [
          {
            value: 'phone',
            label: '手机号'
          },
          {
            value: 'boss',
            label: '负责人'
          }, {
            value: 'branch_name',
            label: '分会名称'
          }
        ],
        region: '',
        regions: '',
        datas: [],
        key: '',
        page: 1,
        dataLength: '',
        pagesize: 40,
        keyword: '',
        selectArg: {},
      }
    },
    created() {
      console.log(this.$route)
      if (this.$route.query.page != undefined) {
        this.page = this.$route.query.page
      }
      this.getBranch()
    },
    methods: {
      cleanIt() {
        var op = this.selectArg
        console.log(this.selectArg)
        for (var i in op) {
          delete op[i]
        }
      },
      searchKey(e) {
        this.page = 1
        console.log(e)
        this.selectArg[e[0]] = e[1]
        // if(e!=undefined &&["id","telphone","name"].indexOf(e[0])){
        //   delete this.selectArg["id"]
        //   delete this.selectArg["telphone"]
        //   delete this.selectArg["name"]
        //   this.selectArg[e[0]]=e[1]
        // }
        var op = this.selectArg
        // op[e[0]] = e[1]
        // console.log(op)
        delete op.undefined
        this.getBranch(op)
        // this.cleanIt()
      },
      provinceValue(e) {
        // console.log( this.selectArg)
        this.selectArg['region'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        this.areaStatus = [{
          value: '',
          label: '全部'
        }]
        this.cityStatus = [{
          value: '',
          label: '全部'
        }]
        this.getCity(ee)
      },
      getarea(ee) {
        console.log(this.cityList)
        for (var q = 0; q < this.cityList.length; q++) {
          if (this.cityList[q].label === ee['pro']) {
            for (var w = 0; w < this.cityList[w].children.length; w++) {
              // if(this.cityList[q].children[w] === ) {
              // }
              let d = {}
              d['label'] = this.cityList[q].children[w].label
              d['value'] = this.cityList[q].children[w].value
              this.areaStatus.push(d)
            }
          }
        }
        console.log(this.areaStatus)
      },
      areaValue(e) {
        // console.log( this.selectArg)
        this.selectArg['city'] = e
        let ee = this.selectArg
        this.searchKey(ee)
      },
      getCity(ee) {
        var _this = this
        console.log(this.regions)
        for (var u = 0; u < this.regions.length; u++) {
          (function (o) {
            if (_this.regions[o].label === ee['region']) {
              _this.cityList = _this.regions[o].children
              for (var p = 0; p < _this.regions[o].children.length; p++) {
                let d = {}
                d['label'] = _this.regions[o].children[p].label
                d['value'] = _this.regions[o].children[p].value
                _this.cityStatus.push(d)
              }
            }
          })(u)
        }
      },
      citylValue(e) {
        this.selectArg['pro'] = e
        let ee = this.selectArg
        this.searchKey(ee)
        this.areaStatus = [{
          value: '',
          label: '全部'
        }]
        this.getarea(ee)
      },
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.getBranch()
      },
      getBranch(keyword) {
        var _this = this
        this.keyword = keyword
        var args = {page: this.page}
        // console.log(keyword)
        for (var k in this.keyword) {
          args[k] = keyword[k]
        }
        this.args = args
        // console.log(args)
        this.keyword == this.keyword != undefined ? this.keyword : ''
        PUBLIC.get('Configure.Configure.listbranch', args, (data) => {
          var newData = []
          for (var n = 0; n < data.length; n++) {
            var tmp = JSON.parse(data[n].value)
            console.log(tmp)
            tmp.percent = ''
            tmp.id = data[n].id
            newData.push(tmp)
          }
          console.log(newData)
          PUBLIC.get('Video.drama.classlist', (dataa) => {
            console.log(data)
            for (var q = 0; q < newData.length; q++) {
              var shouquan1 = ''
              for (var i in dataa) {
                for (var a in newData[q].authorize) {
                  if (dataa[i].id === newData[q].authorize[a]) {
                    shouquan1 = shouquan1 + ',' + dataa[i].class
                  }
                }
                newData[q]['showAuth'] = shouquan1.slice(1)
              }
            }
            this.datas = newData
            console.log(this.datas)
            for (var k = 0; k < this.datas.length; k++) {
              if (_this.datas[k].mid == "") {
                _this.datas[k]['percent'] = 0
              } else {
                (function (p) {
                  let stratime = PUBLIC.getToday().slice(0, 4) + '-0-00'
                  var day1 = new Date();
                  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
                  let endtime = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
                  console.log(stratime, endtime)
                  PUBLIC.get('Statis.Usermoney.selstatisone', {
                    uid: _this.datas[p].mid,
                    stratime: stratime,
                    endtime: endtime
                  }, (v) => {
                    // console.log("11111111111")
                    // console.log(_this.datas[p])
                    if (v == null || v == '') {
                      // console.log('aaaaaaaaaaaaaaaaaaaaaaa')
                      _this.datas[p]['percent'] = 0
                    } else {
                      _this.datas[p]['percent'] = v[0].conmoney == null ? 0 : v[0].conmoney
                    }
                  })
                })(k)
              }

            }
          })
          PUBLIC.get("Configure.Configure.Selone", {type: "quyuliebiao", key: "quyuliebiao"}, function (data) {
            console.log("区域数据载入完毕")
            console.log(data)
            _this.regions = data ? JSON.parse(data.value) : []
            console.log(_this.regions)
            _this.showList()
          })
        }, function (v) {
          _this.dataLength = parseInt(v.data.num)
          _this.pagesize = parseInt(v.data.pagenum)
          console.log(v.data.num)
        })
      },
      showList() {
        if( this.provinceStatus.length == 1) {
          for (var i in this.regions) {
            let c = {}
            c['label'] = this.regions[i].label
            c['value'] = this.regions[i].value
            this.provinceStatus.push(c)
          }
        }
        console.log(this.provinceStatus)
      },
      edit(row) {
        this.$router.push({name: 'kkip分会编辑', params: {key: row.name, page: this.page}})
      },
      info(row) {
        this.$router.push({name: 'kkip分会详情', params: {key: row.name, page: this.page}})
      }
    },
    mounted() {

    }
  }
</script>
<style rel='stylesheet/scss' lang='scss'>
  .branchManage {
    padding: 25px;
    padding-bottom: 80px;
    color: #333333;
    .memberHead {
      /*height: 150px;*/
      padding: 0;
      p {
        padding-top: 10px;
        line-height: 65px;
        font-size: 14px;
        .buttons {
          .el-button {
            margin: 0;
            border-radius: 0;
          }
        }
        .record {
          float: right;
          > span {
            color: red;
            padding-right: 20px;
            font-weight: bold;
          }
        }
        .searchBox {
          display: inline-block;
          float: right;
        }
      }
      .firstLine {
        > span {
          padding-right: 20px;
          .selectKuang {
            width: 124px;
          }
          .el-input {
            width: 124px;
          }
        }
        .regTime {
          margin-right: 5%;
          .timeBox {
            display: inline-block;
          }
        }
      }
    }
    .el-table {
      .warning-row {
        background: #fff5f5;
      }
      .waiting {
        background-color: #f2ffff;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .el-button--text {
      padding: 10px;
    }
    .el-pagination {
      padding-top: 20px;
    }
  }

</style>
