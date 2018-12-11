<template>
  <div class="baidu">
    <p class="address">
      <span class="title">地址:</span>
      <el-input placeholder="请输入所在城市" v-model="city"></el-input>
      <el-input id="suggestId" placeholder="请输入详细地址" name="address_detail"></el-input>
    </p>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        city: '',
        address_detail: null, //详细地址
        userlocation: {lng: "", lat: ""},
        lng: 0,//维度
        lat: 0,//经度
      }
    },
    mounted() {
      this.ditu()
    },
    methods: {
      ditu() {
        var _this = this
        this.$nextTick(function () {
          var th = this
          // 创建Map实例
          var map = new BMap.Map("allmap");
          map.centerAndZoom(this.city, 15);
          map.enableScrollWheelZoom();
          var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
              "input": "suggestId"
              , "location": map
            })
          var myValue
          ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            this.address_detail = myValue
            let string = JSON.stringify([this.address_detail, _this.city])
            _this.$emit('getAddress', string)

            setPlace();
          });

          function setPlace() {
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun() {
              th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
              console.log(th.userlocation);
              _this.$emit('getJW', th.userlocation)
              map.centerAndZoom(th.userlocation, 18);
              map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
            }

            var local = new BMap.LocalSearch(map, { //智能搜索
              onSearchComplete: myFun
            });
            local.search(myValue);
            console.log(th.userlocation);
            _this.lat = th.userlocation.lat
            _this.lng = th.userlocation.lng
          }

        })
      }
    },
    watch: {
      city() {
        console.log('aaaaa')
        this.ditu()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .address {
    position: relative;
    padding-top: 0 !important;
    .title{
      margin-right: 0 !important;
      width: 90px;
      text-align: right;
      padding-right: 10px;
    }
    .el-input {
      width: 200px;
    }
    > .el-input:last-of-type {
      width: 400px;
    }
    .el-input__suffix {
      right: -5px !important;
    }
    .el-input__suffix {
      right: -5px !important;
    }
    .el-input__inner {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      border-radius: 0;
    }
    .el-input__inner:focus {
      border-bottom: 1px solid #3B9BFF;
    }
  }
</style>
